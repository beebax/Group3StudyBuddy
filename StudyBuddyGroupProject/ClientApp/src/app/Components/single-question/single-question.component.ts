import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
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
  isFavorited:boolean=false;

  //toggeles answers on and off.
  display:boolean = false;
  toggleDisplay():void{
    this.display = !this.display;
  }

  //Creates Favorite Ability
  //initializing the question service inside the component
  constructor(private questionService:QuestionService, private authService: SocialAuthService){}
  //create an empty favorites variable
  singleFavorites:Favorites={} as Favorites;
  //Method that adds favorite when called. 
  addToFavorites():void{
    this.isFavorited=true;
    //cause the favorites.qid to be the question.id that is selected. 
    this.singleFavorites.qid=this.singleQuestion.id;
    this.singleFavorites.userId = this.user.id;
    //goes to service with the favorites.qid and the favorites.username that was input.
    this.questionService.addFavorite(this.singleFavorites).subscribe((response:Favorites) => {
      console.log(response);
      this.newFavoriteEvent.emit();

    });
  }
  removeFavorites():void{
    this.isFavorited = false;
    this.singleFavorites.qid=this.singleQuestion.id;
    this.singleFavorites.userId=this.user.id;
    this.questionService.removeFavorite(this.singleFavorites).subscribe((response:Favorites) => {
    console.log(response);
    this.newFavoriteEvent.emit();
    });
  }
  checkIfAFavorite():void{
    this.singleFavorites.qid=this.singleQuestion.id;
    this.singleFavorites.userId=this.user.id;
    console.log(this.singleFavorites)
    this.questionService.checkIfAFavorite(this.singleFavorites).subscribe((response:boolean)=>{
      this.isFavorited = response;
      console.log(response);
      
    });
  }

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
     this.user = user;
     this.loggedIn = (user != null);
     console.log(this.user);
     this.checkIfAFavorite();
   });
  }
}

