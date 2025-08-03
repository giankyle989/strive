import { Request, Response } from 'express';
import Goal from '../models/goal.model';
import Milestone from '../models/milestone.model';

export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 }).lean();

    const goalsWithStats = await Promise.all(
      goals.map(async (goal) => {
        const [totalMilestones, completedMilestones] = await Promise.all([
          Milestone.countDocuments({ goalId: goal._id }),
          Milestone.countDocuments({ goalId: goal._id, completed: true }),
        ]);

        const progress =
          totalMilestones > 0
            ? Math.round((completedMilestones / totalMilestones) * 100)
            : 0;

        return {
          ...goal,
          totalMilestones,
          completedMilestones,
          progress,
        };
      }),
    );

    res.status(200).json(goalsWithStats);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ message: 'Failed to fetch goals', error: err });
  }
};

export const getGoalsById = async (req: Request, res: Response) => {
  try {
    const goal = await Goal.findById(req.params.id).lean();

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const milestones = await Milestone.find({ goalId: goal._id }).sort({
      completed: 1,
      createdAt: -1,
    });

    const totalMilestones = milestones.length;
    const completedMilestones = milestones.filter((m) => m.completed).length;
    const progress =
      totalMilestones > 0
        ? Math.round((completedMilestones / totalMilestones) * 100)
        : 0;

    res.status(200).json({
      ...goal,
      milestones,
      totalMilestones,
      completedMilestones,
      progress,
    });
  } catch (err) {
    console.error('Error fetching goal:', err);
    res.status(500).json({ message: 'Failed to fetch goal', error: err });
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
    });

    await newGoal.save();

    if (totalMilestones && totalMilestones > 0) {
      const milestoneDocs = [];

      for (let i = 1; i <= totalMilestones; i++) {
        milestoneDocs.push({
          goalId: newGoal._id,
          title: `Milestone ${i}`,
          description: `Description for milestone ${i}`,
        });
      }

      await Milestone.insertMany(milestoneDocs);
    }

    res.status(201).json(newGoal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating goal.' });
  }
};
