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
  studentAudienceListLocalstorage: any = [];
  error: any = [];
  model: any;
  classId: any;
  classList: any = [];
  standardList: any = [];
  courseList: any = [];
  selectAll: boolean;


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
    this.classId = JSON.parse(localStorage.getItem("sections"))
    this.approved = this.route.snapshot.queryParamMap.get('approved')
    this.getStudentAuidenceList();
    this.displayCourseList();
  }

  getStudentAuidenceList(page?: any) {
    try {
      this.loader.show()
      var action = this.route.snapshot.queryParamMap.get('action')
      let section = JSON.parse(localStorage.getItem("sections"))
      let standard = JSON.parse(localStorage.getItem("standardIds"))
      let courseStudent = JSON.parse(localStorage.getItem("courseIds"))
      // if (action == 'add') {
       
       
      // }
      // else {
      //   this.studentAuidence.params = {
      //     'page': page,
      //     'page_size': this.studentAuidence.page_size,
      //     'course_id': this.route.snapshot.queryParamMap.get('course_id'),
      //     'is_access_for_star_class': this.studentAudienceList.is_access_for_star_class,
      //     'course': this.studentAudienceList.course,
      //     'standard': this.studentAudienceList.standard,
      //     'teaching_class': this.studentAudienceList.teaching_class,
      //     'class_ids': section,

      //   }
      // }
      if(!localStorage.getItem('allstudent')){
        this.studentAuidence.params = {
          'page': page,
          'page_size': this.studentAuidence.page_size,
          'is_access_for_star_class': this.studentAudienceList.is_access_for_star_class,
          'course_id': this.route.snapshot.queryParamMap.get('course_id'),
          'class_ids': section ? section : '',
          'course': this.studentAudienceList.course,
          'standard': this.studentAudienceList.standard,
          'teaching_class': this.studentAudienceList.teaching_class
        }
      }
      else{
        this.studentAuidence.params = {
          'page': page,
          'page_size': this.studentAuidence.page_size,
          'course_id': this.route.snapshot.queryParamMap.get('course_id'),
          'is_access_for_star_class': this.studentAudienceList.is_access_for_star_class,
         
        }
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
              var add = this.route.snapshot.queryParamMap.get('add')
              if (add) {
                if (this.classId) {
                  res.results.forEach(
                    element => {
                      if (this.studentAudienceList.indexOf(element.user_id) === -1) {
                        element.is_access_for_star_class = true;
                      } else {
                        element.is_access_for_star_class = false;
                      }
                    }
                  )
                  this.studentAuidence.dataSource = res.results;
                }
              }
              this.studentAuidence.dataSource = res.results;
              this.studentAuidence.pageCounts = this.baseService.getCountsOfPage()
              let find = this.studentAuidence.dataSource.find(val => {

              })
              if (!find)
                this.selectAll = true
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
          this.alert.error("Please try again", 'Error');
          this.loader.hide();
        }
    } catch (error) {
      this.alert.error("Please try again", 'Error')
      this.loader.hide()
    }
  }

  setData() {
    let filtered = this.studentAuidence.dataSource.filter(elen => {
      if (this.isValid(elen) == true)
        return elen.user_id
    })
    filtered.forEach(elen => {
      this.studentAudienceList.push(elen.user_id)
    })
  }

  getStudentAudienceBycheckbox(stId, event) {
    // debugger
    if (event.checked) {
      if (this.studentAudienceList.indexOf(stId) === -1) {
        this.studentAudienceList.push(stId)
      }
    } else {
      // var index = this.studentAudienceList.indexOf(stId)
      // this.studentAudienceList.splice(index, 1);
      let course = this.studentAudienceList.course
      let standard = this.studentAudienceList.standard
      let teachingClass = this.studentAudienceList.teaching_class
      this.studentAudienceList = []
      let list: any = [];
      list = this.studentAuidence.dataSource.filter(x => x.is_access_for_star_class == true)
      let ids = list.map(a => a.user_id);
      this.studentAudienceList = ids;
      this.studentAudienceList.course = course;
      this.studentAudienceList.standard = standard;
      this.studentAudienceList.teaching_class = teachingClass;

    }
    let find = this.studentAuidence.dataSource.find(ele => {
      return ele.is_access_for_star_class == false
    })
    if (find)
      this.selectAll = false;
    else
      this.selectAll = true
    // debugger
  }

  isValid(value) {
    return value.is_access_for_star_class == true
  }

  addStudentAudience() {
    if (this.studentAudienceList.length == 0) {
      this.alert.error(this.error, 'Please select Audience from the list ')
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
            localStorage.removeItem("sections");
            localStorage.removeItem("teachers");
            localStorage.removeItem("courseIds");
            localStorage.removeItem("standardIds");
            localStorage.removeItem("groupclasscheck");
            localStorage.removeItem("allstudent");
            this.alert.success(res.message, 'Success');
            var add = this.route.snapshot.queryParamMap.get('add')
            if (add) {
              this.router.navigate(['ei/star-class-courses-uploaded-by-ei'])
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
          this.loader.hide();
          this.alert.error(error, 'Error')
        });
    }
  }

  goBack() {
    this.location.back()
  }

  displayCourseList() {
    try {
      this.loader.show();
      this.baseService.getData('ei/course-list/').subscribe((res: any) => {
        this.courseList = res.results;
        if (!this.studentAudienceList.course) {
          this.studentAudienceList.course = '';
          this.studentAudienceList.standard = '';
          this.studentAudienceList.teaching_class = '';
        } else {
          this.displayStandardList(this.studentAudienceList.course)
        }
      }, (error) => {
        this.loader.hide();
      });
    } catch (err) {
      this.loader.hide();
    }
  }

  displayStandardList(courseId) {
    try {
      this.loader.show();
      this.standardList = []
      let data: any = {}
      data.course_id = courseId
      this.baseService.getData('ei/standard-list/', data).subscribe((res: any) => {
        this.loader.hide();
        this.standardList = res.standarddata;
        if (!this.studentAudienceList.standard) {
          this.studentAudienceList.standard = '';
          this.studentAudienceList.teaching_class = '';
        } else {
          this.displayClassList(this.studentAudienceList.standard)
        }
      }, (error) => {
        this.loader.hide();
      });
    } catch (err) {
      this.loader.hide();
    }
  }

  displayClassList(stId) {
    try {
      this.loader.show();
      this.classList = [];
      let data: any = {}
      data.standard_id = stId
      this.baseService.getData('ei/class-list/', data).subscribe((res: any) => {
        this.loader.hide();
        this.classList = res.classdata;
      }, (error) => {
        this.loader.hide();
      });
    } catch (err) {
      this.loader.hide();
    }
  }

  all(evt: any) {
    this.studentAuidence.dataSource.forEach(ele => {
      ele.is_access_for_star_class = evt.checked
    })
    let course = this.studentAudienceList.course
    let standard = this.studentAudienceList.standard
    let teachingClass = this.studentAudienceList.teaching_class
    this.studentAudienceList = []
    if (evt.checked) {
      let list: any = this.studentAuidence.dataSource.map(a => a.user_id)
      this.studentAudienceList = list;
    }
    this.studentAudienceList.course = course;
    this.studentAudienceList.standard = standard;
    this.studentAudienceList.teaching_class = teachingClass;

  }

}
