export class Coupon {
    code: any;
    purpose: any = '';
    maximum_discount_amount: any;
    minimum_order_value: any;
    discount_amount: any;
    enddate: any;
    coupon_type: any;
    discount_type: any = '';
}

export class CouponList {
    activeParams: any;
    title: any = '';
    startIndex: Number;
    couponParams: any = {}
    pageSize: any = 5;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedColumns: string[] = ['position', 'couponPorpuse', 'couponCode', 'activationDate', 'createdBy', 'minimumOrderValue', 'discount', 'MaximumDiscountAmount', 'couponCodeApplied', 'totalDiscountGiven', 'couponExpirationdate', 'expireCouponButton'];

    dataSource: any;
}