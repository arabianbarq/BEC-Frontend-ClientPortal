import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
providedIn: 'root'
})
export class MessageService {

constructor(private toastr: ToastrService) { }
sendLoginSuccessMessageObject(message) {
return {
class: "alert alert-success center",
message: message
};

}
sendLoginErrorMessageObject(message) {
return {
class: "alert alert-danger",
message: message
};

}
}