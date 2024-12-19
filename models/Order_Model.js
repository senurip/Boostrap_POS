export default class Order_Model{
    constructor(cusID, cusName, order_id, date, itemCode, itemName, itemPrice, itemQtyOnHand, orderQty, total) {
        this._cusID = cusID;
        this._cusName = cusName;
        this._order_id = order_id;
        this._date = date;
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._itemPrice = itemPrice;
        this._itemQtyOnHand = itemQtyOnHand;
        this._orderQty = orderQty;
        this._total = total;
    }

    get cusID() {
        return this._cusID;
    }

    set cusID(value) {
        this._cusID = value;
    }

    get cusName() {
        return this._cusName;
    }

    set cusName(value) {
        this._cusName = value;
    }

    get order_id() {
        return this._order_id;
    }

    set order_id(value) {
        this._order_id = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }

    get itemQtyOnHand() {
        return this._itemQtyOnHand;
    }

    set itemQtyOnHand(value) {
        this._itemQtyOnHand = value;
    }

    get orderQty() {
        return this._orderQty;
    }

    set orderQty(value) {
        this._orderQty = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}