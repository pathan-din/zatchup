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

export class SubAdminAccessHistory extends Pagination {
    displayedColumns: string[] = ['position', 'dateAndTime', 'permission', 'module_name'
        , 'permission_by', 'subadmin_name'];
}