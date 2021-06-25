import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
declare var $: any;

@Component({
  selector: 'app-ei-student-verified-list',
  templateUrl: './ei-student-verified-list.component.html',
  styleUrls: ['./ei-student-verified-list.component.css']
})
export class EiStudentVerifiedListComponent implements OnInit {
  @ViewChild("verifiedModel") closeVerifiedModel: ElementRef;
  @ViewChild("closeRejectModel") closeRejectModel: ElementRef;
  @ViewChild("closePromoteModel") closePromoteModel: ElementRef;
  @ViewChild("closeChangeClassModel") closeChangeClassModel: ElementRef
  model: any = {};
  modelPromote: any = {};
  modelReason: any = {};
  studentList: any = [];
  approved: any;
  studentDetails: any = [];
  arrAge: any = [];
  studentArr: any = [];
  isRejected: boolean = false;
  modelUserId: any = '';
  displayedColumns: string[] = ['checked', 'SNo', 'ZatchUpID', 'Name', 'userID', 'roll_no', 'Gender', 'Age',
    'class', 'promote', 'Action'];

  displayedColumnone: string[] = [ 'SNo', 'ZatchUpID', 'Name', 'userID', 'roll_no', 'Gender', 'Age',
    'class', 'Action'];
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  collection = { count: 60, data: [] };
  dataSource: any;
  courseList: any = [];
  studentCourseList: any = [];
  standardList: any = [];
  classList: any = [];
  studentListSendForBulk: any = [];
  error: any = [];
  errorDisplay: any = {};
  title: any = '';
  pageCounts: any;
  objStudent: any = {};
  dataStudent: any = [];
  conversation: any = [];
  currentUser: any;
  recepintDetails: any = {};
  studentStandardList: any = [];
  user_id: any = "";
  bulkStudentList: any = []
  selectAll: boolean = false;
  permission: any = [];
params:any={}
  constructor(
    private router: Router,
    private location: Location,
    private loader: NgxSpinnerService,
    private eiService: EiServiceService,
    private baseService: BaseService,
    private alert: NotificationService,
    private route: ActivatedRoute,
    private formValidationService: GenericFormValidationService,
    private firestore: AngularFirestore,
  ) { }


  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.model.gender = '';
    this.model.approved = ""
    this.route.queryParams.subscribe((params: any) => {
       
      this.approved = params['approved'] ? params['approved'] : ''
      this.model.approved = this.approved;
      this.isRejected = params['approved'] == 2 ? true : false
      this.model.is_rejected = params['is_rejected'] ? params['is_rejected'] : '';
      this.model.rejectedby = params['rejectedby'] ? params['rejectedby'] : '';
      this.title = params['title'];
      this.model.course = params['course'];
      this.model.standard = params['standard'];
      this.model.teaching_class = params['teaching_class'];

    });
    for (var i = 5; i < 70; i++) {
      this.arrAge.push(i);
    }
    localStorage.removeItem('bulkStudents')
    this.getGetVerifiedStudent('', '')
    this.displayCourseList();

  }
  promoteResetPopup(objData) {
    this.modelPromote.roll_no = '';
    this.modelPromote.course = '';
    this.modelPromote.standard = '';
    this.modelPromote.teaching_class = '';
    this.user_id = objData.student_id;
    this.getStudentCourseList(objData.student_id);
  }
  getStudentCourseList(userId) {
    try {
      this.loader.show();
      this.baseService.getData("user/course-list-by-userid/", { user_id: userId }).subscribe((res: any) => {
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
  promoteStudent() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[1].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {

      if (this.user_id) {
        this.modelPromote.user_id = this.user_id;
      }
      this.loader.show();
      this.baseService.action("ei/promote-class-by-ei/", this.modelPromote).subscribe((res: any) => {
        if (res.status) {
          this.loader.hide()
          this.alert.success(res.message, "Success");
          this.closePromoteModel.nativeElement.click();
          this.model = {}
          this.model.approved = this.approved;
          this.setFilterData()
          this.getGetVerifiedStudent('', '')
        } else {
          this.loader.hide()
          this.alert.error(res.error.message[0], "Error");
        }
      }, (error) => {
        this.loader.hide()
        this.alert.error(error.error, "Error");
      })
    } catch (e) {
      this.loader.hide()
      this.alert.error(e.error, "Error");
    }
  }
  displayStudentStandardList(courseId) {
    try {
      this.loader.show();
      this.baseService.getData("user/standard-list-by-userid/", { user_id: this.user_id, course_id: courseId }).subscribe((res: any) => {
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
  displayCourseList() {
    try {
      this.loader.show();
      let data = {
        'page': 1,
        'page_size': 1000
      }
      this.baseService.getData('ei/course-list/',data).subscribe(res => {
        let response: any = {};
        response = res;
        this.courseList = response.results;
        if (this.model.course) {
          this.displayStandardList(this.model.course);
        } else {
          this.model.course = '';
          this.model.standard = '';
          this.model.teaching_class = '';
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
      this.eiService.displayStandardList(courseId).subscribe(res => {
        this.loader.hide();
        let response: any = {};
        response = res;
        this.standardList = response.standarddata;
        if (this.model.standard) {
          this.displayClassList(this.model.standard);
        } else {
          this.model.standard = '';
          this.model.teaching_class = '';
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
      this.eiService.displayClassList(stId).subscribe(
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
  editBulkClass() {
    if (!this.model.class_id) {
      this.alert.error('Please select class first!', 'Error')
      return;
    }
    else if (this.studentListSendForBulk.length == 0) {
      this.alert.error('Please select student list of particular class', "Error")
      return;
    }
    else {
      try {
        this.loader.show();
        this.baseService.actionForPutMethod('ei/bulk-editclass-by-ei/', { 'student_ids': this.studentListSendForBulk.join(','), 'class_id': this.model.class_id }).subscribe(
          (res: any) => {
            this.loader.hide();
            this.closeChangeClassModel.nativeElement.click()
            this.model = {}
            this.model.approved = this.approved;
            this.setFilterData()
            this.getGetVerifiedStudent('', '')
            this.displayCourseList();
            this.alert.success(res.message, 'Success');
          }, (error) => {
            this.loader.hide();
          });
      } catch (err) {
        this.loader.hide();
      }
    }
  }
  getStudentBycheckboxClickForStudentBulkAction(stId, event, student) {
    if (event.checked) {
      if (this.studentListSendForBulk.indexOf(stId) === -1) {
        this.studentListSendForBulk.push(stId)
        this.bulkStudentList.push(student)
      }
    } else {
      var index = this.studentListSendForBulk.indexOf(stId)
      this.dataSource[index].status = false
      let list: any = [];
      list = this.dataSource.filter(x => x.status == true)
      let ids = list.map(a => a.student_id);
      this.studentListSendForBulk = ids;
      this.bulkStudentList = list;
    }

    let find = this.dataSource.find(ele => {
      return ele.status == false
    })
    if (find)
      this.selectAll = false;
  }

  getGetVerifiedStudent(page, strFilter) {
    try {
      this.loader.show();
      this.model.page = page;
      this.baseService.getData('ei/student-list/', this.model).subscribe(
        (res: any) => {
          this.loader.hide();
          this.studentList = res.results;
          this.model.page = page
          this.pageSize = res.page_size;
          this.model.page_size = this.pageSize
          this.totalNumberOfPage = res.count;
          this.config.itemsPerPage = this.pageSize
          this.config.currentPage = page
          this.config.totalItems = this.totalNumberOfPage;
          this.pageCounts = this.baseService.getCountsOfPage();
          if (!page) { page = 1 }
          var i = (this.pageSize * (page - 1)) + 1;
          this.dataSource = this.setData(this.studentList, i);

          if (this.dataSource.length == 0)
            this.dataSource = undefined
          if (res.status == false) {
            this.alert.error(res.error.message[0], 'Error')
          }
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }

  setData(data: any, index: any) {
    let arrStudentList: any = []
    data.forEach(objData => {
      let objStudentList: any = {};
      objStudentList.checked = '';
      objStudentList.status = false;
      objStudentList.SNo = index;
      objStudentList.zatchupID = objData.zatchup_id;
      objStudentList.student_id = objData.user_id;
      objStudentList.kyc_approved = objData.kyc_approved;
      objStudentList.approved = objData.approved;
      objStudentList.is_rejected = objData.is_rejected;
      objStudentList.reason_reject = objData.reason_reject;
      objStudentList.name = objData.first_name + ' ' + objData.last_name;
      objStudentList.gender = objData.gender;
      objStudentList.age = objData.age;
      objStudentList.userID = objData.admission_no;
      objStudentList.class = objData.class_name;
      objStudentList.alias_class = objData.alias_class;
      objStudentList.roll_no = objData.roll_no;
      objStudentList.firebase_id = objData.firebase_id;
      objStudentList.promote_type = objData.promote_type
      objStudentList.Action = '';
      index = index + 1;
      arrStudentList.push(objStudentList);
    })
    return arrStudentList
  }

  applyFilter() {
    var arrFilter = [];
    if (Object.keys(this.model).length > 0) {
      var course = 'course=' + this.model.course
      var standard = 'standard=' + this.model.standard
      var teaching_class = 'teaching_class=' + this.model.teaching_class
      var gender = 'gender=' + this.model.gender
      arrFilter.push(course)
      arrFilter.push(standard)
      arrFilter.push(teaching_class)
      arrFilter.push(gender)
      var strFilter = arrFilter.join("&");
      this.getGetVerifiedStudent('', strFilter)
    } else {
      this.getGetVerifiedStudent('', '')
    }
  }
  goToChatScreen(objStudent) {
    this.conversation = [];
    this.dataStudent = [];
    this.objStudent = objStudent;
    this.getRecepintUserDetails(objStudent.firebase_id)
    return new Promise<any>((resolve, reject) => {
      let data: any = {};
      var date = new Date();

      var uuid = objStudent.firebase_id;
      data.user_request_id = localStorage.getItem('fbtoken');
      data.user_accept_id = uuid;
      data.is_block = 0
      data.is_seen = 0
      data.is_active = 1
      data.is_read = 0
      data.created_on = this.baseService.getDateFormat(date);
      let getFriendListExistingData: any = {}
      this.getFriendListBySender(localStorage.getItem('fbtoken'), uuid, data)



    })


  }
  getFriendListBySender(loginfirebase_id: any, user_accept_id: any, data) {
    this.conversation = [];
    this.dataStudent = [];
    this.firestore.collection('user_friend_list').valueChanges().subscribe((res: any) => {
      let dataEle = res.find(elem => {
        return ((elem.user_request_id === loginfirebase_id && elem.user_accept_id === user_accept_id) || (elem.user_request_id === user_accept_id && elem.user_accept_id === loginfirebase_id))
      })
      if (dataEle) {
        this.firestore.collection('user_friend_list').get()
          .subscribe(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              querySnapshot.docs.map(doc => {
                let res: any = []
                res = doc.data();
                if (dataEle.user_request_id == res.user_request_id && dataEle.user_accept_id == res.user_accept_id) {
                  localStorage.setItem("friendlidt_id", doc.id)
                  this.getDocumentsChat();
                }
              });
            }
          });
      } else {
        this.firestore.collection("user_friend_list").add(data).then(res => {
          localStorage.setItem("friendlidt_id", res.id)
          this.getDocumentsChat();

        })
      }
    })
  }


  getDocumentsChat() {
    console.log(this.isValidModule('MODULE013'));
    
    if(this.isValidModule('MODULE013')==false){
      this.alert.error("You have not chat module permission,please contact your ei","Error")
      return 
    }
    this.conversation = [];
    this.dataStudent = [];
    var uuid = localStorage.getItem("friendlidt_id");
    var dataSet = this.firestore.collection('chat_conversation').doc(uuid).valueChanges();
    dataSet.subscribe((res: any) => {
      if (res) {
        this.conversation = res.data;
        this.dataStudent = res.data;
      } else {
        this.conversation = [];
        this.dataStudent = [];
      }
      this.router.navigate(["ei/messages-details"]);
    })



  }

  getRecepintUserDetails(uuid) {
    localStorage.setItem("receipent", uuid);
    this.firestore.collection('users').doc(uuid).ref.get().then(res => {
      this.recepintDetails = res.data();
    });

  }

  goToEiStudentEditPage(id, approve) {
    let queryParams = {
      "returnUrl": "ei/student-verified-list",
      "approved": "1",
      "kyc_approved": "1",
      "title": "Verified"
    }
    this.router.navigate(['ei/student-edit'], { queryParams: { 'stId': id, 'approve': approve } });
  }
  isValidModule(module_code) {
    let moduleList: any = {};
    if (this.permission !== undefined && this.permission !== null && this.permission !== '') {
      moduleList = this.permission;
      
      var data = moduleList.find(el => {
        return el.module_code == module_code
      })
      console.log(data, 'djsdj');
      
      if (data) {
        return data.is_access;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  goToEiStudentProfilePage(id,title) {
    this.router.navigate(['ei/student-profile'], { queryParams: { 'stId': id,'title': title} });
  }


  /**
   * Export Data
   */

  getExportData() {
    try {
      let params: any = [];
      params['export_csv'] = true
      this.baseService.generateExcel('ei/export-verifiedstudent-by-ei/', 'verified-student', params)
    } catch (error) {
      console.log(error)
    }
  }
  rejectStudent() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show();
      this.eiService.postRejectReason(this.modelReason).subscribe(
        (res: any) => {
          if (res.status === true) {
            this.closeRejectModel.nativeElement.click()
            this.alert.success(res.message, 'Success')
            this.getGetVerifiedStudent('', '')

            // this.router.navigate(['ei/student-management']);
          } else {
            this.loader.hide();
            var errorCollection = '';
            for (var key in res.error) {
              if (res.error.hasOwnProperty(key)) {
                errorCollection = errorCollection + res.error[key][0] + '\n'
              }
            }
            this.alert.error(errorCollection, "Error");
          }
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }


  openRejectModel(studentId) {
    this.modelReason.student_id = studentId;
  }

  openModel(studentID) {
    this.modelUserId = studentID;
    $("#verifiedModel").modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  approveStudent(action, studentId) {
    let data: any = {};
    data.student_id = studentId;
    data.approve_student = action;
    try {
      this.loader.show();
      this.baseService.action('ei/approve-student/',data).subscribe(
        (res: any) => {
          this.loader.hide();
          this.closeVerifiedModel.nativeElement.click()
          if (res.status == true) {
            this.alert.success(res.message, 'Success');
            this.getGetVerifiedStudent('', '')

            // this.router.navigate(['ei/student-management']);
          } else {
            this.alert.error(res.error.message[0], 'Error');
          }
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }
  goBack(): void {
    this.location.back()
  }

  getGender(data: any) {
    if (data)
      return this.baseService.getGender(data)
    return ''
  }

  bulkPromote() {
    if (this.bulkStudentList.length == 0) {
      this.alert.error(this.error, 'Please select students first.')
      return;
    } else {
      // debugger
      let promoteModel = {
        "courseId": this.model.course,
        "standardId": this.model.standard,
        "classId": this.model.teaching_class,
        "studentList": this.bulkStudentList
      }
      localStorage.setItem('bulkStudents', JSON.stringify(promoteModel))
      this.closeChangeClassModel.nativeElement.click()
      this.router.navigate(['ei/bulk-promote']);
    }
  }

  all(evt) {
    this.studentListSendForBulk = []
    this.bulkStudentList = []
    if (evt.checked) {
      this.dataSource.forEach(ele => {
        ele.status = true;
      })
      let ids = this.dataSource.map(a => a.student_id);
      this.studentListSendForBulk = ids;
      this.bulkStudentList = this.dataSource;
    }
    else {
      this.dataSource.forEach(ele => {
        ele.status = false;
      })
    }
  }

  setFilterData(){
    this.model.course = '';
    this.model.standard = '';
    this.model.teaching_class = '';
  }

  closeModel() {
    this.closeVerifiedModel.nativeElement.click()
  }
}
