import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { JobListService } from '../../../core/services/job-list.service';
import { DatePipe } from '@angular/common';
import { MachinetypeService } from '../../../core/services/machinetype.service';
import { JobtypeService } from '../../../core/services/jobtype.service';
import { UserService } from '../../../core/services/user.service';
import { MessageService } from 'src/app/core/services/message.service';
import { subtract } from 'add-subtract-date';
import { ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { CustomTableComponent } from 'src/app/shared/components/UI-component/custom-table.component';
import { formatDate } from "@angular/common";
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseUrl } from '../../../config/urls.config';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';

@Component({

  selector: 'app-jobs-in-progress',
  templateUrl: './jobs-in-progress.component.html',
  styleUrls: ['./jobs-in-progress.component.scss'],
  providers: [DatePipe]
})

export class JobsInProgressComponent implements OnInit {
  @ViewChild(CustomTableComponent) customTableComponent;
  datePickerConfig: Partial<BsDatepickerConfig>;
  documentdata: any;

  constructor(public datepipe: DatePipe, private _machineTypeService: MachinetypeService, private _jobTypeService: JobtypeService,
    private _messageService: MessageService, private _jobListService: JobListService, private _userService: UserService,
    private _route: ActivatedRoute, private _localStorageService: LocalStorageService, private modalService: BsModalService, private http: HttpClient,
    private sanitizer: DomSanitizer) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue', dateInputFormat: 'MM/DD/YYYY'

    })
  }
  apiUrl = BaseUrl.apiUrl;
  sortingBy: string = 'CreatedOn';
  orderByDescending: boolean = true
  pagedItems: any
  getMachineTypes: any
  userList: any;
  formattedEndDate = new Date();
  formattedStartDate = this.subtractdays(7);
  startDateValue = formatDate(this.formattedStartDate, 'yyyy-MM-dd', 'en-US');
  endDateValue = formatDate(this.formattedEndDate, 'yyyy-MM-dd', 'en-US');
  objectlist: any;
  base64Image: any;
  allItems: any;
  pageNumber: number = 1;
  messageObject: any;
  dataList: any;
  clientId: 0;
  jobsDocumentdata: any []= [];
  modalRef: BsModalRef;
  jobDocument: any[]= [];
  styling = {
    ignoreBackdropClick: true
  };
  fileUrl;
  uploadedFilePath: string = null;
  jobListForm: any = {
    StageId: "",
    JobTypeId: "",
    MachineTypeId: "",
    UserId: "",
    StartDate: "",
    EndDate: "",
    Completed: false,
    Page: Number,
    Limit: Number,
    OrderBy: Boolean,
    OrderByDescending: Number

  };

  jobListData: any;
  PaidCount: any;
  UnpaidCount: any;

  machineTypeId: any;
  JobTypes: any;
  getFullJobList: any
  stagesList: any
  filteredData: any
  totalRecords: any;
  clientData: any;
  columnsList: any;
  jobid: any;


  ngOnInit() {

    this.clientData = this._localStorageService.getUserDetail();

    this.clientId = this.clientData.ClientId;
    this.jobListForm;

    //this.filterGrid({ClientId: this.clientId,StageId:0,JobTypeId:0,MachineTypeId:0,UserId:0,StartDate:'',EndDate:''});
    this.getMachineTypeDetails();
    this.getUserDetails();
    this.getJobTypeDetails();
    this.getStagesData();


    this.columnsList = [
      {
        ColumnName: "JobCode",
        DisplayName: "Job Code",
        AllowSorting: true
      },
      {
        ColumnName: "Stage",
        DisplayName: "Stage",
        AllowSorting: true
      },
      {
        ColumnName: "JobTypeName",
        DisplayName: "Job Type",
        AllowSorting: true
      },
      {
        ColumnName: "MachineTypeName",
        DisplayName: "Machine Type",
        AllowSorting: true
      },
      {
        ColumnName: "MachineName",
        DisplayName: "Machine",
        AllowSorting: true
      },
      // {
      //   ColumnName: "Paid",
      //   DisplayName: "Paid/Unpaid",
      //   AllowSorting: true
      // }
    ];
  }

  public subtractdays(number): Date {
    const d: Date = new Date();
    const fortyDaysBack = subtract(d, number, "days");
    return fortyDaysBack;
  }

  getStagesData() {

    this._jobListService.getStages({ AllRecords: true, OrderBy: "Stages", OrderByDescending: false }).subscribe(response => {
      this.stagesList = response.data.stagesMainResponse.stagesResponse;
    })

  }

  // getJobListGrid(pageNumber, pageSize, sortingBy, orderByDescending) {
  //   this.pagerData.Page = pageNumber;
  //   this.pagerData.OrderBy = sortingBy;
  //   this.pagerData.Limit = pageSize;
  //   this.pagerData.OrderByDescending = orderByDescending
  //   this.getJobListGridData(this.pagerData);


  // }
  getMachineTypeDetails(): any {
    this._machineTypeService.getMachineTypeDetails({ AllRecords: true, OrderBy: "MachineType", OrderByDescending: false }).subscribe(response => {
      this.getMachineTypes = response.data.machineTypeMainRespone.machineTypeResponse;
    })

  }
  getJobTypeDetails() {
    this._jobTypeService.getJobTypeDetails({ AllRecords: true, OrderBy: "JobType", OrderByDescending: false }).subscribe(response => {
      this.JobTypes = response.data.jobTypeMainRespone.jobTypeResponse;
    })
  }
  getUserDetails() {

    this._userService.getUserList({ AllRecords: true, OrderBy: "UserName", OrderByDescending: false }).subscribe(response => {
      this.userList = response.data.usersMainResponse.userWithRolesResponse;
    })
  }
  applyFilter(data) {

    data.ClientId = this.clientId;
    this.filterGrid(data);
  }
  // getJobListGridData(data) {


  //   this._jobListService.getJobsListGridData(data).subscribe(response => {
  //     this.getFullJobList = response.data.jobsMainResponse.jobResponse;
  //     this.allItems = response.data.jobsMainResponse.totalRecords;

  //     this.getFullJobList.map(data => {
  //       data.Order = "Stage " + data.Order
  //     });
  //   },
  //   error => {
  //     this.getFullJobList = [];
  //     this.allItems=0;

  //   });
  // }
  filterGrid(request) {

    request.ClientId = this.clientId;

    this._jobListService.getJobsListGridData(request).subscribe(
      response => {
        this.dataList = response.data.jobsMainResponse.jobResponse;

        this.dataList.map((clientId) => console.log("clientId :: ", clientId.ClientId));

        this.totalRecords = response.data.jobsMainResponse.totalRecords;
        this.customTableComponent.bindTable(response.data.jobsMainResponse.jobResponse, response.data.jobsMainResponse.totalRecords);

        this.PaidCount = this.dataList.filter(x => x.Paid == true);
        this.UnpaidCount = this.totalRecords - this.PaidCount;

      },
      error => {
        this.customTableComponent.bindTable([], 0);

        this.messageObject = this._messageService.sendLoginErrorMessageObject(error);

        if (error == "Unknown Error") {
          this.messageObject = this._messageService.sendLoginErrorMessageObject("Something went wrong");
        }
        else {
          this.messageObject = this._messageService.sendLoginErrorMessageObject(error);
        }

      })
  }

  openJobDetailsModal(template: any, jobId: any) {

    this.objectlist = { type: 'jobDetails', JobId: jobId };
    if (this.modalRef)
      this.closeModal();
    this.jobsDocumentdata = [];
    this.getJobDetails(jobId);
    this.jobid = jobId;

    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-xl' }, this.styling)
    );
  }
  closeModal() {
    this.modalRef.hide();
  }
  getJobDetails(JobId) {

    this._jobListService.getJobDetails({ JobId: JobId, AllRecords: true }).subscribe(response => {
      this.jobsDocumentdata = response.data.jobActiveMainResponse.jobListResponse;
      this.documentdata = response.data.jobActiveMainResponse.jobListResponse[0].JobDocuments;
    }, error => {
      console.log(error);
    });

  }

  downloadDocument(filepath: string) {  
    let imageUrl =
      // "https://dummyimage.com/600x400/000/fff?height=165";
    this.getBase64ImageFromURL(`${this.apiUrl}${filepath}`).subscribe(base64data => {
      this.base64Image = "data:image/png;base64," + base64data;
      // save image to disk
      var link = document.createElement("a");
      document.body.appendChild(link)
  ; // for Firefox
  
      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", "image.jpg");
      link.click();
    });
  }
  
  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }
  
  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");
  
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

}

