export class TicketsList {
    filterFromDate: any;
    filterToDate: any;
    startIndex: any;
    listParams: any = {};
    pageSize: any;
    dataSource: any;
    state: any = '';
    city: any = '';
    stateId: any = '';
    cityId: any = '';
    allStates: any;
    allCities: any;
    university: any;
    maxDate: any
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position', 'ticket_raising_date', 'ticketName', 'zatchUpID', 'eiName', 'address', 'state', 'city',
        'board', 'emailId', 'phoneNumber', 'message'];

}