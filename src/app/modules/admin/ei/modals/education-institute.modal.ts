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

export class EducationInstitute {
    name_of_school: any;
    address1: any;
    address2: any;
    landmark: any;
    pincode: any;
    university: any;
    no_of_students: any;
    allStates: any;
    allCities: any
    stateId: any = '';
    cityId: any = '';
    isExists: boolean;
    numberOfStudentList: any;
    students: any = '';
    id: any;
    city: any
}

export class EIDbList extends Pagination {
    displayedColumns: string[] = ['position', 'eiZatchupID', 'schoolName', 'state', 'city',
        'status', 'dateOfAdding', 'action'];

    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    state: any = '';
    city: any = '';
    modal: any = {};
    university: any;
    onboardingStatus: any = '';
    subStatus: any;
    search: any;
    filterFromDate: any;
    filterToDate: any;
    filterParams: any;
}
export class DocHistory extends Pagination {
    existingZatchIDMOUDoc: any;
    requiredMOU: boolean = true;
    errorDisplay: any = {};
    remarks: any;
    displayedColumns: string[] = ['position', 'DateOfUploading', 'NameofDocument', 'ViewDocument',
        'Remarks', 'UploadedByEI', 'UploadedByEmployeeName'];
    school_id: any;
    params: any;
    ascendingOrder: any = 'true';
    doc_type: any = '';
}
export class MessagesHistory extends Pagination {
    params: any;
    displayedColumns: string[] = ['position', 'ticketId', 'dateOfMessage', 'message',
        'resolutionDate', 'resolveComment', 'issue'];
}
export class PastPocDetails extends Pagination {
    displayedColumns: string[] = ['position', 'fromDate', 'toDate', 'employeeId', 'name', 'mobileNumber',
        'emailAddress', 'addedByEmployeeId', 'addedByemployeeName'];
    params: any;
    ei_id: any;
}
export class CurrentPocDetails extends PastPocDetails {
    response: any;
    employeeId: any;
    poc_required: boolean = true;
    searchConfig: any = {
        "api_endpoint": "admin/fetch-poc-details/"
    }
    firstName: any;
    ei_id: any;
    employee_id: any;
    phone: any;
    email: any;
    model: any = {};
}

export class RejectedEIList extends Pagination {
    displayedColumns: string[] = ['position', 'addingDate', 'zatchUpID', 'schoolName', 'state', 'city', 'status',
        'action'];

    filterFromDate: any;
    filterToDate: any;
    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    state: any = '';
    city: any = '';
    modal: any = {};
    university: any;
    maxDate: any
    onboardingStatus: any = '';
}

export class DatabaseHistory extends Pagination {
    displayedColumns: string[] = ['position', 'dateAndTime', 'name_of_school', 'status',
        'addedRemoved', 'employeeName'];

    isDeleted: any = '';
    filterFromDate: any;
    filterToDate: any;


}

export class SubscriptionPlanHistory extends Pagination {
    modal: any;
    displayedColumns: string[] = ['position', 'dateOfSubscription', 'planDetails', 'grossAmount',
        'couponCode', 'netAmount', 'dateOfSubscriptionExpiry', 'transactionId', 'action'];
}

export class PlanDetails extends Pagination {
    displayedColumns: string[] = ['position', 'pplan', 'views', 'validity', 'action'];
    modal: any;
    id: any;
    model: { page: any; page_size: any; id: any; };
}

export class CourseList extends Pagination {
    displayedColumns: string[] = ['SNo', 'dateOfAdding', 'courseId', 'titleOfCourse',
        'levelOfEducation', 'field', 'standard', 'subject', 'action'];
    modal: any;
    id: any;
    Id: any;
}

export class StarclassPlanHistory extends Pagination {
    modal: any;
    history: any;
    displayedColumns: string[]= ['position', 'action', 'actionDate', 'message']
}

export class StarclassCourseHistory extends Pagination{
    modal: any;
    history: any;
    displayedColumns: string[]= ['position', 'action', 'actionDate', 'message']

}

export class EIStarclassCourseHistory extends Pagination {
    modal: any;
    history: any;
    displayedColumns: string[]= ['position', 'action', 'actionDate', 'message'] 
}

export class StarclassCourseDetails extends Pagination {
    courseDetails: any;

}

export class LectureList extends Pagination {
    displayedColumnsOne: string[] = ['position', 'lectureTitle', 'topicsCoverd',
        'viewDetails'];
    planDisplayedColumns: string[] = ['position', 'name', 'price', 'validity', 'views',];
    model: any;
    id: any;
}

export class LectureDetails extends Pagination {
    model: any;
    details: any;
}

export class LectureDetailsEdit extends Pagination {
    model: any;
    details: any;
}

export class CoursesUploadedByEi extends Pagination{
  modal: any;
  id: any;
  displayedColumns: string[] = ['SNo', 'dateOfCreate','courseID', 'titleOfCourse', 'levelofEducation',
  'Field','Standard','Subject','numberOfLectures',
  'TotalActivePlans', 'totalViewsOncourse', 'Action'];
  filterFromDate: any;
  filterToDate: any;

}

export class ActiveBoughtCourses extends Pagination{
    displayedColumns: string[] = ['position','dateOfBuying', 'courseId','titleOfCourse', 'levelOfEducation',
    'field', 'standard','subject','buyingEiZatchupId','buyingEiName','dateOfExpiry'];
  params: { page: any; page_size: any; };
}