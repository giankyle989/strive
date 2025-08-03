import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createGoal } from "@/services/goalService";

export function AddGoal() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    targetDate: "",
    totalMilestones: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.targetDate
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await createGoal({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        targetDate: formData.targetDate || undefined,
        totalMilestones: formData.totalMilestones
          ? parseInt(formData.totalMilestones)
          : undefined,
      });

      toast({
        title: "Goal Created!",
        description: `Your goal "${formData.title}" has been saved.`,
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Failed to create goal",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="secondary" size="sm">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Target className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Create New Goal</h1>
          </div>
          <p className="text-white/90 mt-2">
            Set a new goal and start tracking your progress
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Goal Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Lose 10kg, Read 12 books..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="What does success look like?"
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="bg-background"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health">Health & Fitness</SelectItem>
                        <SelectItem value="career">Career & Work</SelectItem>
                        <SelectItem value="learning">
                          Learning & Education
                        </SelectItem>
                        <SelectItem value="creative">
                          Creative & Hobbies
                        </SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="personal">
                          Personal Development
                        </SelectItem>
                        <SelectItem value="relationships">
                          Relationships
                        </SelectItem>
                        <SelectItem value="travel">
                          Travel & Adventure
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetDate">Target Date</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) =>
                        handleInputChange("targetDate", e.target.value)
                      }
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalMilestones">
                    Expected Milestones (Optional)
                  </Label>
                  <Input
                    id="totalMilestones"
                    type="number"
                    placeholder="How many milestones do you expect?"
                    value={formData.totalMilestones}
                    onChange={(e) =>
                      handleInputChange("totalMilestones", e.target.value)
                    }
                    className="bg-background"
                    min="1"
                    max="100"
                  />
                  <p className="text-xs text-muted-foreground">
                    You can always add more milestones later.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="hero"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Goal"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link to="/">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
