const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();


exports.mailing = (from, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { 
            user: process.env.EMAIL,
            pass: process.env.EMAILPASS
        }
    });

    let mailOptions = {
        from: from,
        to: process.env.EMAIL,
        subject: subject,
        text: text
    }

    console.log(process.env.EMAIL)
    console.log(process.env.EMAILPASS)
    console.log(mailOptions)

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: '+info.response)
        }
    })
}