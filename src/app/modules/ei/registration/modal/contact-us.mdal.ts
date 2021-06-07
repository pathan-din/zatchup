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
  page_size = 12
  subject: any;
  standard: any;
  field: any;
  levelOfEducation: any;
  subjectName: any = '';
  standardName: any = '';
  fieldName: any = '';
  levelOfEducationName: any = '';
}

export class EiCourseDetails extends Pagination{
  courseDetails: any;
  DisplayedColumns: string[] = ['radioButton','position', 'name', 'price', 'validity', 'views',];
}

export class CartList extends Pagination{
  data: any;
  paymentDetails: any;
}

export class StarclassOrderList extends Pagination{
  params : any = {}
  displayedColumns: string[] = ['SNo','orderId', 'amount', 'couponCode', 'dateBought','boughtBy','downloadInvoice'];
  filterFromDate: any;
  filterToDate: any;
}

export class EiCourseList extends Pagination{
  displayedColumns: string[] = ['position', 'courseName', 'courseId','levelOfEducation', 
  'field','noOfStandards','subject',
  'noOfCourse','Action'];
  params: any = {};
  id: any;
  modal: any;
  page_size: any = 10;
  levelOfEducation: any;
  subject: any;
  standard: any;
  field: any;
  subjectName: any = '';
  standardName: any = '';
  fieldName: any = '';
  levelOfEducationName: any = '';
}

export class ZatchupStarclassCourses extends Pagination{
  displayedColumns: string[] = ['position', 'courseName','boughtDate', 
  'expiryDate','totalViews','noOfViews', 'Action' ,'student' ,'teacher' ,'editRights']; 
  params: any = {}
  id: any;
  modal: any;
}

export class StudentAuidence extends Pagination{
  displayedColumns: string[] = ['select','position', 'profilePic','nameOfStudent','classDetails','class','rollNo'];
  id: any;
  params: any ={};
  page_size: any = 100;
}

export class TeacherAuidence extends Pagination{
  displayedColumns: string[] = ['select','position', 'profilePic','nameOfTeacher','empId'];
  id: any;
  params: any ={};
}
export class EditTeacherAuidence extends Pagination{
  displayedColumns: string[] = ['select','position', 'profilePic','nameOfTeacher','empId'];
  id: any;
  params: any ={};
  page_size: any = 100;
}

export class EiStarclassCourseView extends Pagination{
  courseDetails: any;
}

export class EiStarclassLectureList extends Pagination{
  displayedColumnsOne: string[] = ['position', 'lectureTitle', 'topicsCoverd', 'uploadedBy', 'totalView',
        'viewDetails'];
        model: any;
        id: any;
  modal: any;
}

export class ZatchupStarclassCourseView extends Pagination {
  displayedColumnsOne: string[] = ['position', 'lectureTitle', 'topicsCoverd',
        'viewDetails'];
        model: any;
        id: any;
  modal: any;
}

export class EiLectureDetails extends Pagination{
  model:any;
  details: any;
}

export class StarclassCourseHistory extends Pagination {
  modal: any;
    history: any;
    displayedColumns: string[]= ['position', 'action', 'actionDate', 'message'] 
}

export class EiPlayHistory extends Pagination {
  modal : any;
  displayedColumns: string[]= ['position', 'lectureTitle', 'playedBy', 'zatchupId', 'playTime']
}

export class StarclassLectureHistory extends Pagination{
  modal: any;
    history: any;
    displayedColumns: string[]= ['position', 'action', 'uploadedBy','zatchupId', 'actionDate', 'message']  
}

export class SubadminCompleteRequest extends Pagination {
  displayedColumns: string[] = ['SNo', 'Name', 'zatchUpID', 'profilePicture', 'dateOfBirth', 'emailId',
  'phone', 'EmployeeID', 'Action'];
  listParams: any;
}