import { Button } from "@/components/ui/button";
import { GoalCard } from "@/components/GoalCard";
import { StatsCard } from "@/components/StatsCard";
import { Target, TrendingUp, Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-strive.jpg";

// Mock data
const mockGoals = [
  {
    id: "1",
    title: "Lose 10kg",
    description: "Achieve my target weight through consistent exercise and healthy eating habits.",
    progress: 40,
    totalMilestones: 10,
    completedMilestones: 4,
    targetDate: "Dec 2024",
    category: "Health"
  },
  {
    id: "2", 
    title: "Finish reading 12 books",
    description: "Expand my knowledge by reading one book per month throughout the year.",
    progress: 75,
    totalMilestones: 12,
    completedMilestones: 9,
    targetDate: "Dec 2024",
    category: "Learning"
  },
  {
    id: "3",
    title: "Launch my website",
    description: "Build and deploy my personal portfolio website with a blog section.",
    progress: 60,
    totalMilestones: 8,
    completedMilestones: 5,
    targetDate: "Nov 2024",
    category: "Career"
  }
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-48 bg-gradient-hero flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center text-white space-y-2">
          <h1 className="text-3xl font-bold">Welcome to Strive</h1>
          <p className="text-white/90">Track your goals, celebrate your milestones</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Active Goals"
            value={3}
            description="Currently tracking"
            icon={Target}
            variant="default"
          />
          <StatsCard
            title="Milestones Achieved"
            value={18}
            description="Total completed"
            icon={TrendingUp}
            trend="+3 this week"
            variant="success"
          />
          <StatsCard
            title="Days Streaking"
            value={12}
            description="Current progress streak"
            icon={Calendar}
            variant="milestone"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGoals.map((goal) => (
              <GoalCard key={goal.id} {...goal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}