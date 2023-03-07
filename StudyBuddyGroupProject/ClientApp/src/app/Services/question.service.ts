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
    return this.http.get<Favorites>(`${this.baseUrl}api/favorite/addFavorite?_userQID=${Qid}&_userName=${userName}`);
  }
  removeFavorite(Qid:number, userName:string):Observable<Favorites>{
    return this.http.delete<Favorites>(`${this.baseUrl}api/favorite/removeFavorite?_userQID=${Qid}&_userName=${userName}`);
  }

  getQuestions():Observable<Questions[]>{
    return this.http.get<Questions[]>(`${this.baseUrl}api/question/getQuestions`);
  }
  getByCategory(userCategory:string):Observable<Questions[]>{
    return this.http.get<Questions[]>(`${this.baseUrl}api/question/getByCategory?userCat=${userCategory}`);  
  }

getByFavorites():Observable<Questions[]>{
    return this.http.get<Questions[]>(`${this.baseUrl}api/question/getByFavorites`);  
  }
  addQuestion(newQuestion:Questions):Observable<Questions>{
    return this.http.post<Questions>(`${this.baseUrl}api/question/addQuestion?_question1=${newQuestion.question1}&_answer=${newQuestion.answer}&_category=${newQuestion.category}&_author=${newQuestion.author}`,{});  
  }
  deleteQuestion(questionId:number, userName:string):Observable<Questions>{
    return this.http.delete<Questions>(`${this.baseUrl}api/question/deleteQuestion?userDelete=${questionId}&userName=${userName}`);  
  }
}
