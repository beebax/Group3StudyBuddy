import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Favorites } from 'src/app/Models/favorites';
import { QuestionService } from 'src/app/Services/question.service';
import { Questions } from '../../Models/questions';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent {

  //grabs the questions from the parent 
  @Input() singleQuestion: Questions = {} as Questions;
  @Output() newFavoriteEvent = new EventEmitter<''>();

  //toggeles answers on and off.
  display:boolean = false;
  toggleDisplay():void{
    this.display = !this.display;
  }

  //Creates Favorite Ability
  //initializing the question service inside the component
  constructor(private questionService:QuestionService){}
  //create an empty favorites variable
  singleFavorites:Favorites={} as Favorites;
  //Method that adds favorite when called. 
  addToFavorites():void{
    //cause the favorites.qid to be the question.id that is selected. 
    this.singleFavorites.qid=this.singleQuestion.id
    //goes to service with the favorites.qid and the favorites.username that was input.
    this.questionService.addFavorite(this.singleFavorites).subscribe((response:Favorites) => {
      console.log(response);
      this.newFavoriteEvent.emit();

    });
  }
  removeFavorites():void{
    this.singleFavorites.qid=this.singleQuestion.id;
    this.questionService.removeFavorite(this.singleFavorites).subscribe((response:Favorites) => {
    console.log(response);
    this.newFavoriteEvent.emit();
    });
  }

}

