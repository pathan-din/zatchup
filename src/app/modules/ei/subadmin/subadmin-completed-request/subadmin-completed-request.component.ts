import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SubadminCompleteRequest } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-subadmin-completed-request',
  templateUrl: './subadmin-completed-request.component.html',
  styleUrls: ['./subadmin-completed-request.component.css']
})
export class SubadminCompletedRequestComponent implements OnInit {
  // displayedColumns: string[] = ['SNo', 'ZatchUpID', 'EmployeeID',
  //   'Name', 'EmailID', 'phone', 'Action'];
  displayedColumns: string[] = ['SNo', 'Name', 'zatchUpID', 'profilePicture', 'dateOfBirth', 'emailId',
    'phone', 'EmployeeID', 'comment', 'Action'];
     subadminCompleteRequest : SubadminCompleteRequest
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  pageSize: any = '';
  listParams: any = {};
  startIndex: any
  dataSource: any = [];
  modelReason: any = {};
  errorDisplay: any = {};
  userId: any;
  pageCounts: any;
  title: any = '';
   
  objStudent: any = {};
  dataStudent: any = [];
  conversation: any = [];
  currentUser: any;
  recepintDetails: any = {};
  studentStandardList: any = [];
  user_id: any = "";
  bulkStudentList: any = []
  selectAll: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private firestore: AngularFirestore,
  ) {
    this.subadminCompleteRequest = new SubadminCompleteRequest ()
   }

  ngOnInit(): void {
    this.getSubadminCompletedRequest('')
  }

  goBack(): void {
    this.location.back()
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
  getSubadminCompletedRequest(page?: any) {
    this.loader.show();
    this.subadminCompleteRequest.listParams = {
      "page_size": this.subadminCompleteRequest.page_size,
      "page": page
    }
    this.baseService.getData('ei/subadmin-lists-by-ei/', this.subadminCompleteRequest.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
          page = this.subadminCompleteRequest.config.currentPage
          this.subadminCompleteRequest.startIndex = res.page_size * (page- 1) + 1;
          this.subadminCompleteRequest.page_size = res.page_size
          this.subadminCompleteRequest.config.itemsPerPage = this.subadminCompleteRequest.page_size
          this.subadminCompleteRequest.config.currentPage = page
          this.subadminCompleteRequest.config.totalItems = res.count
          if(res.count > 0) {
            this.subadminCompleteRequest.dataSource = res.results;
            this.subadminCompleteRequest.pageCounts = this.baseService.getCountsOfPage()
          }
          else {
            this.subadminCompleteRequest.dataSource = undefined
            this.subadminCompleteRequest.pageCounts = undefined
          }
        }
        else {
          this.alert.error(res.error.message[0], 'Error')
          
        }
        this.loader.hide();
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  redirectToDetailPage(id) {
    this.router.navigate(['ei/subadmin-details'], { queryParams: { id: id } });
  }
}
