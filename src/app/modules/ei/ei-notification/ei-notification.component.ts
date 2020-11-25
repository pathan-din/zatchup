import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface NotificationElement {
  'SNo': number;
  NotificationMessage : string;
  Time : string;
}

const ELEMENT_DATA: NotificationElement[] = [
  {
    'SNo': 1, 
    NotificationMessage: 'vero eos accusomus iusto odio dignissimos ducimusgui lalondigis proesentium voluptatum deleniti otgue cam,. guos dolores guos molestiosexceptud sint occoecuti cupid.. non provident.' , 
    Time: '10 min ago '

}
  
];

@Component({
  selector: 'app-ei-notification',
  templateUrl: './ei-notification.component.html',
  styleUrls: ['./ei-notification.component.css']
})
export class EiNotificationComponent implements OnInit {
  displayedColumns: string[] = ['SNo', 'NotificationMessage', 'Time'];

  dataSource = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
