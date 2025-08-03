import express from 'express';
import { createGoal, getGoals } from '../controllers/goal.controller';

const router = express.Router();

router.post('/', createGoal);
router.get('/', getGoals);

export default router;
