import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAuidence } from '../../registration/modal/contact-us.mdal';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { elementAt, filter } from 'rxjs/operators';


@Component({
  selector: 'app-ei-starclass-audience-student-list',
  templateUrl: './ei-starclass-audience-student-list.component.html',
  styleUrls: ['./ei-starclass-audience-student-list.component.css']
})
export class EiStarclassAudienceStudentListComponent implements OnInit {
  studentAuidence: StudentAuidence
  cartData: any;
  studentId: Array<string> = [];
  approved: any;
  studentAudienceList: any = [];
  studentAudienceListLocalstorage: any = [];
  error: any = [];
  model: any;
  classId: any;
  constructor(
    private router: Router,
    private location: Location,
    private alert: NotificationService,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    this.studentAuidence = new StudentAuidence()
  }

  ngOnInit(): void {
    this.classId = JSON.parse(localStorage.getItem("sections"))
    this.approved = this.route.snapshot.queryParamMap.get('approved')
    this.getStudentAuidenceList()
    // this.setData()
  }

  getStudentAuidenceList(page?: any) {
    try {
      this.loader.show()
      var action = this.route.snapshot.queryParamMap.get('action')
      if(action == 'add'){
        this.studentAuidence.params = {
          'page': page,
          'page_size': this.studentAuidence.page_size,
          'course_id': this.route.snapshot.queryParamMap.get('course_id'),
          'class_ids' : JSON.parse(localStorage.getItem("sections")),
          'is_access_for_star_class': this.studentAudienceList.is_access_for_star_class
          // 'id': this.route.snapshot.params.id
        }
      }
      else {
        this.studentAuidence.params = {
          'page': page,
          'page_size': this.studentAuidence.page_size,
          // 'class_ids' : JSON.parse(localStorage.getItem("sections")),
          'course_id': this.route.snapshot.queryParamMap.get('course_id'),
          'is_access_for_star_class': this.studentAudienceList.is_access_for_star_class
          // 'id': this.route.snapshot.params.id
        }
      }
     
      this.baseService.getData('ei/student-list-for-starclass/', this.studentAuidence.params).subscribe(
        (res: any) => {
          console.log('dshgdyhsbd', this.studentAuidence.params);
          
          if (res.status == true) {
            if (!page)
              page = this.studentAuidence.config.currentPage
            this.studentAuidence.startIndex = res.page_size * (page - 1) + 1;
            this.studentAuidence.page_size = res.page_size
            this.studentAuidence.config.itemsPerPage = this.studentAuidence.page_size
            this.studentAuidence.config.currentPage = page
            this.studentAuidence.config.totalItems = res.count
            if (res.count > 0) {
              var add = this.route.snapshot.queryParamMap.get('add')
              if(add){
                if (this.classId) {
                  console.log('fjkdbf', this.classId);
                  
                  console.log(this.studentAudienceList);
                  
                  res.results.forEach(
                    element => {
                      
                    
                      if (this.studentAudienceList.indexOf(element.user_id) === -1) {
                        element.is_access_for_star_class = true;
                      }else{
                        element.is_access_for_star_class = false;
                      }
                      
                    }
                  )
                 this.studentAuidence.dataSource = res.results;
                }
              }
              
              else {
               
              }
              this.studentAuidence.dataSource = res.results;
              this.studentAuidence.pageCounts = this.baseService.getCountsOfPage()
              this.setData()
            }
            else {
              this.studentAuidence.dataSource = undefined
              this.studentAuidence.pageCounts = undefined
            }
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ),
        err => {
          this.alert.error("Please try again",'Error');
          this.loader.hide();
        }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  setData() {
    let filtered = this.studentAuidence.dataSource.filter(elen => {
      if(this.isValid(elen) ==  true)
      return elen.user_id
    })
    filtered.forEach(elen => {
      this.studentAudienceList.push(elen.user_id)
    })

    console.log( this.studentAudienceList );
    
    
  }

  getStudentAudienceBycheckbox(stId, event) {

    if (event.checked) {
      if (this.studentAudienceList.indexOf(stId) === -1) {
        this.studentAudienceList.push(stId)
      }
    } else {
      if (this.studentAudienceList.indexOf(stId) === -1) {

      } else {
        var index = this.studentAudienceList.indexOf(stId)
        this.studentAudienceList.splice(index, 1);
      }
    }
  }

//   arrayRemove(arr, value) { 
    
//     return arr.filter(function(ele){ 
//         return ele != value; 
//     });
// }


//   getStudentAudienceBycheckbox(stId, event) {
// console.log( event);
// console.log(stId);



//     // if (event.checked ) {
//     console.log('inn1');
    
//         // var index = this.studentAudienceList.indexOf(stId)
//         // if(index != -1){

//           if (event.checked ) 
//           this.studentAudienceList = this.arrayRemove(this.studentAudienceList, stId);
//           else
//           this.studentAudienceList.push(stId)
//           // this.studentAudienceList.splice(index, 1);
//         // }else{
//         // }


//     //   if (this.studentAudienceList.indexOf(stId) === -1) {

//     //   } else {
//     //     var index = this.studentAudienceList.indexOf(stId)
//     //     this.studentAudienceList.splice(index, 1);
//     //   }
//     // } else {
//     //   if (this.studentAudienceList.indexOf(stId) === -1) {
     
//     //   }

    
//     // }

//     console.log( this.studentAudienceList);
    
//   }

  // setData() {
  
  //   let filtered = this.studentAuidence.dataSource.filter(elen => {
  //     if (this.isValid(elen) == true)
  //       return elen.user_id
  //   })
  //   filtered.forEach(elem =>{
  //    var index = this.studentAudienceList.findIndex(ele=>{
  //       return ele == elem.user_id
  //     })
  //     if(index==-1){
       
  //       this.studentAudienceList.push(elem.user_id)
  //     }
  //     //studentAudienceListLocalstorage
  //     console.log(this.studentAudienceListLocalstorage);
      
  //     for(var index1 in  this.studentAudienceListLocalstorage){
  //       console.log(this.studentAudienceListLocalstorage[index1]);
  //       if(this.studentAudienceListLocalstorage[index1] == false){
  //         var newindex = this.studentAudienceList.findIndex(ele=>{
  //           return ele == index1
  //         })
  //         if(newindex == -1){
  //           this.studentAudienceList.push(parseInt(index1))
  //         }
  //         else{
  //           this.studentAudienceList.splice(newindex, 1);
  //         }
        
  //       } else{
  //         var newindex = this.studentAudienceList.findIndex(ele=>{
  //           return ele == index1
  //         })
  //         if(newindex == -1){
  //           this.studentAudienceList.push(parseInt(index1))
  //         }
  //         else{
  //           this.studentAudienceList.splice(newindex, 1);
  //         }
  //       }
  //     }
      
  //     console.log('set data', this.studentAudienceList);
      
  //   })
    
  // }

  isValid(value) {
    return value.is_access_for_star_class == true
  }


  addStudentAudience() {
    // debugger
    if (this.studentAudienceList.length == 0) {
      this.alert.error(this.error, 'Please select Audience from the list ')
      // alert("Please select student list of particular class.")

    } else {

      this.loader.show();
      // var temp = [];
      // this.studentAuidence.dataSource.forEach( e => {

      //   if (this.studentAudienceList.indexOf( e.user_id) === -1) 
      //       temp.push( e.user_id );
      // });


      this.model = {
        'student_id':  this.studentAudienceList.join(','),
        'course_id': this.route.snapshot.queryParamMap.get('course_id')
      }
      this.baseService.action('starclass/ei-course-assign-to-user/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
           
            localStorage.removeItem("sections");
            localStorage.removeItem("teachers");
            localStorage.removeItem("courseIds");
            localStorage.removeItem("standardIds");
            this.alert.success(res.message, 'Success');
            var add = this.route.snapshot.queryParamMap.get('add')
            if(add){
              this.router.navigate(['ei/star-class-courses-uploaded-by-ei']) 
            }
            else{
              this.location.back()
            }
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }, (error) => {
          this.loader.hide();
          this.alert.error(error, 'Error')
        });

    }
  }

  goBack() {
    this.location.back()
  }

}
