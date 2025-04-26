
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MoreHorizontal, 
  ZoomIn, 
  ZoomOut, 
  MoveHorizontal,
  Download,
  RefreshCw,
  Calendar,
  ChevronDown
} from "lucide-react";
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
  Legend,
  Brush,
  ReferenceArea,
  ReferenceLine,
} from "recharts";

export type ChartType = "line" | "bar" | "area" | "pie";
type TimeRange = "7d" | "30d" | "90d" | "1y" | "all";

interface ComparisonData {
  label: string;
  data: any[];
  color: string;
}

interface EnhancedChartCardProps {
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
  // New properties for enhanced features
  comparisonData?: ComparisonData;
  forecastData?: any[];
  forecastKey?: string;
  allowZoom?: boolean;
  targetValue?: number;
  showBrush?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="rounded-lg border bg-background p-2 shadow-lg">
      <p className="font-medium">{label}</p>
      <div className="mt-1 space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-muted-foreground">
              {entry.name}: 
            </span>
            <span className="font-medium">
              {typeof entry.value === 'number' 
                ? entry.value.toLocaleString() 
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function EnhancedChartCard({
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
  comparisonData,
  forecastData,
  forecastKey = dataKey,
  allowZoom = true,
  targetValue,
  showBrush = false,
}: EnhancedChartCardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [selectedChartType, setSelectedChartType] = useState<ChartType>(type);
  const [zoomMode, setZoomMode] = useState<boolean>(false);
  const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<string | null>(null);
  
  const chartRef = useRef<any>(null);
  
  // Handle zoom functionality
  const handleMouseDown = (e: any) => {
    if (!zoomMode || !allowZoom) return;
    if (!e || !e.activeLabel) return;
    setRefAreaLeft(e.activeLabel);
  };
  
  const handleMouseMove = (e: any) => {
    if (!zoomMode || !allowZoom) return;
    if (!e || !e.activeLabel || refAreaLeft === null) return;
    setRefAreaRight(e.activeLabel);
  };
  
  const handleMouseUp = () => {
    if (!zoomMode || !allowZoom) return;
    if (refAreaLeft === null || refAreaRight === null) {
      setRefAreaLeft(null);
      setRefAreaRight(null);
      return;
    }
    
    // Here you would implement the actual zoom logic
    // For demonstration purposes, we're just resetting the zoom state
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setZoomMode(false);
  };
  
  const toggleZoomMode = () => {
    setZoomMode(!zoomMode);
    setRefAreaLeft(null);
    setRefAreaRight(null);
  };
  
  // Download chart as PNG
  const downloadChartAsPNG = () => {
    if (!chartRef.current) return;
    
    // This is just a placeholder - in a real implementation, you would
    // use html-to-image or another library to capture the chart as an image
    console.log('Download chart functionality would be implemented here');
  };
  
  // Render the chart based on the selected type
  const renderChart = () => {
    switch (selectedChartType) {
      case "line":
        return (
          <LineChart 
            data={data}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
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
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Main data line */}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Current"
            />
            
            {/* Comparison data if available */}
            {comparisonData && (
              <Line 
                type="monotone" 
                dataKey={comparisonData.label} 
                stroke={comparisonData.color} 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 2 }}
                name={comparisonData.label}
              />
            )}
            
            {/* Forecast data if available */}
            {forecastData && (
              <Line 
                type="monotone" 
                data={forecastData}
                dataKey={forecastKey} 
                stroke={color} 
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={{ r: 2 }}
                name="Forecast"
              />
            )}
            
            {/* Target line if specified */}
            {targetValue !== undefined && (
              <ReferenceLine 
                y={targetValue} 
                stroke="red" 
                strokeDasharray="3 3" 
                label="Target" 
              />
            )}
            
            {/* Zoom reference area */}
            {refAreaLeft && refAreaRight && (
              <ReferenceArea 
                x1={refAreaLeft} 
                x2={refAreaRight} 
                strokeOpacity={0.3}
                fill="#8884d8"
                fillOpacity={0.3} 
              />
            )}
            
            {/* Brush for range selection */}
            {showBrush && (
              <Brush 
                dataKey={xAxisKey} 
                height={30} 
                stroke={color}
                startIndex={0}
                endIndex={data.length > 10 ? 10 : data.length - 1}
              />
            )}
          </LineChart>
        );
      
      case "bar":
        return (
          <BarChart 
            data={data} 
            stackOffset={stacked ? "sign" : "none"}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
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
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
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
            
            {showBrush && (
              <Brush 
                dataKey={xAxisKey} 
                height={30} 
                stroke={color}
              />
            )}
          </BarChart>
        );
      
      case "area":
        return (
          <AreaChart 
            data={data}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
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
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
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
              name="Current"
            />
            
            {comparisonData && (
              <Area 
                type="monotone" 
                dataKey={comparisonData.label} 
                stroke={comparisonData.color} 
                strokeWidth={2}
                strokeDasharray="5 5"
                fillOpacity={0.3}
                fill={comparisonData.color}
                name={comparisonData.label}
              />
            )}
            
            {showBrush && (
              <Brush 
                dataKey={xAxisKey} 
                height={30} 
                stroke={color}
              />
            )}
          </AreaChart>
        );
      
      case "pie":
        return (
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
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <Card className="shadow-card shadow-card-hover">
      <CardHeader className="flex flex-col space-y-2 pb-2">
        <div className="flex flex-row items-center justify-between">
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
              <DropdownMenuItem onClick={downloadChartAsPNG}>
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Time range selector */}
          <Tabs defaultValue={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
            <TabsList className="grid grid-cols-5 h-8">
              <TabsTrigger value="7d" className="text-xs px-2">7D</TabsTrigger>
              <TabsTrigger value="30d" className="text-xs px-2">30D</TabsTrigger>
              <TabsTrigger value="90d" className="text-xs px-2">90D</TabsTrigger>
              <TabsTrigger value="1y" className="text-xs px-2">1Y</TabsTrigger>
              <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Chart type selector */}
          <div className="flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <span className="capitalize">{selectedChartType}</span>
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedChartType("line")}>Line</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedChartType("bar")}>Bar</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedChartType("area")}>Area</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedChartType("pie")}>Pie</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {allowZoom && (
              <Button 
                variant={zoomMode ? "secondary" : "outline"} 
                size="icon"
                className="h-8 w-8"
                onClick={toggleZoomMode}
              >
                {zoomMode ? <MoveHorizontal className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={chartRef}>
          <ResponsiveContainer width="100%" height={height}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
