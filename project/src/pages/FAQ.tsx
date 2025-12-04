import { Navbar } from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/mockData";
import { HelpCircle, MessageSquarePlus, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">
              Find answers to common questions about our complaint process.
            </p>
          </div>

          <Card className="mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Still Need Help */}
          <Card className="bg-accent border-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader className="text-center">
              <CardTitle>Still Have Questions?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? We're here to help.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/submit">
                  <MessageSquarePlus className="w-4 h-4 mr-2" />
                  Submit a Complaint
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/track">
                  <Search className="w-4 h-4 mr-2" />
                  Track Existing Complaint
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
