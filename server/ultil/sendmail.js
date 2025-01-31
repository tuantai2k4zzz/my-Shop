const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')



const mailHost = "smtp.gmail.com";
const mailPort = 587;
const senderEmail = "senderEmail@gmail.com"

/**
 * Send mail
 * @param {string} to 
 * @param {string} subject 
 * @param {string[html]} htmlContent 
 * @returns 
 */
const sendMail = asyncHandler(({email, html}) => {
    let transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: false, // use SSL - TLS
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
    let mailOptions = {
      from: senderEmail,
      to: email,
      subject: "Forgot password",
      html: html,
    };
    return transporter.sendMail(mailOptions); // promise
  })


module.exports = sendMail