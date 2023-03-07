import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorites } from '../Models/favorites';
import { Questions } from '../Models/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(@Inject('BASE_URL') private baseUrl:string, private http:HttpClient) { }

  addFavorite(Qid:number, userName:string):Observable<Favorites>{
    return this.http.get<Favorites>(`${this.baseUrl}api/Favorite/addFavorite?_userQID=${Qid}&_userName=${userName}`);
  }
  removeFavorite(Qid:number, userName:string):Observable<Favorites>{
    return this.http.get<Favorites>(`${this.baseUrl}api/Favorite/removeFavorite?_userQID=${Qid}&_userName=${userName}`);
  }

  getQuestions():Observable<Questions>{
    return this.http.get<Questions>(`${this.baseUrl}api/Question/getQuestion`);
  }
  getByCategory(userCategory:string):Observable<Questions>{
    return this.http.get<Questions>(`${this.baseUrl}api/Question/getByCategory?userCat=${userCategory}`);  
  }

getByFavorites():Observable<Questions>{
    return this.http.get<Questions>(`${this.baseUrl}api/Question/getByFavorites`);  
  }
  addQuestion(question:string, answer:string, category:string, author:string):Observable<Questions>{
    return this.http.get<Questions>(`${this.baseUrl}api/Question/addQuestion?_question1=${question}&_answer=${answer}&_category=${category}&_author=${author}`);  
  }
  deleteQuestion(questionId:number, userName:string):Observable<Questions>{
    return this.http.get<Questions>(`${this.baseUrl}api/Question/deleteQuestion?userDelete=${questionId}&userName=${userName}`);  
  }
}
