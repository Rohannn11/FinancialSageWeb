
import * as React from "react";
import { Link } from "react-router-dom";
import { 
  ChartLine, 
  Home, 
  UploadCloud, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  BarChart3,
  Calculator,
  Users,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIChat } from "@/components/ai/AIChat";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [showAIChat, setShowAIChat] = useState(false);
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar container */}
      <div className={cn(
        "fixed top-0 bottom-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo and title */}
          <div className="flex items-center h-14 px-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center space-x-2">
              <ChartLine className="h-6 w-6 text-accent" />
              <span className="font-bold text-lg text-sidebar-foreground">FinancialSage</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setIsOpen(false)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className="px-2 space-y-1">
              <NavItem to="/dashboard" icon={<Home className="h-5 w-5" />} label="Dashboard" />
              <NavItem to="/analytics" icon={<BarChart3 className="h-5 w-5" />} label="Analytics" />
              <NavItem to="/reports" icon={<FileText className="h-5 w-5" />} label="Reports" />
              <NavItem to="/forecasting" icon={<Calculator className="h-5 w-5" />} label="Forecasting" />
              <NavItem to="/upload" icon={<UploadCloud className="h-5 w-5" />} label="Upload Data" />
              
              <div className="pt-4 pb-2">
                <div className="px-3">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/70">
                    AI Assistant
                  </h3>
                </div>
                <div className="mt-1">
                  <button
                    className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                    onClick={() => setShowAIChat(!showAIChat)}
                  >
                    <MessageSquare className="mr-3 h-5 w-5" />
                    <span>Chat with AI</span>
                  </button>
                </div>
              </div>
              
              {showAIChat && (
                <div className="px-3 py-2 animate-fade-in">
                  <AIChat />
                </div>
              )}
              
              <div className="pt-4 pb-2">
                <div className="px-3">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/70">
                    Settings
                  </h3>
                </div>
              </div>
              
              <NavItem to="/profile" icon={<Users className="h-5 w-5" />} label="Profile" />
              <NavItem to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
            </nav>
          </ScrollArea>
          
          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <Link
      to={to}
      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors hover:scale-105 duration-300"
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
