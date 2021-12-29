// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const streamifier = require('streamifier');

export class StorageService {
  cloudinary: any;
  // constructor() {}

  async uploadFile(buffer: any) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    return this.uploadFromBuffer(buffer);
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
}
