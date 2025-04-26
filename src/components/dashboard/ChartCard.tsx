
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";

export type ChartType = "line" | "bar" | "area" | "pie";

interface ChartCardProps {
  title: string;
  data: any[];
  type?: ChartType;
  dataKey: string;
  xAxisKey?: string;
  height?: number;
  color?: string;
  description?: string;
  // Multiple series support for bar charts
  barKeys?: string[];
  barColors?: string[];
  stacked?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export function ChartCard({
  title,
  data,
  type = "line",
  dataKey,
  xAxisKey = "name",
  height = 300,
  color = "#3282b8",
  description,
  barKeys,
  barColors,
  stacked = false,
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
            <BarChart data={data} stackOffset={stacked ? "sign" : "none"}>
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
              {barKeys && barKeys.length > 0 ? (
                barKeys.map((key, index) => (
                  <Bar 
                    key={key}
                    dataKey={key} 
                    fill={barColors ? barColors[index % barColors.length] : COLORS[index % COLORS.length]} 
                    stackId={stacked ? "stack" : undefined}
                    radius={[4, 4, 0, 0]}
                  />
                ))
              ) : (
                <Bar 
                  dataKey={dataKey} 
                  fill={color} 
                  radius={[4, 4, 0, 0]} 
                />
              )}
            </BarChart>
          ) : type === "pie" ? (
            <PieChart>
              <Pie
                data={data}
                dataKey={dataKey}
                nameKey={xAxisKey}
                cx="50%"
                cy="50%"
                outerRadius={height / 3}
                fill={color}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
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
