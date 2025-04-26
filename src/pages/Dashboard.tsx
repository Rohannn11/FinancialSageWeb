
import { BarChart3, DollarSign, ArrowUp, ArrowDown, TrendingUp, AlertTriangle, LineChart as LineChartIcon } from "lucide-react";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { EnhancedChartCard } from "@/components/dashboard/EnhancedChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { ChartSkeleton } from "@/components/dashboard/ChartSkeleton";
import { analyzeTrend, detectAnomalies, generateForecast } from "@/utils/dataAnalysis";
import { useQuery } from "@tanstack/react-query";

// Sample data - in a real app, this would come from an API
const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
  { name: "Aug", value: 8000 },
];

// Previous period data for comparison
const previousRevenueData = [
  { name: "Jan", value: 3200 },
  { name: "Feb", value: 2800 },
  { name: "Mar", value: 4200 },
  { name: "Apr", value: 3900 },
  { name: "May", value: 5100 },
  { name: "Jun", value: 4800 },
  { name: "Jul", value: 6100 },
  { name: "Aug", value: 7200 },
];

const expenseData = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1800 },
  { name: "Mar", value: 3200 },
  { name: "Apr", value: 3800 },
  { name: "May", value: 3500 },
  { name: "Jun", value: 4000 },
  { name: "Jul", value: 3700 },
  { name: "Aug", value: 4100 },
];

const profitData = [
  { name: "Jan", value: 1600 },
  { name: "Feb", value: 1200 },
  { name: "Mar", value: 1800 },
  { name: "Apr", value: 700 },
  { name: "May", value: 2500 },
  { name: "Jun", value: 1500 },
  { name: "Jul", value: 3300 },
  { name: "Aug", value: 3900 },
];

// Enhanced data with additional insights
const enhancedRevenueData = revenueData.map((item, index) => {
  return {
    ...item,
    previous: previousRevenueData[index]?.value || 0,
    target: item.value * 1.1, // 10% higher target
  };
});

const anomaliesData = [
  { id: 1, date: "2023-08-15", type: "Expense", category: "Office Supplies", amount: 4500, status: "Flagged" },
  { id: 2, date: "2023-08-18", type: "Revenue", category: "Sales", amount: 28000, status: "Flagged" },
  { id: 3, date: "2023-08-21", type: "Expense", category: "Travel", amount: 3200, status: "Flagged" },
  { id: 4, date: "2023-08-25", type: "Expense", category: "Software", amount: 980, status: "Flagged" },
];

const transactionsData = [
  { id: 101, date: "2023-08-30", type: "Revenue", category: "Services", amount: 12500, paymentMethod: "Bank Transfer" },
  { id: 102, date: "2023-08-29", type: "Expense", category: "Marketing", amount: 2750, paymentMethod: "Credit Card" },
  { id: 103, date: "2023-08-28", type: "Revenue", category: "Product Sales", amount: 8300, paymentMethod: "PayPal" },
  { id: 104, date: "2023-08-27", type: "Expense", category: "Utilities", amount: 430, paymentMethod: "Direct Debit" },
  { id: 105, date: "2023-08-26", type: "Revenue", category: "Consulting", amount: 5000, paymentMethod: "Bank Transfer" },
  { id: 106, date: "2023-08-25", type: "Expense", category: "Office Supplies", amount: 220, paymentMethod: "Credit Card" },
  { id: 107, date: "2023-08-24", type: "Revenue", category: "Services", amount: 9750, paymentMethod: "Bank Transfer" },
  { id: 108, date: "2023-08-23", type: "Expense", category: "Subscription", amount: 49.99, paymentMethod: "PayPal" },
  { id: 109, date: "2023-08-22", type: "Revenue", category: "Product Sales", amount: 6820, paymentMethod: "Credit Card" },
  { id: 110, date: "2023-08-21", type: "Expense", category: "Travel", amount: 1250, paymentMethod: "Credit Card" },
];

