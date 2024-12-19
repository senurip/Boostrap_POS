import { customer_array, item_array ,cart,orderHistory} from "../db/database.js";
import Order_Model from "../models/Order_Model.js";
import OrderHistory_Model from "../models/OrderHistory_Model.js";



let customer_search_id;
let item_search_id;
// Customer Search Logic
$("#customerSearch").click(function () {
    customer_search_id = $("#customerSearchId").val().trim();
    let customerFound = false;

    for (let customer of customer_array) {
        if (customer_search_id === customer.cus_id) {
            $("#customer_ID").val(customer.cus_id);
            $("#customer_Name").val(customer.cus_name);
            $("#customer_Address").val(customer.cus_address);
            $("#customer_Salary").val(customer.cus_salary);
            customerFound = true;
            break;
        }
    }

    if (!customerFound) {
        Swal.fire({
            title: "Customer Not Found",
            text: "No customer found with the provided ID.",
            icon: "error",
            confirmButtonText: "OK"
        });
    }
});


// Clear Customer Form
$("#btn_clear_order_customer").click(function () {
    cleanFormCustomer();
});

const cleanFormCustomer = () => {
    $("#customerSearchId").val("");
    $("#customer_ID").val("");
    $("#customer_Name").val("");
    $("#customer_Address").val("");
    $("#customer_Salary").val("");
};
// Item Search Logic
$("#itemSearch").click(function () {
    item_search_id = $("#itemSearchId").val().trim();
    let itemFound = false;

    for (let item of item_array) {
        if (item_search_id === item.item_code) {
            $("#itemCode").val(item.item_code);
            $("#itemName").val(item.item_name);
            $("#itemPrice").val(item.item_price);
            $("#itemQtyOnH").val(item.item_qty);
            $("#itemDescription").val(item.item_description);
            itemFound = true;
            break;
        }
    }

    if (!itemFound) {
        Swal.fire({
            title: "Item Not Found",
            text: "No item found with the provided code.",
            icon: "error",
            confirmButtonText: "OK"
        });
    }
});


// Clear Item Form
$("#btn_clear_order_item").click(function () {
    cleanFormItem();
});

const cleanFormItem = () => {
    $("#itemSearchId").val("");
    $("#itemCode").val("");
    $("#itemName").val("");
    $("#itemPrice").val("");
    $("#itemQtyOnH").val("");
    $("#itemDescription").val("");
};


// Calculate discount and amount
let total = 0;
let discount_range = 5; // Default discount rate
let discount = 0;
let amount = 0;

// Add Item to Cart
$("#add_btn").click(function () {
    // Validate required fields
    let date = $("#date").val();
    let cusID = $('#customer_ID').val();
    let cusName = $('#customer_Name').val();
    let itemCode = $("#itemCode").val();
    let itemName = $("#itemName").val();
    let itemPrice = parseFloat($("#itemPrice").val());
    let itemQtyOnHand = parseInt($("#itemQtyOnH").val());
    let orderQty = parseInt($("#orderQty").val());

    // Check for empty values
    if (!date || !cusID || !cusName || !itemCode || !itemName || isNaN(itemPrice) || isNaN(itemQtyOnHand) || isNaN(orderQty)) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please ensure all fields are filled out correctly.',
        });
        return;
    }

    if (orderQty > itemQtyOnHand) {
        Swal.fire({
            icon: 'warning',
            title: 'Quantity Unavailable',
            text: "Not enough quantity available.",
        });
        return;
    }

    // Create order object and add to cart
    let order_id = $('#orderID').val();
    let totalItem = itemPrice * orderQty;
    let order = new Order_Model(cusID, cusName, order_id, date, itemCode, itemName, itemPrice, itemQtyOnHand, orderQty, totalItem);
    cart.push(order);

    // Update ItemArray
    for (let i = 0; i < item_array.length; i++) {
        if (item_array[i].item_code === itemCode) {
            item_array[i].item_qty -= orderQty;
            LoadItemTable();
            break;
        }
    }

    loadCart(); // Update cart and calculations
    Swal.fire({
        icon: 'success',
        title: 'Item Added',
        text: 'Item successfully added to cart.',
    });
});

