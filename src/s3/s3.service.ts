import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadImage(file) {
    const { originalname } = file;
    await this.s3_upload(
      file.buffer,
      'unboxedkart-india/smb/images',
      originalname,
      file.mimetype,
    );
  }

  async uploadVideo(file) {
    const { originalname } = file;
    await this.s3_upload(
      file.buffer,
      'unboxedkart-india/smb/video',
      originalname,
      file.mimetype,
    );
  }

  _generateFolderName() {
    const randomNumber = Math.floor(
      10000000000000 + Math.random() * 9000000000000000,
    );
    return randomNumber;
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      //   Bucket: 'unboxedkart-india/invoices/sales',
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };
    console.log(params);
    try {
      let s3Response = await this.s3.upload(params).promise();
      console.log(s3Response);
    } catch (e) {
      console.log(e);
    }
  }
}
