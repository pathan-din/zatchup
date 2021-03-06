import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { UserKycVerificationComponent } from './user-kyc-verification/user-kyc-verification.component';
import { UserQualificationComponent } from './user-qualification/user-qualification.component';
import { UserWorkDetailComponent } from './user-work-detail/user-work-detail.component';
import { UserSchoolConfirmationComponent } from './user-school-confirmation/user-school-confirmation.component';
import { UserKycSuccessfulDoneComponent } from './user-kyc-successful-done/user-kyc-successful-done.component';
import { UserCongratulationComponent } from './user-congratulation/user-congratulation.component';
import { UserAddCourseComponent } from './user-add-course/user-add-course.component';
import { UserAddEiComponent } from './user-add-ei/user-add-ei.component';
import { UserEiConfirmationComponent } from './user-ei-confirmation/user-ei-confirmation.component';
import { UserEiProfileComponent } from './user-ei-profile/user-ei-profile.component';
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
import { UserMyEducationalProfileComponent } from './user-my-educational-profile/user-my-educational-profile.component';
import { UserMyBuddiesComponent } from './user-my-buddies/user-my-buddies.component';
import { UserCreatePostComponent } from './user-create-post/user-create-post.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserSchoolProfileComponent } from './user-school-profile/user-school-profile.component';
import { UserMyProfileComponent } from './user-my-profile/user-my-profile.component';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { AddNewCourseComponent } from './add-new-course/add-new-course.component';
import { AboutUsComponent } from './user-info/about-us/about-us.component';
import { CareerComponent } from './user-info/career/career.component';
import { ContactUsComponent } from './user-info/contact-us/contact-us.component'
import { AddMoreCourseManuallyComponent } from './add-more-course-manually/add-more-course-manually.component'
import { AddPastEiComponent } from './add-past-ei/add-past-ei.component';
import { UserPageNotFoundComponent } from './user-page-not-found/user-page-not-found.component';
import { MySchoolComponent } from './my-school/my-school.component';
import { ChatComponent } from './chat/chat.component';
import { StartNewChatComponent } from './start-new-chat/start-new-chat.component';
import { CreateGroupChatComponent } from './create-group-chat/create-group-chat.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { UserPersonalInformationComponent } from './user-personal-information/user-personal-information.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { PendingRequestForUserComponent } from './pending-request-for-user/pending-request-for-user.component';
import { ServiceComponent } from './user-info/service/service.component';
import { SettingComponent } from './setting/setting.component';
import { PendingCourseDetailComponent } from './pending-course-detail/pending-course-detail.component';
import { ChatPrivacyComponent } from './chat-privacy/chat-privacy.component';
import { CommonTermsConditionsComponent } from 'src/app/common/common-terms-conditions/common-terms-conditions.component';
import { UserStarclassCourseListComponent } from './user-starclass-course-list/user-starclass-course-list.component';
import { UserStarclassCoursePreviewComponent } from './user-starclass-course-preview/user-starclass-course-preview.component';
import { UserLectureDetailsComponent } from './user-lecture-details/user-lecture-details.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StarclassMultipleEiComponent } from './starclass-multiple-ei/starclass-multiple-ei.component';
import { PlayHistoryComponent } from './play-history/play-history.component';


const routes: Routes = [
  {
    path: '', component: UserSignUpComponent
  },
  {
    path: 'user', component: UserSignUpComponent
  },
  {
    path: 'user/terms-conditions/:type/:action', component: CommonTermsConditionsComponent
  },
  {
    path: 'user/login', component: UserLoginComponent
  },
  {
    path: 'user/signup', component: UserSignUpComponent
  },
  {
    path: 'user/forgot-password', component: UserForgotPasswordComponent
  },
  {
    path: 'user/create-new-password', component: UserResetPasswordComponent
  },
  {
    path: 'user/kyc-verification', component: UserKycVerificationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/Kyc-successful-done', component: UserKycSuccessfulDoneComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/qualification', component: UserQualificationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/work-detail', component: UserWorkDetailComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/school-confirmation', component: UserSchoolConfirmationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/congratulation', component: UserCongratulationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/add-ei', component: UserAddEiComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/ei-profile', component: UserEiProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/add-new-course', component: AddNewCourseComponent, canActivate: [AuthGuard]
  },

  {
    path: 'user/add-course', component: UserAddCourseComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/add-more-standard', component: UserAddMoreStandardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/add-more-ei', component: UserAddMoreEiComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/ei-confirmation', component: UserEiConfirmationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/profile-created', component: UserProfileCreatedSuccessfullyComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/landing-page', component: UserLandingPageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/payment-page', component: UserPaymentComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/my-school-tab', component: UserMySchoolTabComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/certificate', component: UserCertificateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/zatchup-star-class', component: UserZatchupStarClassComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/project-funding', component: UserProjectFundingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/funding-details', component: UserFundingDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/lecture-request', component: UserLectureRequestComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/home', component: UserhomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/notifications', component: UserNotificationsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/reminders', component: UserRemaindersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/search', component: UserSearchComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/my-educational-profile', component: UserMyEducationalProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/my-buddies', component: UserMyBuddiesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/create-post', component: UserCreatePostComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/school-profile', component: UserSchoolProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/career', component: CareerComponent, canActivate: [AuthGuard]
  },

  {
    path: 'user/about-us', component: AboutUsComponent
  },
  {
    path: 'user/services', component: ServiceComponent
  },
  {
    path: 'user/contact-us', component: ContactUsComponent, canActivate: [AuthGuard]
  }
  ,
  {
    path: 'user/add-more-course', component: AddMoreCourseManuallyComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/add-past-ei', component: AddPastEiComponent, canActivate: [AuthGuard]
  },

  {
    path: 'user/my-school', component: MySchoolComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/add-personal-info', component: UserPersonalInformationComponent, canActivate: [AuthGuard]
  },

  {
    path: 'user/chat', component: ChatComponent, canActivate: [AuthGuard]
  },

  {
    path: 'user/new-chat', component: StartNewChatComponent, canActivate: [AuthGuard]
  },

  {
    path: 'user/group-chat', component: CreateGroupChatComponent, canActivate: [AuthGuard]
  },

  {
    path: 'user/create-group', component: CreateGroupComponent, canActivate: [AuthGuard]
  },

  {
    path: 'user/group-detail', component: GroupDetailComponent, canActivate: [AuthGuard]
  },

  {
    path: 'user/messages', component: MessagesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/pending-request', component: PendingRequestForUserComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/pending-course-details', component: PendingCourseDetailComponent, canActivate: [AuthGuard]
  },
  //

  {
    path: 'user/setting', component: SettingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/chat-privacy', component: ChatPrivacyComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/starclass-course-list', component:UserStarclassCourseListComponent, canActivate:[AuthGuard]
  },
  {
    path: 'user/starclass-course-view/:id', component:UserStarclassCoursePreviewComponent, canActivate:[AuthGuard]
  },
  {
    path: 'user/user-lecture-details', component: UserLectureDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/multiple-ei', component:StarclassMultipleEiComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user/playHistory', component:PlayHistoryComponent, canActivate: [AuthGuard]
  },


  {
    path: '**', component: UserPageNotFoundComponent
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
