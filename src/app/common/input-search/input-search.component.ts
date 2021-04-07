import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, map } from "rxjs/operators";
import { fromEvent, of, Subscription } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';
import { CommunicationService } from 'src/app/services/communication/communication.service';


@Component({
  selector: 'input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchText', { static: true }) searchText: ElementRef;
  @Input() get config(): any {
    return this._config
  };

  set config(value: any) {
    this._config = value;
    this.displayImage = value.displayImage ? value.displayImage : false;
    this.viewZatchupId = value.viewZatchupId ? value.viewZatchupId : false;
    this.viewIconCondition = value.viewIconCondition;
    this.resultsLength = value.resultsLength ? value.resultsLength : undefined;
    this.seeMoreResults = value.seeMoreResults == false ? value.seeMoreResults : true
  }
  @Input() value: any;
  @Output() searchResult = new EventEmitter<any>();
  subscription: Subscription
  apiResponse: any;
  isSearching: boolean;
  _config: any;
  displayImage: boolean;
  search: any;
  viewZatchupId: boolean;
  viewIconCondition: any;
  seeMoreResults: boolean = true;
  resultsLength: any;

  constructor(
    private router: Router,
    private baseService: BaseService,
    private communicationService: CommunicationService
  ) {
    this.isSearching = false;
    this.apiResponse = [];

    this.subscription = this.communicationService.getFieldValue().subscribe(value => {
      if (!value) {
        this.value = '';
      } else {
        this.value = value
      }
    });
  }

  ngOnInit(): void {
    const example = fromEvent(this.searchText.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      })
      // Time in milliseconds between key events
      , debounceTime(1000)
    )
    const subscribe = example.subscribe(text => {
      // if character length greater then 2
      this.search = text;
      if (this.search.length > 2) {
        this.isSearching = true;
        this.searchGetCall(this.search).subscribe((res: any) => {
          this.isSearching = false;
          if (this._config.display) {
            res.results = this.setData(res.results)
            this.apiResponse = res
          }
          else
            this.apiResponse = res;
          if (!this.resultsLength) {
            this.resultsLength = this.apiResponse.count;
          }
        }, (err) => {
          this.isSearching = false;
        });
      }
      // if character length less then 2
      else {
        this.isSearching = false;
        this.apiResponse = []
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.baseService.getData(this._config.api_endpoint, { 'search': term })
  }

  selectData(data: any) {
    if (this._config.display_value)
      this.value = data[this._config.display_value]
    else
      this.value = data.display
    this.searchResult.emit(data)
    this.apiResponse = []
  }

  setData(res: any) {
    res.forEach(res => {
      let display = ''
      for (let i = 0; i < this._config.display.length; i++) {
        display = display + res[this._config.display[i]] + ' '
      }
      res['display'] = display;
    })
    return res;
  }

  moreResults() {
    if (this._config.route)
      this.router.navigate([this._config.route], { queryParams: { 'searchText': this.search } })
  }
}
