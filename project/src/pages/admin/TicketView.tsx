import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { getComplaintById, ComplaintStatus } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Tag,
  FileText,
  Send,
  Clock,
  LayoutDashboard,
  Home,
} from "lucide-react";
import { format } from "date-fns";

const statusOptions: { value: ComplaintStatus; label: string }[] = [
  { value: "received", label: "Received" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];

const teams = ["Support Team A", "Support Team B", "Billing Team", "Technical Team", "Management"];

export default function TicketView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const complaint = getComplaintById(id || "");

  const [status, setStatus] = useState<ComplaintStatus>(complaint?.status || "received");
  const [assignedTo, setAssignedTo] = useState(complaint?.assignedTo || "");
  const [newUpdate, setNewUpdate] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  if (!complaint) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Complaint Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The complaint ID "{id}" does not exist.
            </p>
            <Button onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "Complaint status and assignment updated successfully.",
    });
  };

  const handleAddUpdate = () => {
    if (!newUpdate.trim()) return;
    toast({
      title: "Update Added",
      description: isInternal ? "Internal note added." : "Customer has been notified.",
    });
    setNewUpdate("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold">Ticket Management</h1>
                <p className="text-xs text-muted-foreground">{complaint.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-1" />
                  Site
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaint Overview */}
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardDescription>Complaint ID</CardDescription>
                    <CardTitle className="text-2xl font-mono">{complaint.id}</CardTitle>
                  </div>
                  <StatusBadge status={complaint.status} />
                </div>
              </CardHeader>
              <CardContent>
                <h2 className="text-xl font-semibold mb-3">{complaint.subject}</h2>
                <p className="text-muted-foreground whitespace-pre-wrap mb-6">
                  {complaint.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm border-t pt-4">
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
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span>{complaint.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Submitted: {format(complaint.createdAt, "MMM d, yyyy 'at' h:mm a")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Updated: {format(complaint.updatedAt, "MMM d, yyyy 'at' h:mm a")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updates Timeline */}
            <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                {complaint.updates.length > 0 ? (
                  <div className="space-y-4">
                    {complaint.updates.map((update, index) => (
                      <div
                        key={update.id}
                        className={`relative pl-6 pb-4 ${
                          index < complaint.updates.length - 1 ? "border-l-2 border-border" : ""
                        }`}
                      >
                        <div
                          className={`absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full ${
                            update.isInternal ? "bg-muted-foreground" : "bg-primary"
                          }`}
                        />
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-xs text-muted-foreground">
                            {format(update.createdAt, "MMM d, yyyy 'at' h:mm a")}
                          </p>
                          {update.isInternal && (
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">Internal</span>
                          )}
                        </div>
                        <p className="text-sm">{update.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No updates yet</p>
                )}

                {/* Add Update */}
                <div className="border-t pt-4 mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="update">Add Update</Label>
                    <Textarea
                      id="update"
                      placeholder="Enter update message for the customer or internal note..."
                      value={newUpdate}
                      onChange={(e) => setNewUpdate(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isInternal}
                        onChange={(e) => setIsInternal(e.target.checked)}
                        className="rounded"
                      />
                      Internal note (not visible to customer)
                    </label>
                    <Button onClick={handleAddUpdate} disabled={!newUpdate.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Add Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Assignment */}
            <Card className="animate-fade-in" style={{ animationDelay: "150ms" }}>
              <CardHeader>
                <CardTitle className="text-lg">Ticket Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as ComplaintStatus)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assign To</Label>
                  <Select value={assignedTo} onValueChange={setAssignedTo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team} value={team}>
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updates</span>
                  <span className="font-medium">{complaint.updates.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Days Open</span>
                  <span className="font-medium">
                    {Math.ceil(
                      (new Date().getTime() - complaint.createdAt.getTime()) / (1000 * 60 * 60 * 24)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority</span>
                  <span className="font-medium">Normal</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
