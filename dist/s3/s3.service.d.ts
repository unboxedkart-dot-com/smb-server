import * as AWS from 'aws-sdk';
export declare class S3Service {
    AWS_S3_BUCKET: string;
    s3: AWS.S3;
    uploadFile(file: any): Promise<void>;
    uploadOriginalInvoice(file: any): Promise<void>;
    uploadPurchaseInvoice(file: any): Promise<void>;
    uploadSellerIdProof(file: any): Promise<void>;
    uploadDeviceImages(files: any, folderName: any): Promise<any>;
    _generateFolderName(): number;
    handleUploadDeviceImage(file: any, folderName: any, index: any): Promise<void>;
    s3_upload(file: any, bucket: any, name: any, mimetype: any): Promise<void>;
}
