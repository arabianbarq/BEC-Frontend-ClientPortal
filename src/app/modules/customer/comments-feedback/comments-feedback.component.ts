import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { JobListService } from '../../../core/services/job-list.service';
import { JobtypeService } from '../../../core/services/jobtype.service';
import { MachinetypeService } from '../../../core/services/machinetype.service';
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { CustomTableComponent } from 'src/app/shared/components/UI-component/custom-table.component';
import { MessageService } from 'src/app/core/services/message.service';
import { ValidatorService } from 'src/app/core/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommentFeedbackService } from 'src/app/core/services/comment-feedback.service';

@Component({
  selector: 'app-comments-feedback',
  templateUrl: './comments-feedback.component.html',
  styleUrls: ['./comments-feedback.component.scss']
})
export class CommentsFeedbackComponent implements OnInit {
  @Input('object') object: any;
  @ViewChild(CustomTableComponent) customTableComponent;
  stagesList: any;
  JobTypes: any;
  getMachineTypes: any;
  columnsList: any;
  clientId: 0;
  clientData: any;
  dataList: any;
  pageNumber: number = 1;
  sortingBy: string = 'CreatedOn';
  orderByDescending: boolean = true;
  messageObject: any;
  modalRef: BsModalRef;
  styling = {
    ignoreBackdropClick: true
  };

  objectlist: any;



  feedbackFilterForm: any = {
    StageId: "",
    JobTypeId: "",
    MachineTypeId: "",
    // UserId: "",
    // StartDate: "",
    // EndDate: "",
    // Completed: false,
    Page: Number,
    Limit: Number,
    OrderBy: Boolean,
    OrderByDescending: Number

  };


  constructor(private _jobTypeService: JobtypeService, private _jobListService: JobListService
    , private _machineTypeService: MachinetypeService, private _localStorageService: LocalStorageService
    , private _messageService: MessageService, private _validatorService: ValidatorService,
    private modalService: BsModalService, private _commentFeedback: CommentFeedbackService) { }

  ngOnInit() {
    this.getStagesData();
    this.getJobTypeDetails();
    this.getMachineTypeDetails();
    this.clientData = this._localStorageService.getUserDetail();

    this.clientId = this.clientData.ClientId;

    this.columnsList = [
      {
        ColumnName: "JobCodeName",
        DisplayName: "Job Code",
        AllowSorting: true
      },
      {
        ColumnName: "MachineName",
        DisplayName: "Machine Name",
        AllowSorting: true
      },
      {
        ColumnName: "FeedbackTypeName",
        DisplayName: "Feedback Type",
        AllowSorting: true
      },
      {
        ColumnName: "FeedbackPriorityName",
        DisplayName: "Feedback Priority",
        AllowSorting: true
      },
      {
        ColumnName: "Feedback",
        DisplayName: "Feedback",
        AllowSorting: true
      },
      {
        ColumnName: "Delete",
        DisplayName: "Delete",
        // AllowSorting: true
      }
    ];

  }
  getStagesData() {

    this._jobListService.getStages({ AllRecords: true, OrderBy: "Stages", OrderByDescending: false }).subscribe(response => {
      this.stagesList = response.data.stagesMainResponse.stagesResponse;
    })

  }
  getJobTypeDetails() {
    this._jobTypeService.getJobTypeDetails({ AllRecords: true, OrderBy: "JobType", OrderByDescending: false }).subscribe(response => {
      this.JobTypes = response.data.jobTypeMainRespone.jobTypeResponse;
    })
  }
  getMachineTypeDetails(): any {

    this._machineTypeService.getMachineTypeDetails({ AllRecords: true, OrderBy: "MachineType", OrderByDescending: false }).subscribe(response => {
      this.getMachineTypes = response.data.machineTypeMainRespone.machineTypeResponse;
    })

  }

  filterGrid(request) {

    request.ClientId = this.clientId;


    // request.orderByDescending = true;

    this._commentFeedback.getAllComments(request).subscribe(
      response => {
        this.dataList = response.data.feedbackMainResponse.feedbackResponse;

        this.customTableComponent.bindTable(response.data.feedbackMainResponse.feedbackResponse, response.data.feedbackMainResponse.totalRecords);
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
  applyFilter(request) {    
    let data = {
      JobTypeId: 0,
      StageId: 0,
      MachineTypeId: 0,
      Page: 1,
      Limit: 10,
      OrderBy:'CreatedOn',
      OrderByDescending: false
    }


    if (request.JobTypeId != "" && request.JobTypeId != null)
      data.JobTypeId = parseInt(request.JobTypeId);
    else
      data.JobTypeId = 0;
    if (request.StageId != "" && request.StageId != null)
      data.StageId = parseInt(request.StageId);
    else
      data.StageId = 0;
    if (request.MachineTypeId != "" && request.MachineTypeId != null)
      data.MachineTypeId = parseInt(request.MachineTypeId);
    else
      data.MachineTypeId = 0;
    this.filterGrid(data);

  }

  closeRoleModal() {
    // this._validatorService.markAsUntouched(this.commentForm);

    this.modalRef.hide();
  }
  commentModal(template: any, data) {

    this.objectlist = data;

    if (this.modalRef)
      this.closeRoleModal();

    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-xl' }, this.styling)
    );
  }
  deleteComment(clientFeedbackId: any) {
    const confirmation = confirm("Are you sure you want to delete this comment ?");
    if (confirmation) {
      // let data = {
      //   ClientFeedbackId: clientFeedbackId
      // }
      this._commentFeedback.deleteComment({ ClientFeedbackId: clientFeedbackId }).subscribe(
        response => {

          this.messageObject = this._messageService.sendSuccessMessageObject(response.Message);

          this.customTableComponent.filterTable();
        },
        error => {
          this._messageService.sendErrorMessageObject(error);
        }
      )
    }
  }




}
