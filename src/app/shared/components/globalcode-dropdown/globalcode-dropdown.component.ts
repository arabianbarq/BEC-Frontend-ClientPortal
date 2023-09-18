import { Component, OnInit , Input, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalcodeService } from '../../../core/services/globalcode.service';


@Component({
  selector: 'globalcode-dropdown',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlobalcodeDropdownComponent),
      multi: true
    }
  ],
  template: `
      <select [name]="name" [(ngModel)]="value" [attr.placeholder]="placeholder" [class]="className">
          <option value="">Please Select</option>
          <option *ngFor="let globalCode of globalCodes"  [value]="globalCode.GlobalCodeId"> 
            {{globalCode.CodeName}}
          </option>
      </select>
  `
})
export class GlobalcodeDropdownComponent implements OnInit {

  constructor(private _globalcodeService: GlobalcodeService) { }
  globalCodes:any
  @Input()
  name: string;

  @Input('value')
  val: string;

  @Input()
  className: string;

  @Input()
  placeholder: string;
  

  private _categoryName: string;

  @Input() set categoryName(value: string) {
      this._categoryName = value;
      this.getGlobalCodes();

  }

  get categoryName(): string {

      return this._categoryName;

  }

  
  onChange: any = () => { };
  onTouched: any = () => { 

  };

  ngOnInit() {
    this.getGlobalCodes();
  }

  getGlobalCodes(): any {
    this._globalcodeService.getGlobalCodeDetails({ CategoryName: this.categoryName, OrderBy:"CodeName",AllRecords:true,OrderByDescending:false}).subscribe(response => {
      this.globalCodes = response.data.globalCodeMainResponse.globalCodeResponse;
    })
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn) {
   
    this.onChange = fn;
  }

  registerOnTouched(fn) { 
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

}
