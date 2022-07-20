import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3c6149fd661c40",
    pass: "2f5ca846c152af"
  }
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {

     await transport.sendMail({
       from: 'Equipe Feedget <oi@feedget.com>',
       to: 'Mizael Fernando <mizaellmagumba@gmail.com',
       subject: subject,
       html: body
     })
  };
}