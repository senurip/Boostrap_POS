export default class Customer_Model{
    constructor(cus_id, cus_name, cus_address, cus_salary) {
        this._cus_id = cus_id;
        this._cus_name = cus_name;
        this._cus_address = cus_address;
        this._cus_salary = cus_salary;
    }

    get cus_id() {
        return this._cus_id;
    }

    set cus_id(value) {
        this._cus_id = value;
    }

    get cus_name() {
        return this._cus_name;
    }

    set cus_name(value) {
        this._cus_name = value;
    }

    get cus_address() {
        return this._cus_address;
    }

    set cus_address(value) {
        this._cus_address = value;
    }

    get cus_salary() {
        return this._cus_salary;
    }

    set cus_salary(value) {
        this._cus_salary = value;
    }


}