const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.sendmail = (req, res, next, url) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.MAIL_EMAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "Rishi Private Limited",
    to: req.body.email,
    subject: "Password Reset Link",
    // text:"Do not Share this to anyone",
    html: `<h1>Click Link below to reset password</h1>
                <a href=${url}>Password Reset Link</a>`,
  };
  transport.sendMail(mailOptions, (err, info) => {
    if (err) return next(new ErrorHandler(err, 500));
    console.log(info);
    
    return res.status(200).json({
      message: "email sent Sucessfully",
      url,
    });
  });
};
