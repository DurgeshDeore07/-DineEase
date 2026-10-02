const urlParams = new URLSearchParams(window.location.search);

const qrTableNumber = urlParams.get("table");

if (qrTableNumber) {
    document.getElementById("table-number").value = qrTableNumber;
}
const menuContainer = document.getElementById("menu-container");

let cart = [];

fetch("https://assure-domain-disks-publishing.trycloudflare.com/api/menu")
    .then(response => response.json())
    .then(menuItems => {

        menuContainer.innerHTML = "";

        menuItems.forEach(item => {

            const card = document.createElement("div");

            card.className = "menu-card";

            card.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="price">₹${item.price}</div>

                <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
                    Add to Cart
                </button>
            `;

            menuContainer.appendChild(card);
        });

    })
    .catch(error => {
        menuContainer.innerHTML =
            "<p>Unable to load menu. Please start the backend.</p>";

        console.error(error);
    });


function addToCart(id, name, price) {

    let item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }

    showCart();
}


function showCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        let itemTotal = item.price * item.quantity;

        total = total + itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <span>
                    ${item.name} - ₹${item.price}
                </span>

                <span>
                    <button onclick="decreaseQuantity(${item.id})">−</button>

                    ${item.quantity}

                    <button onclick="increaseQuantity(${item.id})">+</button>
                </span>

                <span>
                    ₹${itemTotal}
                </span>

            </div>
        `;
    });

    cartTotal.innerText = total;
}
function increaseQuantity(id) {

    let item = cart.find(item => item.id === id);

    item.quantity++;

    showCart();
}


function decreaseQuantity(id) {

    let item = cart.find(item => item.id === id);

    item.quantity--;

    if (item.quantity === 0) {

        cart = cart.filter(item => item.id !== id);

    }

    showCart();
}


function placeOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const tableNumber = document.getElementById("table-number").value;

    if (tableNumber === "") {
        alert("Please enter your table number!");
        return;
    }

    let itemNames = "";

    cart.forEach(item => {
        itemNames += item.name + " x " + item.quantity + ", ";
    });

    let total = 0;

    cart.forEach(item => {
        total = total + (item.price * item.quantity);
    });

    const order = {
        tableNumber: parseInt(tableNumber),
        items: itemNames,
        total: total
    };

    fetch("https://assure-domain-disks-publishing.trycloudflare.com/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
        .then(response => response.json())
        .then(data => {

            alert("Order placed successfully! 🎉");

            cart = [];

            showCart();

        })
        .catch(error => {

            console.error(error);

            alert("Unable to place order. Please try again.");

        });
}
function checkCustomerBill() {

    const tableNumber = document.getElementById("table-number").value;

    if (tableNumber === "") {
        return;
    }

    fetch("https://assure-domain-disks-publishing.trycloudflare.com/api/orders").then(response => response.json())
        .then(orders => {

            const customerOrder = orders
                .filter(order => order.tableNumber == tableNumber)
                .pop();

            if (!customerOrder) {
                return;
            }

            if (customerOrder.status !== "Served") {
                return;
            }

            const billContainer = document.getElementById("customer-bill");

            billContainer.innerHTML = `
                <div class="customer-bill-box">

                    <div class="customer-bill-header">
                        <h2>🍽️ DineEase</h2>
                        <p>Your Bill</p>
                    </div>

                    <div class="customer-bill-info">
                        <p><b>Order No:</b> ${customerOrder.id}</p>
                        <p><b>Table No:</b> ${customerOrder.tableNumber}</p>
                        <p><b>Status:</b> ${customerOrder.status}</p>
                    </div>

                    <div class="customer-bill-items">
                        <p><b>Items:</b></p>
                        <p>${customerOrder.items}</p>
                    </div>

                    <div class="customer-bill-total">
                        Total: ₹${customerOrder.total}
                    </div>

                    <div class="customer-bill-footer">
                    <button onclick="payNow(${customerOrder.id})">
                        💳 Pay Now
                    </button>

    <p>Thank You! 😊</p>
    <p>Visit Again!</p>
</div>

                </div>
            `;

        })
        .catch(error => {
            console.error("Bill Error:", error);
        });
}
document.getElementById("table-number").addEventListener("input", function () {
    checkCustomerBill();
});
checkCustomerBill();
function payNow(orderId) {

    window.location.href = "payment.html?orderId=" + orderId;

}