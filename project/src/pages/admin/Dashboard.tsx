import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { mockComplaints } from "@/lib/mockData";
import {
  LayoutDashboard,
  MessageSquare,
  Clock,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  ArrowRight,
  Home,
} from "lucide-react";
import { format } from "date-fns";

const stats = [
  {
    label: "Total Complaints",
    value: mockComplaints.length,
    icon: MessageSquare,
    color: "text-foreground",
    bgColor: "bg-secondary",
  },
  {
    label: "Received",
    value: mockComplaints.filter((c) => c.status === "received").length,
    icon: Clock,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    label: "In Progress",
    value: mockComplaints.filter((c) => c.status === "in-progress").length,
    icon: RefreshCw,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "Resolved",
    value: mockComplaints.filter((c) => c.status === "resolved").length,
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

export default function AdminDashboard() {
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
                <h1 className="font-semibold">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Complaint Management</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-1" />
                Back to Site
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Complaints */}
        <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Complaints
              </CardTitle>
              <CardDescription>Latest submitted complaints</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm font-medium">{complaint.id}</span>
                      <StatusBadge status={complaint.status} />
                    </div>
                    <h3 className="font-medium truncate">{complaint.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {complaint.name} • {complaint.category} • {format(complaint.createdAt, "MMM d, yyyy")}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/admin/ticket/${complaint.id}`}>
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-info" />
              <h3 className="font-medium">Pending Review</h3>
              <p className="text-sm text-muted-foreground">
                {mockComplaints.filter((c) => c.status === "received").length} complaints awaiting action
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center">
              <RefreshCw className="w-8 h-8 mx-auto mb-2 text-warning" />
              <h3 className="font-medium">In Progress</h3>
              <p className="text-sm text-muted-foreground">
                {mockComplaints.filter((c) => c.status === "in-progress").length} complaints being handled
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
              <h3 className="font-medium">Resolved Today</h3>
              <p className="text-sm text-muted-foreground">
                Great job! Keep it up
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
