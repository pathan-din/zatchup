import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment'
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { EiServiceService } from 'src/app/services/EI/ei-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommunicationService } from 'src/app/services/communication/communication.service';
@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  uploadInfo: any = {
    "image_type": "profile_pic",
    "url": "ei/cover-profile-update/",
    "icon": "fa fa-camera",
    "class": "btn_position-absolute btn_upload border-0 bg-light-black text-white p-2"
  }
  groupUserLists:any=[];
  model:any={};
  noOfUsers:any=0;
  serverImageUrl: any;
  params:any={}
  receipentUsers: any=[];
  recepintDetails: any;
  currentUser: string;
  exitGroupMember: number=0;
  is_check_student:any;
  is_admin:any;
  is_check_admin: any=0;
  groupMember:any=[];
  studentList: any=[];
  model1: any={};
  teacherList: any;
  modelteacher: any={};
  groupUsers: any=[];
  constructor( private router: Router,
    private location: Location,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    public baseService: BaseService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute,
    private communicationService: CommunicationService,
    private firestore: AngularFirestore,) { }

  ngOnInit(): void {
    this.serverImageUrl = environment.serverImagePath;
    this.currentUser = localStorage.getItem("fbtoken");
    this.route.queryParams.subscribe(params=>{
      this.params=params;
    })
    this.referesh();
  }
  referesh(){
    this.receipentUsers=[];
    if(this.params.groupId && this.params.chat && !this.params.editgroup)
    {
      
      
      const groupD = this.firestore.collection("group").doc(this.params.groupId).valueChanges()
      groupD.subscribe((res:any)=>{
        
       // console.log(res);
        this.model=res;
        
        res.reciepent.forEach(element => {
         // console.log(localStorage.getItem("fbtoken"));
          if(element[this.currentUser]){
            if(element[this.currentUser].is_exit==1){
              this.exitGroupMember=1;
              //console.log(this.exitGroupMember);
              
            }
            if(element[this.currentUser].is_student){
              this.is_check_student=element[this.currentUser].is_student;
              //console.log(this.exitGroupMember);
              
            }
            if(element[this.currentUser].is_admin==1){
              this.is_admin=element[this.currentUser].is_admin;
              //console.log(this.exitGroupMember);
              
            }
            
          }
          
          
          Object.keys(element).forEach(el=>{
            if(element[el].is_remove==0 && element[el].is_exit==0){
              this.groupMember[el]=element[el];
              
              this.getRecepintUserDetails(el,'group');
             // console.log(el);
            }
          // console.log(this.groupMember);
           
          })
          
        });
      })
      
    }
    else{
      if(localStorage.getItem("groupUsers"))
      {
        var groupListMember=[];
        groupListMember=JSON.parse(localStorage.getItem("groupUsers"));
        var recepient=[];
        groupListMember.forEach(element => {
          let user_recepient: any = {};
          let objGroupData: any = {};
          objGroupData.is_read = 0;
          objGroupData.is_admin = 0;
          objGroupData.is_remove = 0;
          objGroupData.is_remove_date = "";
          objGroupData.is_exit = 0;
          objGroupData.is_exit_date = "";
          objGroupData.is_student = element.student_id ? 0 : 1;
          if (element.firebase_id) {
            user_recepient[element.firebase_id] = objGroupData;
            recepient.push(user_recepient)
          }

        });
        
        this.firestore.collection('group').get().subscribe(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.map(doc => {
            
              let res:any=[]
              res=doc.data();
              if(doc.id==this.params.groupId){
                //this.model=res;
                var aG=[]
                res.reciepent.forEach(element => {
                  Object.keys(element).forEach(eOld=>{
                    aG[eOld]=element[eOld];
                    
                  })
                 
              
                });
                //console.log("sdsdsd",aG);
                var newGroupList=[];
                recepient.forEach(el=>{
                  Object.keys(el).forEach(e=>{
                    if(aG[e]){
                      //aG[e].is_remove=0;
                     // aG[e].is_exit=0;
                      newGroupList.push(el)
                      delete aG[e] 
                      
                    }else{
                      newGroupList.push(el)
                     
                    }
                    
                    
                  })
                })
                Object.keys(aG).forEach(item=>{
                  var data={}
                  data[item]=aG[item]
                  newGroupList.push(data)
                })
                this.model=res;
                this.model.reciepent=newGroupList;
               // console.log(newGroupList);
                
                this.firestore.collection("group").doc(this.params.groupId).set(this.model).then((responce:any)=>{
                  //console.log("sdfghjk",responce);
                 // this.router.navigate(['ei/messages-details'],{queryParams:{"chat":"group"}});
                  
                  },(error)=>{
            
                  })
              
                
              }});}});
         
      
          
        
      }
    }
  }
  goBack() {
    this.location.back()
  }
  getRecepintUserDetails(uuid,text:any='') {
    if(text=='group'){
      //this.receipentUsers.push(k)
      localStorage.setItem("receipent",uuid);
      this.firestore.collection('users').doc(uuid).ref.get().then(res => {
     // this.recepintDetails = res.data();
     let resp:any={}
     resp = res.data()
     if(!this.receipentUsers.find(responce=>{return responce.id==resp.id}))
      this.receipentUsers.push(resp )
      localStorage.setItem("alreadyGroupMember",JSON.stringify(this.receipentUsers));
       
      
      });
     
      this.noOfUsers=this.receipentUsers.length;
    }else{
     // localStorage.setItem("receipent",uuid);
      this.firestore.collection('users').doc(uuid).ref.get().then(res => {
        this.recepintDetails = res.data();
      });
    }
   
  }
  updateDetails(){
    this.firestore.collection("group").doc(this.params.groupId).set(this.model).then((responce:any)=>{
      //console.log(responce);
      //this.router.navigate(['ei/messages-details'],{queryParams:{"chat":"group"}});
      this.alert.success("Group name updated successfully","Success")
      this.referesh()
      },(error)=>{

      }) 

      
      
    
  }
  isAdmin(user_uuid,type){
    if(type=='add'){
      this.firestore.collection('group').get().subscribe(querySnapshot => {
        //console.log("hjjh",querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.map(doc => {
          
            let res:any=[]
            res=doc.data();
           
            if(doc.id==this.params.groupId){
              this.model=res;
              res.reciepent.forEach(element => {
                
                if(element[user_uuid]){
                  element[user_uuid].is_admin=1;
                }
                
              });
               
              this.firestore.collection("group").doc(this.params.groupId).set(res).then((responce:any)=>{
                this.referesh()
             // this.router.navigate(['ei/messages-details'],{queryParams:{"chat":"group"}});
              
            },(error)=>{
      
            }) 
            } });
        }

      });
      
    }else{
      this.firestore.collection('group').get()
         
      .subscribe(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.map(doc => {
          
            let res:any=[]
            res=doc.data();
            if(doc.id==this.params.groupId){
              this.model=res;
              res.reciepent.forEach(element => {
                //console.log(element);
                if(element[user_uuid]){
                  element[user_uuid].is_admin=0;
                }
                
              });
               
              this.firestore.collection("group").doc(this.params.groupId).set(res).then((responce:any)=>{
               
              //this.router.navigate(['ei/messages-details'],{queryParams:{"chat":"group"}});
              this.referesh()
            },(error)=>{
      
            }) 
            }});
        }

      });
     }
  }
  exitGroup(user_uuid,type){
 
    if(type=='exit'){
      this.firestore.collection('group').get().subscribe(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.map(doc => {
          
            let res:any=[]
            res=doc.data();
            if(doc.id==this.params.groupId){
              this.model=res;
            
              res.reciepent.forEach(element => {
                //console.log(element);
                Object.keys(element).forEach(item=>{
                  if(element[item].is_student==1){
                    element[item].is_admin=1
                  }
                  
                  
                })
                if(element[user_uuid]){
                  element[user_uuid].is_exit=1;
                }
                
              });
              this.firestore.collection("group").doc(this.params.groupId).set(res).then((responce:any)=>{
              //this.router.navigate(['ei/messages-details'],{queryParams:{"chat":"group"}});
              this.referesh()
            },(error)=>{
      
            })}});}});
      
    }else{
      this.firestore.collection('group').get()
         
      .subscribe(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.map(doc => {
          
            let res:any=[]
            res=doc.data();
            if(doc.id==this.params.groupId){
              this.model=res;
              res.reciepent.forEach(element => {
                //console.log(element);
                if(element[user_uuid]){
                  element[user_uuid].is_remove=1;
                }
                
              });
              //console.log((res));
              this.firestore.collection("group").doc(this.params.groupId).set(res).then((responce:any)=>{
              //console.log(responce);
             // this.router.navigate(['ei/messages-details'],{queryParams:{"chat":"group"}});
             this.referesh()
            },(error)=>{
      
            }) 
            }
          });
        }

      });
      
    }
   
  }
   /** 
   * Function Name : fileUploadDocument
  */
    fileUploadDocument(files) {
      let fileList: FileList = files;
      let fileData: File = fileList[0];
      if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png' && fileData.type !== 'application/pdf') {
        this.loader.hide();
        this.alert.error("File format not supported", 'Error');
         
        return
      }
      const formData = new FormData();
      formData.append('file_name', fileData);
      try {
        this.loader.show();
        this.eiService.uploadFile(formData).subscribe(
          (res: any) => {
            if (res.status == true) {
              this.loader.hide();
              this.model.group_icon = this.serverImageUrl+res.filename
             return res.filename;
            } else {
              this.loader.hide();
              var collection = this.eiService.getErrorResponse(this.loader, res.error);
              this.alert.error(collection, 'Error')
              return '';
            }
          }, (error) => {
            this.loader.hide();
            this.alert.error(error.message, 'Error')
            return '';
          });
      } catch (err) {
        this.loader.hide();
        this.alert.error(err, 'Error')
      }
    }
