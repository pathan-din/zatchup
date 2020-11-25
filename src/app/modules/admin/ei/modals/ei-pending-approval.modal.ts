export class EIPendingApproval {
    startIndex: Number;
    listParams: any = {}
    pageSize: any = 5;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position','zatchUpID','schoolName', 'state','city','additionType','signUpDate','action'];
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
}

export class OnBoardList {
    startIndex: Number;
    listParams: any = {}
    pageSize: any = 5;
    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    state: any = '';
    city: any = '';
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position','zatchUpID','schoolName', 'state','city','signUpDate', 'onboardStage', 'action'];

    dataSource: any;
  university: any;
  stagePending: any='';
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
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position','schoolName', 'state','city', 'board','address', 'zatchUpID','addedBy',
    'messages','action'];
    maxDate: any;

    dataSource: any;
  university: any;
}

export class OnboardedZatchup{
    startIndex: Number;
    listParams: any = {};
    pageSize: any = 5;
    dataSource: any;
    state: any ='';
    city: any= '';
    stateId: any ='';
    cityId: any ='';
    allStates: any;
    allCities: any;
    university: any;
    config = {
        itemsPerPage:0,
        currentPage:1,
        totalItems:0
    }
    displayedColumns: string[] = ['position','zatchUpID','schoolName', 'state','city',  'board','onboardingDate','studentZatchup',
    'totalAlumnizatchup','commission','subscriptionStatus', 'status','eiPocName', 'action'];   
  
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
    displayedColumns: string[] = ['position','addingDate','zatchUpID', 'name','phoneNumber','emailID',  'userID','class','rollNumber',
    'gender','age','unverifyStudent'];   

    dataSource: any;
  courseList: any=[];
  standardList: any=[];
  classList:any=[];
  classId: any=[];
  courseId: any=[];
  standardId: any=[];
  //classId: any='';
  course: any='';
  standard: any='';
  class: any='';
  
//   courseList: any = [];
//   standardList: any = [];
//   classList: any = [];
//   displayCourseList: any;
//   displayStandardList: any;
//   displayClassList: any;
}

export class PendingApprovalProfile{
    zatchupId: any;
    existingZatchIDMOUDoc: any
    rejectionReason: any;
    rejectionRemark: any;
    employeeId: any;
    requiredMOU: boolean = true;
    errorDisplay: any = {};
    editReason: any;
    editDescription: any;
    comment: any
}