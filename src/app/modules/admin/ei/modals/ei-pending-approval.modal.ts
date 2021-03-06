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
export class EIPendingApproval {
    startIndex: Number;
    listParams: any = {}
    pageSize: any;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position', 'zatchUpID', 'schoolName', 'state', 'city', 'signUpDate', 'status', 'action'];
    dataSource: any;
    userId: any;
    filterFromDate: any;
    filterToDate: any;
    maxDate: any;
    allStates: any;
    allCities: any;
    stateId: any = '';
    cityId: any = '';
    additionType: any = '';
    university: any;
    search: any;
    pageCount: any
    added_by_admin: any;
    send_back_to_edit: any = '';
    ei_id: any = '';
}

export class OnBoardList extends Pagination {
    // startIndex: Number;
    listParams: any = {}
    pageSize: any;
    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    state: any = '';
    city: any = '';
    // pageCounts: any;
    // config = {
    //     itemsPerPage: 0,
    //     currentPage: 1,
    //     totalItems: 0
    // }
    displayedColumns: string[] = ['position', 'zatchUpID', 'schoolName', 'state', 'city', 'signUpDate', 'onboardStage', 'action'];

    // dataSource: any;
    university: any;
    stagePending: any = '';
    message: any
    errorDisplay: any = {};
    eiId: any
    stateName: any;
    cityName: any;
    search: any;
//   page_size: any;
}

export class notOnZatchup {
    startIndex: Number;
    listParams: any = {}
    pageSize: any = 5;
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
    displayedColumns: string[] = ['position', 'schoolName', 'state', 'city', 'board'];
    maxDate: any;

    dataSource: any;
    university: any;
    cityName: any;
    stateName: any;
    search: any;
    pageCount: any;
    subStatus: any;
}

export class OnboardedZatchup {
    filterParams: any;
    startIndex: any;
    listParams: any = {};
    pageSize: any;
    dataSource: any;
    state: any = '';
    city: any = '';
    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    university: any;
    isDisabled: any = '';
    subStatus: any = '';
    search: any;
    stateName: any;
    cityName: any;
    pageCounts: any;
    filterFromDate: any;
    filterToDate: any;
    maxDate: any;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position', 'zatchUpID', 'schoolName', 'state', 'city', 'onboardingDate', 'eiPocName', 'subscriptionStatus', 'status', 'action'];

}

export class SignUpEi {
    startIndex: Number;
    listParams: any = {};
    pageSize: any = 5;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position', 'zatchup_id', 'phone', 'email', 'added_by', 'action'];

    dataSource: any;
    course: any = '';
    standard: any = '';
    class: any = '';
    filterFromDate: any;
    filterToDate: any;
    page: any;
    maxDate: Date;
    allCourses: any = [];
    allStandard: any = [];
    allClasses: any = [];
    course_id: any = '';
    standard_id: any = '';
    class_id: any = '';
    pageCounts: any;
}
export class SentForApproval {
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position', 'addingDate', 'name', 'phoneNumber', 'userID', 'class', 'rollNumber'];
    startIndex: number;
    dataSource: any;
    listParams: any = {};
    filterFromDate: any;
    filterToDate: any;
    pageSize: any = 5;
    page: any;
    allCourses: any = [];
    allStandard: any = [];
    allClasses: any = [];
    course_id: any = '';
    standard_id: any = '';
    class_id: any = '';
    maxDate: Date;
    course: any = '';
    standard: any = '';
    class: any = '';
    pageCounts: any;

}
export class StudentApproval {


    startIndex: Number;
    listParams: any = {};
    pageSize: any = 5;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position', 'addingDate', 'zatchUpID', 'name', 'phoneNumber', 'emailID', 'userID', 'class', 'rollNumber',
        'gender', 'age'];

    dataSource: any;
    courseList: any = [];
    standardList: any = [];
    classList: any = [];
    classId: any = [];
    //  courseId: any = [];
    //standardId: any = [];
    //classId: any='';
    course: any = '';
    standard: any = '';
    class: any = '';
    class_id: any = '';
    standard_id: any = '';
    course_id: any = '';
    pageCounts: any;

    //   courseList: any = [];
    //   standardList: any = [];
    //   classList: any = [];
    //   displayCourseList: any;
    //   displayStandardList: any;
    //   displayClassList: any;
}

export class PendingApprovalProfile {
    zatchupId: any;
    existingZatchIDMOUDoc: any
    rejectionReason: any;
    rejectionRemark: any;
    employeeId: any;
    requiredMOU: boolean = true;
    poc_required: boolean = true;
    errorDisplay: any = {};
    editReason: any;
    editDescription: any;
    comment: any;
    stage: any
    searchConfig: any = {
        "api_endpoint": "admin/fetch-poc-details/"
    }
    searchConfigOne: any = {
        "api_endpoint": "admin/fetch-school-details/",
        "display": ["school_code"]
    }
    addressLineOne: any;
    addressLineTwo: any;
  name_of_school: any;
  school_code_required: boolean = true;
}

export class DatabaseView {
    zatchupId: any;
    existingZatchIDMOUDoc: any
    rejectionReason: any;
    rejectionRemark: any;
    employeeId: any;
    requiredMOU: boolean = true;
    errorDisplay: any = {};
    editReason: any;
    editDescription: any;
    comment: any;
    eiID: any;
    eiId: any;
    ei_id: any;
    isDisabled: any;
    enableDisableModalTitle: any;
    enableDisableReason: any;
    addressLineOne: any;
    addressLineTwo: any;
}

export class OnboardingView {
    zatchupId: any;
    existingZatchIDMOUDoc: any
    rejectionReason: any;
    rejectionRemark: any;
    employeeId: any;
    requiredMOU: boolean = true;
    errorDisplay: any = {};
    editReason: any;
    editDescription: any;
    comment: any;
    eiID: any;
}