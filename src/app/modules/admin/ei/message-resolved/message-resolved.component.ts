import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  ticketId: string;
  dateOfMessage: string;
  message: string;
  resolutionDate: string;
  resolveComment: string;
  attachment: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, 'ticketId': 'TICKET 2020', 'dateOfMessage' : '01 June, 2020', 'message':'',
  'resolutionDate': '01 june, 2020', 'resolveComment': ' ', 'attachment': ' '}
];

@Component({
  selector: 'app-message-resolved',
  templateUrl: './message-resolved.component.html',
  styleUrls: ['./message-resolved.component.css']
})
export class MessageResolvedComponent implements OnInit {

  displayedColumns: string[] = ['position', 'ticketId', 'dateOfMessage', 'message',
   'resolutionDate','resolveComment', 'attachment'];   

  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