addMoreRecipant(){
  
    if(localStorage.getItem('alreadyGroupMember')){
      this.model1.approved=1;
      this.model1.page_size = 10000;
      //this.groupUsers=[]
      this.baseService.getData('ei/student-list/', this.model1).subscribe(
        (res: any) => {
          this.loader.hide();
          this.studentList = res.results;
          var alreadyExists= JSON.parse(localStorage.getItem('alreadyGroupMember'));
          alreadyExists.forEach(element => {
           var obj= this.studentList.find(el=>{
              return el.firebase_id == element.id 
            })
            if(obj){
              obj.checked=true
              this.groupUsers.push(obj);
            }
           
            
          });
          this.modelteacher.approved=1;
          this.modelteacher.page_size = 10000;
          this.modelteacher.module_id = 31;
          this.baseService.getData('ei/subadmin-lists-by-ei/',this.modelteacher).subscribe(
              (res: any) => {
                if (res.status == true) {
                  this.teacherList =res.results;
                  var alreadyExists= JSON.parse(localStorage.getItem('alreadyGroupMember'));
                  alreadyExists.forEach(element => {
                  var obj= this.teacherList.find(el=>{
                      return el.firebase_id == element.id 
                    })
                    console.log(this.groupUsers);
                    
                    if(obj){
                      obj.isadded=true;
                      this.groupUsers.push(obj);
                  
                    }
                    if(this.groupUsers.length>0){
                      
                      localStorage.removeItem("groupUsers");
                      localStorage.setItem("groupUsers",JSON.stringify(this.groupUsers));
                      this.router.navigate(['ei/group-chat'],{queryParams:{"editgroup":"edit","groupId":this.params.groupId}});
                    }
                  });
                }
          })
        })
        
        
        
        
    }
   

  //this.router.navigate(['ei/group-chat'],{queryParams:{"editgroup":"edit","groupId":this.params.groupId}});
  //group-chat?newgrp=C
}

getProfilePicUrl(file: any) {
  this.model.group_icon = file.data[0].profile_pic_url;
  this.communicationService.setImageUrl(this.model.group_icon)
}
}
