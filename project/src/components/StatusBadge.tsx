import { cn } from "@/lib/utils";
import { ComplaintStatus } from "@/lib/mockData";
import { Clock, CheckCircle, RefreshCw } from "lucide-react";

interface StatusBadgeProps {
  status: ComplaintStatus;
  className?: string;
}

const statusConfig = {
  received: {
    label: "Received",
    icon: Clock,
    className: "status-received",
  },
  "in-progress": {
    label: "In Progress",
    icon: RefreshCw,
    className: "status-progress",
  },
  resolved: {
    label: "Resolved",
    icon: CheckCircle,
    className: "status-resolved",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border",
        config.className,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
