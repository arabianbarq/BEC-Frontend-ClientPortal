import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter
  } from "@angular/core";
  
  
  @Component({
    selector: "sa-custom-datatable",
    template: `
        <table class="table responsive {{tableClass}}">
          <thead>
              <tr>
                  <th [ngClass]="column.ColumnName == 'Delete' ? '' : 'sortable'" *ngFor="let column of columnsList" (click)="column.AllowSorting && changeSorting(column.ColumnName)">
                  <span class="sortable" [ngClass]="sortingObject.OrderBy==column.ColumnName?sortingObject.ClassName:''" *ngIf="column.AllowSorting">{{column.DisplayName}}</span>
                    <span *ngIf="!column.AllowSorting">{{column.DisplayName}}</span>
                  </th>
              </tr>
          </thead>
            <ng-content *ngIf="!showLoading && dataList.length > 0"></ng-content>
            <tr *ngIf="showLoading || (!dataList || dataList.length == 0)">
                <td [attr.colspan]="columnsList.length" *ngIf="!showLoading && dataList.length == 0" class="text-center">No data found.</td>
                <td [attr.colspan]="columnsList.length" *ngIf="showLoading" class="text-center">Please Wait While Data is Loading...</td>
            </tr>
        </table>
        <div class="dt-toolbar-footer" *ngIf="!showLoading && paginationObject.TotalItems > paginationObject.Limit">
          <div class="col-sm-6 col-xs-12 hidden-xs">
              <div class="dataTables_info" id="DataTables_Table_1_info" role="status" aria-live="polite">
                <span class="page-number-info"><strong>Page : </strong> {{paginationObject.Page}}/{{paginationObject.TotalPage}}</span>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6">
              <div class="dataTables_paginate paging_simple_numbers">
              <pagination [(ngModel)]="paginationObject.Page" [boundaryLinks]="true" [totalItems]="paginationObject.TotalItems" [maxSize]="paginationObject.MaxSize" [itemsPerPage]="paginationObject.Limit"
                          previousText="&lsaquo;" nextText="&rsaquo;" firstText="&laquo;" lastText="&raquo;" (pageChanged)="pageChanged($event)">
              </pagination>
              </div>
          </div>
        </div>
  `,
  styleUrls: ['./custom-table.component.scss']
  })
  export class CustomTableComponent implements OnInit {
    showLoading: boolean = true;
    loading: boolean = false;

    dataList: any = [];
  
    paginationOptions: number[]= [10, 25, 50, 10];
  
    // searchObject: ISearching = {
    //   Search: null
    // };
  
    paginationObject: IPagination = {
      Page: 1,
      Limit: 10,
      MaxSize: 5,
      TotalPage: 0,
      TotalItems: 0
    };
  
    sortingObject: ISorting = {
      OrderBy: "",
      OrderByDescending: false,
      ClassName: "sort_asc"
    };
  
    @Input() public tableClass: string;
    //@Input() public data: string;
  
    @Input() public columnsList: any = [];
    @Input() public paginationLength: number;
    @Input() public orderBy: string = "";
    @Input() public orderByDescending: boolean = false;
    @Output() changeTable: EventEmitter<any> = new EventEmitter();
  
    constructor() {}
  
    ngOnInit() {
      
      this.sortingObject.OrderBy = this.orderBy && this.orderBy != ''? this.orderBy: 'CreatedOn';
      this.sortingObject.OrderByDescending = this.orderByDescending && this.orderByDescending != true? true: false;
      this.sortingObject.ClassName = this.sortingObject.OrderByDescending? 'sort_desc': 'sort_asc';
      this.paginationObject.Limit = this.paginationLength > 0 && this.paginationOptions.indexOf(this.paginationLength) !== 1 ? this.paginationLength: 10;
  
      this.filterTable();
    }
  
    // ngOnChanges(changes) {
    
    //   this.showLoading = false;
    //   const data = JSON.parse(changes.data.currentValue);
    //   this.dataList = data.dataList;
    //   this.paginationObject.TotalItems = data.totalRecords;
    //   this.paginationObject.TotalPage = Math.ceil(data.totalRecords / this.paginationObject.Limit);
    // }
  
    changeSorting(column) {
      
      this.loading = true;
      var sort = this.sortingObject;
      if (sort.OrderBy == column) {
        sort.OrderByDescending = !sort.OrderByDescending;
        this.loading = false;
      } else {
        sort.OrderBy = column;
        sort.OrderByDescending = false;
      }
      sort.ClassName = sort.OrderByDescending ? "sort_desc" : "sort_asc";
  
      this.sortingObject = sort;
  
      this.filterTable();
    }
  
    pageChanged(event) {
      this.paginationObject.Page = event.page;
      this.filterTable();
    }
  
    public filterTable() {
      
      let requesetPayload = {
      
        Page: this.paginationObject.Page,
        Limit: Number(this.paginationObject.Limit),
        OrderBy: this.sortingObject.OrderBy,
        OrderByDescending: this.sortingObject.OrderByDescending,
        //Search: this.searchObject.Search
      };
      this.changeTable.emit(requesetPayload);
    }
  
    public bindTable(dataList, totalRecords) {
      this.showLoading = false;
  
      this.dataList = dataList;
      this.paginationObject.TotalItems = totalRecords;
      this.paginationObject.TotalPage = Math.ceil(totalRecords / this.paginationObject.Limit);
    }
  }
  
  
  interface IPagination {
    Page: number;
    Limit: number;
    MaxSize: number;
    TotalItems: number;
    TotalPage: number;
  }
  
  interface ISorting {
    OrderBy: string;
    OrderByDescending: boolean;
    ClassName: string;
  }
  
  // interface ISearching {
  //   Search: string;
  // }