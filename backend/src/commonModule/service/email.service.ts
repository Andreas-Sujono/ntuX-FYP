import * as mailgun from 'mailgun-js';

export class EmailService {
  mg: any;
  constructor() {
    this.mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });
  }
  async sendEmail(email: string, subject: string, message: string) {
    // send email
    const data = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: subject,
      text: message,
    };
    return new Promise((resolve, reject) => {
      this.mg.messages().send(data, function (error, body) {
        if (error) reject(error);
        resolve(body);
      });
    });
  }
}
