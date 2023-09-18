import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl } from '../../config/urls.config';
import { ForgotpasswordModel } from 'src/app/core/models/forgot-password';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  api = BaseUrl.baseApiUrl;
  constructor(private http: HttpClient) {  }
  
  login(data) {
      return this.http.post<any>(this.api + 'ClientsAPI/ClientLogin', data);
  }
  sendForgotPasswordEmail(data: ForgotpasswordModel): Observable<any> {
    return this.http.post<any>(this.api + 'ClientsAPI/ForgotPassword', data);
    }
    
    verifyConfirmationCode(data: ForgotpasswordModel): Observable<any> {
    return this.http.post<any>(this.api + 'ClientsAPI/VerifyToken', data); 
    }
    resetPassword(data: ForgotpasswordModel): Observable<any> {
    return this.http.post<any>(this.api + 'ClientsAPI/ResetPassword', data);
    }
}
