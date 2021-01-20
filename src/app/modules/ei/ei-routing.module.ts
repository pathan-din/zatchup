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
import { AddEiComponent } from './registration/add-ei/add-ei.component';
import { SubadminprofileComponent } from './registration/subadminprofile/subadminprofile.component';
import { SubadmincongratulationComponent } from './registration/subadmincongratulation/subadmincongratulation.component';
import { SubadminschoolconfirmationComponent } from './registration/subadminschoolconfirmation/subadminschoolconfirmation.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { SignUpPendingListComponent } from './student/sign-up-pending-list/sign-up-pending-list.component';
import { EiProfilePreviewComponent } from './ei-profile-preview/ei-profile-preview.component';
import { EiInvoiceListComponent } from './invoice/ei-invoice-list/ei-invoice-list.component';
import { EiSentForSignUpComponent } from './student/ei-sent-for-sign-up/ei-sent-for-sign-up.component';
import { SentForApprovalComponent } from './student/sent-for-approval/sent-for-approval.component';
import { RequestChangeDetailsComponent } from './student/request-change-details/request-change-details.component'
import { SchooReminderComponent } from './school/schoo-reminder/schoo-reminder.component'
import { ContactComponent } from './setting/contact/contact.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';

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
    path: 'courier-details', component: EiCourierDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-registration', component: EiSubadminRegisterComponent
  },
  {
    path: 'payment', component: EiPaymentComponent
  },
  {
    path: 'onboarding-process', component: EiOnboardingProcessComponent, canActivate: [AuthGuard]
  },
  {
    path: 'school-registration', component: EiSchoolRegisterComponent
  },
  {
    path: 'cheque-details', component: EiChequeDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'kyc-verification', component: EiKycVerificationComponent
  },
  {
    path: 'sub-admin-employee', component: EiSubadminEmployeeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-employee-contact', component: EiSubadminEmployeeContactComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dashboard', component: EiDashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-additional', component: EiSubadminAdditionalComponent, canActivate: [AuthGuard]
  },
  {
    path: 'school-profile', component: EiSchoolProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'school-post', component: EiSchoolPostComponent, canActivate: [AuthGuard]
  },
  {
    path: 'school-post-add', component: EiSchoolPostAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'alumni-management', component: EiAlumniManagementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'alumni-profile', component: EiAlumniProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'alumni-history', component: EiAlumniHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'alumni-list', component: EiAlumniListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'verified-alumni', component: EiVerifiedAlumniComponent, canActivate: [AuthGuard]
  },
  {
    path: 'unverified-alumni', component: EiUnverifiedAlumniComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-management', component: EiStudentManagementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'manage-courses-add', component: EiManageCoursesAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-summary', component: EiStudentSummaryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-list', component: EiStudentListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-approvals', component: EiStudentApprovalsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'sent-for-sign-up', component: EiSentForSignUpComponent, canActivate: [AuthGuard]
  },
  {
    path: 'sent-for-approval', component: SentForApprovalComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-bulk-add', component: EiStudentBulkAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-change-bulk-class', component: EiStudentChangeBulkClassComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-edit', component: EiStudentEditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-profile', component: EiStudentProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-history', component: EiStudentHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-pending-verification', component: EiStudentPendingVerificationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'student-verified-list', component: EiStudentVerifiedListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-management', component: EiSubadminManagementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-access', component: EiSubadminAccessComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-access-history', component: EiSubadminAccessHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-module-access-history', component: EiSubadminModuleAccessHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-details', component: EiSubadminDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-module-wise', component: EiSubadminModuleWiseComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-status-list', component: EiSubadminStatusListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-view-status', component: EiSubadminViewStatusComponent, canActivate: [AuthGuard]
  },
  {
    path: 'manage-courses', component: EiManageCoursesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'manage-courses-details/:id', component: EiManageCoursesDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subscription', component: EiSubscriptionComponent, canActivate: [AuthGuard]
  },
  {
    path: 'invoices', component: EiInvoiceComponent, canActivate: [AuthGuard]
  },
  {
    path: 'notification', component: EiNotificationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ecertificat-eresult', component: EiEcertificateEresultComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ecertificate', component: EiEcertificateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'eresult-report-create', component: EiEresultReportCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'eresult-preview', component: EiEresultPreviewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class', component: EiStarclassComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-courses-uploaded-by-ei', component: EiStarclassCoursesUploadedByEiComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-audience', component: EiStarclassAudienceComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-edit-right-teacher', component: EiStarclassEditRightTeacherComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-lecture-edit', component: EiStarclassLectureEditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-lecture-history', component: EiStarclassLectureHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-lecture-upload', component: EiStarclassLectureUploadComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-lecture-details', component: EiStarclassLectureDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-course-history', component: EiStarclassCourseHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-courses-preview', component: EiStarclassCoursesPreviewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-audience-student-list', component: EiStarclassAudienceStudentListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-cart', component: EiStarclassCartComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-payment', component: EiStarclassPaymentComponent, canActivate: [AuthGuard]
  },
  {
    path: 'star-class-course-add', component: EiStarclassCourseAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add', component: AddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'comment', component: CommentComponent, canActivate: [AuthGuard]
  },
  {
    path: 'details', component: DetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit', component: EditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'list-complete', component: ListCompleteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'list-ongoing', component: ListOngoingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'progress', component: ProgressComponent, canActivate: [AuthGuard]
  },
  {
    path: 'bank-details', component: BankDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'information-and-bank-details', component: InformationAndBankComponent, canActivate: [AuthGuard]
  },
  {
    path: 'personal-information', component: PersonalInformationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'view-changes-request-status', component: ViewChangesRequestStatusComponent
  },
  {
    path: 'students-list', component: StudentsListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'teacher-list', component: TeacherListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-messages', component: EiMessagesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'group-chat', component: GroupChatComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create-group-chat', component: CreateGroupChatComponent, canActivate: [AuthGuard]
  },
  {
    path: 'students-messages', component: StudentsMessagesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'teacher-messages', component: TeacherMessagesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'messages-details', component: MessagesDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'personal-messages', component: PersonalMessagesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-add', component: SubadminAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-pending-access', component: SubadminPendingAccessComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-pending-request', component: SubadminPendingRequestComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-request-changing', component: SubadminRequestChangingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]
  },
  {
    path: 'contact', component: ContactComponent, canActivate: [AuthGuard]
  },
  {
    path: 'personal', component: PersonalComponent, canActivate: [AuthGuard]
  },
  {
    path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard]
  },
  {
    path: 'setting', component: SettingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'terms-conditions', component: TermsConditionsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-subscription', component: EiSubscriptionUpdateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-advertisements', component: AddAdvertisementsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertise-with-zatchup', component: AdvertiseWithZatchupComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-details', component: AdvertisementsDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'past-advertisements', component: PastAdvertisementsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'authorisations', component: AuthorisationsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'authorisations-history', component: AuthorisationsHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'authorisations-request', component: AuthorisationsRequestComponent, canActivate: [AuthGuard]
  },
  {
    path: 'view-ei-profile-and-timeline', component: ViewEiProfileAndTimelineComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reminder', component: ReminderComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reminder-add', component: ReminderAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reminder-list', component: ReminderListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reminder-past', component: ReminderPastComponent, canActivate: [AuthGuard]
  },{
    path: 'add-ei', component: AddEiComponent, canActivate: [AuthGuard]
  },{
    path: 'subadminprofile', component: SubadminprofileComponent, canActivate: [AuthGuard]
  },{
    path: 'thankyou', component: SubadmincongratulationComponent
  },{
    path: 'subadmin-school-confirm', component: SubadminschoolconfirmationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'poc-details', component: MyPocDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-search', component: EiSearchComponent, canActivate: [AuthGuard]
  },
  {
    path: 'sign-up-pending-list', component: SignUpPendingListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-profile-preview', component: EiProfilePreviewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'invoice-list/:invoice', component: EiInvoiceListComponent, canActivate: [AuthGuard]
  }, {
    path: 'request-for-change-list', component: RequestChangeDetailsComponent, canActivate: [AuthGuard]
  }, {
    path: 'school-reminder', component: SchooReminderComponent, canActivate: [AuthGuard]
  },
  



  
  
  //
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
