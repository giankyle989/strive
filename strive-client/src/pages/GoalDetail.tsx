import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MilestoneTimeline } from "@/components/MilestoneTimeline";
import { ArrowLeft, Plus, Target, Calendar, TrendingUp } from "lucide-react";

// Mock data
const mockGoal = {
  id: "1",
  title: "Lose 10kg",
  description: "Achieve my target weight through consistent exercise and healthy eating habits. This is a long-term commitment to improving my overall health and wellbeing.",
  progress: 40,
  totalMilestones: 10,
  completedMilestones: 4,
  targetDate: "December 2024",
  category: "Health",
  startDate: "January 2024"
};

const mockMilestones = [
  {
    id: "1",
    title: "Lost 4kg",
    description: "Great progress! Consistent gym routine and meal prep paying off.",
    date: "Oct 15",
    completed: true,
    image: "progress-photo.jpg"
  },
  {
    id: "2", 
    title: "Lost 3kg",
    description: "Halfway to my first milestone! Feeling more energetic.",
    date: "Sep 20",
    completed: true
  },
  {
    id: "3",
    title: "Lost 2kg",
    description: "Started seeing visible changes. Clothes fitting better.",
    date: "Aug 25",
    completed: true,
    image: "before-after.jpg"
  },
  {
    id: "4",
    title: "Lost 1kg",
    description: "First milestone achieved! The journey begins.",
    date: "Jul 30",
    completed: true
  },
  {
    id: "5",
    title: "Set up nutrition plan",
    description: "Created a sustainable meal plan with proper macros.",
    date: "Jul 15",
    completed: true
  },
  {
    id: "6",
    title: "Start gym membership",
    description: "Ready to commit to my fitness goals!",
    date: "Jul 1",
    completed: true
  }
];

export function GoalDetail() {
  const { id } = useParams();

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
          
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                <h1 className="text-2xl font-bold">{mockGoal.title}</h1>
                <Badge variant="secondary" className="text-primary">
                  {mockGoal.category}
                </Badge>
              </div>
              <p className="text-white/90 max-w-2xl">{mockGoal.description}</p>
            </div>
            
            <Button variant="secondary">
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{mockGoal.progress}%</div>
                <Progress value={mockGoal.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">Target: {mockGoal.targetDate}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockGoal.completedMilestones}/{mockGoal.totalMilestones}</div>
              <p className="text-xs text-muted-foreground">Completed milestones</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Months active</p>
              <p className="text-xs text-muted-foreground">Since {mockGoal.startDate}</p>
            </CardContent>
          </Card>
        </div>

        {/* Milestones Timeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Milestone Timeline</h2>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </div>
          
          <MilestoneTimeline milestones={mockMilestones} />
        </div>
      </div>
    </div>
  );
}