
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { useState } from "react";
import { BarChart3, Calendar, Download, LineChart, PieChart, Sliders } from "lucide-react";

// Sample data for various charts
const revenueByMonth = [
  { name: "Jan", value: 4200 },
  { name: "Feb", value: 3800 },
  { name: "Mar", value: 5100 },
  { name: "Apr", value: 4800 },
  { name: "May", value: 5700 },
  { name: "Jun", value: 6200 },
  { name: "Jul", value: 7100 },
  { name: "Aug", value: 6800 },
  { name: "Sep", value: 7400 },
  { name: "Oct", value: 8200 },
  { name: "Nov", value: 7800 },
  { name: "Dec", value: 9100 },
];

const expenseByCategory = [
  { name: "Marketing", value: 2400 },
  { name: "Operations", value: 1800 },
  { name: "Salaries", value: 5600 },
  { name: "Software", value: 900 },
  { name: "Office", value: 1200 },
  { name: "Travel", value: 850 },
];

const cashFlow = [
  { name: "Jan", inflow: 6500, outflow: 4100 },
  { name: "Feb", inflow: 5900, outflow: 3900 },
  { name: "Mar", inflow: 7200, outflow: 4800 },
  { name: "Apr", inflow: 6800, outflow: 4500 },
  { name: "May", inflow: 8100, outflow: 5200 },
  { name: "Jun", inflow: 8700, outflow: 5600 },
  { name: "Jul", inflow: 9400, outflow: 6100 },
  { name: "Aug", inflow: 9100, outflow: 5900 },
  { name: "Sep", inflow: 10200, outflow: 6500 },
  { name: "Oct", inflow: 11500, outflow: 7200 },
  { name: "Nov", inflow: 10800, outflow: 6900 },
  { name: "Dec", inflow: 12400, outflow: 7800 },
];

const customerSegments = [
  { name: "Enterprise", value: 42 },
  { name: "SMB", value: 28 },
  { name: "Startup", value: 18 },
  { name: "Individual", value: 12 },
];

