import { v2 } from 'cloudinary';

export class StorageService {
  cloudinary: any;
  constructor() {
    this.cloudinary = v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }
  async uploadFile(file: any) {
    return new Promise((resolve) => {
      this.cloudinary.uploader.upload(
        file,
        (result) => {
          resolve({ url: result.url, id: result.public_id });
        },
        { resource_type: 'auto' },
      );
    });
  }
}
