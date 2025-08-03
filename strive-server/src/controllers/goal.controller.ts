import { Request, Response } from 'express';
import Goal from '../models/goal.model';

export const createGoal = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const goal = await Goal.create({ title, description, milestones: [] });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Error creating goal', error: err });
  }
};

export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching goals', error: err });
  }
};
