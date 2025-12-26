import { Clock, UserPlus, DollarSign, FileCheck, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "admission",
    title: "New student enrolled",
    description: "Rahul Kumar joined Class 10-A",
    time: "5 minutes ago",
    icon: UserPlus,
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    id: 2,
    type: "payment",
    title: "Fee payment received",
    description: "₹25,000 from Priya Sharma (STU2024042)",
    time: "15 minutes ago",
    icon: DollarSign,
    iconBg: "bg-info/10",
    iconColor: "text-info",
  },
  {
    id: 3,
    type: "exam",
    title: "Exam results published",
    description: "Class 12 Science - Physics Mid-term",
    time: "1 hour ago",
    icon: FileCheck,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: 4,
    type: "event",
    title: "Event scheduled",
    description: "Annual Sports Day - 15th January 2025",
    time: "2 hours ago",
    icon: Calendar,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  {
    id: 5,
    type: "admission",
    title: "Admission form submitted",
    description: "Anika Patel - Applying for Class 6",
    time: "3 hours ago",
    icon: UserPlus,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
];

export function RecentActivity() {
  return (
    <div className="chart-container">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm font-medium text-primary hover:underline">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 animate-slide-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                activity.iconBg
              )}>
                <Icon className={cn("h-5 w-5", activity.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="whitespace-nowrap">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
