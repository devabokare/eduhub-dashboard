import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
  gradient: "primary" | "success" | "warning" | "info" | "accent";
  className?: string;
}

const gradientClasses = {
  primary: "gradient-primary",
  success: "gradient-success",
  warning: "gradient-warning",
  info: "gradient-info",
  accent: "gradient-accent",
};

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  gradient,
  className,
}: StatCardProps) {
  return (
    <div className={cn("stat-card group", className)}>
      <div className={cn("stat-card-gradient", gradientClasses[gradient])} />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p className={cn(
              "mt-2 flex items-center text-sm font-medium",
              change.positive ? "text-success" : "text-destructive"
            )}>
              <span className={cn(
                "mr-1",
                change.positive ? "text-success" : "text-destructive"
              )}>
                {change.positive ? "↑" : "↓"}
              </span>
              {change.value}
              <span className="ml-1 text-muted-foreground font-normal">vs last month</span>
            </p>
          )}
        </div>
        
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          gradientClasses[gradient]
        )}>
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}
