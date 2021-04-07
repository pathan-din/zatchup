import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherAuidence } from '../../registration/modal/contact-us.mdal';
@Component({
  selector: 'app-ei-starclass-audience-teacher',
  templateUrl: './ei-starclass-audience-teacher.component.html',
  styleUrls: ['./ei-starclass-audience-teacher.component.css']
})
export class EiStarclassAudienceTeacherComponent implements OnInit {
  teacherAudience : TeacherAuidence;
  cartData : any ;
  studentId: Array<string> = [];
  approved: any;
  teacherAudienceList: any = [];
  error: any = [];
  model: any;
  constructor(
    private router: Router,
    private location: Location,
    private alert: NotificationService,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private route : ActivatedRoute
  ) {
    this.teacherAudience = new TeacherAuidence()
   }

  ngOnInit(): void {
    this.getTeacherAuidenceList()
  }

  getTeacherAuidenceList(page? : any){
    try {
      this.loader.show()
      this.teacherAudience.params = {
        'page' :page,
        'page_size':this.teacherAudience.page_size,
        'approved': this.route.snapshot.queryParamMap.get('approved'),
        'course_id': this.route.snapshot.queryParamMap.get('course_id')
        // 'id': this.route.snapshot.params.id
      }
      this.baseService.getData('ei/subadmin-lists-by-ei-for-starclass/', this.teacherAudience.params).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.teacherAudience.config.currentPage
            this.teacherAudience.startIndex = res.page_size * (page- 1) + 1;
            this.teacherAudience.page_size = res.page_size
            this.teacherAudience.config.itemsPerPage = this.teacherAudience.page_size
            this.teacherAudience.config.currentPage = page
            this.teacherAudience.config.totalItems = res.count
            if(res.count > 0) {
              this.teacherAudience.dataSource = res.results;
              this.teacherAudience.pageCounts = this.baseService.getCountsOfPage()
              this.setData()
            }
            else {
              this.teacherAudience.dataSource = undefined
              this.teacherAudience.pageCounts = undefined
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

  setData() {
    let filtered = this.teacherAudience.dataSource.filter(elen => {
      if (this.isValid(elen) == true)
        return elen.user_id
    })
    filtered.forEach(elem =>{
      this.teacherAudienceList.push(elem.user_id)
    })
  }

  isValid(value) {
    return value.is_access_for_star_class == true
  }
  
  getTeacherAudienceBycheckbox(stId, event) {
  
    if (event.checked) {
      if (this.teacherAudienceList.indexOf(stId) === -1) {
        this.teacherAudienceList.push(stId)
      }
    } else {
      if (this.teacherAudienceList.indexOf(stId) === -1) {
  
      } else {
        var index = this.teacherAudienceList.indexOf(stId)
        this.teacherAudienceList.splice(index, 1);
      }
    }
  }
  
  addTeacherAudience() {
   // debugger
    if ( this.teacherAudienceList.length == 0) {
      this.alert.error(this.error , 'Please select Audience from the list ')
      // alert("Please select student list of particular class.")
      
    } else {
      
        this.loader.show();
        this.baseService.action('starclass/ei-course-assign-to-user/', { 'student_id': this.teacherAudienceList.join(','), 'course_id': this.route.snapshot.queryParamMap.get('course_id') }).subscribe(
          (res: any) => {
            if(res.status == true){
            this.loader.hide();
            this.alert.success(res.message, 'Success');
            this.location.back()
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
          }, (error) => {
            this.loader.hide();
            this.alert.error(error, 'Error')
          });
       
    }
  }

  goBack(){
    this.location.back()
  }
  
}
