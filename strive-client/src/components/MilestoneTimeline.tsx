import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";
import { Milestone } from "@/types/common";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  uploadMilestoneImage,
  updateMilestone,
} from "@/services/milestoneService";

interface MilestoneTimelineProps {
  milestones: Milestone[];
  onRefresh?: () => void;
}

export function MilestoneTimeline({
  milestones,
  onRefresh,
}: MilestoneTimelineProps) {
  return (
    <div className="space-y-6">
      {milestones.map((milestone) => {
        const milestoneDate = dayjs(milestone.date).format("MMM DD, YYYY");
        const isCompleted = milestone.completed;

        const [title, setTitle] = useState(milestone.title);
        const [description, setDescription] = useState(milestone.description);
        const [imageFile, setImageFile] = useState<File | null>(null);
        const [loading, setLoading] = useState(false);
        const [isEditing, setIsEditing] = useState(false);

        const handleSave = async () => {
          setLoading(true);
          try {
            await updateMilestone(milestone._id, { title, description });
            setIsEditing(false);
            if (onRefresh) onRefresh();
          } catch (err) {
            console.error("Error updating milestone", err);
          } finally {
            setLoading(false);
          }
        };

        const handleImageUpload = async () => {
          if (!imageFile) return;
          setLoading(true);
          try {
            const formData = new FormData();
            formData.append("image", imageFile);
            await uploadMilestoneImage(milestone._id, formData);
            if (onRefresh) onRefresh();
          } catch (err) {
            console.error("Image upload failed", err);
          } finally {
            setLoading(false);
          }
        };

        return (
          <div key={milestone._id} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-6 top-4">
              {isCompleted ? (
                <CheckCircle className="w-6 h-6 text-success bg-white rounded-full" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground bg-white rounded-full" />
              )}
            </div>

            <Card className="ml-12 bg-gradient-card shadow-card border-0">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  {isEditing ? (
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="font-medium"
                    />
                  ) : (
                    <h4 className="font-medium">{milestone.title}</h4>
                  )}

                  {isCompleted && (
                    <Badge variant="default" className="text-xs">
                      {milestoneDate}
                    </Badge>
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="text-sm"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  )}
                </div>

                <div>
                  {isCompleted ? (
                    <img
                      src={`${import.meta.env.VITE_CDN_URL}${milestone.image}`}
                      alt="Milestone"
                      className="max-w-xs rounded-md border"
                    />
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImageFile(e.target.files?.[0] || null)
                        }
                        className="sm:w-1/2"
                      />
                      <Button
                        size="sm"
                        disabled={!imageFile || loading}
                        onClick={handleImageUpload}
                      >
                        {loading ? "Uploading..." : "Upload Image"}
                      </Button>
                    </div>
                  )}
                </div>

                {!isCompleted && (
                  <div className="flex gap-2 justify-end">
                    {isEditing ? (
                      <>
                        <Button
                          size="sm"
                          onClick={handleSave}
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setIsEditing(false);
                            setTitle(milestone.title);
                            setDescription(milestone.description);
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
