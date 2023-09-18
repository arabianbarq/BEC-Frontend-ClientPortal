import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { MessageService } from '../../services/message.service'
import { ForgotpasswordModel } from 'src/app/core/models/forgot-password';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loading: boolean = false;
  messageObject: any;

  showEmailForm: boolean = true;
  showCodeForm: boolean = false;
  showChangePasswordForm: boolean = false;
  successPage: boolean = false;

  forgotPasswordModel: ForgotpasswordModel = {
    email: null,
    resetToken: null,
    password: null,
    cpassword: null
  };

  constructor(private homeservice: HomeService, private messageService: MessageService) { }

  ngOnInit() {
  }
  sendForgotPasswordEmail() {
    this.loading = true;
    this.homeservice.sendForgotPasswordEmail(this.forgotPasswordModel).subscribe(response => {
      // this.showMessage(response.Message, 'success');
      this.showEmailForm = false;
      this.showCodeForm = true;
      this.loading = false;
    }, error => {
      console.log(error);
      this.showMessage(error, 'error');
      this.loading = false;


    })
  }
  verifyCode() {
    this.loading = true;
    this.homeservice.verifyConfirmationCode(this.forgotPasswordModel).subscribe(response => {
      this.showMessage(response.Message, 'success');
      this.showChangePasswordForm = true;
      this.showCodeForm = false;
      this.showEmailForm = false;
      this.loading = false;


    }, error => {
      console.log(error);
      this.showMessage(error, 'error');
      this.loading = false;


    })
  }
  resetPassword() {
    
    this.loading = true;
    this.successPage = true;
    this.homeservice.resetPassword(this.forgotPasswordModel).subscribe(response => {
      this.showMessage(response.Message, 'success');
      this.showChangePasswordForm = false;
      this.showCodeForm = false;
      this.showEmailForm = false;
      this.loading = false;
    }, error => {
      console.log(error);
      this.showMessage(error, 'error');
      this.loading = false;
    })
  }

  showMessage(message, type) {
    if (type == 'error') {
      this.messageObject = this.messageService.sendLoginErrorMessageObject(message);
    } else {
      this.messageObject = this.messageService.sendLoginSuccessMessageObject(message);
    }

    // setTimeout(() => {
    //   this.messageObject = null;
    // }, 4000)
  }


}
