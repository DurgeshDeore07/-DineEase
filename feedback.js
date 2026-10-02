const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId");

document.getElementById("order-id").innerText = orderId;

function submitFeedback() {

    const rating = document.getElementById("rating").value;
    const feedback = document.getElementById("feedback").value;

    if (feedback.trim() === "") {
        alert("Please write your feedback.");
        return;
    }

    const feedbackData = {
        orderId: parseInt(orderId),
        rating: parseInt(rating),
        feedback: feedback
    };

    fetch("https://assure-domain-disks-publishing.trycloudflare.com/api/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(feedbackData)
    })
        .then(response => response.json())
        .then(data => {

            alert(
                "Thank you for your feedback! ⭐\n" +
                "Rating: " + rating + "/5"
            );

            document.getElementById("feedback").value = "";
        })
        .catch(error => {
            console.error("Feedback Error:", error);
            alert("Unable to submit feedback.");
        });
}