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
}

export class EIDbList {
    displayedColumns: string[] = ['position', 'dateOfAdding', 'eiZatchupID', 'schoolName', 'state', 'city', 'address', 'board',
        'approximateNumber', 'status', 'dateofOnboarding', 'action'];

        stateId: any= '';
        cityId: any = '';
        allStates: any;
        allCities: any;
        state: any= '';
        city: any = '';
        dataSource: any;
        startIndex: any;
        config = {
            itemsPerPage: 0,
            currentPage: 1,
            totalItems: 0
            }
             modal: any =  {};
             page_size: any
  university: any;
  onboardingStatus: any= '';
            }