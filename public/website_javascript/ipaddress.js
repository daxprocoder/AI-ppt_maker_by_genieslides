function getIpAddress() {
    // Fetch IP address from external service
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            // Extract IP address from API response
            var ipAddress = data.ip;

            // Display IP address in an alert or console log
            alert('Your IP Address: ' + ipAddress);
        })
        .catch(error => {
            // Handle error if API request fails
            console.error('Failed to fetch IP address:', error);
        });
}
