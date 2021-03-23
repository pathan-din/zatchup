import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CartList } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-ei-starclass-cart',
  templateUrl: './ei-starclass-cart.component.html',
  styleUrls: ['./ei-starclass-cart.component.css']
})
export class EiStarclassCartComponent implements OnInit {
  cartList : CartList
  model: any ={};
  message: any= {};

  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router
  ) {
    this.cartList = new CartList()
   }

  ngOnInit(): void {
    this.getCartList()
  }

  getCartList(){
    try {
      this.loader.show()
      this.baseService.getData('starclass/cart-list/').subscribe(
        (res:any) =>{
          if(res.status == true){
            this.cartList.data = res.results
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ), err => {
        this.alert.error(err, 'Error')
        this.loader.hide()
      }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  deleteCartItem(id){
    try {
      this.loader.show()
      this.model = {
        'id' : id
      }
      this.message = 'Are you sure you want to delete this Item ?'
      this.confirmDialogService.confirmThis(this.message, () => {
        this.baseService.action('starclass/cart-delete/', this.model).subscribe(
          (res: any) => {
            if(res.status == true){
              this.alert.success(res.message, 'Success')
              this.getCartList()
            }
            else{
              this.alert.error(res.error.message, 'Error')
            }
            this.loader.hide()
          }
        ), err => {
          this.alert.error(err, 'Error')
          this.loader.hide()
        }
      }, () => {
      });
      
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  goBack(){
  this.router.navigate(['ei/star-class']) 
  }
}
