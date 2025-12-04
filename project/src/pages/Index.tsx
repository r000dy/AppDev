import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { MessageSquarePlus, Search, Clock, Shield, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    icon: MessageSquarePlus,
    title: "Easy Submission",
    description: "Submit your complaint in minutes with our simple, guided form.",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Receive acknowledgment within 24 hours and regular updates.",
  },
  {
    icon: Search,
    title: "Track Progress",
    description: "Monitor your complaint status in real-time with your unique ID.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your information is protected and handled with care.",
  },
];

const steps = [
  { number: "01", title: "Submit", description: "Fill out the complaint form with details" },
  { number: "02", title: "Receive ID", description: "Get your unique tracking number" },
  { number: "03", title: "Track", description: "Monitor progress and receive updates" },
  { number: "04", title: "Resolved", description: "Issue addressed to your satisfaction" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              We're Here to{" "}
              <span className="text-primary">Help</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have a concern? Submit your complaint and let us resolve it quickly and efficiently. Your satisfaction is our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/submit">
                  Submit a Complaint
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/track">
                  <Search className="w-5 h-5 mr-1" />
                  Check Status
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our complaint management system is designed with you in mind
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple four-step process to get your issue resolved
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 w-8 h-8 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Don't let your concerns go unheard. Submit your complaint today and let us help you find a resolution.
          </p>
          <Button variant="secondary" size="xl" asChild>
            <Link to="/submit">
              Submit Your Complaint
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquarePlus className="w-4 h-4" />
              <span>ComplaintHub © {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link to="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                Submit Complaint
              </Link>
              <Link to="/track" className="text-muted-foreground hover:text-foreground transition-colors">
                Track Status
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
