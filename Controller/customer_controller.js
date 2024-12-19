import Customer_Model  from "../models/Customer_Model.js";
import {customer_array} from "../db/database.js";

//=============load customer Table======================
const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.map((item) => {
        let data = `<tr><td>${item.cus_id}</td><td>${item.cus_name}</td><td>${item.cus_address}</td><td>${item.cus_salary}</td></tr>`;
        $("#customerTableBody").append(data);
    })
}


//=============Clear Form ==================
const clearForm = () =>{
    $(`#customerId, #customerName, #customerAddress, #customerSalary`).val("");
}


//---------- Validate Customer ID Format----------
const validationId = (cus_id) => /^C_\d{4}$/.test(cus_id)


// ===============Add Customer ==================
$("#customer_add_btn").on("click", function (){
    let cus_id = $('#customerId').val().trim();
    let cus_name = $('#customerName').val().trim();
    let cus_address = $('#customerAddress').val().trim();
    let cus_salary = parseFloat($('#customerSalary').val().trim());

    if (!validationId(cus_id)){
        Swal.fire({
            title: "Invalid Customer ID",
            text: "Please enter a valid Customer ID.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'alert-title',
                content: 'alert-content'
            }
        });
    }else if (!cus_name) {
        Swal.fire({
            title: "Name Required",
            text: "Please enter your name.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'alert-title',
                content: 'alert-content'
            }
        });
    }else if (!cus_address){
        Swal.fire({
            title: "Invalid Salary",
            text: "Please enter a valid salary amount.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'alert-title',
                content: 'alert-content'
            }
        });
    }else {
        let customer = new Customer_Model(cus_id, cus_name, cus_address, cus_salary);
        customer_array.push(customer);
        loadCustomerTable();
        clearForm();
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
});


//===============get the customer====================//
let selectCustomerIndex;

$("#customerTableBody").on("click", "tr", function (){
    selectCustomerIndex = $(this).index();
    let customerData = customer_array[selectCustomerIndex];
    $('#customerId').val(customerData.cus_id);
    $('#customerName').val(customerData.cus_name);
    $('#customerAddress').val(customerData.cus_address);
    $('#customerSalary').val(customerData.cus_salary);

    console.log(customerData);
});


//===============Delete the customer====================//
$("#customer_delete_btn").on("click", function (){
    let cus_id = $('#customerId').val().trim();

    const index  = customer_array.findIndex(item => item.cus_id === cus_id);

    if (index === -1){
        clearForm();

        Swal.fire({
            title: "Item Not Found",
            text: "No customer found with the given ID.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return;
    }

    customer_array.splice(index, 1);
    loadCustomerTable();
    clearForm();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
    $('#customerId').val("");
});


//===============Update the customer====================//
$("#customer_update_btn").on("click", function (){
    let cus_id = $('#customerId').val().trim();
    let cus_name = $('#customerName').val().trim();
    let cus_address = $('#customerAddress').val().trim();
    let cus_salary = parseFloat($('#customerSalary').val().trim());

    if (!validationId(cus_id)) {
        Swal.fire({
            title: "Invalid Customer ID",
            text: "Customer ID format is incorrect. It should be in the format: cus_XXXX (e.g., cus_1234).",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    } else if (!cus_name) {
        Swal.fire({
            title: "Empty Field",
            text: "Customer name cannot be empty.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    } else if (!cus_address) {
        Swal.fire({
            title: "Empty Field",
            text: "Customer address cannot be empty.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    } else if (isNaN(cus_salary)) {
        Swal.fire({
            title: "Invalid Salary",
            text: "Customer salary must be a valid number.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    } else {
        let updatedCustomer = new Customer_Model(cus_id, cus_name, cus_address, cus_salary);
        customer_array[selectCustomerIndex] = updatedCustomer;
        loadCustomerTable();
        clearForm();

        // Show success alert
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Updated!",
                    text: "Your file has been updated.",
                    icon: "success"
                });
            }
        });
    }
})