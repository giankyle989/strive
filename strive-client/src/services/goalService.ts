import { Goal } from "@/types/common";
import { api } from "../lib/utils";

export type GoalPayload = {
  title: string;
  description: string;
  category: string;
  targetDate?: string;
  totalMilestones?: number;
};

export const getGoals = async (): Promise<Goal[]> => {
  const res = await api.get("/goals");
  return res.data;
};

export const getGoalById = async (id: string): Promise<Goal> => {
  const res = await api.get(`/goals/${id}`);
  return res.data;
};

export const createGoal = async (payload: GoalPayload) => {
  const res = await api.post("/goals", payload);
  return res.data;
};
