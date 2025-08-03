export interface IMilestone {
  description: string;
  imageUrl?: string;
  createdAt?: Date;
}

export interface IGoal {
  title: string;
  description?: string;
  milestones: IMilestone[];
  createdAt?: Date;
}
