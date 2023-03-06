import { Component, Input } from '@angular/core';
import { Questions } from '../../Models/questions';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent {

  @Input() singleQuestion: Questions = {} as Questions;
  display:boolean = false;

  toggleDisplay():void{
    this.display = !this.display;
  }

}

