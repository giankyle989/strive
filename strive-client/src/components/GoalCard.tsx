import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface GoalCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalMilestones: number;
  completedMilestones: number;
  targetDate: string;
  category: string;
}

export function GoalCard({
  id,
  title,
  description,
  progress,
  totalMilestones,
  completedMilestones,
  targetDate,
  category
}: GoalCardProps) {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105 border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-semibold truncate">{title}</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>{completedMilestones}/{totalMilestones} milestones</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{targetDate}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button asChild variant="default" size="sm" className="flex-1">
            <Link to={`/goal/${id}`}>View Details</Link>
          </Button>
          <Button variant="outline" size="sm">
            Add Milestone
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}