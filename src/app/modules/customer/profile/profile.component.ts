import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel, NgForm } from "@angular/forms";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from 'src/app/core/services/message.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ProfileService } from '../../../core/services/profile.service';
import { ValidatorService } from '../../../core/services/validator.service';
import { DatePipe } from '@angular/common';
import { BaseUrl } from '../../../config/urls.config';
import { SuccessMessages } from 'src/app/config/message.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  api = BaseUrl.apiUrl;
  ProfileForm: FormGroup;
  profilePhoto: String;
  uploadedPhoto: any = {
    type: null,
    clientProfilePhoto: null
  };
  UserName: string;

  returnUrl: string;

  formErrors = {
    Name: "",
    Email: "",
    Phone: ""
  }

  changePasswordForm: any = {
    oldPassword: null,
    newPassword: null,
    confirmPassword: null
  };

  changePasswordValidationMessage = {
    oldPassword: {
      required: "Old Password is required"
    },
    newPassword: {
      required: "New Password is required",
      minlength: "Password must be atleast 8 characters"
    },
    confirmPassword: {
      required: "Confirm password is required",
      notEqual: "Password and Confirm Password are not same"
    }
  }

  pwddata = {
    "oldPassword": String,
    "newPassword": String
  }

  validationMessage = {
    Name: {
      required: "Name is required",
    },
    Email: {
      required: "Email is required",
      email: "Email is not valid"
    },
    Phone: {
      required: "phone number is required",
      pattern: "Phone Number must be 10 digits."
    }
  }
  phoneMaxLength: number = 10;
  LogValidationError(): void {
    this._validatorService.LogValidationService(
      this.ProfileForm,
      this.formErrors,
      this.validationMessage
    );
  }
  letterOnly(event: any): Boolean {
    return this._validatorService.letterOnly(event);
  }
  constructor(public datepipe: DatePipe, private _fb: FormBuilder,
    private _localStorageService: LocalStorageService
    , private _activatedRoute: ActivatedRoute, private _messageService: MessageService,
    private _profileService: ProfileService, private _validatorService: ValidatorService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue', dateInputFormat: 'MM/DD/YYYY' });
  }

  ngOnInit() {
    
    this.UserName = this._localStorageService.getUserDetail().Name;
    const data = this._localStorageService.getUserDetail();
    this.profilePhoto = this.api + data.ClientProfilePhoto;
    this.ProfileForm = this._fb.group({
      Name: [data.Name, [Validators.required,Validators, this._validatorService.noWhitespaceValidator]],
      State: [data.State],
      Phone: [data.PhoneNumber, [Validators.required, Validators.maxLength(this.phoneMaxLength),Validators.pattern('^[0-9]{' + 10 + '}$')]],
      Email: [data.Email, [Validators.required, Validators.email]],
      Address: [data.Address],
      ClientId: [data.ClientId]
    });

    this.returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/customer/dashboard";
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.NewPassword.value;
    let confirmPass = group.controls.ConfirmPassword.value;

    return pass === confirmPass ? null : { notMatched: true }
  }
  onSubmit() {
    const password = JSON.parse(localStorage.getItem("UserCredentials")).Password;
    //console.log("password >>", password.Password);

    if (this.ProfileForm.valid) {
      this._profileService.updateProfile({
        Name: this.ProfileForm.get('Name').value.trim(''),
        state: this.ProfileForm.get('State').value,
        email: this.ProfileForm.get('Email').value,
        phoneNumber: this.ProfileForm.get('Phone').value,
        clientId: this.ProfileForm.get('ClientId').value,
        address: this.ProfileForm.get('Address').value,
        password: password,
        IsActive: true
      }
      ).subscribe(
        response => {
          this.UserName = response.data.clientResponse.Name
          var getDetailsFromLocalStorage = JSON.parse(localStorage.getItem(this._localStorageService.LOCALSTORAGE_USER_DETAIL_KEY));
          getDetailsFromLocalStorage.Name = response.data.clientResponse.Name;
          getDetailsFromLocalStorage.State = response.data.clientResponse.State;
          getDetailsFromLocalStorage.PhoneNumber = response.data.clientResponse.PhoneNumber;
          getDetailsFromLocalStorage.Address = response.data.clientResponse.Address;
          this._localStorageService.storeUserDetail(getDetailsFromLocalStorage);
          this._messageService.sendSuccessMessageObject(SuccessMessages.ProfileUpdated);
        },
        error => {
          this._messageService.sendErrorMessageObject(error);
        })
    }
    else {
      this._validatorService.markAsTouched(this.ProfileForm);
      this._validatorService.LogValidationService(this.ProfileForm, this.formErrors, this.validationMessage);
    }
  }
  changePassword(form: NgForm) {
    this._profileService.changePassword(this.changePasswordForm).subscribe(
      response => {
        this._localStorageService.storeAuthToken(response.data.clientResponse.token);
        this._messageService.sendSuccessMessageObject(SuccessMessages.ResetPassword);
        form.resetForm();
      },
      error => {
        this._messageService.sendErrorMessageObject(error);
      }
    )
  }

  imgUpload($event) {
    var reader = new FileReader();
    const file = $event.target.files[0];
    reader.readAsDataURL(file);

    this.uploadedPhoto.type = file.type.split('/')[1];
    var _self = this;
    reader.onload = function () {
      _self.uploadedPhoto.clientProfilePhoto = String(reader.result).split(',')[1];
    };
  }
  restrictEKey(event: any, name: string) {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 13) {
      if (name == 'phoneNumber') {
        this.onSubmit()
      }
    }
    return this._validatorService.restrictE(event, name);
  }


  uploadProfilePhoto() {

    this._profileService.uploadProfilePhoto(this.uploadedPhoto).subscribe(
      response => {
        this._messageService.sendSuccessMessageObject(response.Message);
        this._localStorageService.storeUserDetail(response.data.clientResponse);
        this.profilePhoto = this.api + response.data.clientResponse.ClientProfilePhoto;
      },
      error => {
        this._messageService.sendErrorMessageObject(error);
      }
    )
  }

}
