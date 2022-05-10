import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7abb6d0aacda7b",
    pass: "dad167cd445496",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Feedback Service <feedback@mail.com>",
      to: "Raphael Rocha <testemail@test.com>",
      subject: subject,
      html: body,
    });
  }
}
