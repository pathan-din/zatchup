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
permission:any;
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
    if(sessionStorage.getItem("permission")){
      this.permission = JSON.parse(sessionStorage.getItem("permission"));
    }
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
    this.SpinnerService.hide(); 
    localStorage.clear();
    sessionStorage.clear();
	  this.router.navigate(['ei/login']);
  }

  isValidModule(module_code){
    let moduleList:any={};
    if(this.permission!==undefined && this.permission!==null && this.permission!==''){
        moduleList = this.permission;
        var data = moduleList.find(el => {
          return el.module_code ==   module_code
        })
         
        
        if(data)
        {
          return data.is_access;
        }else{
          return false;
        }
        
    }else{
      return true;
    }
    
    
  }
}
