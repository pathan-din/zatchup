import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.css']
})
export class MessagesDetailsComponent implements OnInit {
  model: any = {};
  modelReason: any = {};
  studentList: any = [];
  studentDetails: any = [];
  arrAge: any = [];
  studentArr: any = [];
  modelUserId: any = '';
  displayedColumns: string[] = ['checked', 'SNo', 'ZatchUpID', 'Name', 'userID', 'roll_no', 'Gender', 'Age',
    'class', 'Action'];
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  collection = { count: 60, data: [] };
  dataSource: any;
  courseList: any = [];
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
  constructor(
    private router: Router,
    private location: Location,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    public baseService: BaseService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute,
    private formValidationService: GenericFormValidationService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("receipent")){
      this.getRecepintUserDetails(localStorage.getItem("receipent"));
      this.currentUser = localStorage.getItem('fbtoken');    
    }
    this.getDocumentsChat()
  }
  getRecepintUserDetails(uuid) {
    
    this.firestore.collection('users').doc(uuid).ref.get().then(res => {
    this.recepintDetails = res.data();
    });
    
}
  sendChat() {
    return new Promise<any>((resolve, reject) => {

      let data: any = {};
      let dataNew: any = {};
      var date = new Date();

      data.user_friend_id = localStorage.getItem("friendlidt_id");
      data.user_send_by = localStorage.getItem('fbtoken');
      data.msg = this.model.comment;
      data.created_on = this.baseService.getDateFormat(date);

      this.dataStudent.push(data)
      dataNew.data = this.dataStudent;
      // console.log(dataNew.data);
      this.firestore.collection("chat_conversation/").doc(data.user_friend_id)
        .set(dataNew)
        .then(
          res => {

            this.getDocumentsChat()
            this.model.comment = '';


          },
          err => reject(err)
        )

    })
  }
  getDocumentsChat() {
    this.conversation = [];
    this.dataStudent =[];
    var uuid= localStorage.getItem("friendlidt_id");
    var dataSet=this.firestore.collection('chat_conversation').doc(uuid).valueChanges();
    dataSet.subscribe((res:any)=>{
      if(res){
        this.conversation = res.data;
        this.dataStudent = res.data;
      }else{
        this.conversation = [];
        this.dataStudent = [];
      }
      
    })
    
    
    
  }
}
