import { Component, OnInit } from '@angular/core';
import { Favorites } from 'src/app/Models/favorites';
import { Questions } from 'src/app/Models/questions';
import { QuestionService } from 'src/app/Services/question.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})

export class FavoriteListComponent implements OnInit {

  result:Questions[] = [];

  constructor(private questionService:QuestionService) { }

  ngOnInit() {
   this.getUserFavorites();
  };

  _userName:string = "Ethan";

  getUserFavorites(){
    this.questionService.getUserFavorites(this._userName).subscribe((response:Questions[]) => 
    { console.log(response);
      this.result = response;
    })
  }

}
