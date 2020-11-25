import { Component, OnInit } from '@angular/core';
import { BaseService } from './services/base/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zatchUp';
  constructor(
    // private baseService: BaseService
  ) { }

  ngOnInit() {
    // this.getUserInfo()
  }

  // getUserInfo() {
  //   this.baseService.getData('ei/auth-user-info/').subscribe(
  //     (res: any) => {
  //       if (res.status == true)
  //         localStorage.setItem('userInfo', JSON.stringify(res))
  //       // this.userData = res
  //       console.log('user info is as ::', res)
  //     }
  //   )
  // }
}
