import * as React from "react";
import { Badge } from "@/components/ui/badge";
import type { LeadStatus } from "@/types";

interface StatusBadgeProps {
  status: LeadStatus;
}

const statusVariants: Record<LeadStatus, "default" | "secondary" | "tertiary" | "outline" | "success" | "warning" | "error"> = {
  new_lead: "outline",
  contacted: "default",
  interested: "secondary",
  waiting_decision: "warning",
  dp_paid: "success",
  closed: "success",
  departed: "tertiary",
  alumni: "default",
};

const statusLabels: Record<LeadStatus, string> = {
  new_lead: "New Lead",
  contacted: "Contacted",
  interested: "Interested",
  waiting_decision: "Waiting",
  dp_paid: "DP Paid",
  closed: "Closed",
  departed: "Departed",
  alumni: "Alumni",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant={statusVariants[status]}>
      {statusLabels[status]}
    </Badge>
  );
}
