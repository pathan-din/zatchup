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
  action: any = '';
  selectAll: boolean = true

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

  add: any = '';
  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem("teachers")));
    var action = this.route.snapshot.queryParamMap.get('action')
    if (action == "add") {
      if (localStorage.getItem("teachers")) {
        this.editTeacherAudience.dataSource = JSON.parse(localStorage.getItem("teachers"))
      }

      this.editTeacherAudience.page_size = 100;
      this.editTeacherAudience.config.itemsPerPage = 100;
      this.editTeacherAudience.config.currentPage = 1;
      this.editTeacherAudience.config.totalItems = this.editTeacherAudience.dataSource.length;
      this.editTeacherAudience.startIndex = this.editTeacherAudience.page_size * (this.editTeacherAudience.config.currentPage - 1) + 1;
      this.editTeacherAudience.pageCounts = this.baseService.getCountsOfPage();
      let find = this.editTeacherAudience.dataSource.find(ele => {
        return ele.is_edit_right == false
      })
      if (find){
        this.selectAll = false;
      }
      else{
        this.selectAll = true;
      }
      this.setData()
    }
    else {
      this.getTeacherAuidenceList()
    }
    this.addTeacherAudience("nomsg","noredirect")
  }


  perPage() {

    this.editTeacherAudience.config.itemsPerPage = this.editTeacherAudience.page_size;
  }

  changePage(e) {
    console.log(e);

    this.editTeacherAudience.config.currentPage = e;

  }
  getTeacherAuidenceList(page?: any) {

    try {
      this.loader.show()
      this.editTeacherAudience.params = {
        'page': page,
        'page_size': this.editTeacherAudience.page_size,
        'approved': this.route.snapshot.queryParamMap.get('approved'),
        'course_id': this.route.snapshot.queryParamMap.get('course_id'),
        'is_edit_right': 'true'
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
              let find = this.editTeacherAudience.dataSource.find(ele => {
                return ele.is_edit_right == false
              })
              if (find){
                this.selectAll = false;
              }
              else{
                this.selectAll = true;
              }
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
    var action = this.route.snapshot.queryParamMap.get('action')
    if (action == 'add') {
      let filtered = JSON.parse(localStorage.getItem("teachers")).filter(elen => {
        if (this.isValid(elen) == true)
          return elen.user_id
      })
      filtered.forEach(elen => {
        this.teacherAudienceList.push(elen.user_id)
        console.log(this.teacherAudienceList);

      })
    }
    else {
      let filtered = this.editTeacherAudience.dataSource.filter(elen => {
        if (this.isValid(elen) == true)
          return elen.user_id
      })
      filtered.forEach(elen => {
        this.teacherAudienceList.push(elen.user_id)
      })
    }

  }

  all(evt) {
    this.teacherAudienceList = []
    this.editTeacherAudience.dataSource.forEach(ele => {
      ele.is_edit_right = evt.checked
    })
    if (evt.checked) {
      let ids = this.editTeacherAudience.dataSource.map(a => a.user_id);
      this.teacherAudienceList = ids;
    }
  }

  isValid(value) {
    return value.is_edit_right == true
  }

  getTeacherAudienceBycheckbox(stId, event) {

    if (event.checked) {
      if (this.teacherAudienceList.indexOf(stId) === -1) {
        this.teacherAudienceList.push(stId)

        let find = this.editTeacherAudience.dataSource.find(ele => {
          return ele.is_edit_right == false
        })
        if (!find)
          this.selectAll = true;
      }
    } else {
      let list: any = [];
      list = this.editTeacherAudience.dataSource.filter(x => x.is_edit_right == true)
      let ids = list.map(a => a.user_id);
      this.teacherAudienceList = ids;
      let find = this.editTeacherAudience.dataSource.find(ele => {
        return ele.is_edit_right == false
      })
      if (find)
        this.selectAll = false;
    }
  }

  addTeacher(){
    let action = this.route.snapshot.queryParamMap.get('action')
    if(action == 'add'){
      if(this.teacherAudienceList.length == 0){
        this.alert.error(this.error, 'Please Select Audience From The List')
        }
        else {
          this.addTeacherAudience()
        }
      }
      else{
        this.addTeacherAudience()
      }
    }
  

  addTeacherAudience(nomsg:any="",noredirect:any="") {
    if(nomsg=='' && noredirect==""){
      this.loader.show();
      let list = this.teacherAudienceList.join(',')    
        this.model = {
          'teacher_id': list.length > 0 ? list : undefined,
          'course_id': this.route.snapshot.queryParamMap.get('course_id')
        }
        this.baseService.action('starclass/ei-course-access-permission-to-teacher/', this.model).subscribe(
          (res: any) => {
            if (res.status == true) {
              this.loader.hide();
              this.alert.success(res.message, 'Success');
              localStorage.setItem("teachers", JSON.stringify(this.editTeacherAudience.dataSource))
              var action = this.route.snapshot.queryParamMap.get('action')
              console.log(action);
              
              if (action == 'add') {
                this.router.navigate(['ei/star-class-audience-student-list'], { queryParams: { 'course_id': this.route.snapshot.queryParamMap.get('course_id'), 'action': 'add' } })
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
    }else{
      this.loader.show();
    let list = this.teacherAudienceList.join(',')    
      this.model = {
        'teacher_id': list.length > 0 ? list : undefined,
        'course_id': this.route.snapshot.queryParamMap.get('course_id')
      }
      this.baseService.action('starclass/ei-course-access-permission-to-teacher/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
             
            
          }
          else {
            //this.alert.error(res.error.message, 'Error')
          }
          //this.loader.hide()
        }, (error) => {
         // this.alert.error("Please try again", 'Error');
          this.loader.hide();
        });
    }
    

  }

  goBack() {
    this.location.back()
  }

}
