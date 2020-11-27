import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { EiAlumniHistoryComponent } from './alumni/ei-alumni-history/ei-alumni-history.component';
import { EiAlumniListComponent } from './alumni/ei-alumni-list/ei-alumni-list.component';
import { EiAlumniManagementComponent } from './alumni/ei-alumni-management/ei-alumni-management.component';
import { EiAlumniProfileComponent } from './alumni/ei-alumni-profile/ei-alumni-profile.component';
import { EiUnverifiedAlumniComponent } from './alumni/ei-unverified-alumni/ei-unverified-alumni.component';
import { EiVerifiedAlumniComponent } from './alumni/ei-verified-alumni/ei-verified-alumni.component';
import { EiEcertificateEresultComponent } from './certificate-results/ei-ecertificate-eresult/ei-ecertificate-eresult.component';
import { EiEcertificateComponent } from './certificate-results/ei-ecertificate/ei-ecertificate.component';
import { EiEresultPreviewComponent } from './certificate-results/ei-eresult-preview/ei-eresult-preview.component';
import { EiEresultReportCreateComponent } from './certificate-results/ei-eresult-report-create/ei-eresult-report-create.component';
import { EiDashboardComponent } from './ei-dashboard/ei-dashboard.component';
import { EiLoginComponent } from './ei-login/ei-login.component';
import { EiNotificationComponent } from './ei-notification/ei-notification.component';
import { EiInvoiceComponent } from './invoice/ei-invoice/ei-invoice.component';
import { EiManageCoursesAddComponent } from './manage-course/ei-manage-courses-add/ei-manage-courses-add.component';
import { EiManageCoursesComponent } from './manage-course/ei-manage-courses/ei-manage-courses.component';
import { EiManageCoursesDetailsComponent } from './manage-course/ei-manage-courses-details/ei-manage-courses-details.component';
import { EiChequeDetailsComponent } from './registration/ei-cheque-details/ei-cheque-details.component';
import { EiContactUsComponent } from './registration/ei-contact-us/ei-contact-us.component';
import { EiCourierDetailsComponent } from './registration/ei-courier-details/ei-courier-details.component';
import { EiCreateNewPasswordComponent } from './registration/ei-create-new-password/ei-create-new-password.component';
import { EiForgetPasswordComponent } from './registration/ei-forget-password/ei-forget-password.component';
import { EiKycVerificationComponent } from './registration/ei-kyc-verification/ei-kyc-verification.component';
import { EiMobileVerificationComponent } from './registration/ei-mobile-verification/ei-mobile-verification.component';
import { EiOnboardingProcessComponent } from './registration/ei-onboarding-process/ei-onboarding-process.component';
import { EiOtpVerificationComponent } from './registration/ei-otp-verification/ei-otp-verification.component';
import { EiPaymentComponent } from './registration/ei-payment/ei-payment.component';
import { EiSchoolPostAddComponent } from './school/ei-school-post-add/ei-school-post-add.component';
import { EiSchoolPostComponent } from './school/ei-school-post/ei-school-post.component';
import { EiSchoolProfileComponent } from './school/ei-school-profile/ei-school-profile.component';
import { EiSchoolRegisterComponent } from './school/ei-school-register/ei-school-register.component';
import { EiStarclassAudienceStudentListComponent } from './starclass/ei-starclass-audience-student-list/ei-starclass-audience-student-list.component';
import { EiStarclassAudienceComponent } from './starclass/ei-starclass-audience/ei-starclass-audience.component';
import { EiStarclassCartComponent } from './starclass/ei-starclass-cart/ei-starclass-cart.component';
import { EiStarclassCourseAddComponent } from './starclass/ei-starclass-course-add/ei-starclass-course-add.component';
import { EiStarclassCourseHistoryComponent } from './starclass/ei-starclass-course-history/ei-starclass-course-history.component';
import { EiStarclassCoursesPreviewComponent } from './starclass/ei-starclass-courses-preview/ei-starclass-courses-preview.component';
import { EiStarclassCoursesUploadedByEiComponent } from './starclass/ei-starclass-courses-uploaded-by-ei/ei-starclass-courses-uploaded-by-ei.component';
import { EiStarclassEditRightTeacherComponent } from './starclass/ei-starclass-edit-right-teacher/ei-starclass-edit-right-teacher.component';
import { EiStarclassLectureDetailsComponent } from './starclass/ei-starclass-lecture-details/ei-starclass-lecture-details.component';
import { EiStarclassLectureEditComponent } from './starclass/ei-starclass-lecture-edit/ei-starclass-lecture-edit.component';
import { EiStarclassLectureHistoryComponent } from './starclass/ei-starclass-lecture-history/ei-starclass-lecture-history.component';
import { EiStarclassLectureUploadComponent } from './starclass/ei-starclass-lecture-upload/ei-starclass-lecture-upload.component';
import { EiStarclassPaymentComponent } from './starclass/ei-starclass-payment/ei-starclass-payment.component';
import { EiStarclassComponent } from './starclass/ei-starclass/ei-starclass.component';
import { EiStudentApprovalsComponent } from './student/ei-student-approvals/ei-student-approvals.component';
import { EiStudentBulkAddComponent } from './student/ei-student-bulk-add/ei-student-bulk-add.component';
import { EiStudentChangeBulkClassComponent } from './student/ei-student-change-bulk-class/ei-student-change-bulk-class.component';
import { EiStudentEditComponent } from './student/ei-student-edit/ei-student-edit.component';
import { EiStudentHistoryComponent } from './student/ei-student-history/ei-student-history.component';
import { EiStudentListComponent } from './student/ei-student-list/ei-student-list.component';
import { EiStudentManagementComponent } from './student/ei-student-management/ei-student-management.component';
import { EiStudentPendingVerificationComponent } from './student/ei-student-pending-verification/ei-student-pending-verification.component';
import { EiStudentProfileComponent } from './student/ei-student-profile/ei-student-profile.component';
import { EiStudentSummaryComponent } from './student/ei-student-summary/ei-student-summary.component';
import { EiStudentVerifiedListComponent } from './student/ei-student-verified-list/ei-student-verified-list.component';
import { EiLoginSubadminComponent } from './subadmin/ei-login-subadmin/ei-login-subadmin.component';
import { EiSubadminAccessHistoryComponent } from './subadmin/ei-subadmin-access-history/ei-subadmin-access-history.component';
import { EiSubadminAccessComponent } from './subadmin/ei-subadmin-access/ei-subadmin-access.component';
import { EiSubadminAdditionalComponent } from './subadmin/ei-subadmin-additional/ei-subadmin-additional.component';
import { EiSubadminDetailsComponent } from './subadmin/ei-subadmin-details/ei-subadmin-details.component';
import { EiSubadminEmployeeContactComponent } from './subadmin/ei-subadmin-employee-contact/ei-subadmin-employee-contact.component';
import { EiSubadminEmployeeComponent } from './subadmin/ei-subadmin-employee/ei-subadmin-employee.component';
import { EiSubadminManagementComponent } from './subadmin/ei-subadmin-management/ei-subadmin-management.component';
import { EiSubadminModuleAccessHistoryComponent } from './subadmin/ei-subadmin-module-access-history/ei-subadmin-module-access-history.component';
import { EiSubadminModuleWiseComponent } from './subadmin/ei-subadmin-module-wise/ei-subadmin-module-wise.component';
import { EiSubadminRegisterComponent } from './subadmin/ei-subadmin-register/ei-subadmin-register.component';
import { EiSubadminStatusListComponent } from './subadmin/ei-subadmin-status-list/ei-subadmin-status-list.component';
import { EiSubadminViewStatusComponent } from './subadmin/ei-subadmin-view-status/ei-subadmin-view-status.component';
import { EiSubscriptionComponent } from './subscription/ei-subscription/ei-subscription.component';
import { AddComponent } from './project/add/add.component';
import { CommentComponent } from './project/comment/comment.component';
import { DetailsComponent } from './project/details/details.component';
import { EditComponent } from './project/edit/edit.component';
import { ListCompleteComponent } from './project/list-complete/list-complete.component';
import { ListOngoingComponent } from './project/list-ongoing/list-ongoing.component';
import { ProgressComponent } from './project/progress/progress.component';
import { BankDetailsComponent } from './bank-information/bank-details/bank-details.component';
import { InformationAndBankComponent } from './bank-information/information-and-bank/information-and-bank.component';
import { PersonalInformationComponent } from './bank-information/personal-information/personal-information.component';
import { ViewChangesRequestStatusComponent } from './bank-information/view-changes-request-status/view-changes-request-status.component';
import { StudentsListComponent } from './message/students-list/students-list.component';
import { TeacherListComponent } from './message/teacher-list/teacher-list.component';
import { EiMessagesComponent } from './message/ei-messages/ei-messages.component';
import { GroupChatComponent } from './message/group-chat/group-chat.component';
import { CreateGroupChatComponent } from './message/create-group-chat/create-group-chat.component';
import { StudentsMessagesComponent } from './message/students-messages/students-messages.component';
import { TeacherMessagesComponent } from './message/teacher-messages/teacher-messages.component';
import { MessagesComponent } from './message/messages/messages.component';
import { MessagesDetailsComponent } from './message/messages-details/messages-details.component';
import { PersonalMessagesComponent } from './message/personal-messages/personal-messages.component';
import { SubadminAddComponent } from './subadmin/subadmin-add/subadmin-add.component';
import { SubadminPendingAccessComponent } from './subadmin/subadmin-pending-access/subadmin-pending-access.component';
import { SubadminPendingRequestComponent } from './subadmin/subadmin-pending-request/subadmin-pending-request.component';
import { SubadminRequestChangingComponent } from './subadmin/subadmin-request-changing/subadmin-request-changing.component';
import { AboutUsComponent } from './setting/about-us/about-us.component';
import { ChangePasswordComponent } from './setting/change-password/change-password.component';
import { ContactComponent } from './setting/contact/contact.component';
import { PersonalComponent } from './setting/personal/personal.component';
import { PrivacyComponent } from './setting/privacy/privacy.component';
import { SettingComponent } from './setting/setting/setting.component';
import { TermsConditionsComponent } from './setting/terms-conditions/terms-conditions.component';
import { EiPageNotFoundComponent } from './ei-page-not-found/ei-page-not-found.component';
import { EiSubscriptionUpdateComponent } from './subscription/ei-subscription-update/ei-subscription-update.component';
import { AddAdvertisementsComponent } from './advertisement/add-advertisements/add-advertisements.component';
import { AdvertiseWithZatchupComponent } from './advertisement/advertise-with-zatchup/advertise-with-zatchup.component';
import { AdvertisementsDetailsComponent } from './advertisement/advertisements-details/advertisements-details.component';
import { PastAdvertisementsComponent } from './advertisement/past-advertisements/past-advertisements.component';
import { AuthorisationsComponent } from './authorisation/authorisations/authorisations.component';
import { AuthorisationsHistoryComponent } from './authorisation/authorisations-history/authorisations-history.component';
import { AuthorisationsRequestComponent } from './authorisation/authorisations-request/authorisations-request.component';
import { ViewEiProfileAndTimelineComponent } from './authorisation/view-ei-profile-and-timeline/view-ei-profile-and-timeline.component';
import { ReminderComponent } from './reminder/reminder/reminder.component';
import { ReminderAddComponent } from './reminder/reminder-add/reminder-add.component';
import { ReminderListComponent } from './reminder/reminder-list/reminder-list.component';
import { ReminderPastComponent } from './reminder/reminder-past/reminder-past.component';
import { MyPocDetailsComponent } from './my-poc-details/my-poc-details.component';
import { SearchComponent } from '../admin/ei/search/search.component';
import { EiSearchComponent } from './ei-search/ei-search.component';


