
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Download, FileText, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState(sampleReports);
  
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Financial Reports</h1>
          
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Reports</CardTitle>
                <CardDescription>
                  Manage and view all your financial reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredReports.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredReports.map((report) => (
                        <ReportCard key={report.id} report={report} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                    <h3 className="mt-4 text-lg font-medium">No reports found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {searchQuery ? "Try adjusting your search terms." : "Create your first report to get started."}
                    </p>
                    {searchQuery && (
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchQuery("")}
                        className="mt-4"
                      >
                        Clear Search
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Reports you've viewed or created recently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reports
                    .filter(r => new Date(r.lastModified) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000))
                    .map((report) => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>
                  Reports that run automatically on a schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reports
                    .filter(r => r.scheduled)
                    .map((report) => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="archived" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Archived Reports</CardTitle>
                <CardDescription>
                  Reports that have been archived
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reports
                    .filter(r => r.archived)
                    .map((report) => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
            <CardDescription>
              Create a custom financial report based on your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="report-title">Report Title</Label>
                <Input id="report-title" placeholder="Q3 Financial Summary" />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="report-type">Report Type</Label>
                <Select defaultValue="financial">
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Financial Statement</SelectItem>
                    <SelectItem value="cashflow">Cash Flow Analysis</SelectItem>
                    <SelectItem value="expense">Expense Report</SelectItem>
                    <SelectItem value="forecast">Financial Forecast</SelectItem>
                    <SelectItem value="tax">Tax Report</SelectItem>
                    <SelectItem value="custom">Custom Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="date-from">Date Range (From)</Label>
                  <div className="relative">
                    <Input
                      id="date-from"
                      type="date"
                      className="pl-8"
                    />
                    <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="date-to">Date Range (To)</Label>
                  <div className="relative">
                    <Input
                      id="date-to"
                      type="date"
                      className="pl-8"
                    />
                    <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="report-format">Export Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Generate Report</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>
              Quickly generate reports using pre-defined templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{template.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="ml-auto">Use Template</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}

interface Report {
  id: string;
  title: string;
  type: string;
  lastModified: string;
  size: string;
  scheduled?: boolean;
  archived?: boolean;
}

function ReportCard({ report }: { report: Report }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <FileDocumentIcon className="h-8 w-8 text-primary" />
          <div className="flex space-x-1">
            {report.scheduled && (
              <div className="p-1.5 bg-muted rounded-md" title="Scheduled Report">
                <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            )}
            {report.archived && (
              <div className="p-1.5 bg-muted rounded-md" title="Archived Report">
                <ArchiveIcon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
        <CardTitle className="text-base mt-3">{report.title}</CardTitle>
        <CardDescription>{report.type}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">
          Last modified: {new Date(report.lastModified).toLocaleDateString()}
        </p>
        <p className="text-sm text-muted-foreground">Size: {report.size}</p>
      </CardContent>
      <CardFooter className="pt-1 mt-auto">
        <div className="flex space-x-2 ml-auto">
          <Button variant="ghost" size="icon" title="Edit">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Download">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Sample data
const sampleReports: Report[] = [
  {
    id: "1",
    title: "Q3 Financial Summary",
    type: "Financial Statement",
    lastModified: "2023-10-05",
    size: "2.4 MB"
  },
  {
    id: "2",
    title: "Annual Cash Flow Analysis",
    type: "Cash Flow Analysis",
    lastModified: "2023-09-15",
    size: "5.1 MB",
    scheduled: true
  },
  {
    id: "3",
    title: "Monthly Expense Report - September",
    type: "Expense Report",
    lastModified: "2023-10-01",
    size: "1.8 MB"
  },
  {
    id: "4",
    title: "Q4 Revenue Forecast",
    type: "Financial Forecast",
    lastModified: "2023-09-28",
    size: "3.2 MB",
    scheduled: true
  },
  {
    id: "5",
    title: "Annual Tax Summary 2022",
    type: "Tax Report",
    lastModified: "2023-04-12",
    size: "7.5 MB",
    archived: true
  },
  {
    id: "6",
    title: "Department Budget Analysis",
    type: "Budget Report",
    lastModified: "2023-08-20",
    size: "2.9 MB"
  },
  {
    id: "7",
    title: "Investor Presentation Q2",
    type: "Custom Report",
    lastModified: "2023-07-10",
    size: "6.3 MB",
    archived: true
  },
  {
    id: "8",
    title: "Weekly Sales Report",
    type: "Sales Report",
    lastModified: "2023-10-02",
    size: "1.2 MB",
    scheduled: true
  }
];

const templates = [
  {
    title: "Monthly Financial Statement",
    description: "Complete financial overview including balance sheet, income statement, and cash flow"
  },
  {
    title: "Quarterly Expense Report",
    description: "Detailed breakdown of expenses by department and category"
  },
  {
    title: "Annual Tax Summary",
    description: "Comprehensive tax liability and payment information"
  },
  {
    title: "Cash Flow Forecast",
    description: "Six-month projection of cash inflows and outflows"
  },
  {
    title: "Budget vs. Actual",
    description: "Comparison of budgeted amounts against actual spending"
  },
  {
    title: "Department Performance",
    description: "Financial metrics for each department including KPIs"
  }
];

// Custom icons
function FileDocumentIcon(props: { className?: string }) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function ArchiveIcon(props: { className?: string }) {
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
      <rect x="2" y="4" width="20" height="5" rx="2" />
      <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
      <path d="M10 13h4" />
    </svg>
  );
}
