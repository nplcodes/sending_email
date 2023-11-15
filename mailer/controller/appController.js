const nodemailer = require("nodemailer");
const {EMAIL, PASSWORD} = require('../env.js');
const Mailgen = require('mailgen');

const signup = async(req, res)=>{

    let testAccount = await nodemailer.createTestAccount();

         // create reusable transporter object using the default SMTP transport
         let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        // email to send
        let message = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Leon, your  Registeration goes well.", // plain text body
            html: "<b>Leon, your  Registeration goes well..</b>", // html body
          }
        // use transporter to send above message created
          transporter.sendMail(message).then((info) => {
            return res.status(201)
            .json({ 
                msg: "you should receive an email",
                info : info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
        }).catch(error => {
            return res.status(500).json({ error })
        })

    // res.status(201).json("Sign up goes well");
}
// use real email o gmail acount
const getbill = (req, res)=>{

    const { userEmail } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "Daily Tuition",
            intro: "Your bill has arrived!",
            table : {
                data : [
                    {
                        item : "Nodemailer Stack Book",
                        description: "A Backend application",
                        price : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response);

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("get bill successfully goes well");
}


module.exports = {
    signup,
    getbill
}