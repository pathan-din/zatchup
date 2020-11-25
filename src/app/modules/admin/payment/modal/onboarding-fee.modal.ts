export class OnboardingFee{
    startIndex: Number;
    listParams: any = {};
    pageSize: any = 5;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position','zatchUpID','schoolName', 'state','city','board','onboardingFeesGross','onboardingFeesNet','couponCodeApplied','transactionID','viewInvoice'];   

    dataSource: any;
  allStates: any;
  allCities: any;
  stateId: any= '';
  cityId: any= '';
  university: any;
  state: any= '';
  city: any = '';
}