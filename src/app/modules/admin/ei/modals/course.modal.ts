export class CourseDetails {
    displayedColumns: string[] = ['courseName', 'startYera',
        'endYear', 'durationOfCourse', 'noOfStandards', 'noOfClass',
        'noOfStudents', 'noOfAlumni'];
    courseDetail: any;
    courseId: any;
    eiId: any;
    standardList: any;
    classList: Array<any> = [];
}