
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, mobile, company, designation, state, city } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "praveenkumarkanakala123@gmail.com", // Replace with your email
        pass: "gugl rswv iubk caov", // Replace with your app password (Not your Gmail password)
    },
  });

  const mailOptions = {
    from: email,
    to: "praveenkumarkanakala123@gmail.com",
    subject: "New Sponsorship Registration",
    text: `
      Name: ${name}
      Email: ${email}
      Mobile: ${mobile}
      Company: ${company}
      Designation: ${designation}
      State: ${state}
      City: ${city}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
