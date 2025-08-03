import mongoose, { Schema, Document } from 'mongoose';

export interface IMilestone extends Document {
  goalId: mongoose.Types.ObjectId; // Reference to a Goal
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const milestoneSchema = new Schema<IMilestone>(
  {
    goalId: {
      type: Schema.Types.ObjectId,
      ref: 'Goal',
      required: true,
    },
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
    date: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IMilestone>('Milestone', milestoneSchema);
