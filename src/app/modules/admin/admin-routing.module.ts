import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSchoolManagementComponent } from './admin-school-management/admin-school-management.component';
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

import { AdminLoginComponent } from './admin-login/admin-login.component';
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
import { AdminUserPostComponent } from './user/admin-user-post/admin-user-post.component';
import { AdminKycApprovalManagementComponent } from './user/admin-kyc-approval-management/admin-kyc-approval-management.component';
import { AdminKycConfigureComponent } from './user/admin-kyc-configure/admin-kyc-configure.component';
import { AdminKycCompleteComponent } from './user/admin-kyc-complete/admin-kyc-complete.component';
import { AdminKycHistoryOrViewComponent } from './user/admin-kyc-history-or-view/admin-kyc-history-or-view.component';
import { AdminKycPendingRequestComponent } from './user/admin-kyc-pending-request/admin-kyc-pending-request.component';
import { AdminPaymentSubscriptionConfigureComponent } from './payment/admin-payment-subscription-configure/admin-payment-subscription-configure.component';
import { AdminPaymentSubscriptionHistoryComponent } from './payment/admin-payment-subscription-history/admin-payment-subscription-history.component';
import { AdminPaymentStarclassRevenueComponent } from './payment/admin-payment-starclass-revenue/admin-payment-starclass-revenue.component';
import { AdminUserStatusFilterComponent } from './user/admin-user-status-filter/admin-user-status-filter.component';
import { AdminUserSearchComponent } from './user/admin-user-search/admin-user-search.component';
import { AdminUserCertificatesComponent } from './user/admin-user-certificates/admin-user-certificates.component';
import { AdminPaymentAdvertisementComponent } from './payment/admin-payment-advertisement/admin-payment-advertisement.component';
import { AdminPaymentCommissionsComponent } from './payment/admin-payment-commissions/admin-payment-commissions.component';
import { AdminPaymentSubscriptionComponent } from './payment/admin-payment-subscription/admin-payment-subscription.component';
import { AdminPaymentCouponComponent } from './payment/admin-payment-coupon/admin-payment-coupon.component';
import { AdminPaymentCouponStatusComponent } from './payment/admin-payment-coupon-status/admin-payment-coupon-status.component';
import { OnboardedOnZatchupListComponent } from './ei/onboarded-on-zatchup-list/onboarded-on-zatchup-list.component';
import { OnboardingRequestHistoryComponent } from './ei/onboarding-request-history/onboarding-request-history.component';
import { OnboardedViewComponent } from './ei/onboarded-view/onboarded-view.component';
import { SubadminAddComponent } from './subadmin/subadmin-add/subadmin-add.component';
import { SubadminAuthorizationAccessViewComponent } from './subadmin/subadmin-authorization-access-view/subadmin-authorization-access-view.component';
import { OnboardingConversationCommentsComponent } from './ei/onboarding-conversation-comments/onboarding-conversation-comments.component';
import { ManagementCommissionAddComponent } from './ei/management-commission-add/management-commission-add.component';
import { ManagementCommissionHistoryComponent } from './ei/management-commission-history/management-commission-history.component';
import { ManagementCommissionInvoicesComponent } from './ei/management-commission-invoices/management-commission-invoices.component';
import { ManagementCommissionListComponent } from './ei/management-commission-list/management-commission-list.component';
import { AdminEiManagementCoursePreviewComponent } from './ei/admin-ei-management-course-preview/admin-ei-management-course-preview.component';
import { AdminEiManagementCourseUploadPlayHistoryComponent } from './ei/admin-ei-management-course-upload-play-history/admin-ei-management-course-upload-play-history.component';
import { LectureCandidaturesComponent } from './ei/lecture-candidatures/lecture-candidatures.component';
import { LectureCompletePendingStatusComponent } from './ei/lecture-complete-pending-status/lecture-complete-pending-status.component';
import { LectureUploadComponent } from './ei/lecture-upload/lecture-upload.component';
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
import { StarclassBoughtViewComponent } from './ei/starclass-bought-view/starclass-bought-view.component';
import { StarclassBoughtLectureViewComponent } from './ei/starclass-bought-lecture-view/starclass-bought-lecture-view.component';
import { EducationStatusComponent } from './ei/education-status/education-status.component';
import { StatusAddedComponent } from './ei/status-added/status-added.component';
import { ReportProfileResolvedComponent } from './ei/report-profile-resolved/report-profile-resolved.component';
import { ReportProfileUnresolvedComponent } from './ei/report-profile-unresolved/report-profile-unresolved.component';
import { ReportProjectResolvedComponent } from './ei/report-project-resolved/report-project-resolved.component';
import { CertificatesIssuedComponent } from './ei/certificates-issued/certificates-issued.component';
import { SearchComponent } from './ei/search/search.component';
import { StudentsComponent } from './ei/students/students.component';
import { ChangeDetailRequestsPendingComponent } from './ei/change-detail-requests-pending/change-detail-requests-pending.component';
import { SubadminManagementComponent } from './subadmin/subadmin-management/subadmin-management.component'
import { AddedByUserNotZatchupComponent } from './ei/added-by-user-not-zatchup/added-by-user-not-zatchup.component';
import { BankDetailsComponent } from './ei/bank-details/bank-details.component';
import { SubscriptionFeesReceivedComponent } from './ei/subscription-fees-received/subscription-fees-received.component';
import { InstituteHistoryComponent } from './ei/institute-history/institute-history.component';
import { ServiceFeesHistoryComponent } from './ei/service-fees-history/service-fees-history.component';
import { SubscriptionPlanHistoryComponent } from './ei/subscription-plan-history/subscription-plan-history.component';
import { SubadminAccessHistoryComponent } from './subadmin/subadmin-access-history/subadmin-access-history.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { MyAssignedEiComponent } from './my-assigned/my-assigned-ei/my-assigned-ei.component';
import { MyAssignedEiHistoryComponent } from './my-assigned/my-assigned-ei-history/my-assigned-ei-history.component'
import { AdminPageNotFoundComponent } from './admin-page-not-found/admin-page-not-found.component';
import { UsersSignedUpZatchupComponent } from './user/users-signed-up-zatchup/users-signed-up-zatchup.component';
import { AdvertisementsComponent } from './advertisements/advertisements/advertisements.component';
import { AdvertisementsActiveComponent } from './advertisements/advertisements-active/advertisements-active.component';
import { AdvertisementsActiveAudienceComponent } from './advertisements/advertisements-active-audience/advertisements-active-audience.component';
import { AdvertisementsActiveViewComponent } from './advertisements/advertisements-active-view/advertisements-active-view.component';
import { AdvertisementsAddComponent } from './advertisements/advertisements-add/advertisements-add.component';
import { AdvertisementsConfigureRateComponent } from './advertisements/advertisements-configure-rate/advertisements-configure-rate.component';
import { AdvertisementsExpiredComponent } from './advertisements/advertisements-expired/advertisements-expired.component';
import { AdvertisementsHistoryComponent } from './advertisements/advertisements-history/advertisements-history.component';
import { AdvertisementsPendingForApprovalComponent } from './advertisements/advertisements-pending-for-approval/advertisements-pending-for-approval.component';
import { AdvertisementsPendingForApprovalViewComponent } from './advertisements/advertisements-pending-for-approval-view/advertisements-pending-for-approval-view.component';
import { AdvertisementsRateHistoryComponent } from './advertisements/advertisements-rate-history/advertisements-rate-history.component';
import { AdvertisementsRejectComponent } from './advertisements/advertisements-reject/advertisements-reject.component';
import { AdvertisementsRejectViewComponent } from './advertisements/advertisements-reject-view/advertisements-reject-view.component';
import { KycVerifiedUsersComponent } from './user/kyc-verified-users/kyc-verified-users.component';
import { ActiveUsersComponent } from './user/active-users/active-users.component';
import { DormantUsersComponent } from './user/dormant-users/dormant-users.component';
import { KycVerifiedByEiComponent } from './user/kyc-verified-by-ei/kyc-verified-by-ei.component';
import { SupportManagementComponent } from './support/support-management/support-management.component';
import { TicketsOnboardingComponent } from './support/tickets-onboarding/tickets-onboarding.component';
import { PaymentInvoiceComponent } from './payment-invoice/payment-invoice.component';
import { ChangeDetailsRequestViewComponent } from './ei/change-details-request-view/change-details-request-view.component';
import { OnboardingFeeConfigureComponent } from './payment/onboarding-fee-configure/onboarding-fee-configure.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { UserEducationDetailsComponent } from './user/user-education-details/user-education-details.component';


