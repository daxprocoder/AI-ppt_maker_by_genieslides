const eyeIcon = document.querySelector('.eye-icon');
const passwordField = document.querySelector('#password');
const imgElement = eyeIcon.querySelector('img'); // Get the img element

eyeIcon.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Update the img src attribute based on password visibility
    if (type === 'text') {
        imgElement.src = 'https://cdn-icons-png.flaticon.com/512/875/875643.png'; // Update the src for visible password
    } else {
        imgElement.src = 'https://cdn-icons-png.flaticon.com/512/4643/4643964.png'; // Update the src for hidden password
    }
});