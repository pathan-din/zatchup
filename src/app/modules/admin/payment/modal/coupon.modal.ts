export class Coupon {
    code: any;
    purpose: any = '';
    maximum_discount_amount: number;
    minimum_order_value: number;
    discount_amount: number;
    enddate: any;
    coupon_type: any;
    discount_type: any = '';
}

export class CouponList {
    activeParams: any;
    title: any = '';
    startIndex: Number;
    couponParams: any = {}
    pageSize: any;
    couponType: any = '';
    pageCounts: any;
    coupon_status: any;
    config = {
        itemsPerPage: 0,
        currentPage: 1,
        totalItems: 0
    }
    displayedActiveCouponColumns: string[] = ['position', 'couponPorpuse', 'couponCode', 'activationDate', 'minimumOrderValue', 'discount', 'discount_type', 'MaximumDiscountAmount', 'couponCodeApplied', 'couponExpirationdate', 'expireCouponButton'];
    displayedExpiredCouponColumns: string[] = ['position', 'couponPorpuse', 'couponCode', 'activationDate', 'minimumOrderValue', 'discount', 'discount_type', 'MaximumDiscountAmount', 'couponCodeApplied', 'couponExpirationdate'];


    dataSource: any;
}