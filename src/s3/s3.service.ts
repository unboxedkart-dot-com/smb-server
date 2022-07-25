import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file) {
    const { originalname } = file;

    await this.s3_upload(
      file.buffer,
      // this.AWS_S3_BUCKET,
      'unboxedkart-india/invoices/sales',
      originalname,
      file.mimetype,
    );
  }

  async uploadOriginalInvoice(file) {
    const { originalname } = file;

    await this.s3_upload(
      file.buffer,
      'unboxedkart-india/inventory/invoices/original-invoices',
      originalname,
      file.mimetype,
    );
  }

  async uploadPurchaseInvoice(file) {
    const { originalname } = file;
    await this.s3_upload(
      file.buffer,
      'unboxedkart-india/inventory/invoices/purchase-invoices',
      originalname,
      file.mimetype,
    );
  }

  async uploadSellerIdProof(file) {
    const { originalname } = file;
    await this.s3_upload(
      file.buffer,
      'unboxedkart-india/inventory/id-proofs/sellers',
      // this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
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
