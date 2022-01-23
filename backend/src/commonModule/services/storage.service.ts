// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const streamifier = require('streamifier');
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export class StorageService {
  cloudinary: any;
  s3: AWS.S3;

  constructor() {
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: 'ap-southeast-1',
    });

    this.s3 = new AWS.S3();
  }

  async uploadFile(buffer: any, type: string) {
    // cloudinary.config({
    //   cloud_name: process.env.CLOUD_NAME,
    //   api_key: process.env.API_KEY,
    //   api_secret: process.env.API_SECRET,
    // });
    // return this.uploadFromBuffer(buffer);
    return this.uploadS3(buffer, type);
  }

  async uploadFromBuffer(buffer: any) {
    return new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: 'ntux',
        },
        (error: any, result: any) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );

      streamifier.createReadStream(buffer).pipe(cld_upload_stream);
    });
  }

  async uploadS3(buffer: any, type: string) {
    type = type.replace(/^.*\//, '');
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: 'fyp-ntux',
        Key: uuidv4() + '.' + type,
        Body: buffer,
      };

      this.s3.upload(params, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            ...data,
            url: data.location,
          });
        }
      });
    });
  }
}
