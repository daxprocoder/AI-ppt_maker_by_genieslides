const app = require("express").Router();
const User = require("../models/user");
const nodemailer = require("nodemailer");

// im using godaddy smtp server you can use any other also?

const SMTP_HOST = "smtpout.secureserver.net";
const SMTP_PORT = 465;
const SMTP_SECURE = true;
const SMTP_USERNAME = "Your email";
const SMTP_PASSWORD = "your password";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

app.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  return res.sendFile("sign.html", { root: "views" });
});

app.post("/", async (req, res) => {
  try {
    const body = await req.body;

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return res.status(400).send("Please fill all the fields");
    }

    const user = await User.findOne({ email: email });

    if (user) {
      //user already exists
      return res.status(400).send("user already exists");
    }

    req.session.tempuser = { name, email, password };

    const verificationCode = generateRandomString();

    req.session.verificationCode = verificationCode;

    sendVerificationEmail(email, verificationCode);

    return res.sendFile("verification.html", { root: "views" });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/verify", async (req, res) => {
  try {
    const body = await req.body;

    const { verificationCode } = body;

    if (!verificationCode) {
      return res.status(400).send("Please fill all the fields");
    }

    console.log(verificationCode);

    if (verificationCode !== req.session.verificationCode) {
      return res.status(400).send("Invalid verification code");
    }

    const { name, email, password } = req.session.tempuser;

    const user = new User({
      name: name,
      email: email,
      password: password,
    });

    await user.save();

    console.log("User created successfully");

    return res.redirect("/login");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

//a function that generates a 5 digit random string using numbers and letters
function generateRandomString() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function sendVerificationEmail(toEmail, OTP) {
  const subject = "Account Verification";

  const generateRandomNumbers = () =>
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join("");
  // Example template string for email body with placeholders
  const body = `<div style="background: linear-gradient(to right, #0800ff, #00e1ff); padding: 0px; text-align: center;">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet">
  <img src="https://cdn.discordapp.com/attachments/777919148985810945/1095966078485680158/geneslides_white_logo.png" alt="Logo" style="max-width: 100px;margin-top:10px;">
  <h1 style="color: #ffffff; margin-top: 10px; font-family: 'Roboto', sans-serif;font-size: 40px;">Genieslides</h1>
  <hr style="border-color: #ffffff;width:90%">
  <p style="color: #ffffff;font-family: 'Ubuntu', sans-serif;font-size:20px">
      Dear User,<br><br>
      Thank you for signing up with our website. Your verification code is <strong>${OTP}</strong>.
      Please enter this code to verify your account.<br><br>
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
</div>`;
  const mailOptions = {
    from: SMTP_USERNAME,
    to: toEmail,
    subject: subject,
    html: body,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Failed to send verification email to ${toEmail}.`);
      console.error(error);
    } else {
      console.log(`Successfully sent verification email to ${toEmail}.`);
    }
  });
}

module.exports = app;
