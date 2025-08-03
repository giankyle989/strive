import express from 'express';
import {
  createGoal,
  getGoals,
  getGoalsById,
} from '../controllers/goal.controller';

const router = express.Router();

router.post('/', createGoal);
router.get('/', getGoals);
router.get('/:id', getGoalsById);

export default router;
