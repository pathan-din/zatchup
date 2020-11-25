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
export class KycPendingRequest{
    startIndex : number;
    pageSize: any = 5;
    displayedColumns: string[] = ['SNo', 'EIZatchUpIDOfUser', 'NameOfUser', 'UserType', 'ProofName',   
     'RequestReason', 'RequestType', 'Action'];
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    dataSource: any;
  params: { date_from: string; date_to: string; kyc_type: any; user_type: any; request_type: any; request_reason: any; page_size: any;page: any; };

};
export class CompleteKycList {
    startIndex: number;
    pageSize: any = 5;
    status: any = '';
    
    displayedColumns: string[] = ['SNo', 'EIZatchUpIDOfUser', 'NameOfUser', 'UserType', 'ProofName',
    'RequestReason', 'RequestType', 'Status', 'RejectionRemarks', 'Action'];
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
      }
      dataSource: any;
      params: { date_from: string; date_to: string; kyc_type: any; user_type: any; status: any; request_type: any; request_reason: any; page_size: any; page: any; };
    }