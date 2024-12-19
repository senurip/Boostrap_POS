import Item_Model from "../models/Item_Model.js";
import {item_array} from "../db/database.js";


//=============load Item Table======================
const loadItemTable = () => {
    $("#item_searchTableBody").empty();
    item_array.map((item) => {
        let data = `<tr><td>${item.item_code}</td><td>${item.item_name}</td><td>${item.item_description}</td><td>${item.item_price}</td><td>${item.item_qty}</td></tr>`;
        $("#item_searchTableBody").append(data);
    })
}


//---------- Validate Item ID Format----------
const validationId = (i_id) => /^I_\d{4}$/.test(i_id)


// ===================Add Item=============
$("#item_add_btn").on("click", function() {
    let item_code =  $('#saveItemCodeField').val().trim();
    let item_name = $('#saveItemNameField').val().trim();
    let item_description = $('#saveItemDescriptionField').val().trim();
    let item_price = parseFloat($('#saveItemPriceField').val().trim());
    let item_qty = parseInt($('#saveItemQtyField').val().trim());

    // Validate input fields
    if(!validationId(item_code)){
        Swal.fire({
            title: "Invalid Item ID",
            text: "Please enter a valid Item ID.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'alert-title',
                content: 'alert-content'
            }
        });
    } else if (!item_name) {
        Swal.fire({
            title: "Empty Field",
            text: "Item name cannot be empty.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return; // Exit if validation fails
    } else if (!item_description) {
        Swal.fire({
            title: "Empty Field",
            text: "Item description cannot be empty.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return; // Exit if validation fails
    } else if (isNaN(item_price) || item_price <= 0) {
        Swal.fire({
            title: "Invalid Price",
            text: "Item price must be a valid number greater than zero.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return; // Exit if validation fails
    } else if (isNaN(item_qty) || item_qty < 0) {
        Swal.fire({
            title: "Invalid Quantity",
            text: "Item quantity must be a valid number greater than or equal to zero.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });

    }

    let item = new Item_Model(item_code, item_name, item_description, item_price, item_qty);
    item_array.push(item);

    loadItemTable();
    cleanForm();

    // Show success alert
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
});


//===============get the Item====================//
let selectItemIndex;

$("#item_searchTableBody").on("click", "tr", function (){
    selectItemIndex = $(this).index();
    let itemData = item_array[selectItemIndex];
    $('#saveItemIdField').val(itemData.item_code);
    $('#saveItemNameField').val(itemData.item_name);
    $('#saveItemDescriptionField').val(itemData.item_description);
    $('#saveItemPriceField').val(itemData.item_price);
    $('#saveItemQtyField').val(itemData.item_qty);

})


// clear
$("#item_clear_btn").on('click',function (){
    cleanForm();
});

//clear
const cleanForm=()=>{
    $('#saveItemIdField').val("");
    $("#saveItemNameField").val("");
    $("#saveItemDescriptionField").val("");
    $("#saveItemPriceField").val("");
    $("#saveItemQtyField").val("")
}


//============update the item======================
$("#item_update_btn").on("click", function (){
    let item_code =  $('#saveItemCodeField').val().trim();
    let item_name = $('#saveItemNameField').val().trim();
    let item_description = $('#saveItemDescriptionField').val().trim();
    let item_price = parseFloat($('#saveItemPriceField').val().trim());
    let item_qty = parseInt($('#saveItemQtyField').val().trim());

    // Validate input fields
    if(!validationId(item_code)){
        Swal.fire({
            title: "Invalid Item ID",
            text: "Please enter a valid Item ID.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'alert-title',
                content: 'alert-content'
            }
        });

    }else if (!item_name){
        Swal.fire({
            title: "Empty Field",
            text: "Item name cannot be empty.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    }else if(!item_description){
        Swal.fire({
            title: "Empty Field",
            text: "Item description cannot be empty.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    }else if(!item_price){
        Swal.fire({
            title: "Invalid Price",
            text: "Item price must be a valid number greater than zero.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    }else if (!item_qty){
        Swal.fire({
            title: "Invalid Quantity",
            text: "Item quantity must be a valid number greater than or equal to zero.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    }else {
        let updateItem = new Item_Model(item_code, item_name, item_description, item_price, item_qty);
        item_array[selectItemIndex] = updateItem;
        loadItemTable();
        cleanForm();

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
});


//===============Delete the Item====================//
$("#item_delete_btn").on("click", function (){
    let itemCode = $('#itemCode').val().trim();

    const index = item_array.findIndex(item => item.item_code === itemCode);

    if (index !== -1) {
        cleanForm();

        Swal.fire({
            title: "Item Not Found",
            text: "No Item found with the given ID.",
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

    item_array.splice(index, 1);
    loadItemTable();
    cleanForm();

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
    $('#itemCode').val("");
});



