export  default class CustomerModel{

    constructor(id, firstName, lastName, cusEmail, phoneNumber, customerAddress) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._cusEmail = cusEmail;
        this._phoneNumber = phoneNumber;
        this._customerAddress = customerAddress;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get cusEmail() {
        return this._cusEmail;
    }

    set cusEmail(value) {
        this._cusEmail = value;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(value) {
        this._phoneNumber = value;
    }

    get customerAddress() {
        return this._customerAddress;
    }

    set customerAddress(value) {
        this._customerAddress = value;
    }



}