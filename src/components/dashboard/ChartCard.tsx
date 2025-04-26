
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";

export type ChartType = "line" | "bar" | "area";

interface ChartCardProps {
  title: string;
  data: any[];
  type?: ChartType;
  dataKey: string;
  xAxisKey?: string;
  height?: number;
  color?: string;
  description?: string;
}

export function ChartCard({
  title,
  data,
  type = "line",
  dataKey,
  xAxisKey = "name",
  height = 300,
  color = "#3282b8",
  description,
}: ChartCardProps) {
  return (
    <Card className="shadow-card shadow-card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Download CSV</DropdownMenuItem>
            <DropdownMenuItem>Download PNG</DropdownMenuItem>
            <DropdownMenuItem>View fullscreen</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  borderRadius: "8px", 
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          ) : type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  borderRadius: "8px", 
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
                }} 
              />
              <Bar 
                dataKey={dataKey} 
                fill={color} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  borderRadius: "8px", 
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
                }} 
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
