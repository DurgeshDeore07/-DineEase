const urlParams = new URLSearchParams(window.location.search);

const orderId = urlParams.get("orderId");

document.getElementById("order-id").innerText = orderId;


fetch("http://localhost:8080/api/orders")
    .then(response => response.json())
    .then(orders => {

        const order = orders.find(order => order.id == orderId);

        if (order) {
            document.getElementById("amount").innerText = order.total;
        }

    })
    .catch(error => {
        console.error("Payment Error:", error);
    });


function makePayment() {

    alert("Payment Successful! ✅");

    window.location.href = "feedback.html?orderId=" + orderId;

}