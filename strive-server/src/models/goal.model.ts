import mongoose, { Schema, Document } from 'mongoose';

export interface IMilestone {
  description: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface IGoal extends Document {
  title: string;
  description: string;
  milestones: IMilestone[];
  createdAt: Date;
}

const MilestoneSchema = new Schema<IMilestone>({
  description: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const GoalSchema = new Schema<IGoal>({
  title: { type: String, required: true },
  description: { type: String },
  milestones: [MilestoneSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IGoal>('Goal', GoalSchema);
