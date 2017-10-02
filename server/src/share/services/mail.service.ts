import * as crypto from 'crypto';
import { Transporter, createTransport, SentMessageInfo } from 'nodemailer';

export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  }

  public sendPasswordResetEmail(email: string, resetLink: string): Promise<any> {
    var mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: '[Speaket] Please reset your password',
      html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.<br>' +
      'Please click on the following link, or paste this into your browser to complete the process:<br><br>' +
      '<a href="' + resetLink + '">' + resetLink + '</a><br><br>' +
      'If you don’t use this link within 3 hours, it will expire.'
    };

    return this.transporter.sendMail(mailOptions);
  }
}

export let mailService: MailService = new MailService();
