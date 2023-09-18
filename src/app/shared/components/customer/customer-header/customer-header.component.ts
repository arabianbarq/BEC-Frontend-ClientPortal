import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';
import { BaseUrl } from '../../../../config/urls.config';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent implements OnInit {
  public show_menu: boolean = false;
  api = BaseUrl.apiUrl;
  UserName: string;
  profilePhoto: String;

  constructor(private _localStorageService: LocalStorageService, private _router: Router, private elementRef: ElementRef) { }

  ngOnInit() {
    const data = this._localStorageService.getUserDetail();
    this.profilePhoto = this.api + data.ClientProfilePhoto;
    this.UserName = this._localStorageService.getUserDetail().Name;
  }
  logout() {
    this._localStorageService.logout();
    this._router.navigateByUrl('/login');
  }
  showdropdownmenu() {
    if (this.show_menu)
      this.show_menu = false
    else
      this.show_menu = true
  }
  hidedropdownmenu() {
    this.show_menu = false;
    this._router.navigateByUrl('/customer/profile');
  }
  @HostListener('document:mousedown', ['$event'])
  onOutsideClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // clicked outside => close dropdown list
      this.show_menu = false
    }
  }

}
