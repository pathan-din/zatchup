import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, map, distinctUntilChanged, filter } from "rxjs/operators";
import { fromEvent, of } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
  @ViewChild('searchText', { static: true }) searchText: ElementRef;
  @Input() config: any;
  @Input() value: any;
  @Output() searchResult = new EventEmitter<any>();
  apiResponse: any;
  isSearching: boolean;

  constructor(
    private baseService: BaseService
  ) {
    this.isSearching = false;
    this.apiResponse = [];
  }

  ngOnInit(): void {
    fromEvent(this.searchText.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is diffent from current   
      // , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {

      this.isSearching = true;

      this.searchGetCall(text).subscribe((res: any) => {
        this.isSearching = false;
        if (this.config.display) {
          res.results = this.setData(res.results)
          this.apiResponse = res
        }
        else
          this.apiResponse = res;
      }, (err) => {
        this.isSearching = false;
        console.log('error', err);
      });

    });
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.baseService.getData(this.config.api_endpoint, { 'search': term })
  }

  selectData(data: any) {
    if (this.config.display_value)
      this.value = data[this.config.display_value]
    else
      this.value = data.display
    this.searchResult.emit(data)
    this.apiResponse = []
  }

  setData(res: any) {
    res.forEach(res => {
      let display = ''
      for (let i = 0; i < this.config.display.length; i++) {
        display = display + res[this.config.display[i]] + ' '
        // console.log('val is as ::',res[this.view[i]])
      }
      res['display'] = display;
      console.log('set data res is as ....',res)
    })
    return res;
  }

}
