import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl } from "../../config/urls.config"
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CommentFeedbackService {
  api = BaseUrl.baseApiUrl;

  constructor(private http: HttpClient,
    private _localStorageService:LocalStorageService) { }
    saveComment(data) { 
   
        return this.http.post<any>(this.api + 'CommentsAndFeedback/Create',data);
      }
      deleteComment(data)
      {
        return this.http.post<any>(this.api + 'CommentsAndFeedback/Delete',data);
      }
      getAllComments(data)
      {
        
        return this.http.post<any>(this.api + 'CommentsAndFeedback/GetAllRecords',data);
      }

}