const routes: Routes = [
  {
    path: '', component: AdminLoginComponent
  },
  {
    path: 'forgot-password', component: AdminForgotPasswordComponent
  },
  {
    path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: AdminLoginComponent
  },
  {
    path: 'create-new-password', component: AdminCreateNewPasswordComponent
  },
  {
    path: 'school-management', component: AdminSchoolManagementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-management-course/:id', component: AdminEiManagementCourseComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-management-course-details/:id', component: AdminEiManagementCourseDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-management-alumni-list', component: AdminEiManagementAlumniListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-management-fee-subscription', component: AdminEiManagementFeesSubscriptionComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-management-incomplete-onboarding', component: AdminEiManagementIncompleteOnboardingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-profile-details/:id', component: AdminEiManagementIncompleteOnboardingViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-management-pending-for-approval', component: AdminEiManagementPendingForApprovalComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-management', component: AdminPaymentComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-onboarding', component: AdminPaymentOnboardingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-onboarding-fee-history', component: AdminPaymentOnboardingFeeHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'rejected-ei-list', component: AdminEiRejectDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'zatch-certificate-result', component: AdminZatchCertificateResultComponent, canActivate: [AuthGuard]
  },
  {
    path: 'zatch-certificate-config', component: AdminZatchCertificateConfigueComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-kyc-pending', component: AdminUserKycPendingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user', component: AdminUserComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-education-profile/:id', component: AdminUserEducationProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-report-history', component: AdminUserReportHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-profile-history', component: AdminUserProfileHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-profile/:id', component: AdminUserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-post-details', component: AdminUserPostDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-management-added-by-user-not-to-zatchup', component: AdminEIManagementAddedByUserNotToZatchupComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-document-mou-history/:ei_id', component: AdminEiManagementDocumentMouHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-management-all-course-upload', component: AdminEiManagementAllCourseUploadComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-post', component: AdminUserPostComponent, canActivate: [AuthGuard]
  },
  {
    path: 'kyc-approval-management', component: AdminKycApprovalManagementComponent,
  },
  {
    path: 'kyc-configure', component: AdminKycConfigureComponent, canActivate: [AuthGuard]
  },
  {
    path: 'completed-kyc', component: AdminKycCompleteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'kyc-history-or-view/:kycType/:id', component: AdminKycHistoryOrViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'kyc-pending-request', component: AdminKycPendingRequestComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-subscription-configure', component: AdminPaymentSubscriptionConfigureComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-subscription-history', component: AdminPaymentSubscriptionHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-starclass-revenue', component: AdminPaymentStarclassRevenueComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin-user-status-filter', component: AdminUserStatusFilterComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-search/:search', component: AdminUserSearchComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin-user-certificates', component: AdminUserCertificatesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-advertisement-revenue', component: AdminPaymentAdvertisementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-commissions-revenue', component: AdminPaymentCommissionsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-subscription-revenue', component: AdminPaymentSubscriptionComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-coupon-codes', component: AdminPaymentCouponComponent, canActivate: [AuthGuard]
  },
  {
    path: 'onboarded-on-zatchup-list/:type', component: OnboardedOnZatchupListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-onboarding-request-history', component: OnboardingRequestHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-onboarded-view/:id', component: OnboardedViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-coupon-status/:coupanType', component: AdminPaymentCouponStatusComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-add', component: SubadminAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-authorization-access-view/:id', component: SubadminAuthorizationAccessViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-onboarding-conversation-comments/:id/:ei', component: OnboardingConversationCommentsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'management-commission-add', component: ManagementCommissionAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'management-commission-history', component: ManagementCommissionHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'management-commission-invoices', component: ManagementCommissionInvoicesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'management-commission-list', component: ManagementCommissionListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin-ei-management-course-preview', component: AdminEiManagementCoursePreviewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin-ei-management-courseUpload-play-history', component: AdminEiManagementCourseUploadPlayHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'lecture-candidatures', component: LectureCandidaturesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'lecture-complete-pending-status', component: LectureCompletePendingStatusComponent, canActivate: [AuthGuard]
  },
  {
    path: 'lecture-upload', component: LectureUploadComponent, canActivate: [AuthGuard]
  },
  {
    path: 'fund-active', component: FundActiveComponent, canActivate: [AuthGuard]
  },
  {
    path: 'fund-closed', component: FundClosedComponent, canActivate: [AuthGuard]
  },
  {
    path: 'lecture-details', component: LectureDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'contact-us-messages/:ei_id', component: MessageContactComponent, canActivate: [AuthGuard]
  },
  {
    path: 'contact-us-messages-list', component: MessageResolvedComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-database-history', component: DatabaseHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-database-list', component: DatabaseListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'incomplete-onboarding-view/:id', component: IncompleteOnboardingViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-database-view', component: DatabaseViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'poc-details/:ei_id', component: CurrentPocComponent, canActivate: [AuthGuard]
  },
  {
    path: 'starclass-bought', component: StarclassBoughtComponent, canActivate: [AuthGuard]
  },
  {
    path: 'starclass-buy-history', component: StarclassBuyHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'starclass-bought-view', component: StarclassBoughtViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'starclass-bought-lecture-view', component: StarclassBoughtLectureViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-education-institute', component: EducationStatusComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-education-institute/:id', component: EducationStatusComponent, canActivate: [AuthGuard]
  },
  {
    path: 'status-added', component: StatusAddedComponent, canActivate: [AuthGuard]
  },
  {
    path: 'report-profile-resolved', component: ReportProfileResolvedComponent, canActivate: [AuthGuard]
  },
  {
    path: 'report-profile-unresolved', component: ReportProfileUnresolvedComponent, canActivate: [AuthGuard]
  },
  {
    path: 'report-project-resolved', component: ReportProjectResolvedComponent, canActivate: [AuthGuard]
  },
  {
    path: 'certificates-issued', component: CertificatesIssuedComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-search/:search', component: SearchComponent, canActivate: [AuthGuard]
  },
  {
    path: 'students', component: StudentsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'change-detail-requests-pending', component: ChangeDetailRequestsPendingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-dashboard', component: SubadminManagementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'added-by-user-not-zatchup', component: AddedByUserNotZatchupComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ei-bank-details/:id', component: BankDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subscription-fees-received', component: SubscriptionFeesReceivedComponent, canActivate: [AuthGuard]
  },
  {
    path: 'education-institute-history/:id', component: InstituteHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'service-fees-history', component: ServiceFeesHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subscription-plan-history/:id', component: SubscriptionPlanHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-access-history', component: SubadminAccessHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'subadmin-access-history/:id', component: SubadminAccessHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'my-assigned-ei', component: MyAssignedEiComponent, canActivate: [AuthGuard]
  },
  {
    path: 'my-assigned-ei-history', component: MyAssignedEiHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'signed-up-users', component: UsersSignedUpZatchupComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements', component: AdvertisementsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-active', component: AdvertisementsActiveComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-active-audience', component: AdvertisementsActiveAudienceComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-active-view', component: AdvertisementsActiveViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-add', component: AdvertisementsAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-configure-rate', component: AdvertisementsConfigureRateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-expired', component: AdvertisementsExpiredComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-history', component: AdvertisementsHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-pending-for-approval', component: AdvertisementsPendingForApprovalComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-pending-for-approval-view', component: AdvertisementsPendingForApprovalViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-rate-history', component: AdvertisementsRateHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-reject', component: AdvertisementsRejectComponent, canActivate: [AuthGuard]
  },
  {
    path: 'advertisements-reject-view', component: AdvertisementsRejectViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'kyc-verified-users', component: KycVerifiedUsersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'active-users', component: ActiveUsersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dormant-users', component: DormantUsersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'kyc-verified-by-ei', component: KycVerifiedByEiComponent, canActivate: [AuthGuard]
  },
  {
    path: 'support-management', component: SupportManagementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'tickets-onboarding-list', component: TicketsOnboardingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment-invoice', component: PaymentInvoiceComponent, canActivate: [AuthGuard]
  },
  {
    path: 'change-details-request-view/:id', component: ChangeDetailsRequestViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'configure-onboarding-fee', component: OnboardingFeeConfigureComponent, canActivate: [AuthGuard]
  },
  {
    path: 'notification-list', component: NotificationListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-education-details', component: UserEducationDetailsComponent, canActivate: [AuthGuard]
  },






  {
    path: '**', component: AdminPageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialDesignModule],
  exports: [RouterModule, MaterialDesignModule]
})
export class AdminwebRoutingModule { }
