import { Location } from "@angular/common"
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-bulk-promote',
  templateUrl: './bulk-promote.component.html',
  styleUrls: ['./bulk-promote.component.css']
})
export class BulkPromoteComponent implements OnInit {
  displayedColumns: string[] = ['checked', 'SNo', 'zatchupID', 'Name', 'roll_no'];
  user_id: any = '';
  classId: any = '';
  courseId: any = '';
  standardId: any = '';
  currentStandardId: any = '';
  classList: any = [];
  studentCourseList: any = [];
  studentStandardList: any = [];
  dataSource: any;
  rollNumArr: any = []

  constructor(
    private location: Location,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
  ) { }

  ngOnInit(): void {
    this.user_id = JSON.parse(localStorage.getItem('userprofile')).user_id;
    this.dataSource = JSON.parse(localStorage.getItem('bulkStudents')).studentList;
    this.courseId = JSON.parse(localStorage.getItem('bulkStudents')).courseId;
    this.currentStandardId = JSON.parse(localStorage.getItem('bulkStudents')).standardId;
    this.setData()
    this.getCourseList();
    this.getStandardList(this.courseId, '');
  }

  setData() {
    this.dataSource.forEach(ele => {
      ele['roll_no'] = '';
      ele['status'] = true;
      ele['isDuplicates'] = false
    })

    // this.rollNumArr = this.dataSource.map(a => a.roll_no);
    // let duplicates = this.find_duplicate_in_array(this.rollNumArr);
    // if (duplicates.length > 0) {
    //   this.showError(duplicates)
    // }
  }

  selectUnselectStudents(evt: any, index: any) {
    this.dataSource[index].status = evt.checked
  }

  getCourseList() {
    try {
      this.loader.show();
      this.baseService.getData("ei/course-list/").subscribe((res: any) => {
        this.loader.hide()
        this.studentCourseList = res.results;
      }, (error) => {
        this.loader.hide()
        this.alert.error(error.error, "Error");
      })
    } catch (e) {
      this.loader.hide()
      this.alert.error(e.error, "Error");
    }
  }

  getStandardList(courseId: any, type?: any) {
    try {
      this.loader.show();
      let standerdId: any = this.standardId ? this.standardId : this.currentStandardId
      let params = {
        "standard_id": type == '' ? standerdId : '',
        "course_id": courseId
      }
      this.baseService.getData("user/next-standard-list/", params).subscribe((res: any) => {
        this.loader.hide()
        this.studentStandardList = res.results;
      }, (error) => {
        this.loader.hide()
        this.alert.error(error.error, "Error");
      })
    } catch (e) {
      this.loader.hide()
      this.alert.error(e.error, "Error");
    }
  }

  getClassList(stId) {
    try {
      this.loader.show();
      this.classList = [];
      this.baseService.getData("ei/class-list/", { standard_id: stId }).subscribe(
        (res: any) => {
          this.classList = res.classdata;
          this.loader.hide();
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }


  submit() {
    let promoteData: any = [];
    let validRollNumbers: any = []
    validRollNumbers = this.dataSource.filter(x => x.roll_no == '')
    promoteData = this.dataSource.filter(x => x.status == true)
    // debugger
    // return
    console.log('validRollNumbers......', validRollNumbers);

    if (promoteData.length == 0) {
      this.alert.error('Please select students first.', 'Error')
      return;
    }
    else if (!this.standardId && !this.classId) {
      this.alert.error('Please select standard and class first.', 'Error')
      return;
    }
    else if (this.standardId && !this.classId) {
      this.alert.error('Please select class first.', 'Error')
      return;
    }
    else if (validRollNumbers.length > 0) {
      this.alert.error('Roll numbers is required.', 'Error')
      this.showRollNumValidErrors(validRollNumbers)
      return;
    }
    else {
      let rollNums = promoteData.map(a => a.roll_no);
      let userIds = promoteData.map(a => a.student_id);
      let params = {
        "course": this.courseId,
        "standard": this.standardId,
        "teaching_class": this.classId,
        "user_id": userIds.toString(),
        "roll_no": rollNums.toString()
      }

      let duplicates = this.find_duplicate_in_array(rollNums)
      if (duplicates.length > 0) {
        this.alert.error('Please enter unique roll numbers', 'Error');
        this.showError(duplicates)
        return
      } else {
        this.validateErrors()
      }
      this.loader.show();
      this.baseService.action('ei/bulk-promote-class-by-ei/', params).subscribe(
        (res: any) => {
          this.loader.hide()
          if (res.status) {
            this.alert.success(res.message, "Success")
            this.location.back()
          } else {
            this.alert.error(res.error.message[0], "Error")
            if (res.error.roll_no && res.error.roll_no.length > 0) {
              this.showError(res.error.roll_no)
            }
            if (res.error.User_id && res.error.User_id.length > 0) {
              this.validateUsers(res.error.User_id)
            }
          }
        },
        err => {
          this.loader.hide()
        }
      )
    }
  }

  validateErrors() {
    this.dataSource.forEach(ele => {
      ele['isDuplicates'] = false
    })
  }

  validateUsers(users: any) {
    users.forEach(user => {
      this.dataSource.forEach(ele => {
        if (user == ele.student_id) {
          ele.isDuplicates = true
        }
      })
    })
  }

  showError(duplicates: any) {
    duplicates.forEach(dupEle => {
      this.dataSource.forEach(ele => {
        if (dupEle == ele.roll_no) {
          ele.isDuplicates = true
        }
      })
    })
  }

  showRollNumValidErrors(duplicates: any) {
    duplicates.forEach(dupEle => {
      this.dataSource[this.dataSource.indexOf(dupEle)].isDuplicates = true;
    })
  }

  find_duplicate_in_array(arra1) {
    var object = {};
    var result = [];

    arra1.forEach(function (item) {
      if (!object[item])
        object[item] = 0;
      object[item] += 1;
    })

    for (var prop in object) {
      if (object[prop] >= 2) {
        result.push(prop);
      }
    }
    return result;
  }

  onKeyUp(index: any, rollNum: any) {
    if (this.rollNumArr.find(val => { return val == rollNum })) {
      let data = this.dataSource.filter(x => x.roll_no == rollNum)
      data.forEach(ele => {
        ele.isDuplicates = true
      })
    } else {
      let oldRollNum = this.rollNumArr[index];
      let data = this.dataSource.filter(x => x.roll_no == oldRollNum)
      if (data.length == 1) {
        let idx = this.dataSource.indexOf(data[0])
        this.dataSource[idx].isDuplicates = false
        this.dataSource[index].isDuplicates = false
      } else if (data.length > 1)
        this.dataSource[index].isDuplicates = false
    }
  }

  markAsAlumni() {
    let promoteData: any = [];
    promoteData = this.dataSource.filter(x => x.status == true)
    let userIds = promoteData.map(a => a.student_id);
    let params = {
      "course": this.courseId,
      "standard": this.currentStandardId,
      "teaching_class": JSON.parse(localStorage.getItem('bulkStudents')).classId,
      "user_id": userIds.toString()
    }
    this.loader.show();
    this.baseService.action('ei/bulk-alumni-class-by-ei/', params).subscribe(
      (res: any) => {
        this.loader.hide()
        if (res.status) {
          this.alert.success(res.message, "Success")
          this.location.back()
        } else {
          this.alert.error(res.error.message[0], "Error")
        }
      },
      err => {
        this.loader.hide()
      }
    )
  }

  goBack() {
    this.location.back()
  }

}
