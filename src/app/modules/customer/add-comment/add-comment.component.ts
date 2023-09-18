import { Component, OnInit } from '@angular/core';
import { JobListService } from '../../../core/services/job-list.service';
import { JobtypeService } from '../../../core/services/jobtype.service';
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { MessageService } from 'src/app/core/services/message.service';
import { CommentFeedbackService } from 'src/app/core/services/comment-feedback.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  clientData: any;
  clientId: number = 0;
  stagesList: any;
  JobTypes: any;
  jobs: any;
  JobDetails: any;

  customerFeedbackDataForm: any = {
    StageId: "",
    JobTypeId: "",
    JobId: "",
    FeedbackType: "",
    FeedbackStatus: "",
    FeedbackPriority: "",
    Feedback: "",
    Page: Number,
    Limit: Number,
    OrderBy: Boolean,
    OrderByDescending: Number,
  }
  errorMessage = {
    noRecordFound: "No record found."
  }

  validationMessage = {
    // StageId: {
    //   required: "Stage is required"
    // },
    // JobTypeId: {
    //   required: "Job Type is required"
    // },
    // JobId: {
    //   required: "Job is required"
    // },
    FeedbackType: {
      required: "Type is required"
    },
    FeedbackStatus: {
      required: "Status is required"
    },
    FeedbackPriority: {
      required: "Priority is required"
    },
    Feedback: {
      required: "Feedback is required"
    }

  }

  constructor(private _jobTypeService: JobtypeService, private _jobListService: JobListService,
    private _localStorageService: LocalStorageService, private _messageService: MessageService,
    private _commentFeedback: CommentFeedbackService) { }

  ngOnInit() {

    this.getStagesData();
    this.getJobTypeDetails();
    this.clientData = this._localStorageService.getUserDetail();
    this.clientId = this.clientData.ClientId;
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


  newJobDetails: any;
  onChangeDropdown(JobTypeId, StageId) {
    let stageId = this.customerFeedbackDataForm.StageId;
    let clientId = JSON.parse(localStorage.getItem('UserDetails')).ClientId
    if (JobTypeId > 0 && StageId > 0) {
      this._jobListService.getJobs({ AllRecords: true, OrderBy: "JobCode", OrderByDescending: false, JobTypeId: JobTypeId, StageId: StageId, ClientId: clientId }).subscribe(response => {
        this.JobDetails = response.data.jobsDropdownMainResponse.jobResponse;

        this.jobs = this.JobDetails.filter(x => x.JobTypeId == JobTypeId)
      }, error => { 
        if (error == this.errorMessage.noRecordFound) {
          this.JobDetails = []
        }
      });

    } else {
      this.JobDetails = [];
    }
  }

  save(form) {
    
    if (this.customerFeedbackDataForm === ''){
      return;
    }
    this.customerFeedbackDataForm.ClientId = this.clientId;
    if (this.customerFeedbackDataForm.JobId == "" || this.customerFeedbackDataForm.JobId == null)
      this.customerFeedbackDataForm.JobId = 0;

    this._commentFeedback.saveComment(this.customerFeedbackDataForm).subscribe(response => {
      this._messageService.sendSuccessMessageObject(response.Message);
      this.customerFeedbackDataForm.StageId = "";
      this.customerFeedbackDataForm.JobId = "";
      this.customerFeedbackDataForm.JobTypeId = "";
      this.customerFeedbackDataForm.FeedbackPriority = "";
      this.customerFeedbackDataForm.FeedbackStatus = "";
      this.customerFeedbackDataForm.FeedbackType = "";
      this.customerFeedbackDataForm.Feedback = "";
      form.submitted = false;
    },
      error => {

        this._messageService.sendErrorMessageObject(error);

      })

  }


}
