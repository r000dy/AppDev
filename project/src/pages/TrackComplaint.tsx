import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { getComplaintById, Complaint } from "@/lib/mockData";
import { Search, Clock, Calendar, Tag, User, Mail, Phone, FileText, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default function TrackComplaint() {
  const [searchParams] = useSearchParams();
  const [complaintId, setComplaintId] = useState(searchParams.get("id") || "");
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      setComplaintId(idFromUrl);
      handleSearch(idFromUrl);
    }
  }, [searchParams]);

  const handleSearch = async (id?: string) => {
    const searchId = id || complaintId;
    if (!searchId.trim()) return;

    setIsLoading(true);
    setSearched(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const found = getComplaintById(searchId.trim().toUpperCase());
    setComplaint(found || null);
    setSearched(true);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Track Your Complaint</h1>
            <p className="text-muted-foreground">
              Enter your Complaint ID to check the current status and updates.
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="complaintId" className="sr-only">
                    Complaint ID
                  </Label>
                  <Input
                    id="complaintId"
                    placeholder="Enter Complaint ID (e.g., CMP-2024-001)"
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                    className="text-center font-mono"
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="animate-pulse-soft">Searching...</span>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Track
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {searched && !complaint && (
            <Card className="animate-fade-in border-destructive/20">
              <CardContent className="pt-6 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
                <h2 className="text-xl font-semibold mb-2">Complaint Not Found</h2>
                <p className="text-muted-foreground">
                  We couldn't find a complaint with ID "{complaintId}". Please check the ID and try again.
                </p>
              </CardContent>
            </Card>
          )}

          {complaint && (
            <div className="space-y-6 animate-fade-in">
              {/* Status Overview */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardDescription className="mb-1">Complaint ID</CardDescription>
                      <CardTitle className="text-2xl font-mono">{complaint.id}</CardTitle>
                    </div>
                    <StatusBadge status={complaint.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Submitted: {format(complaint.createdAt, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Last Updated: {format(complaint.updatedAt, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Tag className="w-4 h-4" />
                      <span>Category: {complaint.category}</span>
                    </div>
                    {complaint.assignedTo && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>Assigned to: {complaint.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Complaint Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Complaint Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">{complaint.subject}</h3>
                    <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                      {complaint.description}
                    </p>
                  </div>
                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{complaint.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{complaint.email}</span>
                    </div>
                    {complaint.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{complaint.phone}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Updates Timeline */}
              {complaint.updates.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {complaint.updates.map((update, index) => (
                        <div
                          key={update.id}
                          className={`relative pl-6 pb-4 ${
                            index < complaint.updates.length - 1 ? "border-l-2 border-border" : ""
                          }`}
                        >
                          <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />
                          <p className="text-xs text-muted-foreground mb-1">
                            {format(update.createdAt, "MMM d, yyyy 'at' h:mm a")}
                          </p>
                          <p className="text-sm">{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Demo Hint */}
          {!searched && (
            <p className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>
              <strong>Demo:</strong> Try searching for "CMP-2024-001", "CMP-2024-002", or "CMP-2024-003"
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
