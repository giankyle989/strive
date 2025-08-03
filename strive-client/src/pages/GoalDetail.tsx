import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MilestoneTimeline } from "@/components/MilestoneTimeline";
import { ArrowLeft, Plus, Target, Calendar, TrendingUp } from "lucide-react";
import { getGoalById } from "@/services/goalService";
import { Goal, Milestone } from "@/types/common";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import { AddMilestoneDialog } from "@/components/AddMilestoneDialog";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export function GoalDetail() {
  const { id } = useParams();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGoal() {
    try {
      const data = await getGoalById(id as string);
      setGoal(data);
      setMilestones(data.milestones);
    } catch (err) {
      console.error("Error fetching goal:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) fetchGoal();
  }, [id]);

  if (loading) {
    return <div className="p-8">Loading goal details...</div>;
  }

  if (!goal) {
    return <div className="p-8 text-red-500">Goal not found.</div>;
  }

  const startDate = dayjs(goal.createdAt ?? goal.targetDate);
  const targetDate = dayjs(goal.targetDate);
  const monthsActive = targetDate.diff(startDate, "month");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                <h1 className="text-2xl font-bold">{goal.title}</h1>
                <Badge variant="secondary" className="text-primary">
                  {goal.category}
                </Badge>
              </div>
              <p className="text-white/90 max-w-2xl">{goal.description}</p>
            </div>

            <Button asChild variant="secondary" size="sm">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Goal Metrics */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{goal.progress ?? 0}%</div>
                <Progress value={goal.progress ?? 0} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Target: {dayjs(goal.targetDate).format("MMM D, YYYY")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {goal.completedMilestones ?? 0}/{goal.totalMilestones ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Completed milestones
              </p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {monthsActive >= 0 ? monthsActive : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">Months active</p>
              <p className="text-xs text-muted-foreground">
                Since {startDate.format("MMM D, YYYY")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Milestone Timeline</h2>
            <AddMilestoneDialog
              goalId={goal._id}
              onCreated={() => fetchGoal()}
            />
          </div>

          {milestones?.length > 0 ? (
            <MilestoneTimeline milestones={milestones} onRefresh={fetchGoal} />
          ) : (
            <p className="text-muted-foreground text-sm">No milestones yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
