import { Request, Response } from 'express';
import { s3 } from '../config/aws/aws';

export const uploadImage = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const key = `milestones/${Date.now()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    await s3.upload(params).promise();
    return res.status(200).json({ key });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to upload image', details: err });
  }
};
