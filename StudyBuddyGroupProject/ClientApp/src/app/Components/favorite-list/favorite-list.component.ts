
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
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

  constructor(private questionService:QuestionService, private authService: SocialAuthService) { }
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
     this.user = user;
     this.loggedIn = (user != null);
     this.getUserFavorites();
     console.log(this.user)
   });
  }

  getUserFavorites(){
    this.questionService.getUserFavorites(this.user.id).subscribe((response:Questions[]) => 
    { console.log(response);
      this.result = response;
   
    })
  }

}
