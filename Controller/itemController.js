
///////////////////////////////////////////////////////
/*Item  & Table update*/
//////////////////////////////////////////////////////

//ITEM ARRAY
/*let ItemDB = [];*/
import {ItemDB} from "../db/database.js";
import ItemModel from "../models/item.js";
/*import {loadItemCbx} from "./OrderController.js";*/

const validateQty = (qty) =>{
    const qtyRegex = /^[0-9]{1,5}$/;
    return qtyRegex.test(qty);
}

const validatePrice = (price) =>{
    const priceRegex =  /^([0-9]){1,}[.]([0-9]){1,}$/;
    return priceRegex.test(price);
}

//clear fields
const ItemClearForm = ()=>{
    $("#itemName").val('');
    $("#qty").val('');
    $("#itemDescription").val('');
    $("#price").val('');
}

//load all item table
const itemTable = () => {
    $("#itemTableBody").empty();
    ItemDB.map((item,index) => {
        let Data = `<tr>
            <td>${item.id}</td>
            <td>${item.item_Name}</td>
            <td>${item.itemDescription}</td>
            <td>${item.itemQuantity}</td>
            <td>${item.itemPrice}</td>
            </tr>`
        $("#itemTableBody").append(Data);
    });
}


//----------------save Item----------------------//
$("#item_add_button").on("click", function() {
    let Item_Name = $("#itemName").val();
    let Item_Quantity = $("#qty").val();
    let Description = $("#itemDescription").val();
    let Item_Price = $("#price").val();

    if (Item_Name === 0){
        alert("Invalid Item Name");
    }else if (!validateQty(Item_Quantity)){
        Swal.fire({
            title: "Invalid Qty?",
            text: "That thing is still around?",
            icon: "question"
        });
    }else if(Description === 0){
        alert("invalid Item Description");
    }else if(!validatePrice(Item_Price)){
        Swal.fire({
            title: "Invalid Price?",
            text: "That thing is still around?",
            icon: "question"
        });
    }else {
        /*console.log()*/

        /*let itemData = {
            id : ItemDB.length + 1,
            ItemName : Item_Name,
            itemDescription : Description,
            ItemQuantity : Item_Quantity,
            ItemPrice : Item_Price
        }*/

        let itemData = new ItemModel(
            ItemDB.length + 1,
            Item_Name,
            Description,
            Item_Quantity,
            Item_Price
        );

        ItemDB.push(itemData);

        itemTable();
        ItemClearForm();
       // loadItemCbx();

        Swal.fire({
            title: "Item Saved!",
            text: "You clicked the button!",
            icon: "success"
        });
    }
});

//----------------get the item----------------------//
let selectedItemIndex;

$("#itemTableBody").on("click", "tr", function (){
    selectedItemIndex = $(this).index();
    let itemData = ItemDB[selectedItemIndex]; //get the item data
    $('#itemName').val(itemData.item_Name);
    $('#qty').val(itemData.itemQuantity);
    $('#itemDescription').val(itemData.itemDescription);
    $('#price').val(itemData.itemPrice);

    console.log(itemData);
});

//----------------delete item----------------------//
$("#item_delete_button").on("click", function() {

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

    if(selectedItemIndex!== undefined){
        ItemDB.splice(selectedItemIndex, 1);
        itemTable();
        ItemClearForm();
        selectedItemIndex = undefined;
    }else {
        alert("Please select a item to delete");
    }
});


//----------------update item----------------------//
$("#item_update_button").on("click", function() {
    if(selectedItemIndex!== undefined) { // Check if an item is selected
        let Item_Name = $("#itemName").val();
        let Item_Quantity = $("#qty").val();
        let Description = $("#itemDescription").val();
        let Item_Price = $("#price").val();

        // Check if the inputs are not empty before updating
        if (Item_Name && Item_Quantity && Description && Item_Price) {
            ItemDB[selectedItemIndex] = {
                id: ItemDB[selectedItemIndex].id, // Retain the same ID
                ItemName: Item_Name,
                itemDescription: Description,
                ItemQuantity: Item_Quantity,
                ItemPrice: Item_Price
            };

            itemTable(); // Refresh the table after updating the item
            ItemClearForm(); // Clear the form fields
            selectedItemIndex = undefined; // Reset the selected index

            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Update",
                denyButtonText: `Don't Update`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        } else {
            alert("Please fill all fields before updating.");
        }

        } else {
            alert("Please fill all fields before updating.");
        }
});
