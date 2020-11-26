import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminwebRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSchoolManagementComponent } from './admin-school-management/admin-school-management.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AdminEiManagementCourseComponent } from './ei/admin-ei-management-course/admin-ei-management-course.component';
import { AdminEiManagementCourseDetailsComponent } from './ei/admin-ei-management-course-details/admin-ei-management-course-details.component';
import { AdminEiManagementAlumniListComponent } from './ei/admin-ei-management-alumni-list/admin-ei-management-alumni-list.component';
import { AdminEiManagementFeesSubscriptionComponent } from './ei/admin-ei-management-fees-subscription/admin-ei-management-fees-subscription.component';
import { AdminEiManagementIncompleteOnboardingComponent } from './ei/admin-ei-management-incomplete-onboarding/admin-ei-management-incomplete-onboarding.component';
import { AdminEiManagementIncompleteOnboardingViewComponent } from './ei/admin-ei-management-incomplete-onboarding-view/admin-ei-management-incomplete-onboarding-view.component';
import { AdminEiManagementPendingForApprovalComponent } from './ei/admin-ei-management-pending-for-approval/admin-ei-management-pending-for-approval.component';
import { AdminPaymentComponent } from './payment/admin-payment.component';
import { AdminPaymentOnboardingComponent } from './payment/admin-payment-onboarding/admin-payment-onboarding.component';
import { AdminPaymentOnboardingFeeHistoryComponent } from './payment/admin-payment-onboarding-fee-history/admin-payment-onboarding-fee-history.component';
import { AdminEiRejectDetailsComponent } from './ei/admin-ei-reject-details/admin-ei-reject-details.component';
import { AdminZatchCertificateResultComponent } from './admin-zatch-certificate-result/admin-zatch-certificate-result.component';
import { AdminZatchCertificateConfigueComponent } from './admin-zatch-certificate-configue/admin-zatch-certificate-configue.component';
import { AdminUserLastLoginComponent } from './user/admin-user-last-login/admin-user-last-login.component';
import { AdminCreateNewPasswordComponent } from './admin-create-new-password/admin-create-new-password.component';
import { AdminUserKycPendingComponent } from './user/admin-user-kyc-pending/admin-user-kyc-pending.component';
import { AdminUserComponent } from './user/admin-user/admin-user.component';
import { AdminUserEducationProfileComponent } from './user/admin-user-education-profile/admin-user-education-profile.component';
import { AdminUserReportHistoryComponent } from './user/admin-user-report-history/admin-user-report-history.component';
import { AdminUserProfileHistoryComponent } from './user/admin-user-profile-history/admin-user-profile-history.component';
import { AdminUserProfileComponent } from './user/admin-user-profile/admin-user-profile.component';
import { AdminUserPostDetailsComponent } from './user/admin-user-post-details/admin-user-post-details.component';
import { AdminEIManagementAddedByUserNotToZatchupComponent } from './ei/admin-eimanagement-added-by-user-not-to-zatchup/admin-eimanagement-added-by-user-not-to-zatchup.component';
import { AdminEiManagementDocumentMouHistoryComponent } from './ei/admin-ei-management-document-mou-history/admin-ei-management-document-mou-history.component';
import { AdminEiManagementAllCourseUploadComponent } from './ei/admin-ei-management-all-course-upload/admin-ei-management-all-course-upload.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AdminUserPostComponent } from './user/admin-user-post/admin-user-post.component';
import { AdminKycApprovalManagementComponent } from './user/admin-kyc-approval-management/admin-kyc-approval-management.component';
import { AdminKycConfigureComponent } from './user/admin-kyc-configure/admin-kyc-configure.component';
import { AdminKycCompleteComponent } from './user/admin-kyc-complete/admin-kyc-complete.component';
import { AdminKycPendingRequestComponent } from './user/admin-kyc-pending-request/admin-kyc-pending-request.component';
import { AdminKycHistoryOrViewComponent } from './user/admin-kyc-history-or-view/admin-kyc-history-or-view.component';
import { AdminPaymentSubscriptionConfigureComponent } from './payment/admin-payment-subscription-configure/admin-payment-subscription-configure.component';
import { AdminPaymentSubscriptionHistoryComponent } from './payment/admin-payment-subscription-history/admin-payment-subscription-history.component';
import { AdminPaymentStarclassRevenueComponent } from './payment/admin-payment-starclass-revenue/admin-payment-starclass-revenue.component';
import { AdminUserCertificatesComponent } from './user/admin-user-certificates/admin-user-certificates.component';
import { AdminUserSearchComponent } from './user/admin-user-search/admin-user-search.component';
import { AdminUserStatusFilterComponent } from './user/admin-user-status-filter/admin-user-status-filter.component';
import { AdminPaymentAdvertisementComponent } from './payment/admin-payment-advertisement/admin-payment-advertisement.component';
import { AdminPaymentCommissionsComponent } from './payment/admin-payment-commissions/admin-payment-commissions.component';
import { AdminPaymentSubscriptionComponent } from './payment/admin-payment-subscription/admin-payment-subscription.component';
import { SubadminAccessHistoryComponent } from './subadmin/subadmin-access-history/subadmin-access-history.component';
import { OnboardedOnZatchupListComponent } from './ei/onboarded-on-zatchup-list/onboarded-on-zatchup-list.component';
import { OnboardingRequestHistoryComponent } from './ei/onboarding-request-history/onboarding-request-history.component';
import { OnboardedViewComponent } from './ei/onboarded-view/onboarded-view.component';
import { OnboardingConversationCommentsComponent } from './ei/onboarding-conversation-comments/onboarding-conversation-comments.component';
import { ManagementCommissionAddComponent } from './ei/management-commission-add/management-commission-add.component';
import { ManagementCommissionHistoryComponent } from './ei/management-commission-history/management-commission-history.component';
import { ManagementCommissionInvoicesComponent } from './ei/management-commission-invoices/management-commission-invoices.component';
import { ManagementCommissionListComponent } from './ei/management-commission-list/management-commission-list.component';
import { TicketForOnboardingComponent } from './ei/ticket-for-onboarding/ticket-for-onboarding.component';
import { SubadminAddComponent } from './subadmin/subadmin-add/subadmin-add.component';
import { SubadminAuthorizationAccessViewComponent } from './subadmin/subadmin-authorization-access-view/subadmin-authorization-access-view.component';
import { AdminPaymentCouponComponent } from './payment/admin-payment-coupon/admin-payment-coupon.component';
import { AdminPaymentCouponStatusComponent } from './payment/admin-payment-coupon-status/admin-payment-coupon-status.component';
import { LectureCandidaturesComponent } from './ei/lecture-candidatures/lecture-candidatures.component';
import { AdminEiManagementCoursePreviewComponent } from './ei/admin-ei-management-course-preview/admin-ei-management-course-preview.component';
import { AdminEiManagementCourseUploadPlayHistoryComponent } from './ei/admin-ei-management-course-upload-play-history/admin-ei-management-course-upload-play-history.component';
import { LectureCompletePendingStatusComponent } from './ei/lecture-complete-pending-status/lecture-complete-pending-status.component';
import { LectureUploadComponent } from './ei/lecture-upload/lecture-upload.component';
import { AdminStarClassCoursePreviewComponent } from './start-class/admin-star-class-course-preview/admin-star-class-course-preview.component';
import { FundActiveComponent } from './ei/fund-active/fund-active.component';
import { FundClosedComponent } from './ei/fund-closed/fund-closed.component';
import { LectureDetailsComponent } from './ei/lecture-details/lecture-details.component';
import { MessageContactComponent } from './ei/message-contact/message-contact.component';
import { MessageResolvedComponent } from './ei/message-resolved/message-resolved.component';
import { DatabaseHistoryComponent } from './ei/database-history/database-history.component';
import { DatabaseListComponent } from './ei/database-list/database-list.component';
import { IncompleteOnboardingViewComponent } from './ei/incomplete-onboarding-view/incomplete-onboarding-view.component';
import { DatabaseViewComponent } from './ei/database-view/database-view.component';
import { CurrentPocComponent } from './ei/current-poc/current-poc.component';
import { StarclassBuyHistoryComponent } from './ei/starclass-buy-history/starclass-buy-history.component';
import { StarclassBoughtComponent } from './ei/starclass-bought/starclass-bought.component';
import { ReportProfileResolvedComponent } from './ei/report-profile-resolved/report-profile-resolved.component';
import { ReportProjectResolvedComponent } from './ei/report-project-resolved/report-project-resolved.component';
import { ProjectDetailsComponent } from './ei/project-details/project-details.component';
import { ReportProfileUnresolvedComponent } from './ei/report-profile-unresolved/report-profile-unresolved.component';
import { EiPostComponent } from './ei/ei-post/ei-post.component';
import { PostDetailsComponent } from './ei/post-details/post-details.component';
import { ProjectLectureDetailsComponent } from './ei/project-lecture-details/project-lecture-details.component';
import { ProjectProgressComponent } from './ei/project-progress/project-progress.component';
import { StarclassBoughtLectureViewComponent } from './ei/starclass-bought-lecture-view/starclass-bought-lecture-view.component';
import { StarclassBoughtViewComponent } from './ei/starclass-bought-view/starclass-bought-view.component';
import { EducationStatusComponent } from './ei/education-status/education-status.component';
import { StatusAddedComponent } from './ei/status-added/status-added.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { CertificatesIssuedComponent } from './ei/certificates-issued/certificates-issued.component';
import { SearchComponent } from './ei/search/search.component';
import { StudentsComponent } from './ei/students/students.component';
import { ChangeDetailRequestsPendingComponent } from './ei/change-detail-requests-pending/change-detail-requests-pending.component';
import { SubadminManagementComponent } from './subadmin/subadmin-management/subadmin-management.component';
import { AddedByUserNotZatchupComponent } from './ei/added-by-user-not-zatchup/added-by-user-not-zatchup.component';
import { BankDetailsComponent } from './ei/bank-details/bank-details.component';
import { SubscriptionFeesReceivedComponent } from './ei/subscription-fees-received/subscription-fees-received.component';
import { InstituteHistoryComponent } from './ei/institute-history/institute-history.component';
import { ServiceFeesHistoryComponent } from './ei/service-fees-history/service-fees-history.component';
import { SubscriptionPlanHistoryComponent } from './ei/subscription-plan-history/subscription-plan-history.component';
import { MyAssignedEiHistoryComponent } from './my-assigned/my-assigned-ei-history/my-assigned-ei-history.component';
import { MyAssignedEiComponent } from './my-assigned/my-assigned-ei/my-assigned-ei.component';
import { AdminPageNotFoundComponent } from './admin-page-not-found/admin-page-not-found.component';
import { NumberOnlyDirective } from 'src/app/directives/number-only.directive';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminForgotPasswordComponent,
    AdminDashboardComponent,
    AdminSchoolManagementComponent,
    AdminSidenavComponent,
    AdminEiManagementCourseComponent,
    AdminEiManagementCourseDetailsComponent,
    AdminEiManagementAlumniListComponent,
    AdminEiManagementFeesSubscriptionComponent,
    AdminEiManagementIncompleteOnboardingComponent,
    AdminEiManagementIncompleteOnboardingViewComponent,
    AdminEiManagementPendingForApprovalComponent,
    AdminPaymentComponent,
    AdminPaymentOnboardingComponent,
    AdminPaymentOnboardingFeeHistoryComponent,
    AdminEiRejectDetailsComponent,
    AdminZatchCertificateResultComponent,
    AdminZatchCertificateConfigueComponent,
    AdminUserLastLoginComponent,
    AdminCreateNewPasswordComponent,
    AdminUserKycPendingComponent,
    AdminUserComponent,
    AdminUserEducationProfileComponent,
    AdminUserReportHistoryComponent,
    AdminUserProfileHistoryComponent,
    AdminUserProfileComponent,
    AdminUserPostDetailsComponent,
    AdminEIManagementAddedByUserNotToZatchupComponent,
    AdminEiManagementDocumentMouHistoryComponent,
    AdminEiManagementAllCourseUploadComponent,
    AdminUserPostComponent,
    AdminKycApprovalManagementComponent,
    AdminKycConfigureComponent,
    AdminKycCompleteComponent,
    AdminKycPendingRequestComponent,
    AdminKycHistoryOrViewComponent,
    AdminKycPendingRequestComponent,
    AdminPaymentSubscriptionConfigureComponent,
    AdminPaymentSubscriptionHistoryComponent,
    AdminPaymentStarclassRevenueComponent,
    AdminUserCertificatesComponent,
    AdminUserSearchComponent,
    AdminUserStatusFilterComponent,
    AdminPaymentAdvertisementComponent,
    AdminPaymentCommissionsComponent,
    AdminPaymentSubscriptionComponent,
    SubadminAccessHistoryComponent,
    AdminPaymentCouponComponent,
    AdminPaymentCouponStatusComponent,
    OnboardedOnZatchupListComponent,
    OnboardingRequestHistoryComponent,
    OnboardedViewComponent,
    OnboardingConversationCommentsComponent,
    ManagementCommissionAddComponent,
    ManagementCommissionHistoryComponent,
    ManagementCommissionInvoicesComponent,
    ManagementCommissionListComponent,
    TicketForOnboardingComponent,
    SubadminAddComponent,
    SubadminAuthorizationAccessViewComponent,
    LectureCandidaturesComponent,
    AdminEiManagementCoursePreviewComponent,
    AdminEiManagementCourseUploadPlayHistoryComponent,
    LectureCompletePendingStatusComponent,
    LectureUploadComponent,
    AdminStarClassCoursePreviewComponent,
    FundActiveComponent,
    FundClosedComponent,
    LectureDetailsComponent,
    MessageContactComponent,
    MessageResolvedComponent,
    DatabaseHistoryComponent,
    DatabaseListComponent,
    IncompleteOnboardingViewComponent,
    DatabaseViewComponent,
    ReportProfileUnresolvedComponent,
    CurrentPocComponent,
    StarclassBuyHistoryComponent,
    StarclassBoughtComponent,
    IncompleteOnboardingViewComponent,
    ReportProfileResolvedComponent,
    ReportProjectResolvedComponent,
    ProjectDetailsComponent,
    ReportProfileUnresolvedComponent,
    EiPostComponent,
    PostDetailsComponent,
    ProjectLectureDetailsComponent,
    ProjectProgressComponent,
    StarclassBoughtLectureViewComponent,
    StarclassBoughtViewComponent,
    EducationStatusComponent,
    StatusAddedComponent,
    CertificatesIssuedComponent,
    SearchComponent,
    StudentsComponent,
    ChangeDetailRequestsPendingComponent,
    SubadminManagementComponent,
    AddedByUserNotZatchupComponent,
    BankDetailsComponent,
    SubscriptionFeesReceivedComponent,
    InstituteHistoryComponent,
    ServiceFeesHistoryComponent,
    SubscriptionPlanHistoryComponent,
    MyAssignedEiHistoryComponent,
    MyAssignedEiComponent,
    AdminPageNotFoundComponent,
    NumberOnlyDirective
  ],
  imports: [
    CommonModule,
    AdminwebRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxPaginationModule
  ],
  providers: [DatePipe]
})
export class AdminModule { }
