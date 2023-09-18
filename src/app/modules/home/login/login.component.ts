import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from '../../services/home.service';
import { ValidatorService } from '../../../core/services/validator.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  LoginForm: FormGroup;
  returnUrl: string;
  messageObject: any;
  credentials: any;
  rememberMe: boolean = false;
  loading: boolean = false;
  formErrors = {
    Email: "",
    Password: ""
  }
  validationMessage = {
    Email: {
      required: "Email is required",
      email: "Email is not valid"
    },
    Password: {
      required: "Password is required",
      minlength: "Password must be atleast 8 characters"
    }
  }

  LogValidationError(): void {
    this._validatorService.LogValidationService(
      this.LoginForm,
      this.formErrors,
      this.validationMessage
    );
  }

  constructor(private _fb: FormBuilder, private _validatorService: ValidatorService,
    private _homeService: HomeService, private _localStorageService: LocalStorageService, private _route: Router
    , private _messageService: MessageService
    , private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    let credentials: any = this._localStorageService.getUserCredentials();
    // this.rememberMe = true;`` 
    this.LoginForm = this._fb.group({
      Email: [credentials.UserName, [Validators.required, Validators.email]],
      Password: [credentials.Password, [Validators.required, Validators.minLength(8)]],

    });
    this.returnUrl = "/customer/dashboard";
  }
  onSubmit() {
    
    if (this.LoginForm.valid) {
     this.isLoading = true;
      this._homeService.login(this.LoginForm.value).subscribe( 
        response => {
          this._localStorageService.storeAuthToken(response.data.clientResponse.token);
          this._localStorageService.storeUserDetail(response.data.clientResponse);
          this.isLoading = false;
          this._route.navigateByUrl(this.returnUrl);
        },
        error => {
           this.messageObject = this._messageService.sendLoginErrorMessageObject(String(error));  
          this.isLoading = false;
          if (error == "Unknown Error") {
            this.messageObject = this._messageService.sendLoginErrorMessageObject("Something went wrong");
          }
          else {
            this.messageObject = this._messageService.sendLoginErrorMessageObject(String(error));
          }

        })
     }
    else {

      this._validatorService.markAsTouched(this.LoginForm);
      this._validatorService.LogValidationService(this.LoginForm, this.formErrors, this.validationMessage);
    }
    if (this.rememberMe) {
      
      this.credentials = {
        "UserName": this.LoginForm.value.Email,
        "Password": this.LoginForm.value.Password
      }
    } else {
      this.credentials = {
        "UserName": "",
        "Password": ""
      }
    }
    this._localStorageService.storeUserCredentials(this.credentials);
  }
}
