import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { StudentAuidence } from '../../registration/modal/contact-us.mdal';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface editRightTeacheristElement {

  'position': number;
  profilePic : string;
  nameOfStudent : string;
  relationship : string;
  classDetails: string;
  class : string;
  rollNo: number;

}

// const ELEMENT_DATA: editRightTeacheristElement[] = [
//   {
//     'position': 1, 
//     profilePic : 'assets/images/userWebsite/share-my-profile-icon.png',  
//     nameOfStudent: 'Wilma Mumuduya' ,
//     relationship: 'Student',  
//     classDetails: 'EMPLOYEE8543',
//     class : 'A',
//   rollNo: 53541,
// }
// ];

@Component({
  selector: 'app-ei-starclass-audience-student-list',
  templateUrl: './ei-starclass-audience-student-list.component.html',
  styleUrls: ['./ei-starclass-audience-student-list.component.css']
})
export class EiStarclassAudienceStudentListComponent implements OnInit {
  studentAuidence : StudentAuidence
  cartData : any = {};
  selection = new SelectionModel<editRightTeacheristElement>(true, []);
  constructor(
    private router: Router,
    private location: Location,
    private alert: NotificationService,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private route : ActivatedRoute
    ) { 
      this.studentAuidence = new StudentAuidence()
    }

  ngOnInit(): void {
    this.getStudentAuidenceList()
  }
/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.studentAuidence.dataSource.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.studentAuidence.dataSource.forEach(element => this.selection.select(element));
}

getCartData(data:any){
  this.cartData = {}
  this.cartData = data.user_id
  console.log('cartdata', this.cartData);
}

getStudentAuidenceList(page? : any){
  try {
    this.loader.show()
    this.studentAuidence.params = {
      'page' :page,
      'page_size':this.studentAuidence.page_size,
      // 'id': this.route.snapshot.params.id
    }
    this.baseService.getData('ei/student-list/', this.studentAuidence.params).subscribe(
      (res: any) =>{
        if(res.status == true){
          if (!page)
          page = this.studentAuidence.config.currentPage
          this.studentAuidence.startIndex = res.page_size * (page- 1) + 1;
          this.studentAuidence.page_size = res.page_size
          this.studentAuidence.config.itemsPerPage = this.studentAuidence.page_size
          this.studentAuidence.config.currentPage = page
          this.studentAuidence.config.totalItems = res.count
          if(res.count > 0) {
            this.studentAuidence.dataSource = res.results;
            this.studentAuidence.pageCounts = this.baseService.getCountsOfPage()
          }
          else {
            this.studentAuidence.dataSource = undefined
            this.studentAuidence.pageCounts = undefined
          }
        }
        else{
          this.alert.error(res.error.message, 'Error')
        }
        this.loader.hide()
      }
    ), 
    err => {
      console.log(err);
    }
  } catch (error) {
    this.alert.error(error.error, 'Error')
    this.loader.hide()
  }
}


}
