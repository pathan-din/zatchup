export class OnboardingFee {
  startIndex: Number;
  listParams: any = {};
  pageSize: any = 5;
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  displayedColumns: string[] = ['position', 'zatchUpID', 'schoolName', 'state', 'city', 'board', 'onboardingFeesGross', 'onboardingFeesNet', 'couponCodeApplied', 'transactionID', 'viewInvoice'];

  dataSource: any;
  allStates: any;
  allCities: any;
  stateId: any = '';
  cityId: any = '';
  university: any;
  state: any = '';
  city: any = '';
  pageCount: any;
}

export class SubscriptionFee {
  startIndex: Number;
  listParams: any = {};
  pageSize: any = 5;
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  displayedColumns: string[] = ['SNo', 'eiZatchupId', 'nameOfSchool', 'state', 'city',
    'planTaken', 'delhiUniversity', 'subscriptionType', 'onboardingFeesGross', 'onboardingFeesNet',
    'couponCodeApplied', 'transictionId', 'Action'];

  dataSource: any;
  allStates: any;
  allCities: any;
  stateId: any = '';
  cityId: any = '';
  university: any;
  state: any = '';
  city: any = '';
  filterFromDate: any;
  filterToDate: any;
  maxDate: any;
}