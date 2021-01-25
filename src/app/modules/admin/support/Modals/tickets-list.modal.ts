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
    maxDate: any;
    messageFromSchool: any;
    status: any = '';
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position', 'ticket_raising_date', 'ticketName', 'zatchUpID',
        'message', 'resolve'];
    pageCounts: any;

}
export class ResolveTicket extends TicketsList {
    displayedColumns: any = ['position', 'zatchUpID', 'ticketName', 'ticket_raised_date', 'resolveDate', 'resolveBy', 'resolveComment',];
}