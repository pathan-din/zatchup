import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
  import { environment } from '../../../environments/environment'

import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel'
import { UserhomeComponent } from './userhome/userhome.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { UserKycVerificationComponent } from './user-kyc-verification/user-kyc-verification.component';
import { UserQualificationComponent } from './user-qualification/user-qualification.component';
import { UserWorkDetailComponent } from './user-work-detail/user-work-detail.component';
import { UserKycSuccessfulDoneComponent } from './user-kyc-successful-done/user-kyc-successful-done.component';
import { UserSchoolConfirmationComponent } from './user-school-confirmation/user-school-confirmation.component';
import { UserCongratulationComponent } from './user-congratulation/user-congratulation.component';
import { UserAddEiComponent } from './user-add-ei/user-add-ei.component';
import { UserEiProfileComponent } from './user-ei-profile/user-ei-profile.component';
import { UserEiProfileNotOnboardComponent } from './user-ei-profile-not-onboard/user-ei-profile-not-onboard.component';
import { UserEiConfirmationComponent } from './user-ei-confirmation/user-ei-confirmation.component';
import { UserAddCourseComponent } from './user-add-course/user-add-course.component';
import { UserAddMoreEiComponent } from './user-add-more-ei/user-add-more-ei.component';
import { UserAddMoreStandardComponent } from './user-add-more-standard/user-add-more-standard.component';
import { UserProfileCreatedSuccessfullyComponent } from './user-profile-created-successfully/user-profile-created-successfully.component';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { UserMySchoolTabComponent } from './user-my-school-tab/user-my-school-tab.component';
import { UserCertificateComponent } from './user-certificate/user-certificate.component';
import { UserZatchupStarClassComponent } from './user-zatchup-star-class/user-zatchup-star-class.component';
import { UserProjectFundingComponent } from './user-project-funding/user-project-funding.component';
import { UserFundingDetailsComponent } from './user-funding-details/user-funding-details.component';
import { UserLectureRequestComponent } from './user-lecture-request/user-lecture-request.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';
import { UserRemaindersComponent } from './user-remainders/user-remainders.component';
import { UserMyBuddiesComponent } from './user-my-buddies/user-my-buddies.component';
import { UserMyEducationalProfileComponent } from './user-my-educational-profile/user-my-educational-profile.component';
import { UserCreatePostComponent } from './user-create-post/user-create-post.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserSchoolProfileComponent } from './user-school-profile/user-school-profile.component';
import { UserMyProfileComponent } from './user-my-profile/user-my-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
import { AddNewCourseComponent } from './add-new-course/add-new-course.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AboutUsComponent } from './user-info/about-us/about-us.component';
import { ServiceComponent } from './user-info/service/service.component';
import { CareerComponent } from './user-info/career/career.component';
import { ContactUsComponent } from './user-info/contact-us/contact-us.component';
import { AddMoreCourseManuallyComponent } from './add-more-course-manually/add-more-course-manually.component';
import { AddPastEiComponent } from './add-past-ei/add-past-ei.component';
import { UserPageNotFoundComponent } from './user-page-not-found/user-page-not-found.component';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { MySchoolComponent } from './my-school/my-school.component';
import { SharedModule } from 'src/app/common/shared.module';
import { ChatComponent } from './chat/chat.component';
import { StartNewChatComponent } from './start-new-chat/start-new-chat.component';
import { CreateGroupChatComponent } from './create-group-chat/create-group-chat.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { UserPersonalInformationComponent } from './user-personal-information/user-personal-information.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { PendingRequestForUserComponent } from './pending-request-for-user/pending-request-for-user.component';
import { SettingComponent } from './setting/setting.component';
import { PendingCourseDetailComponent } from './pending-course-detail/pending-course-detail.component';
import { ChatPrivacyComponent } from './chat-privacy/chat-privacy.component';
// import { AngularFireModule } from '@angular/fire';

@NgModule({

  declarations: [
    UserhomeComponent,
    UserHeaderComponent,
    UserFooterComponent,
    UserLoginComponent,
    UserSignUpComponent,
    UserKycVerificationComponent,
    UserQualificationComponent,
    UserWorkDetailComponent,
    UserKycSuccessfulDoneComponent,
    UserSchoolConfirmationComponent,
    UserCongratulationComponent,
    UserAddEiComponent,
    UserEiProfileComponent,
    UserEiProfileNotOnboardComponent,
    UserEiConfirmationComponent,
    UserAddCourseComponent,
    UserAddMoreEiComponent,
    UserAddMoreStandardComponent,
    UserProfileCreatedSuccessfullyComponent,
    UserLandingPageComponent,
    UserPaymentComponent,
    UserMySchoolTabComponent,
    UserCertificateComponent,
    UserZatchupStarClassComponent,
    UserProjectFundingComponent,
    UserFundingDetailsComponent,
    UserLectureRequestComponent,
    UserProfileComponent,
    UserNotificationsComponent,
    UserRemaindersComponent,
    UserMyBuddiesComponent,
    UserMyEducationalProfileComponent,
    UserCreatePostComponent,
    UserSearchComponent,
    UserSchoolProfileComponent,
    UserMyProfileComponent,
    UserForgotPasswordComponent,
    UserResetPasswordComponent,
    AddNewCourseComponent,
    AboutUsComponent,
    ServiceComponent,
    CareerComponent,
    ContactUsComponent,
    AddMoreCourseManuallyComponent,
    AddPastEiComponent,
    UserPageNotFoundComponent,
    MySchoolComponent,
    ChatComponent,
    StartNewChatComponent,
    CreateGroupChatComponent,
    CreateGroupComponent,
    UserPersonalInformationComponent,
    GroupDetailComponent,
    MessagesComponent,
    PendingRequestForUserComponent,
    SettingComponent,
    PendingCourseDetailComponent,
    ChatPrivacyComponent
  ],

  imports: [
    CommonModule,
    MaterialDesignModule,
    UserRoutingModule,
    
    TabsModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    DirectiveModule,
    SharedModule,
    CarouselModule.forRoot(),
    PaginationModule,
    // AngularFireModule.initializeApp(environment.firebase),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
