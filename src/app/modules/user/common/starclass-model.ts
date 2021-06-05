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
export class StarclassCourseList extends Pagination {
    displayedColumns: string[] = ['position', 'courseName', 'courseId', 'levelOfEducation', 
    'field','noOfStandards','subject',
    'noOfCourse','Action'];
    params: any = {}
    id: any;
    modal: any;
  allSchool: any;
  schoolId: any = '';
  courseName: any;

}

export class StarclassLectureList extends Pagination{
    displayedColumnsOne: string[] = ['position', 'lectureTitle', 'topicsCoverd',
          'viewDetails'];
          model: any;
          id: any;
    modal: any;
  }

  export class StarclassSchoolList extends Pagination {
    displayedColumns : string[] = ['position', 'zatchupId', 'schoolName', 'view']
    model: any = {};
  }

  export class PlayHistory extends Pagination {
    displayedColumns : string [] = ['position', 'courseName', 'lectureTitle', 'playTime',]
    model: any = {}
  }