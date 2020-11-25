import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EiServiceService } from '../../../services/EI/ei-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-ei-sidenav',
  templateUrl: './ei-sidenav.component.html',
  styleUrls: ['./ei-sidenav.component.css']
})
export class EiSidenavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    small = false;
    userProfile:any={};
  constructor(private breakpointObserver: BreakpointObserver,private router: Router, private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public formBuilder: FormBuilder) {

    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.small = true;
        console.log(
          'Matches small viewport or handset in portrait mode'
        );
      } else {
        this.small = false;
      }
    });

  }
  ngOnInit(): void {
	  this.getDasboardDetails();
  }
  getDasboardDetails(){
	  try{
      this.SpinnerService.show(); 
     
      this.eiService.getEiProfileData().subscribe(res => {
        
        let response:any={};
        response=res;
        if(response.status==true)
        {
          this.SpinnerService.hide(); 
		      this.userProfile=response;
        }else{
          this.SpinnerService.hide(); 
		    
        }
        
        
       
        },(error) => {
          this.SpinnerService.hide(); 
          console.log(error);
        });
    }catch(err){
      this.SpinnerService.hide(); 
      console.log(err);
    }	
  }
  logout(){
	  localStorage.clear();
	  this.router.navigate(['ei/login']);
  }
  goToEiDashboardPage() {
    this.router.navigate(['ei/dashboard']);
  }

  goToEiSchoolProfilePage() {
    this.router.navigate(['ei/school-profile']);
  }


  goToEiAlumniManagementPage() {
    this.router.navigate(['ei/alumni-management']);
  }

  goToEiStudentManagementPage() {
    this.router.navigate(['ei/student-management']);
  }

  goToEiSubadminManagementPage(){
    this.router.navigate(['ei/subadmin-management']);
  }

  goToEiEcertificateEresultPage() {
    this.router.navigate(['ei/ecertificat-eresult']);
  }

  goToEiManageCoursesPage() {
    this.router.navigate(['ei/manage-courses']);
  }

  goToEiSubscriptionPage() {
    this.router.navigate(['ei/subscription']);
  }

  goToEiInvoicePage() {
    this.router.navigate(['ei/invoice']);
  }

  goToEiNotificationPage() {
    this.router.navigate(['ei/notification']);
  }
}
