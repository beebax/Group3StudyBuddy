import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'oidc-client';
import { Favorites } from 'src/app/Models/favorites';
import { QuestionService } from 'src/app/Services/question.service';
import { Questions } from '../../Models/questions';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css'],
})
export class SingleQuestionComponent {
  //grabs the questions from the parent
  @Input() singleQuestion: Questions = {} as Questions;

  @Input() formUser: SocialUser = {} as SocialUser;

  @Output() newFavoriteEvent = new EventEmitter<''>();
  isFavorited: boolean = false;
  isAuthored: boolean = false;
  //toggeles answers on and off.
  display: boolean = false;
  toggleDisplay(): void {
    this.display = !this.display;
  }

  //Creates Favorite Ability
  //initializing the question service inside the component
  constructor(
    private questionService: QuestionService,
    private authService: SocialAuthService
  ) {}
  //create an empty favorites variable
  singleFavorites: Favorites = {} as Favorites;
  //Method that adds favorite when called.
  addToFavorites(): void {
    this.isFavorited = true;
    //cause the favorites.qid to be the question.id that is selected.
    this.singleFavorites.qid = this.singleQuestion.id;
    this.singleFavorites.userId = this.formUser.id;
    //goes to service with the favorites.qid and the favorites.username that was input.
    this.questionService
      .addFavorite(this.singleFavorites)
      .subscribe((response: Favorites) => {
        console.log(response);
        this.newFavoriteEvent.emit();
      });
  }
  removeFavorites(): void {
    this.isFavorited = false;
    this.singleFavorites.qid = this.singleQuestion.id;
    this.singleFavorites.userId = this.formUser.id;
    this.questionService
      .removeFavorite(this.singleFavorites)
      .subscribe((response: Favorites) => {
        console.log(response);
        this.newFavoriteEvent.emit();
      });
  }
  checkIfAFavorite(): void {
    this.singleFavorites.qid = this.singleQuestion.id;
    this.singleFavorites.userId = this.formUser.id;
    console.log(this.singleFavorites);
    this.questionService
      .checkIfAFavorite(this.singleFavorites)
      .subscribe((response: boolean) => {
        this.isFavorited = response;
        console.log(response);
      });
  }

  checkIfAuthor(): void {
    this.singleQuestion.author = this.formUser.id;
    this.questionService
      .checkIfAuthor(this.singleQuestion)
      .subscribe((response: boolean) => {
        this.isAuthored = response;
        console.log(response);
      });
  }

  
  ngOnInit() {
    console.log(this.formUser);
    this.checkIfAFavorite();
    this.checkIfAuthor();
  }

  isLoggedIn():boolean{
    return this.formUser.id != null;
  }
  deleteQuestion() {
    console.log(this.singleQuestion);
    this.questionService
      .deleteQuestion(this.singleQuestion)
      .subscribe((response: Questions) => {
        console.log(response);
        this.newFavoriteEvent.emit();
      });
  }
}
