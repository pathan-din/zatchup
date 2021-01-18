import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; 
 
@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  public env:any= environment ;
  public  globalYear:any = 1970; 
  constructor(private http: HttpClient) { }


  /*
  For Login Api 
  API Name : login
  prameter : username(email/mobile) and Password 
  Response : Json Object 
  */

  login(data) {return this.http.post(this.env.apiUrl+'login/', data);}
  

  /*
  For Otp Verify
  API Name : Otp
  prameter: username(email/mobile )
  */
 verifyOtp(data) {return this.http.post(this.env.apiUrl+'verify-otp/', data);}


  /*
  For Register Api 
  API Name : Register
  password(alphabet,numaric,special charactor ,8 charactor min limit)
  */
 register(data) {return this.http.post(this.env.apiUrl+'register/', data);}

  /*
  For Verify Otp Register Api 
  API Name : user-verify
  Parameter : Username(email/mobile) and OTP goted by email OR mobile number
  */
 verifyOtpViaRegister(data) {return this.http.post(this.env.apiUrl+'user-verify/', data);}

 /*
  For Resend Otp Register Api 
  API Name : resendOtp
  
  */
 resendOtpViaRegister(data) {return this.http.post(this.env.apiUrl+'resend-otp/', data);}
  /*
  For KYC Upload Api 
  API Name : addKyc
  Parameter : Kyc Type,Id Depend on Kyc type,Document Upload,Date of birth
  */
 addKyc(data) {return this.http.post(this.env.apiUrl+'kyc-upload/', data);}

   /*
  For KYC Upload Api 
  API Name : addKyc
  Parameter : Kyc Type,Id Depend on Kyc type,Document Upload,Date of birth
  */
 addRequestSendKyc(data) {return this.http.post(this.env.apiUrl+'upload-ekyc-for-detail-change/', data);}


 /*
  For Get Qualification Type
  API Name : user/qualificationtype/
   
  */
 qualificationtype(data) {return this.http.get(this.env.apiUrl+'qualificationtype/', data);}
 
}

