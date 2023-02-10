const nodemailer = require("nodemailer");
require('dotenv').config();
const Mailgen = require('mailgen');

const report = async (req, res) => {

    const {gmail,name,phone,content,subject}=req.body;
    let config = {
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
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
            intro: `<span style="font-size:12px;"><b>SUBJECT</b> : ${subject}<br/><b>NAME</b> : ${name}<br/><b>GMAIL</b> : ${gmail}<br/><b>PHONE</b> : ${phone}<br/><b>CONTENT</b> : ${content}<br/></span>`,
            outro: "<br/ ><br/ ><hr><b>WARNING!</b > YOU CANNOT SHARE OR COPY THIS PROJECT WITHOUT MY PERMISSION"
        }
    }
    let msil = Mailgen2.generate(response)
    let message = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: subject,
        html: msil,
    }
    transporter.sendMail(message).then(() => {
        return res.status(201).json({ datas:"MAIL SENT SUCCESSFULLY"})
    }).catch((err) => {
        return res.status(201).json({ "ERROR": "SOMETHING WENT WRONG! PLEASE RECHECK YOUR CREDENTIALS" })
    })
        // res.status(201).json({ lll:"OOOOO"})
}

module.exports = { report };