import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StarclassCourseDetails } from '../../ei/modals/education-institute.modal';

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
  displayedColumns: string[] = ['position','lectureTitle', 'topicsCoverd','viewDetails',
  'durationOfLecture','play'];   

  dataSource = ELEMENT_DATA;
  dataUrl: any;

  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) { 
    this.starclassCourseDetails = new StarclassCourseDetails()
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
      this.getCourseDetails()
    });
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
  goBack(){
    this.location.back()
  }

//   $scope.video = function(e) {
//     var videoElements = angular.element(e.srcElement);
//     videoElements[0].pause();
// }
}
