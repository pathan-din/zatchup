export class Pagination {
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  startIndex: number;
  pageSize: any;
  params: any = {};
  dataSource: any;
  pageCount: any
}
export class KYCHistory {
  activeParams: any;
  kycDetails: any;
  kycHistory: any;
  toggleApproveField: boolean;
  toggleRejectField: any;
  kycId: any
  kycDetailsParams: any = {}
  sortBy: any = '';
  rejectionId: any;
  rejectionReason: any = '';
  rejectionRemark: any
  approveOrReject: any = 'approve';
  errorDisplay: any = {};
};
export class KycPendingRequest extends Pagination {
  kycType: any = '';
  userType: any = '';
  requestType: any = '';
  requestReason: any = '';
  filterFromDate: any;
  filterToDate: any;
  maxDate: any;
  displayedColumns: string[] = ['SNo', 'NameOfUser', 'UserType', 'ProofName',
    'RequestReason', 'RequestType', 'Action'];
};
export class CompleteKycList extends Pagination {
  status: any = '';
  displayedColumns: string[] = ['SNo', 'EIZatchUpIDOfUser', 'NameOfUser', 'UserType', 'ProofName',
    'RequestReason', 'RequestType', 'Status', 'RejectionRemarks', 'Action'];
  dataSource: any;
  pageCount: any;
}

export class PendingChangeRequests extends Pagination {
  filterFromDate: any;
  filterToDate: any;
  maxDate: any;
  changeField: any = '';
  displayedColumns: string[] = ['position', 'eiZatchupId', 'kycDetails', 'name', 'dateAndTime',
    'fieldOfChange', 'oldData', 'newData', 'action'];
}

export class KycChangeRequestDetails extends KYCHistory {

}