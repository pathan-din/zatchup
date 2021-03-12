import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-subadmin-authorization-access-view',
  templateUrl: './subadmin-authorization-access-view.component.html',
  styleUrls: ['./subadmin-authorization-access-view.component.css']
})
export class SubadminAuthorizationAccessViewComponent implements OnInit {
  moduleList: any;
  subadminData: any;
  // _selectAll: boolean = false;
  historyArr: Array<any> = []
  arrayList: Array<any> = []
  masterSelected: boolean;
  accessModel: any = {}
  idList: any
  subModuleEnable: any;
  idArray1: any = [];
  idArray2: any = []
  userdata: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private activeRoute: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
  ) { }

  ngOnInit(): void {
    this.getSubadminDataById()
    this.getModuleList()
    this.userdata = JSON.stringify(sessionStorage.getItem('user'))
  }

  getSubadminDataById() {
    let params = {
      "id": this.activeRoute.snapshot.params.id
    }
    this.baseService.getData('admin/sub-admin/subadmin_management_list/', params).subscribe(
      (res: any) => {
        if (res.status == true && res.count != 0) {
          this.subadminData = res.results[0];
          this.subModuleEnable = !this.subadminData.status
        } else {
          this.subadminData = undefined
        }
      }
    )
  }

  getModuleList() {
    this.loader.show();
    let params = {
      "id": this.activeRoute.snapshot.params.id
    }
    this.baseService.getData('admin/sub-admin/get_all_permissions_list/', params).subscribe(
      (res: any) => {
        if (res[0].status == true) {
          this.moduleList = res[0].data;
          this.makeAccessModal();
          this.makeArr1();
          this.checkAll();
        } else if (res[0].status == false) {
          this.alert.error(res.error, 'Error')
        }
        this.loader.hide();
      }
    ), err => {
      this.loader.hide();
    }
  }

  // selectAll(event) {
  //   if (event.currentTarget.checked == true) {
  //     this._selectAll = true
  //   } else {
  //     this._selectAll = false
  //   }
  // }

  makeArr1() {
    this.accessModel['user_id'] = parseInt(this.activeRoute.snapshot.params.id)
    let idList = []
    this.moduleList.forEach(ele => {
      if (ele.sub_module && ele.sub_module.length > 0) {
        ele.sub_module.forEach(child_ele => {
          let obj = {
            "id": child_ele.id,
            "status": child_ele.is_access
          }
          this.arrayList.push(child_ele)
          idList.push(obj)
        })
      }
    })
    this.idArray1 = idList;
  }

  makeAccessModal() {
    this.accessModel['user_id'] = parseInt(this.activeRoute.snapshot.params.id)
    let idList = []
    this.moduleList.forEach(ele => {
      if (ele.sub_module && ele.sub_module.length > 0) {
        ele.sub_module.forEach(child_ele => {
          let obj = {
            "id": child_ele.id,
            "status": child_ele.is_access
          }
          idList.push(obj)
        })
      }
    })
    this.accessModel['ids'] = idList;

  }

  checkUncheckAll() {
    this.moduleList.forEach(ele => {
      if (ele.sub_module && ele.sub_module.length > 0) {
        ele.sub_module.forEach(child_ele => {
          child_ele.is_access = this.masterSelected;
        })
      }
    })
    this.setAccessModal()
  }

  setAccessModal() {
    this.accessModel.ids.forEach(elem => {
      elem.status = this.masterSelected
    })
  }

  isAllSelected(event, id) {
    let find = this.accessModel.ids.find(item => {
      return id == item.id
    })
    if (find) {
      let obj = {
        "id": find.id,
        "status": event.checked
      }
      this.accessModel.ids[this.accessModel.ids.indexOf(find)] = obj
    }

    if (event.checked == false)
      this.masterSelected = false
  }

  addAccessPermissions() {
    this.loader.show()
    this.idArray2 = this.accessModel.ids

    // console.log('difference is as ::', difference)
    this.baseService.action('admin/sub-admin/set_all_permissions/', this.accessModel).subscribe(
      (res: any) => {
        if (res.status == true) {
          let difference = this.difference(this.idArray1, this.idArray2)
          if (difference.length > 0)
            this.makeHistoryObject(difference)
          this.alert.success(res.message, 'Success');
          this.router.navigate(['admin/subadmin-dashboard'])
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

  makeHistoryObject(difference: any) {
    this.historyArr = []
    difference.forEach(elem => {
      let find = this.arrayList.find(val => {
        return val.id == elem.id
      })
      if (find) {
        let str = {}
        // if(elem.statue == true)
        str = {
          "module_name": find.module_name,
          "permission_type": elem.status == true ? "Add access premission" : "Remove access premission"

        }
        this.historyArr.push(str)
      }
    })
    this.addHistory();
  }

  addHistory() {
    let data = {
      "user_profile_id": this.subadminData.user_profile,
      "name": this.subadminData.firstname,
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

  disableEnableEmployee(event): any {
    let msg = 'Are you sure you want to disable this employee ?'
    if (event.checked == true)
      msg = 'Are you sure you want to enable this employee ?'
    this.confirmDialogService.confirmThis(msg, () => {
      this.loader.show()
      let data = {
        "user_id": this.activeRoute.snapshot.params.id,
        "disable_status": event.checked
      }

      this.baseService.action('admin/sub-admin/enable_disable_user/', data).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, 'Success');
          } else {
            this.alert.error(res.error.message[0], 'Error');
          }
          this.loader.hide();
        }
      )
    }, () => {
      this.subModuleEnable = !this.subModuleEnable
    });
  }

  makeModuleObj(data) {
    let module = [];
    let obj = {
      "id": data.id,
      "parent_id": data.id,
      "module_name": data.module_name,
      "description": data.description,
      "remarks": data.remarks,
      "is_access": data.is_access
    }
    module.push(obj)
    return module
  }

  passwordReset() {
    this.loader.show();
    let data = {
      "email_or_phone": this.subadminData.email
    }
    this.baseService.action('admin/forgot-password/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success('Email has been sent to ' + this.subadminData.email, 'Success')
        } else {
          this.alert.error('Error while sending email, Please check your email', 'Error')
        }

        this.loader.hide();
      }
    ), err => {
      this.loader.hide();
    }
  }

  subadminAccessHistory() {
    this.router.navigate(['admin/subadmin-access-history'], { queryParams: { "user_profile": this.subadminData.user_profile, "returnUrl": "admin/subadmin-authorization-access-view" + "/" + this.activeRoute.snapshot.params.id } })
  }

  goBack(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
    this.router.navigate([returnUrl])
    // this.location.back()
  }

  difference(obj1, obj2) {
    return obj2.filter(item => !obj1.some(other =>
      item.id == other.id && item.status == other.status
    ));
  }

  checkAll() {
    for (let i = 0; i < this.moduleList.length; i++) {
      let find = this.moduleList[i].sub_module.find(val => {
        return val.is_access == false
      })
      if (find) {
        this.masterSelected = false
        break;
      } else {
        this.masterSelected = true;
      }
    }
  }
}
