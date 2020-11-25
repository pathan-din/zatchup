import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  _selectAll: boolean = false;
  subModuleList: Array<any> = [];
  subModuleListData: any;
  masterSelected: boolean
  accessModel: any = {}
  idList: any
  subModuleEnable: any

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id)
      this.getSubadminDataById()
    this.getModuleList()
  }

  getSubadminDataById() {
    let params = {
      "id": this.activeRoute.snapshot.params.id
    }
    this.baseService.getData('admin/sub-admin/subadmin_management_list/', params).subscribe(
      (res: any) => {
        if (res.status == true && res.count != 0) {
          this.subadminData = res.results[0];
          this.subModuleEnable = this.subadminData.status
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
          this.makeAccessModal()
        } else if (res[0].status == false) {
          this.alert.error(res.error, 'Error')
        }
        this.loader.hide();
      }
    ), err => {
      this.loader.hide();
    }
  }

  selectAll(event) {
    if (event.currentTarget.checked == true) {
      this._selectAll = true
    } else {
      this._selectAll = false
    }
  }

  makeAccessModal() {
    this.accessModel['user_id'] = parseInt(this.activeRoute.snapshot.params.id)
    let idList = []
    this.moduleList.forEach(ele => {
      if (ele.sub_module && ele.sub_module.length > 0) {
        ele.sub_module.forEach(child_ele => {
          // child_ele['isSelected'] = false;
          let obj = {
            "id": child_ele.id,
            "status": child_ele.is_access
          }
          idList.push(obj)
        })
      }
    })

    this.accessModel['ids'] = idList
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
    this.baseService.action('admin/sub-admin/set_all_permissions/', this.accessModel).subscribe(
      (res: any) => {
        if (res.status == true) {
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

  disableEnableEmployee(event) {
    this.loader.show();
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

  passwordReset(){
    this.loader.show();
    let data = {
      "email": this.subadminData.email
    }
    this.baseService.action('admin/forgot-password/', data).subscribe(
      (res: any) =>{
        console.log('res of reset pass is as ::', res)
        if(res.status == true){
          this.alert.success('Email has been sent to '+this.subadminData.email, 'Success')
        }else{
          this.alert.error('Error while sending email, Please check your email', 'Error')
        }

        this.loader.hide();
      }
    ),err =>{
      this.loader.hide();
    }
  }

  subadminAccessHistory(){
    this.router.navigate(['admin/subadmin-access-history',this.subadminData.id])
  }
}
