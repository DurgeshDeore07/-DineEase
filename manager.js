const ordersContainer = document.getElementById("orders-container");

fetch("http://localhost:8080/api/orders")
    .then(response => response.json())
    .then(orders => {

        ordersContainer.innerHTML = "";

        orders.forEach(order => {

            ordersContainer.innerHTML += `
                <div class="order-card">

                    <h3>Order #${order.id}</h3>

                    <p><b>Table:</b> ${order.tableNumber}</p>

                    <p><b>Items:</b> ${order.items}</p>

                    <p><b>Total:</b> ₹${order.total}</p>

                    <p><b>Status:</b> ${order.status}</p>

                    <button onclick="confirmOrder(${order.id})">
                        Confirm Order
                    </button>

                    <button onclick="prepareOrder(${order.id})">
                        Preparing
                    </button>
                    <button onclick="serveOrder(${order.id})">
                        Served
                    </button>
                    <button onclick="generateBill(${order.id})">
                        Generate Bill
                    </button>
                </div>
            `;

        });

    })
    .catch(error => {

        console.error(error);

        ordersContainer.innerHTML =
            "<p>Unable to load orders.</p>";

    });
function confirmOrder(id) {

    fetch("http://localhost:8080/api/orders/" + id + "/confirm", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {

            if (!response.ok) {
                throw new Error("Server error: " + response.status);
            }

            return response.json();
        })
        .then(data => {

            alert("Order confirmed! ✅");

            location.reload();

        })
        .catch(error => {

            console.error("Confirm Error:", error);

            alert("Unable to confirm order. Check backend.");

        });
}
function prepareOrder(id) {

    fetch("http://localhost:8080/api/orders/" + id + "/preparing", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {

            if (!response.ok) {
                throw new Error("Server error: " + response.status);
            }

            return response.json();
        })
        .then(data => {

            alert("Order is now preparing! 👨‍🍳");

            location.reload();

        })
        .catch(error => {

            console.error("Preparing Error:", error);

            alert("Unable to update order.");

        });
}
function serveOrder(id) {

    fetch("http://localhost:8080/api/orders/" + id + "/served", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server error: " + response.status);
            }

            return response.json();
        })
        .then(data => {
            alert("Order served! 🍽️");
            location.reload();
        })
        .catch(error => {
            console.error("Served Error:", error);
            alert("Unable to update order.");
        });
}
function generateBill(id) {

    fetch("https://assure-domain-disks-publishing.trycloudflare.com/api/orders")
        .then(response => response.json())
        .then(orders => {

            let order = orders.find(order => order.id === id);

            if (!order) {
                alert("Order not found!");
                return;
            }

            const billContainer = document.getElementById("bill-container");

            billContainer.innerHTML = `
                <div class="bill">

                    <div class="bill-header">
                        <h2>🍽️ DineEase</h2>
                        <p>Restaurant Bill</p>
                    </div>

                    <div class="bill-info">
                        <p><b>Order No:</b> ${order.id}</p>
                        <p><b>Table No:</b> ${order.tableNumber}</p>
                        <p><b>Status:</b> ${order.status}</p>
                    </div>

                    <div class="bill-items">
                        <p><b>Items:</b></p>
                        <p>${order.items}</p>
                    </div>

                    <div class="bill-total">
                        Total: ₹${order.total}
                    </div>

                    <div class="bill-footer">
                        <p>Thank You! 😊</p>
                        <p>Visit Again!</p>
                    </div>

                </div>
            `;

        })
        .catch(error => {

            console.error(error);

            alert("Unable to generate bill.");

        });
}
function loadFeedback() {

    fetch("https://assure-domain-disks-publishing.trycloudflare.com/api/feedback")
        .then(response => response.json())
        .then(feedbacks => {

            const container = document.getElementById("feedback-container");

            if (feedbacks.length === 0) {
                container.innerHTML = `
                    <h2>⭐ Customer Feedback</h2>
                    <p>No feedback available.</p>
                `;
                return;
            }

            let feedbackHTML = "<h2>⭐ Customer Feedback</h2>";

            feedbacks.forEach(feedback => {

                feedbackHTML += `
                    <div class="feedback-card">
                        <p><b>Order No:</b> ${feedback.orderId}</p>
                        <p><b>Rating:</b> ${"⭐".repeat(feedback.rating)}</p>
                        <p><b>Feedback:</b> ${feedback.feedback}</p>
                    </div>
                `;

            });

            container.innerHTML = feedbackHTML;

        })
        .catch(error => {
            console.error("Feedback Error:", error);
        });
}

loadFeedback();