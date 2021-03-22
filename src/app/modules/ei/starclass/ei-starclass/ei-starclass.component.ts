import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DashBoardData } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-ei-starclass',
  templateUrl: './ei-starclass.component.html',
  styleUrls: ['./ei-starclass.component.css']
})
export class EiStarclassComponent implements OnInit {
   dashBoardData : DashBoardData
  constructor(
    private router: Router,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private route: ActivatedRoute,
  ) { 
    this.dashBoardData = new DashBoardData()
  }

  ngOnInit(): void {
    this.dashBoardData.id = this.route.snapshot.queryParamMap.get('id')
    this.getDashBoardData()
  }

  getDashBoardData(page? : any){
    try {
      this.loader.show()
      // this.dashBoardData.model ={
      //   'page' : page,
      //   'page_size': this.dashBoardData.page_size
      // }
      this.baseService.getData('starclass/star-class-course-admin-list/').subscribe(
        (res: any)=>{
          if(res.status == true){
           this.dashBoardData.model = res.results
           
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ),
      err => {
        this.loader.hide()
        this.alert.error(err, 'Error')
      }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }
  goToCoursePreview(data){
    this.router.navigate(['ei/star-class-courses-preview', data.id])
  }

  goToMyCourse(){
    this.router.navigate(['ei/ei-starclass-mycourses'])
  }

  goToYourOrder(){
    this.router.navigate(['ei/ei-starclass-your-order'])
  }

  goToMyCart(){
    this.router.navigate(['ei/star-class-cart'])
  }

  goToUploadLecture(){
    this.router.navigate(['ei/star-class-lecture-upload'])
  }
  goToPendingRequest(){
    this.router.navigate(['ei/starclass-requests-pending'])
  }
}
