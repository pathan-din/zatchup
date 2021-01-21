import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EIWebRoutingModule } from './ei-routing.module';
import { EiLoginComponent } from './ei-login/ei-login.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { NgxPaginationModule } from 'ngx-pagination';
import { EiForgetPasswordComponent } from './registration/ei-forget-password/ei-forget-password.component';
import { EiMobileVerificationComponent } from './registration/ei-mobile-verification/ei-mobile-verification.component';
import { EiOtpVerificationComponent } from './registration/ei-otp-verification/ei-otp-verification.component';
import { EiContactUsComponent } from './registration/ei-contact-us/ei-contact-us.component';
import { EiCreateNewPasswordComponent } from './registration/ei-create-new-password/ei-create-new-password.component';
import { EiLoginSubadminComponent } from './subadmin/ei-login-subadmin/ei-login-subadmin.component';
import { EiCourierDetailsComponent } from './registration/ei-courier-details/ei-courier-details.component';
import { EiSubadminRegisterComponent } from './subadmin/ei-subadmin-register/ei-subadmin-register.component';
import { EiPaymentComponent } from './registration/ei-payment/ei-payment.component';
import { EiOnboardingProcessComponent } from './registration/ei-onboarding-process/ei-onboarding-process.component';
import { EiChequeDetailsComponent } from './registration/ei-cheque-details/ei-cheque-details.component';
import { EiSubadminAdditionalComponent } from './subadmin/ei-subadmin-additional/ei-subadmin-additional.component';
import { EiKycVerificationComponent } from './registration/ei-kyc-verification/ei-kyc-verification.component';
import { EiSubadminEmployeeComponent } from './subadmin/ei-subadmin-employee/ei-subadmin-employee.component';
import { EiSubadminEmployeeContactComponent } from './subadmin/ei-subadmin-employee-contact/ei-subadmin-employee-contact.component';
import { EiSidenavComponent } from './ei-sidenav/ei-sidenav.component';
import { EiSchoolProfileComponent } from './school/ei-school-profile/ei-school-profile.component';
import { EiSchoolPostComponent } from './school/ei-school-post/ei-school-post.component';
import { EiSchoolPostAddComponent } from './school/ei-school-post-add/ei-school-post-add.component';
import { EiAlumniProfileComponent } from './alumni/ei-alumni-profile/ei-alumni-profile.component';
import { EiAlumniManagementComponent } from './alumni/ei-alumni-management/ei-alumni-management.component';
import { EiAlumniHistoryComponent } from './alumni/ei-alumni-history/ei-alumni-history.component';
import { EiAlumniListComponent } from './alumni/ei-alumni-list/ei-alumni-list.component';
import { EiUnverifiedAlumniComponent } from './alumni/ei-unverified-alumni/ei-unverified-alumni.component';
import { EiVerifiedAlumniComponent } from './alumni/ei-verified-alumni/ei-verified-alumni.component';
import { EiStudentManagementComponent } from './student/ei-student-management/ei-student-management.component';
import { EiEcertificateCreateFormatComponent } from './certificate-results/ei-ecertificate-create-format/ei-ecertificate-create-format.component';
import { EiEcertificateDraftComponent } from './certificate-results/ei-ecertificate-draft/ei-ecertificate-draft.component';
import { EiEcertificateEresultComponent } from './certificate-results/ei-ecertificate-eresult/ei-ecertificate-eresult.component';
import { EiEcertificateHistoryComponent } from './certificate-results/ei-ecertificate-history/ei-ecertificate-history.component';
import { EiEcertificateSaveFormateComponent } from './certificate-results/ei-ecertificate-save-formate/ei-ecertificate-save-formate.component';
import { EiEcertificateComponent } from './certificate-results/ei-ecertificate/ei-ecertificate.component';
import { EiEresultPreviewComponent } from './certificate-results/ei-eresult-preview/ei-eresult-preview.component';
import { EiEresultReportCreateComponent } from './certificate-results/ei-eresult-report-create/ei-eresult-report-create.component';
import { EiNotificationComponent } from './ei-notification/ei-notification.component';
import { EiInvoiceListComponent } from './invoice/ei-invoice-list/ei-invoice-list.component';
import { EiInvoiceComponent } from './invoice/ei-invoice/ei-invoice.component';
import { EiManageCoursesAddComponent } from './manage-course/ei-manage-courses-add/ei-manage-courses-add.component';
import { EiManageCoursesDetailsComponent } from './manage-course/ei-manage-courses-details/ei-manage-courses-details.component';
import { EiManageCoursesHistoryComponent } from './manage-course/ei-manage-courses-history/ei-manage-courses-history.component';
import { EiManageCoursesComponent } from './manage-course/ei-manage-courses/ei-manage-courses.component';
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
import { EiStudentPendingVerificationComponent } from './student/ei-student-pending-verification/ei-student-pending-verification.component';
import { EiStudentProfileComponent } from './student/ei-student-profile/ei-student-profile.component';
import { EiStudentSummaryComponent } from './student/ei-student-summary/ei-student-summary.component';
import { EiStudentVerifiedListComponent } from './student/ei-student-verified-list/ei-student-verified-list.component';
import { EiSubadminAccessHistoryComponent } from './subadmin/ei-subadmin-access-history/ei-subadmin-access-history.component';
import { EiSubadminAccessComponent } from './subadmin/ei-subadmin-access/ei-subadmin-access.component';
import { EiSubadminDetailsComponent } from './subadmin/ei-subadmin-details/ei-subadmin-details.component';
import { EiSubadminManagementComponent } from './subadmin/ei-subadmin-management/ei-subadmin-management.component';
import { EiSubadminModuleAccessHistoryComponent } from './subadmin/ei-subadmin-module-access-history/ei-subadmin-module-access-history.component';
import { EiSubadminModuleWiseComponent } from './subadmin/ei-subadmin-module-wise/ei-subadmin-module-wise.component';
import { EiSubadminStatusListComponent } from './subadmin/ei-subadmin-status-list/ei-subadmin-status-list.component';
import { EiSubadminViewStatusComponent } from './subadmin/ei-subadmin-view-status/ei-subadmin-view-status.component';
import { EiSubscriptionDetailsComponent } from './subscription/ei-subscription-details/ei-subscription-details.component';
import { EiSubscriptionUpdateComponent } from './subscription/ei-subscription-update/ei-subscription-update.component';
import { EiSubscriptionComponent } from './subscription/ei-subscription/ei-subscription.component';
import { EiDashboardComponent } from './ei-dashboard/ei-dashboard.component';
import { AddComponent } from './project/add/add.component';
import { CommentComponent } from './project/comment/comment.component';
import { DetailsComponent } from './project/details/details.component';
import { EditComponent } from './project/edit/edit.component';
import { ListCompleteComponent } from './project/list-complete/list-complete.component';
import { ListOngoingComponent } from './project/list-ongoing/list-ongoing.component';
import { ProgressComponent } from './project/progress/progress.component';
import { InformationAndBankComponent } from './bank-information/information-and-bank/information-and-bank.component';
import { PersonalInformationComponent } from './bank-information/personal-information/personal-information.component';
import { ViewChangesRequestStatusComponent } from './bank-information/view-changes-request-status/view-changes-request-status.component';
import { BankDetailsComponent } from './bank-information/bank-details/bank-details.component';
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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingComponent } from './setting/setting/setting.component';
import { ContactComponent } from './setting/contact/contact.component';
import { PersonalComponent } from './setting/personal/personal.component';
import { PrivacyComponent } from './setting/privacy/privacy.component';
import { TermsConditionsComponent } from './setting/terms-conditions/terms-conditions.component';
import { EiPageNotFoundComponent } from './ei-page-not-found/ei-page-not-found.component';
import { AddAdvertisementsComponent } from './advertisement/add-advertisements/add-advertisements.component';
import { PastAdvertisementsComponent } from './advertisement/past-advertisements/past-advertisements.component';
import { AdvertiseWithZatchupComponent } from './advertisement/advertise-with-zatchup/advertise-with-zatchup.component';
import { AdvertisementsDetailsComponent } from './advertisement/advertisements-details/advertisements-details.component';
import { AuthorisationsComponent } from './authorisation/authorisations/authorisations.component';
import { AuthorisationsRequestComponent } from './authorisation/authorisations-request/authorisations-request.component';
import { ViewEiProfileAndTimelineComponent } from './authorisation/view-ei-profile-and-timeline/view-ei-profile-and-timeline.component';
import { AuthorisationsHistoryComponent } from './authorisation/authorisations-history/authorisations-history.component';
import { ReminderComponent } from './reminder/reminder/reminder.component';
import { ReminderAddComponent } from './reminder/reminder-add/reminder-add.component';
import { ReminderListComponent } from './reminder/reminder-list/reminder-list.component';
import { ReminderPastComponent } from './reminder/reminder-past/reminder-past.component';
import { MyPocDetailsComponent } from './my-poc-details/my-poc-details.component';
import { EiSearchComponent } from './ei-search/ei-search.component';

