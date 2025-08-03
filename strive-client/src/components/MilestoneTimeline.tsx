import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Image as ImageIcon } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  image?: string;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="relative">
          {/* Timeline line */}
          {index < milestones.length - 1 && (
            <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
          )}
          
          <Card className="ml-12 bg-gradient-card shadow-card border-0">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Timeline dot */}
                <div className="absolute -left-6 top-4">
                  {milestone.completed ? (
                    <CheckCircle className="w-6 h-6 text-success bg-white rounded-full" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground bg-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{milestone.title}</h4>
                    <Badge variant={milestone.completed ? "default" : "secondary"} className="text-xs">
                      {milestone.date}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  
                  {milestone.image && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted/30">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Image attached</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}