import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAuidence } from '../../registration/modal/contact-us.mdal';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-ei-starclass-audience-student-list',
  templateUrl: './ei-starclass-audience-student-list.component.html',
  styleUrls: ['./ei-starclass-audience-student-list.component.css']
})
export class EiStarclassAudienceStudentListComponent implements OnInit {
  studentAuidence: StudentAuidence
  cartData: any;
  studentId: Array<string> = [];
  approved: any;
  studentAudienceList: any = [];
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
    this.studentAuidence = new StudentAuidence()
  }

  ngOnInit(): void {
    this.approved = this.route.snapshot.queryParamMap.get('approved')
    this.getStudentAuidenceList()
  }

  getStudentAuidenceList(page?: any) {
    try {
      this.loader.show()
      this.studentAuidence.params = {
        'page': page,
        'page_size': this.studentAuidence.page_size,
        'course_id': this.route.snapshot.queryParamMap.get('course_id'),
        'is_access_for_star_class': this.studentAudienceList.is_access_for_star_class
        // 'id': this.route.snapshot.params.id
      }
      this.baseService.getData('ei/student-list-for-starclass/', this.studentAuidence.params).subscribe(
        (res: any) => {
          if (res.status == true) {
            if (!page)
              page = this.studentAuidence.config.currentPage
            this.studentAuidence.startIndex = res.page_size * (page - 1) + 1;
            this.studentAuidence.page_size = res.page_size
            this.studentAuidence.config.itemsPerPage = this.studentAuidence.page_size
            this.studentAuidence.config.currentPage = page
            this.studentAuidence.config.totalItems = res.count
            if (res.count > 0) {
              this.studentAuidence.dataSource = res.results;
              this.studentAuidence.pageCounts = this.baseService.getCountsOfPage()
              this.setData()
            }
            else {
              this.studentAuidence.dataSource = undefined
              this.studentAuidence.pageCounts = undefined
            }
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ),
        err => {
          this.alert.error("Please try again",'Error');
          this.loader.hide();
        }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }


  setData() {
    let filtered = this.studentAuidence.dataSource.filter(elen => {
      if (this.isValid(elen) == true)
        return elen.user_id
    })
    filtered.forEach(elem =>{
      this.studentAudienceList.push(elem.user_id)
    })
  }

  isValid(value) {
    return value.is_access_for_star_class == true
  }

  getStudentAudienceBycheckbox(stId, event) {
    if (event.checked) {
      if (this.studentAudienceList.indexOf(stId) === -1) {
        this.studentAudienceList.push(stId)
      }
    } else {
      if (this.studentAudienceList.indexOf(stId) === -1) {

      } else {
        var index = this.studentAudienceList.indexOf(stId)
        this.studentAudienceList.splice(index, 1);
      }
    }
  }

  addStudentAudience() {
    // debugger
    if (this.studentAudienceList.length == 0) {
      this.alert.error(this.error, 'Please select Audience from the list ')
      // alert("Please select student list of particular class.")

    } else {

      this.loader.show();
      this.model = {
        'student_id': this.studentAudienceList.join(','),
        'course_id': this.route.snapshot.queryParamMap.get('course_id')
      }
      this.baseService.action('starclass/ei-course-assign-to-user/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.alert.success(res.message, 'Success');
           this.location.back()
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }, (error) => {
          this.loader.hide();
          this.alert.error(error, 'Error')
        });

    }
  }

  goBack() {
    this.location.back()
  }

}