const profitMargins = [
  { name: "Jan", value: 23.5 },
  { name: "Feb", value: 22.1 },
  { name: "Mar", value: 25.7 },
  { name: "Apr", value: 24.9 },
  { name: "May", value: 26.8 },
  { name: "Jun", value: 27.4 },
  { name: "Jul", value: 29.1 },
  { name: "Aug", value: 28.7 },
  { name: "Sep", value: 30.2 },
  { name: "Oct", value: 32.5 },
  { name: "Nov", value: 31.9 },
  { name: "Dec", value: 33.4 },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("year");
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Financial Analytics</h1>
          
          <div className="flex items-center space-x-2">
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Sliders className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
            <TabsTrigger 
              value="overview" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Revenue Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="expenses" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Expense Breakdown
            </TabsTrigger>
            <TabsTrigger 
              value="profitability" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Profitability
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <KpiCard 
                title="Total Revenue" 
                value="$89,400" 
                trend={18.2} 
                description="vs previous period" 
                icon={<LineChart className="h-5 w-5" />} 
              />
              <KpiCard 
                title="Total Expenses" 
                value="$51,800" 
                trend={12.5} 
                description="vs previous period" 
                icon={<BarChart3 className="h-5 w-5" />} 
              />
              <KpiCard 
                title="Net Profit" 
                value="$37,600" 
                trend={24.8} 
                description="vs previous period" 
                icon={<PieChart className="h-5 w-5" />} 
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <ChartCard
                title="Revenue Trend"
                description="Monthly revenue data"
                data={revenueByMonth}
                dataKey="value"
                type="area"
                color="#3282b8"
              />
              <ChartCard
                title="Expense Distribution"
                description="Breakdown by category"
                data={expenseByCategory}
                dataKey="value"
                type="pie"
                color="#3282b8"
              />
            </div>
            
            <ChartCard
              title="Cash Flow Analysis"
              description="Monthly inflow vs outflow"
              data={cashFlow}
              type="bar"
              color="#3282b8"
              barKeys={["inflow", "outflow"]}
              barColors={["#4caf50", "#f44336"]}
              stacked={false}
            />
          </TabsContent>
          
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <ChartCard
                title="Revenue by Month"
                description="Monthly revenue data"
                data={revenueByMonth}
                dataKey="value"
                type="bar"
                color="#3282b8"
              />
              <ChartCard
                title="Customer Segments"
                description="Revenue distribution by customer type"
                data={customerSegments}
                dataKey="value"
                type="pie"
                color="#3282b8"
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Average Deal Size</p>
                    <p className="text-2xl font-bold">$12,450</p>
                    <p className="text-xs text-green-500 flex items-center">
                      +8.2% <ArrowUp className="ml-1 h-3 w-3" />
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Customer Acquisition Cost</p>
                    <p className="text-2xl font-bold">$2,350</p>
                    <p className="text-xs text-red-500 flex items-center">
                      +4.7% <ArrowUp className="ml-1 h-3 w-3" />
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Customer Lifetime Value</p>
                    <p className="text-2xl font-bold">$57,800</p>
                    <p className="text-xs text-green-500 flex items-center">
                      +12.5% <ArrowUp className="ml-1 h-3 w-3" />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <ChartCard
              title="Monthly Recurring Revenue"
              description="Growth over time"
              data={revenueByMonth.map(item => ({ ...item, value: item.value * 0.7 }))}
              dataKey="value"
              type="line"
              color="#3282b8"
            />
          </TabsContent>
          
          <TabsContent value="expenses" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <ChartCard
                title="Expense Categories"
                description="Distribution by category"
                data={expenseByCategory}
                dataKey="value"
                type="pie"
                color="#e24a4a"
              />
              <ChartCard
                title="Monthly Expenses"
                description="Expense trend"
                data={revenueByMonth.map(item => ({ ...item, value: item.value * 0.6 }))}
                dataKey="value"
                type="bar"
                color="#e24a4a"
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Expense Items</CardTitle>
                <CardDescription>Largest expenses this period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Employee Salaries", amount: 28500, percentage: 55 },
                    { category: "Marketing Campaigns", amount: 12400, percentage: 24 },
                    { category: "Office Rent", amount: 4800, percentage: 9 },
                    { category: "Software Subscriptions", amount: 3600, percentage: 7 },
                    { category: "Travel & Entertainment", amount: 2500, percentage: 5 }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-muted-foreground">${item.amount.toLocaleString()}</p>
                      </div>
                      <div className="w-32">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <ChartCard
              title="Expense to Revenue Ratio"
              description="Monthly comparison"
              data={cashFlow.map(item => ({ 
                name: item.name, 
                ratio: Math.round((item.outflow / item.inflow) * 100) 
              }))}
              dataKey="ratio"
              type="line"
              color="#e24a4a"
            />
          </TabsContent>
          
          <TabsContent value="profitability" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <KpiCard 
                title="Gross Profit Margin" 
                value="42.1%" 
                trend={3.8} 
                description="vs previous period" 
                icon={<TrendingUp className="h-5 w-5" />} 
              />
              <KpiCard 
                title="Operating Margin" 
                value="28.4%" 
                trend={2.1} 
                description="vs previous period" 
                icon={<TrendingUp className="h-5 w-5" />} 
              />
              <KpiCard 
                title="Net Profit Margin" 
                value="19.8%" 
                trend={4.5} 
                description="vs previous period" 
                icon={<TrendingUp className="h-5 w-5" />} 
              />
            </div>
            
            <ChartCard
              title="Profit Margin Trend"
              description="Monthly profit margin percentage"
              data={profitMargins}
              dataKey="value"
              type="line"
              color="#3cc47c"
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profitability by Product Line</CardTitle>
                  <CardDescription>Margin comparison across products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Financial Software", margin: 68, revenue: 42000 },
                      { name: "Consulting Services", margin: 54, revenue: 28500 },
                      { name: "Training Programs", margin: 46, revenue: 12800 },
                      { name: "Data Analysis", margin: 39, revenue: 6100 }
                    ].map((product, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm font-medium">{product.margin}%</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              product.margin > 50 ? "bg-green-500" : 
                              product.margin > 40 ? "bg-blue-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${product.margin}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Revenue: ${product.revenue.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Profitability by Customer Segment</CardTitle>
                  <CardDescription>Margin analysis by customer type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    {/* This would be a scatter plot in a real implementation */}
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">
                        Scatter plot showing profit margin vs. customer size
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}

interface KpiCardProps {
  title: string;
  value: string;
  trend: number;
  description: string;
  icon: React.ReactNode;
}

function KpiCard({ title, value, trend, description, icon }: KpiCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground">{title}</span>
          <span className="p-2 bg-primary/10 rounded-full text-primary">{icon}</span>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold">{value}</p>
          <div className="flex items-center text-xs">
            <span className={trend > 0 ? "text-green-500" : "text-red-500"}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
            {trend > 0 ? 
              <ArrowUp className="ml-1 h-3 w-3 text-green-500" /> : 
              <ArrowDown className="ml-1 h-3 w-3 text-red-500" />
            }
            <span className="ml-1.5 text-muted-foreground">{description}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// These are needed but not imported at the top to avoid cluttering imports
function ArrowUp(props: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function ArrowDown(props: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <path d="M12 5v14" />
      <path d="m5 12 7 7 7-7" />
    </svg>
  );
}

function TrendingUp(props: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
