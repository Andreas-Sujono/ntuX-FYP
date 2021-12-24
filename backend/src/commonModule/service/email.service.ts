import * as mailgun from 'mailgun-js';
import Handlebars from 'handlebars';
export class EmailService {
  mg: any;
  constructor() {
    this.mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });
  }
  async sendEmail(
    email: string,
    subject: string,
    message: string,
    html?: string,
    paramData?: any,
  ) {
    // send email
    const data: any = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: subject,
    };
    if (message) data.text = message;
    if (html) {
      const template = Handlebars.compile(
        '<h1>{{title}}</h1><div>{{text}}</div>',
      );
      const result = template(paramData);
      data.html = result;
    }
    return new Promise((resolve, reject) => {
      this.mg.messages().send(data, function (error, body) {
        if (error) reject(error);
        resolve(body);
      });
    });
  }
}