// Table columns
const anomalyColumns = [
  { key: "date", title: "Date" },
  { key: "type", title: "Type" },
  { key: "category", title: "Category" },
  { 
    key: "amount", 
    title: "Amount",
    render: (value: number) => `$${value.toLocaleString()}`
  },
  { 
    key: "status", 
    title: "Status",
    render: (value: string) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        {value}
      </span>
    )
  },
];

const transactionColumns = [
  { key: "date", title: "Date" },
  { key: "type", title: "Type" },
  { key: "category", title: "Category" },
  { 
    key: "amount", 
    title: "Amount",
    render: (value: number) => `$${value.toLocaleString()}`
  },
  { key: "paymentMethod", title: "Payment Method" },
];

// Simulate data loading
const fetchDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        revenue: revenueData,
        expenses: expenseData,
        profit: profitData,
        anomalies: anomaliesData,
        transactions: transactionsData,
      });
    }, 1000);
  });
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Use React Query for data fetching with cache
  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => fetchDashboardData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Generate forecasted data
  const forecastData = generateForecast(revenueData, 'value', 3);
  
  // Generate trend analysis
  const revenueTrend = analyzeTrend(revenueData, 'value');
  const expenseTrend = analyzeTrend(expenseData, 'value');
  const profitTrend = analyzeTrend(profitData, 'value');
  
  // Detect anomalies
  const detectedAnomalies = detectAnomalies(revenueData, 'value');
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            description={revenueTrend.insight}
            icon={<DollarSign className="h-4 w-4 text-primary" />}
            trend={{ value: revenueTrend.percentageChange, isPositive: revenueTrend.trend === 'increasing' }}
          />
          <StatCard
            title="Expenses"
            value="$70.83"
            description={expenseTrend.insight}
            icon={<BarChart3 className="h-4 w-4 text-destructive" />}
            trend={{ value: parseFloat(Math.abs(expenseTrend.percentageChange).toFixed(2)), isPositive: expenseTrend.trend !== 'increasing' }}
            variant="secondary"
          />
          <StatCard
            title="Profit Margin"
            value="52.8%"
            description={profitTrend.insight}
            icon={<TrendingUp className="h-4 w-4 text-accent" />}
            trend={{ value: profitTrend.percentageChange, isPositive: profitTrend.trend === 'increasing' }}
            variant="accent"
          />
          <StatCard
            title="Anomalies"
            value={detectedAnomalies.length.toString()}
            description="Potential issues detected"
            icon={<AlertTriangle className="h-4 w-4 text-white" />}
            variant="gradient"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {queryLoading ? (
            <ChartSkeleton />
          ) : (
            <EnhancedChartCard
              title="Revenue Overview"
              description="Monthly revenue with comparison to previous period"
              data={enhancedRevenueData}
              dataKey="value"
              type="area"
              color="#3282b8"
              comparisonData={{
                label: "previous",
                data: previousRevenueData,
                color: "#a0aec0"
              }}
              forecastData={forecastData}
              showBrush={true}
              targetValue={8500} // Example target
            />
          )}
          
          {queryLoading ? (
            <ChartSkeleton />
          ) : (
            <ChartCard
              title="Expense Breakdown"
              description="Monthly expense data"
              data={expenseData}
              dataKey="value"
              type="bar"
              color="#e24a4a"
            />
          )}
        </div>
        
        {queryLoading ? (
          <ChartSkeleton height={400} />
        ) : (
          <EnhancedChartCard
            title="Profit Trend"
            description="Monthly profit data with forecast"
            data={profitData}
            dataKey="value"
            type="line"
            color="#3cc47c"
            forecastData={generateForecast(profitData, 'value', 3)}
            allowZoom={true}
          />
        )}
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <DataTable
            title="Anomaly Detection"
            description="Potential anomalies detected in your financial data"
            columns={anomalyColumns}
            data={anomaliesData}
            filterableColumns={["type", "category", "status"]}
          />
          <DataTable
            title="Recent Transactions"
            description="Latest financial transactions"
            columns={transactionColumns}
            data={transactionsData}
            filterableColumns={["type", "category", "paymentMethod"]}
          />
        </div>
      </div>
    </PageLayout>
  );
}
