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

export class ContactUs {
    errorDisplay: any = {};
    model: any = {};
    allStates: any;
    allCities: any;
    allSchools: any;
    stateId: any = '';
    cityId: any = '';
    schoolId: any = '';
    fullAddress: any;
    university: any;
    issue: any;
    message: any;
    type: any;
    zatchupId: any;
    schoolName: any
}

export class DashBoardData extends Pagination {
  model: any;
  data: any = [];
  id: any;
  page_size = 10
}

export class EiCourseDetails extends Pagination{
  courseDetails: any;
  DisplayedColumns: string[] = ['radioButton','position', 'name', 'price', 'validity', 'views',];
}