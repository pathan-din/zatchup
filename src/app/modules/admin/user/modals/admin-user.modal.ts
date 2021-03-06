export class Pagination {
    dataSource: any;
    page_size: any;
    params: any = {};
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    startIndex: number;
    countData: any;
}

export class UserDashboard {
    filteredUsers: any = {};
    users: any = {};
    newReportdUsers: any = {};

    signup_user_zatchup_count: any
    total_kyc_verified_count: any
    active_users_count: any
    dormant_users_count: any
    user_verified_by_ei: any
    total_users_added: any
    total_unverified_users: any
    total_unresolved_userprofile_reports: any
    new_user_profile_reports: any
    new_user_reported: any

}
export class UserManagement {
    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    state: any = '';
    city: any = '';
    modal: any = {};
    filterFromDate: any
    fromDate: any;
    toDate: any;
    filterToDate: any;
}

export class SearchUserList {
    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    state: any = '';
    city: any = '';

    dataSource: any;
    page_size: any;
    params: any = {};
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    startIndex: number;
    search: any;
}

export class SignupUsers {
    startIndex: Number;
    listParams: any = {}
    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    state: any = '';
    city: any = '';
    filterFromDate: any;
    filterToDate: any;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position', 'ZatchUpID', 'profilePic', 'Name', 'noOfEducationPro',
        'noOfVerifiedUserPro', 'signupdate', 'onlinestatus', 'kycstatus', 'schoolverification', 'LastLoginDate', 'Action'];

    dataSource: any;
    university: any;
    stagePending: any = '';
    message: any
    errorDisplay: any = {};
    eiId: any
    currentEi: any;
    previousEi: any;
    ageGroup: any;
    status: any = '';
    kycApproved: any = '';
    page_size: any;
    loginFromDate: any;
    loginToDate: any;
    maxDate: Date;
    pageCount: any;
    kycVerified: any
    schoolStatus: any = '';
    filterParams: string;
    zatchupId: any;
    lastLoginParams: any;
}

export class KycVerifiedUsers extends SignupUsers {
    displayedColumns: string[] = ['position', 'ZatchUpID', 'profilePic', 'Name', 'noOfEducationPro',
        'noOfVerifiedUserPro', 'signupdate', 'onlinestatus', 'schoolverification', 'LastLoginDate', 'Action'];
}

export class KycVerifiedByEi extends SignupUsers {
    displayedColumns: string[] = ['position', 'ZatchUpID', 'profilePic', 'Name', 'noOfEducationPro',
        'noOfVerifiedUserPro', 'signupdate', 'onlinestatus', 'LastLoginDate', 'Action'];
}

export class ActiveUsers extends SignupUsers {
    displayedColumns: string[] = ['position', 'ZatchUpID', 'profilePic', 'Name', 'noOfEducationPro',
        'noOfVerifiedUserPro', 'signupdate', 'kycstatus', 'schoolverification', 'LastLoginDate', 'Action'];

}


export class DormantUsers extends SignupUsers {
    displayedColumns: string[] = ['position', 'ZatchUpID', 'profilePic', 'Name', 'noOfEducationPro',
        'noOfVerifiedUserPro', 'signupdate', 'kycstatus', 'schoolverification', 'LastLoginDate', 'Action'];
}