import { AddEiComponent } from './registration/add-ei/add-ei.component';
import { SubadminprofileComponent } from './registration/subadminprofile/subadminprofile.component';
import { SubadmincongratulationComponent } from './registration/subadmincongratulation/subadmincongratulation.component';
import { SubadminschoolconfirmationComponent } from './registration/subadminschoolconfirmation/subadminschoolconfirmation.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SignUpPendingListComponent } from './student/sign-up-pending-list/sign-up-pending-list.component';
import { EiProfilePreviewComponent } from './ei-profile-preview/ei-profile-preview.component';
import { EiSentForSignUpComponent } from './student/ei-sent-for-sign-up/ei-sent-for-sign-up.component';
import { SentForApprovalComponent } from './student/sent-for-approval/sent-for-approval.component';
import { SharedModule } from 'src/app/common/shared.module';
import { RequestChangeDetailsComponent } from './student/request-change-details/request-change-details.component';
import { SchooReminderComponent } from './school/schoo-reminder/schoo-reminder.component'
import { ImageViewerModule } from 'src/app/common/image-viewer/image-viewer.module';


const config = {
  btnClass: 'default', // The CSS class(es) that will apply to the buttons
  zoomFactor: 0.1, // The amount that the scale will be increased by
  containerBackgroundColor: '#ccc', // The color to use for the background. This can provided in hex, or rgb(a).
  wheelZoom: true, // If true, the mouse wheel can be used to zoom in
  allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
  allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
  btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
    zoomIn: 'fa fa-plus',
    zoomOut: 'fa fa-minus',
    rotateClockwise: 'fa fa-repeat',
    rotateCounterClockwise: 'fa fa-undo',
    next: 'fa fa-arrow-right',
    prev: 'fa fa-arrow-left',
    fullscreen: 'fa fa-arrows-alt',
  },
  btnShow: {
    zoomIn: true,
    zoomOut: true,
    rotateClockwise: true,
    rotateCounterClockwise: true,
    next: true,
    prev: true
  }
};

