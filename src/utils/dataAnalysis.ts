
/**
 * Utility functions for analyzing chart data and providing insights
 */

/**
 * Calculates the percentage change between two values
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

/**
 * Generates trend analysis insights based on data
 */
export const analyzeTrend = (data: any[], valueKey: string): { 
  trend: 'increasing' | 'decreasing' | 'stable',
  percentageChange: number,
  insight: string
} => {
  // Need at least 2 points to analyze trend
  if (!data || data.length < 2) {
    return { trend: 'stable', percentageChange: 0, insight: 'Not enough data to analyze trends.' };
  }
  
  // Get first and last values
  const firstValue = data[0][valueKey];
  const lastValue = data[data.length - 1][valueKey];
  
  // Calculate percentage change
  const percentageChange = calculatePercentageChange(lastValue, firstValue);
  const absChange = Math.abs(percentageChange);
  
  // Determine trend direction
  const trend = percentageChange > 0 ? 'increasing' : percentageChange < 0 ? 'decreasing' : 'stable';
  
  // Generate insight message
  let insight = '';
  if (absChange < 1) {
    insight = 'Values remain relatively stable with minimal change.';
  } else if (absChange < 5) {
    insight = `Showing a slight ${trend} trend of ${absChange.toFixed(1)}%.`;
  } else if (absChange < 10) {
    insight = `Moderate ${trend} trend observed (${absChange.toFixed(1)}%).`;
  } else if (absChange < 20) {
    insight = `Significant ${trend} trend of ${absChange.toFixed(1)}%.`;
  } else {
    insight = `Very strong ${trend} trend with ${absChange.toFixed(1)}% change.`;
  }
  
  return { trend, percentageChange, insight };
};

/**
 * Detects anomalies in the data based on standard deviation
 */
export const detectAnomalies = (data: any[], valueKey: string, threshold = 2): any[] => {
  // Need sufficient data to detect anomalies
  if (!data || data.length < 4) return [];
  
  // Calculate mean
  const values = data.map(item => item[valueKey]);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  
  // Calculate standard deviation
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  const stdDev = Math.sqrt(variance);
  
  // Detect anomalies (values outside threshold * standard deviation)
  return data.filter(item => {
    const value = item[valueKey];
    const zScore = Math.abs((value - mean) / stdDev);
    return zScore > threshold;
  });
};

/**
 * Generates forecast data for future periods based on linear regression
 */
export const generateForecast = (data: any[], valueKey: string, periods = 3): any[] => {
  if (!data || data.length < 2) return [];
  
  // Simple linear regression
  const n = data.length;
  
  // X values are just the indexes (0, 1, 2, ...)
  const xValues = Array.from({ length: n }, (_, i) => i);
  const yValues = data.map(item => item[valueKey]);
  
  // Calculate means
  const xMean = xValues.reduce((sum, val) => sum + val, 0) / n;
  const yMean = yValues.reduce((sum, val) => sum + val, 0) / n;
  
  // Calculate slope and y-intercept
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (xValues[i] - xMean) * (yValues[i] - yMean);
    denominator += Math.pow(xValues[i] - xMean, 2);
  }
  
  const slope = numerator / denominator;
  const intercept = yMean - (slope * xMean);
  
  // Generate forecast
  const forecast = [];
  const lastXValue = xValues[xValues.length - 1];
  const lastDataPoint = data[data.length - 1];
  
  for (let i = 1; i <= periods; i++) {
    const x = lastXValue + i;
    const forecastedValue = (slope * x) + intercept;
    
    // Create a new data point with same properties as the last one
    // but with forecasted value
    const newDataPoint = { ...lastDataPoint };
    newDataPoint[valueKey] = Math.max(0, Math.round(forecastedValue)); // Ensure non-negative
    
    // If we have a date or time field, increment it too
    if (newDataPoint.date) {
      const date = new Date(newDataPoint.date);
      date.setMonth(date.getMonth() + 1); // Assuming monthly data
      newDataPoint.date = date.toISOString().split('T')[0];
    }
    
    if (newDataPoint.name && /\w+\s+\d+/.test(newDataPoint.name)) {
      // If name is like "Jan 2023", increment it appropriately
      const parts = newDataPoint.name.split(' ');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIndex = months.indexOf(parts[0]);
      
      if (monthIndex !== -1) {
        const newMonthIndex = (monthIndex + i) % 12;
        newDataPoint.name = months[newMonthIndex] + ' ' + parts[1];
      }
    }
    
    forecast.push(newDataPoint);
  }
  
  return forecast;
};
