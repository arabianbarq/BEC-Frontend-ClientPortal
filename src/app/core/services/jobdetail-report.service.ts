import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl } from "../../config/urls.config"

@Injectable({
  providedIn: 'root'
})
export class JobdetailReportService {

  api = BaseUrl.baseApiUrl;

  constructor(private http: HttpClient) { }
  getJobsListGridData(data) {
    return this.http.post<any>(this.api + 'JobsAPI/GetAllRecords', data);
  }
  getJobDetails(data) {
    return this.http.post<any>(this.api + "JobActivityAPI/GetAllRecords", data);
  }
  getJobListByJobId(data) {
    return this.http.post<any>(this.api + "JobActivityAPI/GetByJobId", data);
  }
  getJobListDataByJobId(data) {
    return this.http.post<any>(
      this.api + "ObjectAttributesAPI/GetAttributeDetail",
      data
    );
  }
  getScopeResponseByJobId(data) {
    return this.http.post<any>(
      this.api + "Reports/GetAllRecords",
      data
    );
  }
  getworkprocedureByJobId(data) {
    return this.http.post<any>(
      this.api + "WorkProcedureAPI/GetWorkProcedure",
      data
    );
  }
  gettestingByJobId(data) {
    return this.http.post<any>(
      this.api + "AnswersAPI/GetQuestionsDetail",
      data
    );
  }
  getpackagedeliveryByJobId(data) {
    return this.http.post<any>(
      this.api + "AnswersAPI/GetQuestionsDetail",
      data
    );
  }
  getImagesByJobId(data) {
    return this.http.post<any>(
    this.api + "Reports/GetAllImages",
    data
    );
    }
  getInspectionResponseByJobId(data) {
    return this.http.post<any>(
      this.api + "AnswersAPI/GetQuestionsDetail",
      data
    );
  }
}
