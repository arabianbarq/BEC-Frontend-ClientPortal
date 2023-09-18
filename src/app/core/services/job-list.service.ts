import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseUrl } from "../../config/urls.config"
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JobListService {
  api = BaseUrl.baseApiUrl;

  constructor(private http: HttpClient,
    private _localStorageService:LocalStorageService) { }
    getJobsListGridData(data) { 
   
    
      return this.http.post<any>(this.api + 'JobsAPI/GetAllRecords',data);
    }
    getJobDetails(data) {
      return this.http.post<any>(this.api + "JobActivityAPI/GetAllRecords", data);
      }
    getStages(data){
     return this.http.post<any>(this.api + 'StagesAPI/GetAllRecords',data);
 
    }
    getJobsPerMonth(data){
      return this.http.post<any>(this.api + 'JobsAPI/GetJobsCount',data);
  
     }
     getClientStagesCount(data){
      return this.http.post<any>(this.api + 'JobsAPI/GetStagesRecords',data);
  
     }
     getJobs(data){
       
      return this.http.post<any>(this.api + 'JobsAPI/GetJobsByTypeAndStage',data);
  
     }


}