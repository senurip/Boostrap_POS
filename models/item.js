export default class ItemModel{

    constructor(id, item_Name, itemDescription, itemQuantity, itemPrice ) {
        this._id = id;
        this._item_Name = item_Name;
        this._itemDescription = itemDescription;
        this._itemQuantity = itemQuantity;
        this._itemPrice = itemPrice;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get item_Name() {
        return this._item_Name;
    }

    set item_Name(value) {
        this._item_Name = value;
    }

    get itemDescription() {
        return this._itemDescription;
    }

    set itemDescription(value) {
        this._itemDescription = value;
    }

    get itemQuantity() {
        return this._itemQuantity;
    }

    set itemQuantity(value) {
        this._itemQuantity = value;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }

}