@NgModule({
  declarations: [
    EiLoginComponent,
    EiForgetPasswordComponent, 
    EiMobileVerificationComponent,
    EiOtpVerificationComponent, 
    EiContactUsComponent, 
    EiCreateNewPasswordComponent,
    EiLoginSubadminComponent, 
    EiCourierDetailsComponent,
    EiSubadminRegisterComponent, 
    EiPaymentComponent, 
    EiOnboardingProcessComponent,
    EiChequeDetailsComponent, 
    EiSubadminAdditionalComponent, 
    EiKycVerificationComponent,
    EiSubadminEmployeeComponent, 
    EiSubadminEmployeeContactComponent, 
    EiDashboardComponent,
    EiSidenavComponent, 
    EiSchoolProfileComponent, 
    EiSchoolPostComponent,
    EiSchoolPostAddComponent, 
    EiAlumniProfileComponent, 
    EiAlumniManagementComponent,
    EiAlumniHistoryComponent, 
    EiAlumniListComponent, 
    EiUnverifiedAlumniComponent,
    EiVerifiedAlumniComponent, 
    EiStudentManagementComponent, 
    EiStudentListComponent,
    EiStudentApprovalsComponent, 
    EiStudentBulkAddComponent, 
    EiStudentChangeBulkClassComponent,
    EiStudentEditComponent, 
    EiStudentHistoryComponent, 
    EiStudentPendingVerificationComponent,
    EiStudentVerifiedListComponent, 
    EiSubadminManagementComponent, 
    EiSubadminAccessComponent,
    EiSubadminAccessHistoryComponent, 
    EiSubadminDetailsComponent, 
    EiSubadminModuleWiseComponent,
    EiSubadminStatusListComponent, 
    EiStudentProfileComponent, 
    EiSubadminModuleAccessHistoryComponent,
    EiSubadminViewStatusComponent, 
    EiManageCoursesComponent, 
    EiManageCoursesDetailsComponent,
    EiManageCoursesAddComponent, 
    EiManageCoursesHistoryComponent, 
    EiSubscriptionComponent,
    EiSubscriptionDetailsComponent, 
    EiSubscriptionUpdateComponent, 
    EiInvoiceComponent,
    EiInvoiceListComponent, 
    EiSchoolRegisterComponent, 
    EiNotificationComponent, 
    EiEcertificateEresultComponent, 
    EiEcertificateComponent, 
    EiEcertificateHistoryComponent, 
    EiEcertificateCreateFormatComponent, 
    EiEcertificateDraftComponent, 
    EiEcertificateSaveFormateComponent, 
    EiEresultReportCreateComponent, 
    EiStudentSummaryComponent,
    EiEresultPreviewComponent,
    EiStarclassComponent,
    EiStarclassCoursesUploadedByEiComponent,
    EiStarclassAudienceComponent,
    EiStarclassEditRightTeacherComponent,
    EiStarclassLectureEditComponent,
    EiStarclassLectureHistoryComponent,
    EiStarclassLectureUploadComponent,
    EiStarclassLectureDetailsComponent,
    EiStarclassCourseHistoryComponent,
    EiStarclassCoursesPreviewComponent,
    EiStarclassAudienceStudentListComponent,
    EiStarclassCartComponent,
    EiStarclassPaymentComponent,
    EiStarclassCourseAddComponent,
    AddComponent,
    CommentComponent,
    DetailsComponent,
    EditComponent,
    ListCompleteComponent,
    ListOngoingComponent,
    ProgressComponent,
    InformationAndBankComponent,
    PersonalInformationComponent,
    ViewChangesRequestStatusComponent,
    BankDetailsComponent,
    StudentsListComponent,
    TeacherListComponent,
    EiMessagesComponent,
    GroupChatComponent,
    CreateGroupChatComponent,
    StudentsMessagesComponent,
    TeacherMessagesComponent,
    MessagesComponent,
    MessagesDetailsComponent,
    PersonalMessagesComponent,
    SubadminAddComponent,
    SubadminPendingAccessComponent,
    SubadminPendingRequestComponent,
    SubadminRequestChangingComponent,
    AboutUsComponent,
    ChangePasswordComponent,
    SettingComponent,
    ContactComponent,
    PersonalComponent,
    PrivacyComponent,
    TermsConditionsComponent,
    EiPageNotFoundComponent,
    AddAdvertisementsComponent,
    PastAdvertisementsComponent,
    AdvertiseWithZatchupComponent,
    AdvertisementsDetailsComponent,
    AuthorisationsComponent,
    AuthorisationsRequestComponent,
    ViewEiProfileAndTimelineComponent,
    AuthorisationsHistoryComponent,
    ReminderComponent,
    ReminderAddComponent,
    ReminderListComponent,
    ReminderPastComponent,
    MyPocDetailsComponent,
    EiSearchComponent,
    AddEiComponent,
    SubadminprofileComponent,
    SubadmincongratulationComponent,
    SubadminschoolconfirmationComponent,
    SignUpPendingListComponent,
    EiProfilePreviewComponent,
    EiSentForSignUpComponent,
    SentForApprovalComponent,
    RequestChangeDetailsComponent,
    SchooReminderComponent
  ],
  imports: [
    CommonModule,
    EIWebRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    BsDatepickerModule,
    AutocompleteLibModule,
    DirectiveModule,
    TooltipModule.forRoot(),
    SharedModule,
    ImageViewerModule.forRoot(config),
  ],
  exports: [
    EiLoginComponent
  ]
})
export class EIModule {
}
