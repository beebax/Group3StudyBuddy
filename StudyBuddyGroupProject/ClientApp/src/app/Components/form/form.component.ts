import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Questions } from 'src/app/Models/questions';
import { QuestionService } from 'src/app/Services/question.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  @Output() submitted = new EventEmitter<string>();

  display:boolean = false;
  newQuestion:Questions = {} as Questions;
  userQuestion1:string = "";
  userAnswer:string = "";
  userCategory:string = "";
  userAuthor:string = "";


  constructor(private questionService:QuestionService){}

  toggleForm():void{
    this.display = !this.display;
  }

  // createQuestion():void{
    
  //     question1: this.newQuestion.question1,
  //     answer: this.newQuestion.answer,
  //     category: this.newQuestion.category,
  //     author: this.newQuestion.author,
  //     numfav: 0,

  //   this.submitted.emit(question1, answer, category, author, numfav);
  //   this.toggleForm();
  // }

  createQuestion():void{
    this.questionService.addQuestion(this.userQuestion1, this.userAnswer, this.userCategory, this.userAuthor).subscribe((Response:Questions) => {
      console.log(Response);
      this.questionService.getQuestions();
    });
  };

}
