
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChartLine, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChartLine className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">FinancialSage</span>
          </div>
          <div className="flex items-center space-x-4">
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
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Smart Financial
          <span className="text-primary"> Analytics</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Transform your financial data into actionable insights with our powerful analytics platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/dashboard">
            <Button size="lg" className="space-x-2">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Powerful Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Advanced Analytics",
    description: "Powerful analytics tools to analyze and visualize your financial data.",
  },
  {
    title: "Financial Reports",
    description: "Generate comprehensive reports with detailed insights and trends.",
  },
  {
    title: "Smart Forecasting",
    description: "Predict future trends using our advanced forecasting algorithms.",
  },
];
