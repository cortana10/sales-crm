export type LeadStatus =
  | "new_lead"
  | "contacted"
  | "interested"
  | "waiting_decision"
  | "dp_paid"
  | "closed"
  | "departed"
  | "alumni";

export type LeadSource =
  | "meta_ads"
  | "alumni"
  | "referral"
  | "manual_input";

export type FollowUpStatus = "pending" | "completed" | "skipped";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  city?: string;
  package_interest?: string;
  source: LeadSource;
  status: LeadStatus;
  notes?: string;
  next_followup_at?: string;
  created_at: string;
  last_contact?: string;
}

export interface Message {
  id: string;
  lead_id: string;
  direction: "incoming" | "outgoing";
  content: string;
  created_at: string;
}

export interface FollowUp {
  id: string;
  lead_id: string;
  scheduled_at: string;
  status: FollowUpStatus;
  notes?: string;
  created_at: string;
}

export interface Alumni {
  id: string;
  name: string;
  phone: string;
  departure_year?: number;
  package_name?: string;
  created_at: string;
}

export interface SalesTarget {
  id: string;
  month: string;
  target: number;
  actual: number;
}

export interface DailyMission {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  type: "call" | "follow_up" | "broadcast" | "testimonial";
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new_lead: "New Lead",
  contacted: "Contacted",
  interested: "Interested",
  waiting_decision: "Waiting Decision",
  dp_paid: "DP Paid",
  closed: "Closed",
  departed: "Departed",
  alumni: "Alumni",
};

export const SOURCE_LABELS: Record<LeadSource, string> = {
  meta_ads: "Meta Ads",
  alumni: "Alumni",
  referral: "Referral",
  manual_input: "Manual Input",
};

export const PIPELINE_STAGES: LeadStatus[] = [
  "new_lead",
  "contacted",
  "interested",
  "waiting_decision",
  "dp_paid",
  "closed",
];
