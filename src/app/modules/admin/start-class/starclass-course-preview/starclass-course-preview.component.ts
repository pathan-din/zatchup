import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LectureList, StarclassCourseDetails } from '../../ei/modals/education-institute.modal';

export interface PeriodicElement {
  position: number;
    lectureTitle: string;
    topicsCoverd: string;
    durationOfLecture: string;
    viewDetails: string;
    play: number;
  }
  
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {'position': 1,'lectureTitle':'Information Technology', 'topicsCoverd': 'Cover',
    'viewDetails': '', 'durationOfLecture': '2 Hours', 'play': 50} 
  ];

@Component({
  selector: 'app-starclass-course-preview',
  templateUrl: './starclass-course-preview.component.html',
  styleUrls: ['./starclass-course-preview.component.css']
})

export class StarclassCoursePreviewComponent implements OnInit {
  starclassCourseDetails : StarclassCourseDetails
  params: any;
  displayedColumns: string[] = ['position','lectureTitle', 'topicsCoverd',
  'durationOfLecture','play','viewDetails'];   
 lectureList : LectureList
  dataSource :any;
  dataUrl: any;
  id: any;

  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private router: Router,
  ) { 
    this.starclassCourseDetails = new StarclassCourseDetails();
    this.lectureList = new LectureList()
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
      this.getCourseDetails()
      this.getLectureList()
    });
    this.id = this.activeRoute.snapshot.queryParamMap.get('id')
  }


  goToLectureView(){
    this.router.navigate(['admin/lecture-details'])
  }

  goToUploadLecture(data){
    this.router.navigate(['admin/lecture-upload', data.id])
  }

  getCourseDetails(){
    try {
      this.loader.show()
      let params = {
        "id": this.activeRoute.snapshot.params.id
      }
      this.baseService.getData('starclass/course_preview/' , params).subscribe(
        (res:any) => {
          if(res.status == true){
            this.starclassCourseDetails.courseDetails = res.results
          }
          else{
            this.alert.error(res.error.message, 'Error')
          } this.loader.hide()
        }, err =>{
          this.alert.error(err, 'Error')
          this.loader.hide()
        } )
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  getLectureList(page? : any){
    try {
      this.loader.show()
      this.lectureList.model = {
        'course_id': this.activeRoute.snapshot.params.id,
        'page': page,
        'page_size': this.lectureList.page_size,
      }
      this.baseService.getData('starclass/get-lecture-list/' ,  this.lectureList.model).subscribe(
        (res:any) => {
          if(res.status == true){
            if(!page)
            page = this.lectureList.config.currentPage
            this.lectureList.startIndex = res.page_size * (page - 1) + 1;
            this.lectureList.page_size = res.page_size
            this.lectureList.config.itemsPerPage = this.lectureList.page_size
            this.lectureList.config.currentPage = page
            this.lectureList.config.totalItems = res.count;
            if(res.count >0){
              this.lectureList.dataSource = res.results;
              this.lectureList.pageCounts = this.baseService.getCountsOfPage()
            }
            else{
              this.lectureList.dataSource = undefined
              this.lectureList.pageCounts = undefined
            }
          }
          else{
            this.alert.error(res.error.message, 'Error')
          } this.loader.hide()
        }, err =>{
          this.alert.error(err, 'Error')
          this.loader.hide()
        } )
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

 
  goBack(){
    this.location.back()
  }

//   $scope.video = function(e) {
//     var videoElements = angular.element(e.srcElement);
//     videoElements[0].pause();
// }
}
