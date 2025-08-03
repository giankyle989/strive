import { Request, Response } from 'express';
import Goal from '../models/goal.model';

export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(goals);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ message: 'Failed to fetch goals', error: err });
  }
};

export const getGoalsById = async (req: Request, res: Response) => {
  try {
    const goals = await Goal.findById(req.params.id);
    res.status(200).json(goals);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ message: 'Failed to fetch goals', error: err });
  }
};
export const createGoal = async (req: Request, res: Response) => {
  try {
    const { title, description, category, targetDate, totalMilestones } =
      req.body;

    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ message: 'Title, description, and category are required.' });
    }

    const newGoal = new Goal({
      title,
      description,
      category,
      targetDate,
      totalMilestones,
    });

    await newGoal.save();

    res.status(201).json(newGoal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating goal.' });
  }
};
