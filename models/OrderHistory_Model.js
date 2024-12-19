export default class OrderHistory_Model {
    constructor(order_id, date, customerId, itemName, itemPrice, order_qty, sub_total, discount_range, discount, final_total) {
        this._order_id = order_id;
        this._date = date;
        this._customerId = customerId;
        this._itemName = itemName;
        this._itemPrice = itemPrice;
        this._order_qty = order_qty;
        this._sub_total = sub_total;
        this._discount_range = discount_range;
        this._discount = discount;
        this._final_total = final_total;
    }

    // Getters
    get order_id() {
        return this._order_id;
    }

    get date() {
        return this._date;
    }

    get customerId() {
        return this._customerId;
    }

    get itemName() {
        return this._itemName;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    get order_qty() {
        return this._order_qty;
    }

    get sub_total() {
        return this._sub_total;
    }

    get discount_range() {
        return this._discount_range;
    }

    get discount() {
        return this._discount;
    }

    get final_total() {
        return this._final_total;
    }

    // Setters
    set order_id(order_id) {
        this._order_id = order_id;
    }

    set date(date) {
        this._date = date;
    }

    set customerId(customerId) {
        this._customerId = customerId;
    }

    set itemName(itemName) {
        this._itemName = itemName;
    }

    set itemPrice(itemPrice) {
        this._itemPrice = itemPrice;
    }

    set order_qty(order_qty) {
        this._order_qty = order_qty;
    }

    set sub_total(sub_total) {
        this._sub_total = sub_total;
    }

    set discount_range(discount_range) {
        this._discount_range = discount_range;
    }

    set discount(discount) {
        this._discount = discount;
    }

    set final_total(final_total) {
        this._final_total = final_total;
    }
}
