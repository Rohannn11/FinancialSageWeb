
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertCircle, Info } from "lucide-react";

export interface Insight {
  title: string;
  description: string;
  type: "positive" | "negative" | "warning" | "info";
}

interface InsightCardProps {
  insights: Insight[];
}

export function InsightCard({ insights }: InsightCardProps) {
  return (
    <Card className="shadow-card shadow-card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Automated Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Info className="h-10 w-10 text-muted-foreground opacity-50" />
            <p className="mt-2 text-sm text-muted-foreground">
              No insights available at this time.
            </p>
          </div>
        ) : (
          insights.map((insight, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg border border-border animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mt-1">
                {insight.type === "positive" && (
                  <div className="rounded-full bg-green-100 p-1">
                    <TrendingUp className="h-4 w-4 text-green-700" />
                  </div>
                )}
                {insight.type === "negative" && (
                  <div className="rounded-full bg-red-100 p-1">
                    <TrendingDown className="h-4 w-4 text-red-700" />
                  </div>
                )}
                {insight.type === "warning" && (
                  <div className="rounded-full bg-amber-100 p-1">
                    <AlertCircle className="h-4 w-4 text-amber-700" />
                  </div>
                )}
                {insight.type === "info" && (
                  <div className="rounded-full bg-blue-100 p-1">
                    <Info className="h-4 w-4 text-blue-700" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-medium">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
