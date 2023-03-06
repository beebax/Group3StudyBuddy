import { Component, OnInit } from '@angular/core';
import { Questions } from 'src/app/Models/questions';
import { QuestionService } from 'src/app/Services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

 result:Questions[] = [];

  constructor(private questionService:QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe((response:Questions[]) =>
    { console.log(response);
    this.result = response;
  });
  }

}
