import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  title: string;
  description: string;
  category: string;
  targetDate?: Date;
  totalMilestones?: number;
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<IGoal>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'health',
        'career',
        'learning',
        'creative',
        'financial',
        'personal',
        'relationships',
        'travel',
      ],
    },
    targetDate: {
      type: Date,
      required: false,
    },
    totalMilestones: {
      type: Number,
      required: false,
      min: 1,
      max: 100,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IGoal>('Goal', goalSchema);
