import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditTeacherAuidence } from '../../registration/modal/contact-us.mdal';


@Component({
  selector: 'app-ei-starclass-edit-right-teacher',
  templateUrl: './ei-starclass-edit-right-teacher.component.html',
  styleUrls: ['./ei-starclass-edit-right-teacher.component.css']
})
export class EiStarclassEditRightTeacherComponent implements OnInit {
  editTeacherAudience: EditTeacherAuidence;
  cartData: any;
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
    private route: ActivatedRoute
  ) {
    this.editTeacherAudience = new EditTeacherAuidence()
  }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem("teachers")));
    var add = this.route.snapshot.queryParamMap.get('add')
    if(add){
      if(localStorage.getItem("teachers")){
        this.editTeacherAudience.dataSource = JSON.parse(localStorage.getItem("teachers"))
      }
      this.setData()
    }
    else{
        this.getTeacherAuidenceList()
    }
  }

  getTeacherAuidenceList(page?: any) {
    try {
      this.loader.show()
      this.editTeacherAudience.params = {
        'page': page,
        'page_size': this.editTeacherAudience.page_size,
        'approved': this.route.snapshot.queryParamMap.get('approved'),
        'course_id': this.route.snapshot.queryParamMap.get('course_id')
      }
      this.baseService.getData('ei/subadmin-lists-by-ei-for-starclass/', this.editTeacherAudience.params).subscribe(
        (res: any) => {
          if (res.status == true) {
            if (!page)
              page = this.editTeacherAudience.config.currentPage
            this.editTeacherAudience.startIndex = res.page_size * (page - 1) + 1;
            this.editTeacherAudience.page_size = res.page_size
            this.editTeacherAudience.config.itemsPerPage = this.editTeacherAudience.page_size
            this.editTeacherAudience.config.currentPage = page
            this.editTeacherAudience.config.totalItems = res.count
            if (res.count > 0) {
              this.editTeacherAudience.dataSource = res.results;
              this.editTeacherAudience.pageCounts = this.baseService.getCountsOfPage()
              this.setData()
            }
            else {
              this.editTeacherAudience.dataSource = undefined
              this.editTeacherAudience.pageCounts = undefined
            }
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ),
        err => {
          this.alert.error("Please try again", 'Error');
          this.loader.hide();
        }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  setData() {
    var add = this.route.snapshot.queryParamMap.get('add')
    if(add){
      let filtered = JSON.parse(localStorage.getItem("teachers")).filter(elen => {
        if (this.isValid(elen) == true)
          return elen.user_id
      })
      filtered.forEach(elen => {
        this.teacherAudienceList.push(elen.user_id)
        console.log(this.teacherAudienceList);
        
      }) 
    }
    else{
      let filtered = this.editTeacherAudience.dataSource.filter(elen => {
        if(this.isValid(elen) ==  true)
        return elen.user_id
      })
      filtered.forEach(elen => {
        this.teacherAudienceList.push(elen.user_id)
      })
    }
    
  }

  isValid(value) {
    return value.is_edit_right == true
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
    if (this.teacherAudienceList.length == 0) {
      this.alert.error(this.error, 'Please select Audience from the list ')
      // alert("Please select student list of particular class.")

    } else {

      this.loader.show();

      this.model = {
        'teacher_id': this.teacherAudienceList.join(','),
        'course_id': this.route.snapshot.queryParamMap.get('course_id')
      }
      this.baseService.action('starclass/ei-course-access-permission-to-teacher/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.alert.success(res.message, 'Success');
            localStorage.setItem("teachers", JSON.stringify( this.editTeacherAudience.dataSource  ))
            var add = this.route.snapshot.queryParamMap.get('add')
            if(add) {
              this.router.navigate(['ei/star-class-audience-student-list'],{queryParams:{ 'course_id': this.route.snapshot.queryParamMap.get('course_id'), 'add':'add'}})
            }
            else {
              this.location.back()
            }
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }, (error) => {
          this.alert.error("Please try again", 'Error');
          this.loader.hide();
        });

    }
  }

  goBack() {
    this.location.back()
  }

}
