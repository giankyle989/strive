import { api } from "../lib/utils";

export const createMilestone = async (goalId: string, formData: FormData) => {
  const res = await api.post(`/milestones/${goalId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateMilestone = async (
  milestoneId: string,
  data: { title: string; description: string }
) => {
  const res = await api.patch(`/milestones/${milestoneId}`, data);
  return res.data;
};

export const uploadMilestoneImage = async (
  milestoneId: string,
  formData: FormData
) => {
  const res = await api.patch(`/milestones/${milestoneId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