// Load Cart and Calculate Discount and Amount
const loadCart = () => {
    $("#cart").empty();
    total = 0;

    cart.forEach((item) => {
        total += item.total;
        let row = `<tr>
                    <td>${item.itemCode}</td>
                    <td>${item.itemName}</td>
                    <td>${item.itemPrice}</td>
                    <td>${item.orderQty}</td>
                    <td>${item.total.toFixed(2)}</td>
                   </tr>`;
        $("#cart").append(row);
    });

    discount = (total * discount_range) / 100;
    amount = total - discount;

    // Update displayed values
    $("#totalDisplay").text(`Total: ${total.toFixed(2)} Rs/=`);
    $("#discount_range").val(`${discount_range}%`);
    $("#discount").val(discount.toFixed(2));
    $("#amount").val(amount.toFixed(2));
};
// Remove Item from Cart
$("#remove_cart").click(function () {
    let order_id = $("#orderID").val().trim();

    if (!order_id) {
        Swal.fire({
            icon: 'error',
            title: 'Order ID Missing',
            text: 'Please enter a valid Order ID to remove an item from the cart.',
        });
        return;
    }

    let indexToRemove = cart.findIndex((item) => item.order_id === order_id);

    if (indexToRemove !== -1) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to remove this item from the cart?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                let removedItem = cart.splice(indexToRemove, 1)[0];
                total -= removedItem.total;

                // Clear discount and amount fields
                $("#discount_range").val("");
                $("#discount").val("");
                $("#amount").val("");

                // Restore item quantity in ItemArray
                for (let i = 0; i < item_array.length; i++) {
                    if (item_array[i].item_code === removedItem.itemCode) {
                        item_array[i].item_qty += removedItem.orderQty;
                        break;
                    }
                }

                loadCart(); // Update cart and calculations
                LoadItemTable();

                Swal.fire({
                    icon: 'success',
                    title: 'Removed!',
                    text: 'Item successfully removed from the cart.',
                });
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Order Not Found',
            text: 'The Order ID provided was not found in the cart.',
        });
    }
});


// Load Item Table
const LoadItemTable = () => {
    $("#itemTableBody").empty();
    item_array.slice(0, 5).forEach((item) => {
        let data = `<tr><td>${item.item_code}</td><td>${item.item_name}</td><td>${item.item_description}</td><td>${item.item_price}</td><td>${item.item_qty}</td></tr>`;
        $("#itemTableBody").append(data);
    });
};

// Complete JavaScript Code for Purchase and Order History
$("#btn_purches").click(function () {
    let order_id = $("#orderID").val().trim();
    let date = $("#date").val();
    let cash = parseFloat($("#cash").val());
    let customer_id = $('#customer_ID').val().trim();
    let item_name = $('#itemName').val();
    let price = parseFloat($('#itemPrice').val());
    let orderQty = parseInt($('#orderQty').val());
    let sub_total = total;

    if (!order_id || !date || !customer_id || !item_name || isNaN(price) || isNaN(orderQty) || isNaN(cash)) {
        Swal.fire({
            icon: 'error',
            title: 'Incomplete Information',
            text: 'Please ensure all fields are filled out correctly before proceeding.',
        });
        return;
    }

    if (cash < amount) {
        Swal.fire({
            icon: 'error',
            title: 'Insufficient Cash',
            text: 'The cash amount entered is insufficient to complete the purchase.',
        });
        return;
    }

    let balance = cash - amount;
    $("#balance").val(balance.toFixed(2));

    // Confirm purchase
    Swal.fire({
        title: 'Confirm Purchase',
        text: "Are you sure you want to complete this purchase?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, complete purchase',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Create a new order history entry
            let orderHistoryEntry = new OrderHistory_Model(
                order_id, date, customer_id, item_name, price, orderQty, sub_total, discount_range, discount, amount
            );

            orderHistory.push(orderHistoryEntry);
            Swal.fire({
                icon: 'success',
                title: 'Purchase Completed',
                text: 'The purchase was successfully completed!',
            });

            loadOrderHistoryTable(); // Display updated order history

            // Clear forms after purchase
            cleanFormCustomer();
            cleanFormItem();
            $("#orderQty").val("");
            $("#cash").val("");
            $("#balance").val("");
            cart.length = 0; // Clear the cart
            loadCart(); // Refresh cart display
            $('#orderQty').val("");
        }
    });
});

// Load Order History Table
const loadOrderHistoryTable = () => {
    $('#OrderHistoryTable').empty();
    orderHistory.forEach((item, index) => {
        let data = `<tr>
                        <td>${item.order_id}</td>
                        <td>${item.date}</td>
                        <td>${item.customerId}</td>
                        <td>${item.itemName}</td>
                        <td>${item.itemPrice.toFixed(2)}</td>
                        <td>${item.order_qty}</td>
                        <td>${item.sub_total.toFixed(2)}</td>
                        <td>${item.discount_range}%</td>
                        <td>${item.discount.toFixed(2)}</td>
                        <td>${item.final_total.toFixed(2)}</td>
                    </tr>`;
        $('#OrderHistoryTable').append(data);
    });
};
