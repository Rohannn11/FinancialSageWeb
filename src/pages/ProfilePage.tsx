
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Camera, Banknote, History, Lock, Shield, User } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Sidebar */}
          <Card className="md:w-64 lg:w-72">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="relative mb-4 group">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-primary rounded-full p-2 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-xl font-semibold">John Peterson</h2>
              <p className="text-muted-foreground mb-4">Financial Analyst</p>
              
              <div className="w-full">
                <Button className="w-full mb-2">Edit Profile</Button>
              </div>
              
              <div className="w-full pt-4 border-t mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground text-sm">Member since</span>
                  <span className="text-sm font-medium">Jan 24, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Subscription</span>
                  <span className="text-sm font-medium text-green-500">Pro</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Profile Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="personal" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                >
                  <User className="h-4 w-4 mr-2" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="billing" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                >
                  <Banknote className="h-4 w-4 mr-2" />
                  Billing
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
                >
                  <History className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details here
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Peterson" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue="john.peterson@example.com" />
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" defaultValue="Acme Corp" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" defaultValue="Financial Analyst" />
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <div className="pt-2 flex justify-end">
                      <Button type="submit">Update Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>
                      Manage your subscription and payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Pro Plan</p>
                            <p className="text-sm text-muted-foreground">$49.99/month</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Active</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Payment Methods</h3>
                        <div className="border rounded-md p-3 mb-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded mr-3">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 4242</p>
                              <p className="text-xs text-muted-foreground">Expires 12/25</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        <Button variant="outline" size="sm">Add Payment Method</Button>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Billing History</h3>
                        <div className="border rounded-md divide-y">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="p-3 flex items-center justify-between">
                              <div>
                                <p className="font-medium">Pro Plan - Monthly</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(2023, 11 - i, 15).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">$49.99</p>
                                <p className="text-xs text-green-600">Paid</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control your privacy preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <Checkbox id="analytics" />
                        <div className="space-y-1">
                          <Label htmlFor="analytics" className="font-medium">
                            Usage Analytics
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Allow us to collect anonymous usage data to improve our services
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Checkbox id="marketing" defaultChecked />
                        <div className="space-y-1">
                          <Label htmlFor="marketing" className="font-medium">
                            Marketing Communications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new features, promotions and updates
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Checkbox id="sharing" />
                        <div className="space-y-1">
                          <Label htmlFor="sharing" className="font-medium">
                            Data Sharing
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Share your information with our trusted partners
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <Button type="submit">Save Preferences</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity History</CardTitle>
                    <CardDescription>
                      Recent activity on your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { activity: "Password changed", date: "2023-12-01", time: "14:32" },
                        { activity: "Login from new device", date: "2023-11-28", time: "09:15" },
                        { activity: "Report downloaded", date: "2023-11-25", time: "16:08" },
                        { activity: "Financial data uploaded", date: "2023-11-20", time: "11:42" },
                        { activity: "Profile information updated", date: "2023-11-15", time: "10:30" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <div className="bg-muted rounded-full p-2">
                            <Activity className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.activity}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.date} at {item.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

// These are needed but not imported at the top to avoid cluttering imports
function Badge({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

function Checkbox({ id, defaultChecked }: { id: string, defaultChecked?: boolean }) {
  return (
    <div className="flex h-4 w-4 items-center">
      <input 
        type="checkbox" 
        id={id} 
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-gray-300" 
      />
    </div>
  );
}

function CreditCard(props: { className?: string }) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function Activity(props: { className?: string }) {
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
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
