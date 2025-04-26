
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Globe, Moon, PanelLeft, Sun, Layout } from "lucide-react";

export default function SettingsPage() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

        <Tabs defaultValue="appearance">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 gap-4">
            <TabsTrigger value="appearance">
              <Layout className="mr-2 h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="language">
              <Globe className="mr-2 h-4 w-4" />
              Language
            </TabsTrigger>
            <TabsTrigger value="display">
              <PanelLeft className="mr-2 h-4 w-4" />
              Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how FinancialSage looks on your device
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="flex flex-col items-center space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full h-24 border-2 data-[state=selected]:border-primary"
                        data-state="selected"
                      >
                        <Sun className="h-6 w-6" />
                      </Button>
                      <span className="text-xs font-medium">Light</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full h-24 border-2 bg-gray-950 text-white border-gray-800"
                      >
                        <Moon className="h-6 w-6" />
                      </Button>
                      <span className="text-xs font-medium">Dark</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full h-24 border-2 bg-gradient-to-b from-white to-gray-950 text-gray-500 border-gray-300"
                      >
                        <div className="flex">
                          <Sun className="h-6 w-6 mr-1" />
                          <Moon className="h-6 w-6" />
                        </div>
                      </Button>
                      <span className="text-xs font-medium">System</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Toggle interface animations
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Contrast</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Increase visual distinction between elements
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reduced Motion</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Minimize animations for accessibility
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chart Settings</CardTitle>
                <CardDescription>
                  Configure how charts and visualizations appear
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Display Grid Lines</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Show grid lines on charts for better readability
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tooltips</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Show detailed tooltips when hovering over charts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chartColorScheme">Chart Color Scheme</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue placeholder="Select color scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="colorblind">Colorblind Friendly</SelectItem>
                      <SelectItem value="pastel">Pastel</SelectItem>
                      <SelectItem value="monochrome">Monochrome</SelectItem>
                      <SelectItem value="vivid">Vivid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure which notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Email Notifications</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Receive emails for important updates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-4">
                  <div className="bg-muted p-3 rounded-md">
                    <h3 className="font-semibold mb-2">Data Reports</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="weekly-report" className="text-sm">Weekly summary reports</Label>
                        <Switch id="weekly-report" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="monthly-report" className="text-sm">Monthly financial reports</Label>
                        <Switch id="monthly-report" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="quarterly-report" className="text-sm">Quarterly performance reports</Label>
                        <Switch id="quarterly-report" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md">
                    <h3 className="font-semibold mb-2">Alerts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="anomaly-alert" className="text-sm">Anomaly detection alerts</Label>
                        <Switch id="anomaly-alert" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="threshold-alert" className="text-sm">Threshold breach alerts</Label>
                        <Switch id="threshold-alert" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="forecast-alert" className="text-sm">Forecast updates</Label>
                        <Switch id="forecast-alert" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md">
                    <h3 className="font-semibold mb-2">System</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="security-alert" className="text-sm">Security alerts</Label>
                        <Switch id="security-alert" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="maintenance-alert" className="text-sm">Maintenance notifications</Label>
                        <Switch id="maintenance-alert" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="feature-alert" className="text-sm">New feature announcements</Label>
                        <Switch id="feature-alert" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
                <CardDescription>
                  Configure language and number formatting preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en-us">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-us">English (US)</SelectItem>
                      <SelectItem value="en-gb">English (UK)</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="jp">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="gbp">British Pound (£)</SelectItem>
                      <SelectItem value="jpy">Japanese Yen (¥)</SelectItem>
                      <SelectItem value="cny">Chinese Yuan (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberFormat">Number Format</Label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue placeholder="Select number format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">1,234.56</SelectItem>
                      <SelectItem value="eu">1.234,56</SelectItem>
                      <SelectItem value="in">1,23,456.78</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Layout Settings</CardTitle>
                <CardDescription>
                  Configure your interface layout preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultView">Default Dashboard View</Label>
                  <Select defaultValue="analytics">
                    <SelectTrigger>
                      <SelectValue placeholder="Select default view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analytics">Analytics Overview</SelectItem>
                      <SelectItem value="financials">Financial Summary</SelectItem>
                      <SelectItem value="reports">Reports Dashboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Sidebar</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Use icons-only sidebar to save space
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dense Tables</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Reduce spacing in tables to show more data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sticky Headers</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Keep table headers visible while scrolling
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tableRows">Default Table Rows</Label>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue placeholder="Select row count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 rows</SelectItem>
                      <SelectItem value="25">25 rows</SelectItem>
                      <SelectItem value="50">50 rows</SelectItem>
                      <SelectItem value="100">100 rows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