const routes: Routes = [
  {
    path: '', component: EiLoginComponent
  },
  {
    path: 'login', component: EiLoginComponent
  },
  {
    path: 'forgot-password', component: EiForgetPasswordComponent
  },
  {
    path: 'otp-verification', component: EiOtpVerificationComponent
  },
  {
    path: 'mobile-verification', component: EiMobileVerificationComponent
  },
  {
    path: 'contact-us', component: EiContactUsComponent
  },
  {
    path: 'create-new-password', component: EiCreateNewPasswordComponent
  },
  {
    path: 'login-subadmin', component: EiLoginSubadminComponent
  },
  {
    path: 'courier-details', component: EiCourierDetailsComponent
  },
  {
    path: 'subadmin-registration', component: EiSubadminRegisterComponent
  },
  {
    path: 'payment', component: EiPaymentComponent
  },
  {
    path: 'onboarding-process', component: EiOnboardingProcessComponent
  },
  {
    path: 'school-registration', component: EiSchoolRegisterComponent
  },
  {
    path: 'cheque-details', component: EiChequeDetailsComponent
  },
  {
    path: 'kyc-verification', component: EiKycVerificationComponent
  },
  {
    path: 'sub-admin-employee', component: EiSubadminEmployeeComponent
  },
  {
    path: 'subadmin-employee-contact', component: EiSubadminEmployeeContactComponent
  },
  {
    path: 'dashboard', component: EiDashboardComponent
  },
  {
    path: 'subadmin-additional', component: EiSubadminAdditionalComponent
  },
  {
    path: 'school-profile', component: EiSchoolProfileComponent
  },
  {
    path: 'school-post', component: EiSchoolPostComponent
  },
  {
    path: 'school-post-add', component: EiSchoolPostAddComponent
  },
  {
    path: 'alumni-management', component: EiAlumniManagementComponent
  },
  {
    path: 'alumni-profile', component: EiAlumniProfileComponent
  },
  {
    path: 'alumni-history', component: EiAlumniHistoryComponent
  },
  {
    path: 'alumni-list', component: EiAlumniListComponent
  },
  {
    path: 'verified-alumni', component: EiVerifiedAlumniComponent
  },
  {
    path: 'unverified-alumni', component: EiUnverifiedAlumniComponent
  },
  {
    path: 'student-management', component: EiStudentManagementComponent
  },
  {
    path: 'manage-courses-add', component: EiManageCoursesAddComponent
  },


  {
    path: 'student-summary', component: EiStudentSummaryComponent
  },
  {
    path: 'student-list', component: EiStudentListComponent
  },
  {
    path: 'student-approvals', component: EiStudentApprovalsComponent
  },
  {
    path: 'student-bulk-add', component: EiStudentBulkAddComponent
  },
  {
    path: 'student-change-bulk-class', component: EiStudentChangeBulkClassComponent
  },
  {
    path: 'student-edit', component: EiStudentEditComponent
  },
  {
    path: 'student-profile', component: EiStudentProfileComponent
  },
  {
    path: 'student-history', component: EiStudentHistoryComponent
  },
  {
    path: 'student-pending-verification', component: EiStudentPendingVerificationComponent
  },
  {
    path: 'student-verified-list', component: EiStudentVerifiedListComponent
  },
  {
    path: 'subadmin-management', component: EiSubadminManagementComponent
  },
  {
    path: 'subadmin-access', component: EiSubadminAccessComponent
  },
  {
    path: 'subadmin-access-history', component: EiSubadminAccessHistoryComponent
  },
  {
    path: 'subadmin-module-access-history', component: EiSubadminModuleAccessHistoryComponent
  },
  {
    path: 'subadmin-details', component: EiSubadminDetailsComponent
  },
  {
    path: 'subadmin-module-wise', component: EiSubadminModuleWiseComponent
  },
  {
    path: 'subadmin-status-list', component: EiSubadminStatusListComponent
  },
  {
    path: 'subadmin-view-status', component: EiSubadminViewStatusComponent
  },
  {
    path: 'manage-courses', component: EiManageCoursesComponent
  },
  {
    path: 'manage-courses-details/:id', component: EiManageCoursesDetailsComponent
  },
  {
    path: 'subscription', component: EiSubscriptionComponent
  },
  {
    path: 'invoice', component: EiInvoiceComponent
  },
  {
    path: 'notification', component: EiNotificationComponent
  },
  {
    path: 'ecertificat-eresult', component: EiEcertificateEresultComponent
  },
  {
    path: 'ecertificate', component: EiEcertificateComponent
  },
  {
    path: 'eresult-report-create', component: EiEresultReportCreateComponent
  },
  {
    path: 'eresult-preview', component: EiEresultPreviewComponent
  },
  {
    path: 'star-class', component: EiStarclassComponent
  },
  {
    path: 'star-class-courses-uploaded-by-ei', component: EiStarclassCoursesUploadedByEiComponent
  },
  {
    path: 'star-class-audience', component: EiStarclassAudienceComponent
  },
  {
    path: 'star-class-edit-right-teacher', component: EiStarclassEditRightTeacherComponent
  },
  {
    path: 'star-class-lecture-edit', component: EiStarclassLectureEditComponent
  },
  {
    path: 'star-class-lecture-history', component: EiStarclassLectureHistoryComponent
  },
  {
    path: 'star-class-lecture-upload', component: EiStarclassLectureUploadComponent
  },
  {
    path: 'star-class-lecture-details', component: EiStarclassLectureDetailsComponent
  },
  {
    path: 'star-class-course-history', component: EiStarclassCourseHistoryComponent
  },
  {
    path: 'star-class-courses-preview', component: EiStarclassCoursesPreviewComponent
  },
  {
    path: 'star-class-audience-student-list', component: EiStarclassAudienceStudentListComponent
  },
  {
    path: 'star-class-cart', component: EiStarclassCartComponent
  },
  {
    path: 'star-class-payment', component: EiStarclassPaymentComponent
  },
  {
    path: 'star-class-course-add', component: EiStarclassCourseAddComponent
  },
  {
    path: 'add', component: AddComponent
  },
  {
    path: 'comment', component: CommentComponent
  },
  {
    path: 'details', component: DetailsComponent
  },
  {
    path: 'edit', component: EditComponent
  },
  {
    path: 'list-complete', component: ListCompleteComponent
  },
  {
    path: 'list-ongoing', component: ListOngoingComponent
  },
  {
    path: 'progress', component: ProgressComponent
  },
  {
    path: 'bank-details', component: BankDetailsComponent
  },
  {
    path: 'information-and-bank', component: InformationAndBankComponent
  },
  {
    path: 'personal-information', component: PersonalInformationComponent
  },
  {
    path: 'view-changes-request-status', component: ViewChangesRequestStatusComponent
  },
  {
    path: 'students-list', component: StudentsListComponent
  },
  {
    path: 'teacher-list', component: TeacherListComponent
  },
  {
    path: 'ei-messages', component: EiMessagesComponent
  },
  {
    path: 'group-chat', component: GroupChatComponent
  },
  {
    path: 'create-group-chat', component: CreateGroupChatComponent
  },
  {
    path: 'students-messages', component: StudentsMessagesComponent
  },
  {
    path: 'teacher-messages', component: TeacherMessagesComponent
  },
  {
    path: 'messages', component: MessagesComponent
  },
  {
    path: 'messages-details', component: MessagesDetailsComponent
  },
  {
    path: 'personal-messages', component: PersonalMessagesComponent
  },
  {
    path: 'subadmin-add', component: SubadminAddComponent
  },
  {
    path: 'subadmin-pending-access', component: SubadminPendingAccessComponent
  },
  {
    path: 'subadmin-pending-request', component: SubadminPendingRequestComponent
  },
  {
    path: 'subadmin-request-changing', component: SubadminRequestChangingComponent
  },
  {
    path: 'about-us', component: AboutUsComponent
  },
  {
    path: 'change-password', component: ChangePasswordComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'personal', component: PersonalComponent
  },
  {
    path: 'privacy', component: PrivacyComponent
  },
  {
    path: 'setting', component: SettingComponent
  },
  {
    path: 'terms-conditions', component: TermsConditionsComponent
  },
  {
    path: 'add-subscription', component: EiSubscriptionUpdateComponent
  },
  {
    path: 'add-advertisements', component: AddAdvertisementsComponent
  },
  {
    path: 'advertise-with-zatchup', component: AdvertiseWithZatchupComponent
  },
  {
    path: 'advertisements-details', component: AdvertisementsDetailsComponent
  },
  {
    path: 'past-advertisements', component: PastAdvertisementsComponent
  },
  {
    path: 'authorisations', component: AuthorisationsComponent
  },
  {
    path: 'authorisations-history', component: AuthorisationsHistoryComponent
  },
  {
    path: 'authorisations-request', component: AuthorisationsRequestComponent
  },
  {
    path: 'view-ei-profile-and-timeline', component: ViewEiProfileAndTimelineComponent
  },
  {
    path: 'reminder', component: ReminderComponent
  },
  {
    path: 'reminder-add', component: ReminderAddComponent
  },
  {
    path: 'reminder-list', component: ReminderListComponent
  },
  {
    path: 'reminder-past', component: ReminderPastComponent
  },
  {
    path: 'my-poc-details', component: MyPocDetailsComponent
  },
  {
    path: 'ei-search', component: EiSearchComponent
  },







  
  {
   path: '**', component: EiPageNotFoundComponent
  }


//  {
//     path: "**", 
//     redirectTo: '/404'
//  }


  ]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EIWebRoutingModule {
}
