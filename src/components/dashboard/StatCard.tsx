
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";

const statCardVariants = cva("transition-all", {
  variants: {
    variant: {
      default: "bg-card",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      accent: "bg-accent text-accent-foreground",
      gradient: "gradient-blue text-white",
      success: "gradient-green text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  variant,
  className,
}: StatCardProps) {
  return (
    <Card 
      className={cn(
        "shadow-card shadow-card-hover", 
        statCardVariants({ variant }), 
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <div className={cn(
            "rounded-full p-2",
            variant ? "bg-white/10" : "bg-primary/10"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="mt-1 text-xs opacity-70">{description}</p>
        )}
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span
              className={cn(
                "mr-1 rounded px-1 py-0.5",
                trend.isPositive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              )}
            >
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
            <span className="opacity-70">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
