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
    displayedColumns: string[] = ['position', 'dateOfAdding', 'eiZatchupID', 'schoolName', 'state', 'city', 'address', 'board',
        'approximateNumber', 'status', 'dateofOnboarding', 'action'];

    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    state: any = '';
    city: any = '';
    modal: any = {};
    university: any;
    onboardingStatus: any = '';
}

export class RejectedEIList extends Pagination {
    displayedColumns: string[] = ['position', 'addingDate', 'schoolName', 'state', 'city', 'address', 'board', 'noOfStudent', 'status',
        'zatchUpID', 'action'];

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
    displayedColumns: string[] = ['position', 'dateAndTime', 'eiZatchupId', 'status',
        'addedRemoved', 'employeeName'];

    isDeleted: any = '';
}