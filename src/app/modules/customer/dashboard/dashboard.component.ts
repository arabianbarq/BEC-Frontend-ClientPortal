import { Component, OnInit } from '@angular/core';
import { JobListService } from '../../../core/services/job-list.service';
import { subtract } from 'add-subtract-date';
import { formatDate } from "@angular/common";
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { MessageService } from 'src/app/core/services/message.service';
import { LocalStorageService } from "src/app/core/services/local-storage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formattedEndDate = new Date();
  formattedStartDate = this.subtractdays(30);
  startDateValue = formatDate(this.formattedStartDate, 'yyyy-MM-dd', 'en-US');
  endDateValue = formatDate(this.formattedEndDate, 'yyyy-MM-dd', 'en-US');
  public JobsCompleted:number=0;
  public JobsHalted:number= 0;
  public JobsProgress:number= 0;
  LineChart:any;
  messageObject:any;
  pageNumber: number = 1;
  sortingBy: string = 'CreatedOn';
  orderByDescending: boolean = true;
  clientId:0;
  clientData: any;
  dataList:any;
  jobsPerMonthCount:any;
  StagesCountResponse:any;
  totalRecords:any;
  PaidCount:any;
  UnpaidCount:any;

loading: boolean = false;


  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
       backgroundColor: '#ffb7af',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];



  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] ;
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor( private _jobListService: JobListService , private _messageService: MessageService
    ,private _localStorageService: LocalStorageService) { }

  ngOnInit() {
  
    this.clientData=this._localStorageService.getUserDetail();
    this.clientId=this.clientData.ClientId;
    this.jobsPerMonth({ClientId: this.clientId});
    this.jobsStatusCount({StartDate:this.startDateValue,EndDate:this.endDateValue,Status:"Halted"});
    this.jobsStatusCount({StartDate:this.startDateValue,EndDate:this.endDateValue,Status:"In Progress"});
    this.jobsStatusCount({StartDate:this.startDateValue,EndDate:this.endDateValue,Status:"Completed"});
    this.progressCounts({ClientId:this.clientId,allRecords:true});
   // this.StagesCount(data);
   
  }
  jobsPerMonth(request) {
this.loading = true;
  
    this._jobListService.getJobsPerMonth(request).subscribe(
    response => {
   
    this.jobsPerMonthCount = response.data.jobsMainCount.responseMonthlyCount;
    this.StagesCountResponse = response.data.jobsMainCount.responseStageCount;

    this.lineChartLabels = this.jobsPerMonthCount.map(x => x.MonthName);
    this.pieChartLabels=this.StagesCountResponse.map(x=> x.StageName);
    let jobData = this.jobsPerMonthCount.map(x => x.TotalJobs);
    let stageData=this.StagesCountResponse.map(x=>x.TotalJobs);
     
    this.lineChartData =  [{ 
                            data: jobData, 
                            label: 'Jobs Per Month'
                          }];
     this.pieChartData= stageData;
      this.loading = false;

    },
  
  error => {
  this.messageObject = this._messageService.sendLoginErrorMessageObject(error);  
      
          if (error == "Unknown Error") {
            this.messageObject = this._messageService.sendLoginErrorMessageObject("Something went wrong");
          }
          else {
            this.messageObject = this._messageService.sendLoginErrorMessageObject(error);
    }
 
  });

}


  

  jobsStatusCount(data)
  {
   this._jobListService.getJobsListGridData(data).subscribe(response => {
     if(data.Status=="Halted"){
      this.JobsHalted= response.data.jobsMainResponse.totalRecords;
     }
     else if(data.Status=="In Progress")
     this.JobsProgress=response.data.jobsMainResponse.totalRecords;
      else 
      this.JobsCompleted = response.data.jobsMainResponse.totalRecords;
    
  })
  }

  public subtractdays(number): Date {
    const d: Date = new Date();
    const thirtyDaysBack = subtract(d, number, "days");
    return thirtyDaysBack;
  }
  progressCounts(data)
  {
    this._jobListService.getJobsListGridData(data).subscribe(
      response => {
  
      this.dataList = response.data.jobsMainResponse.jobResponse;
      this.totalRecords=response.data.jobsMainResponse.totalRecords;
      
      
       this.PaidCount = (this.dataList.filter(x => x.Paid == true))/this.totalRecords*100;
       this.UnpaidCount=(this.totalRecords-this.PaidCount)/this.totalRecords*100;
    
      })
  }

}
