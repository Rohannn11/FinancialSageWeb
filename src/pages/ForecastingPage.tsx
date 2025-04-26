
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { useState } from "react";
import { AlertTriangle, Calendar, Download, Eye, HelpCircle, LineChart, RefreshCw, Settings, Sliders } from "lucide-react";

export default function ForecastingPage() {
  const [confidenceInterval, setConfidenceInterval] = useState(85);
  const [forecastPeriod, setForecastPeriod] = useState(12);
  const [selectedModel, setSelectedModel] = useState("arima");
  const [selectedTimeline, setSelectedTimeline] = useState("monthly");
  
  // Sample data representing past actual values
  const historicalRevenue = [
    { name: "Jan", value: 45000 },
    { name: "Feb", value: 48200 },
    { name: "Mar", value: 51500 },
    { name: "Apr", value: 49800 },
    { name: "May", value: 53200 },
    { name: "Jun", value: 58500 },
    { name: "Jul", value: 61200 },
    { name: "Aug", value: 64500 },
    { name: "Sep", value: 67800 },
    { name: "Oct", value: 72100 },
    { name: "Nov", value: 74500 },
    { name: "Dec", value: 78900 }
  ];
  
  // Sample forecast data (future projection)
  const forecastRevenue = [
    { name: "Jan", value: 82400, lowerBound: 78300, upperBound: 86500 },
    { name: "Feb", value: 86100, lowerBound: 81500, upperBound: 90700 },
    { name: "Mar", value: 89800, lowerBound: 84600, upperBound: 95000 },
    { name: "Apr", value: 93600, lowerBound: 87900, upperBound: 99300 },
    { name: "May", value: 97500, lowerBound: 91200, upperBound: 103800 },
    { name: "Jun", value: 101500, lowerBound: 94500, upperBound: 108500 }
  ];
  
  // Combined data for visualization
  const combinedData = [
    ...historicalRevenue,
    ...forecastRevenue.map(item => ({ ...item, isForecast: true }))
  ];
  
  // Sample expense data
  const combinedExpenseData = [
    // Historical
    { name: "Jan", value: 32000 },
    { name: "Feb", value: 33500 },
    { name: "Mar", value: 36000 },
    { name: "Apr", value: 35200 },
    { name: "May", value: 37500 },
    { name: "Jun", value: 39800 },
    { name: "Jul", value: 41200 },
    { name: "Aug", value: 42500 },
    { name: "Sep", value: 44100 },
    { name: "Oct", value: 45800 },
    { name: "Nov", value: 47200 },
    { name: "Dec", value: 49500 },
    // Forecast
    { name: "Jan", value: 51200, lowerBound: 48600, upperBound: 53800, isForecast: true },
    { name: "Feb", value: 53000, lowerBound: 50100, upperBound: 55900, isForecast: true },
    { name: "Mar", value: 54900, lowerBound: 51700, upperBound: 58100, isForecast: true },
    { name: "Apr", value: 56800, lowerBound: 53300, upperBound: 60300, isForecast: true },
    { name: "May", value: 58800, lowerBound: 55000, upperBound: 62600, isForecast: true },
    { name: "Jun", value: 60900, lowerBound: 56800, upperBound: 65000, isForecast: true }
  ];
  
  // Sample cash flow data
  const combinedCashFlowData = [
    // Historical
    { name: "Jan", value: 13000 },
    { name: "Feb", value: 14700 },
    { name: "Mar", value: 15500 },
    { name: "Apr", value: 14600 },
    { name: "May", value: 15700 },
    { name: "Jun", value: 18700 },
    { name: "Jul", value: 20000 },
    { name: "Aug", value: 22000 },
    { name: "Sep", value: 23700 },
    { name: "Oct", value: 26300 },
    { name: "Nov", value: 27300 },
    { name: "Dec", value: 29400 },
    // Forecast
    { name: "Jan", value: 31200, lowerBound: 29100, upperBound: 33300, isForecast: true },
    { name: "Feb", value: 33100, lowerBound: 30800, upperBound: 35400, isForecast: true },
    { name: "Mar", value: 34900, lowerBound: 32400, upperBound: 37400, isForecast: true },
    { name: "Apr", value: 36800, lowerBound: 34100, upperBound: 39500, isForecast: true },
    { name: "May", value: 38700, lowerBound: 35800, upperBound: 41600, isForecast: true },
    { name: "Jun", value: 40600, lowerBound: 37500, upperBound: 43700, isForecast: true }
  ];
  
  // Sample customer growth data
  const customerGrowthData = [
    // Historical
    { name: "Jan", value: 1250 },
    { name: "Feb", value: 1320 },
    { name: "Mar", value: 1410 },
    { name: "Apr", value: 1480 },
    { name: "May", value: 1560 },
    { name: "Jun", value: 1650 },
    { name: "Jul", value: 1720 },
    { name: "Aug", value: 1830 },
    { name: "Sep", value: 1950 },
    { name: "Oct", value: 2080 },
    { name: "Nov", value: 2210 },
    { name: "Dec", value: 2350 },
    // Forecast
    { name: "Jan", value: 2490, lowerBound: 2390, upperBound: 2590, isForecast: true },
    { name: "Feb", value: 2640, lowerBound: 2530, upperBound: 2750, isForecast: true },
    { name: "Mar", value: 2800, lowerBound: 2680, upperBound: 2920, isForecast: true },
    { name: "Apr", value: 2970, lowerBound: 2840, upperBound: 3100, isForecast: true },
    { name: "May", value: 3150, lowerBound: 3010, upperBound: 3290, isForecast: true },
    { name: "Jun", value: 3340, lowerBound: 3190, upperBound: 3490, isForecast: true }
  ];
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Financial Forecasting</h1>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Models
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Forecasts
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span>Forecasting Parameters</span>
              <HelpCircle className="ml-2 h-4 w-4 text-muted-foreground" />
            </CardTitle>
            <CardDescription>
              Configure your forecasting models and parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="model">Forecasting Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arima">ARIMA</SelectItem>
                    <SelectItem value="prophet">Prophet</SelectItem>
                    <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                    <SelectItem value="exponential">Exponential Smoothing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Select value={selectedTimeline} onValueChange={setSelectedTimeline}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="period">Forecast Period ({forecastPeriod} months)</Label>
                </div>
                <Slider
                  id="period"
                  min={1}
                  max={24}
                  step={1}
                  defaultValue={[forecastPeriod]}
                  onValueChange={(value) => setForecastPeriod(value[0])}
                  className="py-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confidence">Confidence Interval ({confidenceInterval}%)</Label>
                </div>
                <Slider
                  id="confidence"
                  min={70}
                  max={99}
                  step={1}
                  defaultValue={[confidenceInterval]}
                  onValueChange={(value) => setConfidenceInterval(value[0])}
                  className="py-2"
                />
              </div>
            </div>
            
            <div className="mt-6 flex items-center">
              <Button className="mr-2">Update Forecast</Button>
              <Button variant="outline" className="mr-2">
                <Settings className="mr-2 h-4 w-4" />
                Advanced Settings
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Compare Models
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="revenue">
          <TabsList>
            <TabsTrigger value="revenue">Revenue Forecast</TabsTrigger>
            <TabsTrigger value="expenses">Expense Forecast</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow Forecast</TabsTrigger>
            <TabsTrigger value="customers">Customer Growth</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ForecastCard 
                title="Projected Revenue (Next Month)"
                value="$82,400"
                range="$78,300 - $86,500"
                change={+4.4}
              />
              
              <ForecastCard 
                title="Projected Revenue (Q1)"
                value="$258,300"
                range="$244,400 - $272,200"
                change={+12.8}
              />
              
              <ForecastCard 
                title="Projected Annual Revenue"
                value="$1,124,500"
                range="$1,064,200 - $1,184,800"
                change={+19.7}
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
                <CardDescription>
                  Historical data and future projections with {confidenceInterval}% confidence interval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {/* This would be a forecast chart with confidence intervals */}
                  <ForecastChart 
                    data={combinedData}
                    dataKey="value"
                    confidenceInterval={confidenceInterval}
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Performance</CardTitle>
                  <CardDescription>
                    Model accuracy and evaluation metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">R² (Coefficient of Determination)</p>
                        <p className="text-xs text-muted-foreground">
                          How well the model fits the data
                        </p>
                      </div>
                      <p className="font-medium text-lg">0.94</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">MAPE (Mean Absolute Percentage Error)</p>
                        <p className="text-xs text-muted-foreground">
                          Average percentage difference between forecast and actual
                        </p>
                      </div>
                      <p className="font-medium text-lg">3.2%</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">MAE (Mean Absolute Error)</p>
                        <p className="text-xs text-muted-foreground">
                          Average magnitude of errors in the forecast
                        </p>
                      </div>
                      <p className="font-medium text-lg">$2,450</p>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center space-x-2 text-amber-500">
                        <AlertTriangle className="h-4 w-4" />
                        <p className="text-sm">Seasonal variation detected in Q2</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Forecast Assumptions</CardTitle>
                  <CardDescription>
                    Key factors influencing the forecast
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Trend Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Upward trend detected with average monthly growth of 4.2%
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Seasonality</h3>
                      <p className="text-sm text-muted-foreground">
                        Moderate seasonal pattern with peaks in Q4 and dips in Q2
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Cyclical Patterns</h3>
                      <p className="text-sm text-muted-foreground">
                        Minor 18-month cycle detected, currently in growth phase
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">External Factors</h3>
                      <p className="text-sm text-muted-foreground">
                        Model accounts for market trends and 3 key economic indicators
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ForecastCard 
                title="Projected Expenses (Next Month)"
                value="$51,200"
                range="$48,600 - $53,800"
                change={+3.4}
                isNegative
              />
              
              <ForecastCard 
                title="Projected Expenses (Q1)"
                value="$159,100"
                range="$150,100 - $168,100"
                change={+8.5}
                isNegative
              />
              
              <ForecastCard 
                title="Projected Annual Expenses"
                value="$694,300"
                range="$659,600 - $729,000"
                change={+15.2}
                isNegative
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Expense Forecast</CardTitle>
                <CardDescription>
                  Historical data and future projections with {confidenceInterval}% confidence interval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ForecastChart 
                    data={combinedExpenseData}
                    dataKey="value"
                    confidenceInterval={confidenceInterval}
                    color="#e24a4a"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cashflow" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ForecastCard 
                title="Projected Cash Flow (Next Month)"
                value="$31,200"
                range="$29,100 - $33,300"
                change={+6.1}
              />
              
              <ForecastCard 
                title="Projected Cash Flow (Q1)"
                value="$99,200"
                range="$92,300 - $106,100"
                change={+19.5}
              />
              
              <ForecastCard 
                title="Projected Annual Cash Flow"
                value="$430,200"
                range="$404,600 - $455,800"
                change={+26.8}
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Forecast</CardTitle>
                <CardDescription>
                  Historical data and future projections with {confidenceInterval}% confidence interval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ForecastChart 
                    data={combinedCashFlowData}
                    dataKey="value"
                    confidenceInterval={confidenceInterval}
                    color="#3cc47c"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ForecastCard 
                title="Projected Customers (Next Month)"
                value="2,490"
                range="2,390 - 2,590"
                change={+6.0}
              />
              
              <ForecastCard 
                title="Projected Customer Growth (Q1)"
                value="7,930"
                range="7,600 - 8,260"
                change={+22.5}
              />
              
              <ForecastCard 
                title="Projected Year-End Customers"
                value="4,850"
                range="4,610 - 5,090"
                change={+106.4}
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Growth Forecast</CardTitle>
                <CardDescription>
                  Historical data and future projections with {confidenceInterval}% confidence interval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ForecastChart 
                    data={customerGrowthData}
                    dataKey="value"
                    confidenceInterval={confidenceInterval}
                    color="#7c3aed"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Segment Projections</CardTitle>
                <CardDescription>
                  Growth forecast by customer segment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { name: "Enterprise", current: 485, projected: 610, growth: 25.8 },
                    { name: "Mid-Market", current: 720, projected: 940, growth: 30.6 },
                    { name: "Small Business", current: 845, projected: 1230, growth: 45.6 },
                    { name: "Individual", current: 300, projected: 480, growth: 60.0 },
                  ].map((segment, i) => (
                    <div key={i} className="space-y-2">
                      <h3 className="font-medium">{segment.name}</h3>
                      <div className="flex justify-between text-sm">
                        <span>Current: {segment.current}</span>
                        <span className="font-medium">Projected: {segment.projected}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${60 + (segment.growth / 3)}%` }}
                        />
                      </div>
                      <p className="text-xs text-right text-green-600">
                        +{segment.growth}% growth
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Scenario Analysis</CardTitle>
            <CardDescription>
              Compare different financial scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="bg-primary/10">Base Case</Button>
                <Button variant="outline">Optimistic</Button>
                <Button variant="outline">Conservative</Button>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  New Scenario
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <ScenarioCard
                  title="Base Case"
                  description="Current trend projections with existing growth rates"
                  metrics={[
                    { name: "Revenue Growth", value: "8.4%" },
                    { name: "Expense Growth", value: "6.2%" },
                    { name: "Profit Margin", value: "38.3%" }
                  ]}
                  isActive
                />
                
                <ScenarioCard
                  title="Optimistic Case"
                  description="Accelerated growth with new market expansion"
                  metrics={[
                    { name: "Revenue Growth", value: "12.8%" },
                    { name: "Expense Growth", value: "7.1%" },
                    { name: "Profit Margin", value: "43.5%" }
                  ]}
                />
                
                <ScenarioCard
                  title="Conservative Case"
                  description="Slower growth considering market headwinds"
                  metrics={[
                    { name: "Revenue Growth", value: "5.2%" },
                    { name: "Expense Growth", value: "5.8%" },
                    { name: "Profit Margin", value: "32.1%" }
                  ]}
                />
              </div>
              
              <div className="h-[300px] mt-6">
                <LineChart className="mx-auto h-16 w-16 text-muted-foreground opacity-30" />
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Select scenarios to compare forecasts visually
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Scenarios
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
}

interface ForecastCardProps {
  title: string;
  value: string;
  range: string;
  change: number;
  isNegative?: boolean;
}

function ForecastCard({ title, value, range, change, isNegative }: ForecastCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold">{value}</p>
          <span className="ml-2 text-sm text-muted-foreground">
            <span className="text-xs">±</span> range: {range}
          </span>
        </div>
        <div className="mt-2">
          <span className={`inline-flex items-center text-sm ${
            isNegative ? 
              (change > 0 ? "text-red-500" : "text-green-500") : 
              (change > 0 ? "text-green-500" : "text-red-500")
          }`}>
            {change > 0 ? "+" : ""}{change}% vs previous period
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

interface ForecastChartProps {
  data: any[];
  dataKey: string;
  confidenceInterval: number;
  color?: string;
}

function ForecastChart({ data, dataKey, confidenceInterval, color = "#3282b8" }: ForecastChartProps) {
  // In a real implementation, this would be a proper chart with confidence intervals
  // For this sample, we'll just use ChartCard as a placeholder
  
  return (
    <ChartCard
      title=""
      description=""
      data={data}
      dataKey={dataKey}
      type="line"
      color={color}
      height={380}
    />
  );
}

interface ScenarioCardProps {
  title: string;
  description: string;
  metrics: { name: string; value: string }[];
  isActive?: boolean;
}

function ScenarioCard({ title, description, metrics, isActive }: ScenarioCardProps) {
  return (
    <Card className={isActive ? "border-primary" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {metrics.map((metric, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm">{metric.name}</span>
              <span className="font-medium">{metric.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="ml-auto">Edit</Button>
      </CardFooter>
    </Card>
  );
}

function Plus(props: { className?: string }) {
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
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
