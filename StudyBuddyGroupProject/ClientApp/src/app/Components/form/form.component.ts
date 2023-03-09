import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Questions } from 'src/app/Models/questions';
import { QuestionService } from 'src/app/Services/question.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
@Input() formUser: SocialUser = {} as SocialUser;
  
constructor(private questionService:QuestionService, private authService: SocialAuthService){}
//   user: SocialUser = {} as SocialUser;
//   loggedIn: boolean = false;
//   ngOnInit() {
//     this.authService.authState.subscribe((user) => {
//      this.user = user;
//      this.loggedIn = (user != null);
//      console.log(this.user);
//    });
//   }
  @Output() newQuestionEvent = new EventEmitter<''>();
  display:boolean = false;
  newQuestion:Questions = {} as Questions;
  
  

  toggleForm():void{
    this.display = !this.display;
  }

  createQuestion():void{
    this.newQuestion.author = this.formUser.id;
    this.questionService.addQuestion(this.newQuestion).subscribe((response:Questions) => {
      console.log(response);
      this.newQuestionEvent.emit();
      this.toggleForm();

    });
  }

}
