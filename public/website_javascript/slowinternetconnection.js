function checkInternetSpeed() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        const speed = connection.downlink;
        if (speed < 0.5) { // Adjust this value based on what you consider a "slow" connection
            setTimeout(showSlowInternetMessage, 5000);
        }
    }
}

function showSlowInternetMessage() {
    const message = document.createElement('div');
    message.innerHTML = 'You have a slow internet connection. Please wait while the page loads.';
    message.style.position = 'fixed';
    message.style.top = '0';
    message.style.left = '0';
    message.style.width = '100%';
    message.style.background = '#ff0000';
    message.style.color = '#fff';
    message.style.padding = '10px';
    message.style.textAlign = 'center';
    document.body.appendChild(message);

    setTimeout(showAlertMessage, 15000); // Adjust this value based on how long you want to wait before showing the alert message
}

function showAlertMessage() {
    const alertMessage = 'The website is taking too long to load. Please check your internet connection and try again later.';
    alert(alertMessage);
}

window.onload = function () {
    checkInternetSpeed();
};