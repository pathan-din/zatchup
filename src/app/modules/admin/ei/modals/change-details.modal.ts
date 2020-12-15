export class ChangeDetailRequestsPending {
    displayedColumns: string[] = ['position', 'eiZatchupId', 'nameOfTheschool', 'dateAndTime',
        'state', 'city', 'boardUniversity', 'fieldOfChange', 'oldData', 'newData', 'action'];
    filterFromDate: any;
    filterToDate: any;
    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    state: any = '';
    city: any = '';
    dataSource: any;
    startIndex: any;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    modal: any = {};
    page_size: any
    university: any;
    changeField: any = ''
}