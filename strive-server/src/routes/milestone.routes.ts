import express from 'express';
import {
  createMilestone,
  updateMilestone,
  uploadMilestoneImage,
} from '../controllers/milestone.controller';
import multer from 'multer';

const router = express.Router();

const upload = multer();

router.post('/:goalId', upload.single('image'), createMilestone);
router.patch('/:milestoneId', updateMilestone);
router.patch(
  '/:milestoneId/upload',
  upload.single('image'),
  uploadMilestoneImage,
);

export default router;
