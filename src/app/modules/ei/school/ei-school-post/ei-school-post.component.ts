import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  Name: string;
  'position': number;
  'Profile_Picture': string;
  'Title_of_The_Post': string;
  Image: string;
  Caption: string;
  Views: number;
  'Ability_to_Like': string;
  'Number_of_Likes': number;
  'Number_of_Comments': number;
  Action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {'position': 1, Name: 'Lauren Molive', 'Profile_Picture': 'assets/images/userWebsite/loreal.jpg', 'Title_of_The_Post': 'Post Title',
  Image: 'assets/images/userWebsite/loreal.jpg', 
  Caption: 'Captions 1', Views: 250, 'Ability_to_Like': '','Number_of_Likes': 5100, 'Number_of_Comments':370,Action:""}
  
];
@Component({
  selector: 'app-ei-school-post',
  templateUrl: './ei-school-post.component.html',
  styleUrls: ['./ei-school-post.component.css']
})
export class EiSchoolPostComponent implements OnInit {
  displayedColumns: string[] = ['position', 'Name', 'Profile_Picture', 'Title_of_The_Post','Image','Caption',
  'Views',
'Ability_to_Like','Number_of_Likes','Number_of_Comments','Action'];
  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}

