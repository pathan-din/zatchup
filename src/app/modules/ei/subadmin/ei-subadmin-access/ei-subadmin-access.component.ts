import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
// import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
// import { findIndex } from 'rxjs/operators';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-ei-subadmin-access',
  templateUrl: './ei-subadmin-access.component.html',
  styleUrls: ['./ei-subadmin-access.component.css']
})
export class EiSubadminAccessComponent implements OnInit {

  subAdminListDetails: any = {}
  model: any = {};
  errorDisplay: any = {};
  designationList: any = [];
  moduleList: any = [];
  designations: any = [];
  modifiedModulesList: any = [];
  isTeacher: boolean = false;
  classListArrayAccess: any = [];
  classListArrayModuleAccess: any = [];
  courseList: any = [];
  courseListModuleAccess: any = [];
  standardList: any = [];
  classList: any = [];
  isModuleAccessStudent: any
  standardListModuleAccess: any = [];
  classListModuleAccess: any = [];
  modelCodeIndex: any;
  arrayList: any = [];
  isClass: any;
  isModuleAccessClass: any;
  classAccessFromDb: any = [];
  userId: any;
  module: any = {};
  historyModuleList: Array<any> = [];
  addPermissionList: Array<any> = [];
  removePermissionList: Array<any> = [];
  historyArr: Array<any> = [];
  userProfileId: any;
  subAdminName: any;

