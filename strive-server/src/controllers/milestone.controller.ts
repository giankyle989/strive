import { Request, Response } from 'express';
import Milestone from '../models/milestone.model';
import { uploadImageToS3 } from '../utils/uploadImageToS3';

export const createMilestone = async (req: Request, res: Response) => {
  const { goalId } = req.params;
  const { title, description } = req.body;
  const file = req.file;

  try {
    let imageUrl: string | undefined;
    let completed = false;

    if (file) {
      imageUrl = await uploadImageToS3(file);
      completed = true;
    }

    const milestone = new Milestone({
      goalId,
      title,
      description,
      image: imageUrl,
      completed,
    });

    await milestone.save();

    res.status(201).json(milestone);
  } catch (err) {
    console.error('Create milestone error:', err);
    res.status(500).json({ error: 'Failed to create milestone' });
  }
};

export const updateMilestone = async (req: Request, res: Response) => {
  const { milestoneId } = req.params;
  const { title, description } = req.body;

  try {
    const milestone = await Milestone.findByIdAndUpdate(
      milestoneId,
      { title, description },
      { new: true },
    );

    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    res.status(200).json(milestone);
  } catch (err) {
    console.error('Update milestone error:', err);
    res.status(500).json({ error: 'Failed to update milestone' });
  }
};

export const uploadMilestoneImage = async (req: Request, res: Response) => {
  const { milestoneId } = req.params;
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const imageUrl = await uploadImageToS3(file);

    const milestone = await Milestone.findByIdAndUpdate(
      milestoneId,
      {
        image: imageUrl,
        completed: true,
        date: new Date(),
      },
      { new: true },
    );

    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    res.status(200).json(milestone);
  } catch (err) {
    console.error('Upload milestone image error:', err);
    res.status(500).json({ error: 'Failed to upload milestone image' });
  }
};
