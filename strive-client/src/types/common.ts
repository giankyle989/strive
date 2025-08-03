export interface Goal {
  _id: string;
  title: string;
  description: string;
  category: string;
  completedMilestones?: number;
  totalMilestones?: number;
  targetDate: string;
  milestones?: Milestone[];
  progress?: number;
  createdAt: string;
}

export type Milestone = {
  _id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  image?: string;
};
