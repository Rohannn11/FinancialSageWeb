
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">FinancialSage</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose the plan that best fits your needs. All plans include a 14-day free trial.
          No credit card required to start.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <Card className="flex flex-col border-2">
            <CardHeader>
              <CardTitle className="text-xl">Basic</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <CardDescription className="mt-2">
                Essential tools for individuals and small teams
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3 text-sm">
                {[
                  "Upload up to 100 files monthly",
                  "Basic financial charts",
                  "CSV file processing",
                  "Data export capabilities",
                  "Email support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start Free Trial</Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="flex flex-col border-2 border-primary relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-md">
              Popular
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Pro</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <CardDescription className="mt-2">
                Advanced features for growing businesses
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3 text-sm">
                {[
                  "Upload up to 1,000 files monthly",
                  "Advanced data visualizations",
                  "PDF & CSV processing with OCR",
                  "Basic anomaly detection",
                  "Financial forecasting",
                  "API access",
                  "Priority support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start Free Trial</Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="flex flex-col border-2">
            <CardHeader>
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <CardDescription className="mt-2">
                Full-featured solution for larger organizations
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3 text-sm">
                {[
                  "Unlimited file uploads",
                  "Custom data visualizations",
                  "Advanced document processing",
                  "Advanced anomaly detection",
                  "Custom financial models",
                  "Role-based access control",
                  "Dedicated account manager",
                  "24/7 priority support",
                  "Custom integrations"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
          <p className="mb-6 text-muted-foreground">
            Our team can build a tailored package for your specific business requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="default" size="lg">Contact Our Team</Button>
            <Button variant="outline" size="lg">View Documentation</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">FinancialSage</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                Powerful financial analytics for your business
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <h3 className="font-semibold mb-2">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                  <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                  <li><Link to="/documentation" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                  <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                  <li><Link to="/legal" className="text-muted-foreground hover:text-foreground">Legal</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} FinancialSage. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer: "You can sign up for any plan with full features for 14 days without providing payment information. At the end of the trial, you'll be prompted to select a plan and enter payment details to continue."
  },
  {
    question: "Can I switch plans later?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Enterprise customers can also pay via invoice."
  },
  {
    question: "Is there a discount for annual billing?",
    answer: "Yes, you save 20% when you choose annual billing on any of our plans."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for your first paid invoice if you're not satisfied with our service."
  },
  {
    question: "What kind of support is included?",
    answer: "Basic plan includes email support with a 48-hour response time. Pro plan includes priority email support with 24-hour response time. Enterprise plans include 24/7 phone and email support."
  }
];
