const nodemailer = require("nodemailer");
require('dotenv').config();
const Mailgen = require('mailgen');

const sign = async (req, res) => {

    const {gmail,name,tgmail,content,age,subject,password}=req.body;
    // console.log({gmail,name,tgmail,content,age,subject,password})
    let config = {
        service: "gmail",
        auth: {
            user: gmail,
            pass: password
        }
    }
    let transporter = nodemailer.createTransport(config)
    let Mailgen2 = new Mailgen({
        theme: "default",
        product: {
            name: name,
            link: "https://github.com/Prashant0664"
        }
    })
    let response = {
        body: {
            name: "Gmail User",
            intro: content,
            action: {
                instructions: '<hr><br/>THIS IS JUST FOR EDUCATION PURPOSES ONLY.<br>If you find ths helpful then follow my github account!! to get access to latest projects<br/>Click here to FOLLOW me',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Click here to FOLLOW me',
                link: 'https://github.com/Prashant0664'
            }},
            outro: "YOU CANNOT SHARE OR COPY THIS PROJECT WITHOUT MY PERMISSION"
        }
    }
    let msil = Mailgen2.generate(response)
    let message = {
        from: process.env.EMAIL,
        to: tgmail,
        subject: subject,
        html: msil,
    }
    transporter.sendMail(message).then(() => {
        return res.status(201).json({ datas:"MAIL SENT SUCCESSFULLY"})
    }).catch((err) => {
        return res.status(201).json({ ERROR: "SOMETHING WENT WRONG! PLEASE RECHECK YOUR CREDENTIALS" })
    })
}

module.exports = { sign };