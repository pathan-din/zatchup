export class MyAssignedEI {
    displayedColumns: string[] = ['position', 'zatchupId', 'EiName', 'state', 'city',
        'address', 'unresolvedMessage', 'action'];

    dataSource: any;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    startIndex: any;
    pageSize: any = 5;
    // modal: any = {};
    params: any = {}
    stateId: any = '';
    cityId: any = '';
    allCities: any;
    allStates: any;
    university: any
}