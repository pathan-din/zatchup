export class Pagination {
    dataSource: any;
    page_size: any;
    startIndex: any;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    };
    pageCounts: any;
}

export class ChangeDetailRequestsPending extends Pagination {
    displayedColumns: string[] = ['position', 'eiZatchupId', 'nameOfTheschool', 'dateAndTime',
        'state', 'city', 'boardUniversity', 'fieldOfChange', 'oldData', 'newData', 'action'];
    filterFromDate: any;
    filterToDate: any;
    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    state: any = '';
    city: any = '';
    // dataSource: any;
    maxDate: any;
    // startIndex: any;
    // config = {
    //     itemsPerPage: 0,
    //     currentPage: 1,
    //     totalItems: 0
    // }
    modal: any = {};
    // page_size: any
    university: any;
    changeField: any = ''
    search: any;
    pageCount: any;
    eId: any
}

export class ChangeInBankDetails extends Pagination {
    params: any = {};
    displayedColumns: string[] = ['position', 'bankName', 'ifscCode', 'accountNo', 'attachments', 'action']
    pageCount: any;
    Id: any;
}
export class ChangeDetailsView extends Pagination {
    approveOrReject: any = 'approve';
    errorDisplay: any = {};
    changeDetailsView: any;
    requestId: any;
    rejectionReason: any;
    rejectionRemark: any;
    eiId: any;
}
export class ChangeInBankDetailView extends Pagination {
    errorDisplay: any = {};
    approveOrReject: string;
    //   changeDetailsView: any;
    rejectionReason: any;
    rejectionRemark: any;
    id: any;
    cancel_cheque:any;
}