  constructor(
    private router: Router,
    private location: Location,
    private loader: NgxSpinnerService,
    public baseService: BaseService,
    // public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.model.module_details = [];
    this.module.module_details = [];
    this.route.queryParams.subscribe(params => {
      var id = params['id'];
      if (!id) {
        this.router.navigate(['ei/subadmin-management'])
        return
      }
      this.userId = id;
      this.sudAdminListAccessDetails(id)
    });

  }
  sudAdminListAccessDetails(id) {
    // debugger
    try {
      this.loader.show();
      this.classAccessFromDb = [];
      this.modifiedModulesList = [];
      this.model.module_details = [];
      this.baseService.getData('ei/edit-ei-subadmin-by-ei/' + id).subscribe(
        (res: any) => {
          this.moduleList = res.data.module_detail;
          this.userProfileId = res.data.userprofile_id;
          this.subAdminName = res.data.name;
          this.moduleList.forEach(element => {
            let objModel: any = {};
            if (element.sub_module_set.length > 0) {
              element.sub_module_set.forEach(subElement => {
                let objModel: any = {};
                subElement.count = element.sub_module_set.length
                subElement.parentmodule = element.module_name
                this.modifiedModulesList.push(subElement);
                this.model.module_details.push(subElement)
                if (subElement.is_access) {
                  objModel.module_code = subElement.module_code;
                  this.module.module_details.push(objModel);
                  this.historyModuleList.push(objModel)
                }
              });
            } else {
              this.modifiedModulesList.push(element);
              this.model.module_details.push(element)
              if (element.is_access) {
                objModel.module_code = element.module_code;
                this.module.module_details.push(objModel);
                this.historyModuleList.push(objModel)
              }
            }
          });
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }

  checkStatus(id, checkname) {
    if (checkname == 'standard') {
      var index = this.classAccessFromDb.findIndex(codes => codes.standard_id === id);
    } else if (checkname == 'class') {
      var index = this.classAccessFromDb.findIndex(codes => codes.class_id === id);
    } else if (checkname == 'course') {
      var index = this.classAccessFromDb.findIndex(codes => codes.course_id === id);
    }

    if (index == -1) {
      return false;
    } else {
      return true;
    }
  }


  submitPermissionWithClass() {
    try {
      this.loader.show();
      var id = this.userId;
      this.addPermissionList = this.difference(this.historyModuleList, this.module.module_details)
      this.removePermissionList = this.difference(this.module.module_details, this.historyModuleList)
      this.baseService.actionForPutMethod('ei/edit-ei-subadmin-by-ei/' + id + '/', this.module).subscribe(res => {
        this.loader.hide();
        let response: any = {};
        response = res;
        if (response.status == true) {
          this.historyArr = []
          this.makeHistoryObject(this.removePermissionList, false);
          this.makeHistoryObject(this.addPermissionList, true)
          this.loader.hide();
          this.addHistory()
          this.alert.success('Success', response.message);
          this.goBack()
        } else {
          this.loader.hide();
          this.alert.error('Error', response.message);
        }
      }, (error) => {
        this.loader.hide();
      });
    } catch (e) {
      this.loader.hide();
    }
  }


  displayCourseListModuleAccess() {
    try {
      this.loader.show();
      this.baseService.getData('user/course-list/').subscribe(
        (res: any) => {
          this.loader.hide();
          this.courseListModuleAccess = res.results;
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }
  displayStandardListModuleAccess(courseId) {
    try {
      this.loader.show();
      this.baseService.getData('user/standard-list/', { "course_id": courseId }).subscribe(
        (res: any) => {
          this.loader.hide();
          this.standardListModuleAccess[courseId] = res.standarddata;
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }

  displayClassListModuleAccess(stId) {
    try {
      this.loader.show();
      this.classList = [];
      this.baseService.getData('user/class-list/', { "standard_id": stId }).subscribe(
        (res: any) => {
          this.loader.hide();
          this.classListModuleAccess[stId] = res.classdata;
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }

  getClassesOnSelect(id) {
    var index = this.classListArrayAccess.findIndex(codes => codes === id);
    if (index == -1) {
      this.classListArrayAccess.push(id);
    } else {
      this.alert.error("You have already added.", "Error");
      return;
    }
    this.model.teacher_class_id = this.classListArrayAccess.join();
  }

  getclassListArrayModuleAccess(id) {
    var index = this.classListArrayModuleAccess.findIndex(codes => codes === id);
    if (index == -1) {
      this.classListArrayModuleAccess.push(id);
    } else {

      this.classListArrayModuleAccess.splice(index, 1);
    }
    this.module.module_details[this.modelCodeIndex].class_id = this.classListArrayModuleAccess.join();
  }

  changeAddClass(isAccess) {
    if (isAccess) {
      this.displayCourseListModuleAccess();
    } else {
      this.module.module_details.forEach(element => {
        delete element.class_id;
      });
    }
  }

  openClassModel(module_code) {
    const index = this.module.module_details.findIndex(codes => codes.module_code === module_code);
    if (index == -1) {
      this.alert.error('Please select respective module.', 'Error');
      return;
    }
    this.classListArrayModuleAccess = [];
    try {
      this.loader.show();
      this.classList = [];
      let moduleData: any = {};
      moduleData.subadmin_id = this.userId;
      moduleData.module_code = module_code;
      this.baseService.action('ei/get-class-by-modulecode/', moduleData).subscribe(
        (res: any) => {
          this.loader.hide();
          this.classAccessFromDb = res.data;
          let moduleDataFromDb: any = {};
          moduleDataFromDb.module_code = module_code;
          if (this.classAccessFromDb.length > 0) {
            this.classAccessFromDb.forEach(element => {
              this.isModuleAccessClass = true;
              this.classListModuleAccess = [];
              this.standardListModuleAccess = [];
              this.courseListModuleAccess = [];
              this.displayCourseListModuleAccess();
              this.displayStandardListModuleAccess(element.course_id);
              this.displayClassListModuleAccess(element.standard_id);
              this.classList.push(element.class_id);
              this.classListArrayModuleAccess.push(element.class_id);
            });
            moduleDataFromDb.class_id = this.classList.join();
          } else {
            this.isModuleAccessClass = false;
          }
          this.module.module_details.push(moduleDataFromDb);
          this.modelCodeIndex = this.module.module_details.findIndex(codes => codes.module_code === module_code);

        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }

    $("#addClassModel").modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  isAllSelected(event, code) {
    let objModel: any = {};
    if (event.checked) {
      const index = this.module.module_details.findIndex(codes => codes.module_code === code);
      if (index == -1) {
        objModel.module_code = code;
        this.module.module_details.push(objModel);
      } else {
        this.module.module_details.splice(index, 1);
      }
    } else {
      const index = this.module.module_details.findIndex(codes => codes.module_code === code);

      if (index != -1) {
        this.module.module_details.splice(index, 1);
      }
    }
  }

  makeHistoryObject(difference: any, status: boolean) {
    difference.forEach(elem => {
      let find = this.modifiedModulesList.find(val => {
        return val.module_code == elem.module_code
      })
      if (find) {
        let str = {}
        str = {
          "module_name": find.module_name,
          "permission_type": status == true ? "Add access premission" : "Remove access premission"

        }
        this.historyArr.push(str)
      }
    })
  }

  difference(obj1, obj2) {
    return obj2.filter(item => !obj1.some(other =>
      item.module_code == other.module_code
    ));
  }

  goBack(): void {
    this.location.back()
  }

  addHistory() {
    let data = {
      "user_profile_id": this.userProfileId,
      "name": this.subAdminName,
      "permissions_list": this.historyArr
    }
    this.loader.show()
    this.baseService.action('admin/sub-admin/update_subadmin_permissions/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          // console.log('permission add res...',res)
        }
        else {
          this.alert.error(res.error.message[0], 'Error');
        }

        this.loader.hide()
      }
    ), err => {
      this.loader.hide();
    }
  }
}
