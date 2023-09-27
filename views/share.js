const nodemailer = require('nodemailer');

// Create a transporter object using GoDaddy's SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
        user: 'support@genieslides.com', // Replace with your GoDaddy email address
        pass: 'dakshsha503' // Replace with your GoDaddy email password
    }
});

// Define the email message options
const mailOptions = {
    from: 'support@genieslides.com', // Replace with your GoDaddy email address
    to: 'dakshsharma1910@gmail.com', // Replace with recipient email address
    subject: 'Sharing a PPT file', // Replace with the subject of the email
    html: `
    <div style="background: linear-gradient(to right, #0800ff, #00e1ff); padding: 0px; text-align: center;">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet">
  <img src="https://cdn.discordapp.com/attachments/777919148985810945/1098091586191118426/testing.pptx" alt="Logo" style="max-width: 100px;margin-top:10px;">
  <h1 style="color: #ffffff; margin-top: 10px; font-family: 'Roboto', sans-serif;font-size: 40px;">Genieslides</h1>
  <hr style="border-color: #ffffff;width:90%">
  <p style="color: #ffffff;font-family: 'Ubuntu', sans-serif;font-size:20px,text-decoration:none">
      Dear User,<br><br>
      You have been shared a presentation by <span style="color:white;">dakshsharma1910@gmail.com<span> .<br><br>
      Please click on the button below to view the presentation.<br><br>
        <a href="https://cdn.discordapp.com/attachments/777919148985810945/1098091586191118426/testing.pptx" style="color: #ffffff; text-decoration: none; background-color: #000000; padding: 10px 20px; border-radius: 5px; font-family: 'Ubuntu', sans-serif; font-size: 20px;">View Presentation</a><br><br>


      <br><br>
      <br><br>
      Best regards,<br>
      Genieslides Team
  </p>
  <div style="padding:20px 80px;margin-top: 30px; color: #a4a4a4; font-size: 12px;background-color:rgb(56, 56, 56)">
      <p>
          This is an automatically generated email. Please do not reply to this email.
      </p>
      <p>
          For any inquiries or support, please contact us at support@genieslides.com
      </p>
      <p>
          © 2023 Genieslides. All rights reserved.
      </p>
  </div>
</div>
        `,
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});



