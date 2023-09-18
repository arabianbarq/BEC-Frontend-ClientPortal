import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';
import { BaseUrl } from '../../../../config/urls.config';

@Component({
  selector: 'app-customer-sidebar',
  templateUrl: './customer-sidebar.component.html',
  styleUrls: ['./customer-sidebar.component.scss']
})
export class CustomerSidebarComponent implements OnInit {
  api = BaseUrl.apiUrl;
  UserName:string;
  profilePhoto:string;

  constructor(private _localStorageService: LocalStorageService, private _router: Router) { }

  ngOnInit() {
    const data = this._localStorageService.getUserDetail();
  
    this.profilePhoto = this.api + data.ClientProfilePhoto;

    this.UserName = this._localStorageService.getUserDetail().Name;
  }
  logout() {
    this._localStorageService.logout();
    this._router.navigateByUrl('/login');
  }

}
