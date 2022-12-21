import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const s3Config = new S3Client({
	credentials: {
		accessKeyId: process.env.ACCESSKEY,
		secretAccessKey: process.env.SECRETACCESSKEY,
	},
	region: 'ap-northeast-2',
	forcePathStyle: true,
});

export const upload = multer({
	storage: multerS3({
		s3: s3Config,
		bucket: process.env.BUCKETNAME,
		acl: 'public-read',
		key(req, file, cb) {
			cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`);
		},
	}),
});
