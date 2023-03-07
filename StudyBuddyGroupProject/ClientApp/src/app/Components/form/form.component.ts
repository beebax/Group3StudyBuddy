import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Questions } from 'src/app/Models/questions';
import { QuestionService } from 'src/app/Services/question.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  @Output() 
  display:boolean = false;
  newQuestion:Questions = {} as Questions;
  
  constructor(private questionService:QuestionService){}

  toggleForm():void{
    this.display = !this.display;
  }

  createQuestion():void{
    this.questionService.addQuestion(this.newQuestion).subscribe((response:Questions) => {
      console.log(response);
      this.questionService.getQuestions();
    });
  }

}
