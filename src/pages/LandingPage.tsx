
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { ChartLine, ArrowRight, Moon, Sun } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChartLine className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">FinancialSage</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 container mx-auto px-4">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Transform Your
            <span className="text-gradient-primary block">Financial Future</span>
          </h1>
          <p className="mx-auto text-lg text-muted-foreground md:text-xl max-w-2xl">
            Unlock powerful insights and take control of your finances with our comprehensive analytics platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Your Success
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative group p-6 bg-background rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="mb-4">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { LineChart, PieChart, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Advanced Analytics",
    description: "Get deep insights into your financial data with our powerful analytics tools.",
    icon: LineChart,
    link: "/analytics"
  },
  {
    title: "Financial Reports",
    description: "Generate comprehensive reports with detailed insights and trends.",
    icon: PieChart,
    link: "/reports"
  },
  {
    title: "Smart Forecasting",
    description: "Predict future trends using our advanced forecasting algorithms.",
    icon: BarChart3,
    link: "/forecasting"
  },
];
