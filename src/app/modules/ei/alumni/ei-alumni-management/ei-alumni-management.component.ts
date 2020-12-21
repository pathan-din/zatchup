import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-alumni-management',
  templateUrl: './ei-alumni-management.component.html',
  styleUrls: ['./ei-alumni-management.component.css']
})
export class EiAlumniManagementComponent implements OnInit {
 courseWiseStudentCount:any={};
  courseWiseStudentCountCourse:any=[];
   constructor(private router: Router, private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder,
    private alert: NotificationService) { }
ngOnInit(): void {
	  //this.courseWiseStudentCount.coursedata=[];
	  //this.courseWiseStudentCount.countdata=[];
	  this.getuminiDashboard();
  }
  getuminiDashboard(){
	    try{
      this.SpinnerService.show(); 
     
      this.eiService.getuminiDashboard().subscribe(res => {
        this.SpinnerService.hide(); 
        let response:any={};
        response=res;
        
		 if(response.status==true)
		{
			console.log(response.results);
		this.courseWiseStudentCount=response.results;	
		}else{
      this.SpinnerService.hide(); 
      this.alert.error(response.error.message[0], 'Error')
		}
		
        
       
        },(error) => {
          this.SpinnerService.hide(); 
          console.log(error);
          this.alert.error(error, 'Error')
        });
    }catch(err){
      this.SpinnerService.hide(); 
      console.log(err);
      this.alert.error(err, 'Error')
    }
  }

  goToEiAlumniListPage(){
    this.router.navigate(['ei/alumni-list']);
  }

  goToEiVerifiedAlumniPage(){
    this.router.navigate(['ei/alumni-list']);
  }

  goToEiUnverifiedAlumniPage(){
    this.router.navigate(['ei/alumni-list']);
  }

}
