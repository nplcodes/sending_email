const nodemailer = require("nodemailer");

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

const getbill = (req, res)=>{
    res.status(201).json("get bill successfully goes well");
}


module.exports = {
    signup,
    getbill
}