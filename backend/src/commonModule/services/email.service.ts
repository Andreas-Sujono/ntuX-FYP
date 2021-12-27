import * as mailgun from 'mailgun-js';
import Handlebars from 'handlebars';
import forgotPasswordHtml from './templates/forgotPassword';
import confirmEmailHtml from './templates/confirmEmail';

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
    htmlKey?: 'forgotPassword' | 'confirmEmail',
    paramData?: any,
  ) {
    // send email
    const data: any = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: subject,
    };
    if (message && !htmlKey) data.text = message;
    if (htmlKey) {
      const template = Handlebars.compile(
        htmlKey === 'forgotPassword' ? forgotPasswordHtml : confirmEmailHtml,
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
