const fs = require('fs');
const disposableDomains = [];

// Read from disposable_email_blocklist.conf file
const fileUrl = './disposable_email_blocklist.conf';
fs.readFile(fileUrl, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    disposableDomains.push(...data.split('\n'));
});

function isDisposableEmail(email) {
    const emailParts = email.split('@');
    const domain = emailParts[1];
    return disposableDomains.includes(domain);
}

function isTemporaryEmail(email) {
    const randomStringPattern = /^[a-z0-9]+$/;
    const emailParts = email.split('@');
    const user = emailParts[0];
    const domain = emailParts[1];
    return user.match(randomStringPattern) && isDisposableEmail(email);
}

// Example usage:
const email = '';
if (isTemporaryEmail(email)) {
    console.log('This is a temporary email address');
} else {
    console.log('This is not a temporary email address');
}
