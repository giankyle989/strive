import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GoalCard } from "@/components/GoalCard";
import { StatsCard } from "@/components/StatsCard";
import { Target, TrendingUp, Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-strive.jpg";
import { getGoals } from "@/services/goalService";
import { Goal } from "@/types/common";

export function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGoals()
      .then((data) => setGoals(data))
      .catch((err) => {
        console.error("Failed to fetch goals", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative h-48 bg-gradient-hero flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white space-y-2">
          <h1 className="text-3xl font-bold">Welcome to Strive</h1>
          <p className="text-white/90">
            Track your goals, celebrate your milestones
          </p>
          <Button asChild variant="secondary" className="mt-4">
            <Link to="/add-goal">
              <Plus className="w-4 h-4 mr-2" />
              Create New Goal
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatsCard
            title="Active Goals"
            value={goals.length}
            description="Currently tracking"
            icon={Target}
            variant="default"
          />
          <StatsCard
            title="Milestones Achieved"
            value={goals.reduce(
              (acc, goal) => acc + (Number(goal.completedMilestones) || 0),
              0
            )}
            description="Total completed"
            icon={TrendingUp}
            trend=""
            variant="success"
          />
        </div>

        {/* Goals Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Goals</h2>
            <Button asChild variant="outline">
              <Link to="/add-goal">Add Goal</Link>
            </Button>
          </div>

          {loading ? (
            <p>Loading goals...</p>
          ) : goals.length === 0 ? (
            <p className="text-muted-foreground">You have no goals yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <GoalCard key={goal._id} {...goal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
