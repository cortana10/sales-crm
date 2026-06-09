import { supabase } from "./supabase";
import type { Lead, Message, FollowUp, Alumni, SalesTarget, LeadStatus } from "@/types";

// ====== LEADS ======
export async function getLeads(userId?: string) {
  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (userId) query = query.eq("user_id", userId);
  const { data, error } = await query;
  if (error) throw error;
  return data as Lead[];
}

export async function getLead(id: string) {
  const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Lead;
}

export async function createLead(lead: Omit<Lead, "id" | "created_at">) {
  const { data, error } = await supabase.from("leads").insert([lead]).select().single();
  if (error) throw error;
  return data as Lead;
}

export async function updateLead(id: string, updates: Partial<Lead>) {
  const { data, error } = await supabase.from("leads").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data as Lead;
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  return updateLead(id, { status });
}

export async function deleteLead(id: string) {
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw error;
}

// ====== MESSAGES ======
export async function getMessages(leadId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data as Message[];
}

export async function sendMessage(leadId: string, content: string, direction: "incoming" | "outgoing" = "outgoing") {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ lead_id: leadId, direction, content }])
    .select()
    .single();
  if (error) throw error;
  return data as Message;
}

// ====== FOLLOW UPS ======
export async function getTodayFollowUps(userId?: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let query = supabase
    .from("followups")
    .select("*, leads(name, phone, package_interest)")
    .gte("scheduled_at", today.toISOString())
    .lt("scheduled_at", tomorrow.toISOString())
    .eq("status", "pending")
    .order("scheduled_at");

  if (userId) {
    query = query.eq("leads.user_id", userId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as (FollowUp & { leads: Partial<Lead> })[];
}

export async function completeFollowUp(id: string) {
  const { data, error } = await supabase
    .from("followups")
    .update({ status: "completed", completed_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as FollowUp;
}

// ====== ALUMNI ======
export async function getAlumni(userId?: string) {
  let query = supabase.from("alumni").select("*").order("created_at", { ascending: false });
  if (userId) query = query.eq("user_id", userId);
  const { data, error } = await query;
  if (error) throw error;
  return data as Alumni[];
}

export async function importAlumni(alumni: Omit<Alumni, "id" | "created_at">[]) {
  const { data, error } = await supabase.from("alumni").insert(alumni).select();
  if (error) throw error;
  return data as Alumni[];
}

// ====== SALES TARGETS ======
export async function getSalesTarget(month: string, userId?: string) {
  let query = supabase.from("sales_targets").select("*").eq("month", month);
  if (userId) query = query.eq("user_id", userId);
  const { data, error } = await query.single();
  if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found
  return data as SalesTarget | null;
}

export async function upsertSalesTarget(target: Partial<SalesTarget> & { month: string; user_id: string }) {
  const { data, error } = await supabase.from("sales_targets").upsert(target).select().single();
  if (error) throw error;
  return data as SalesTarget;
}

// ====== DASHBOARD STATS ======
export async function getDashboardStats(userId?: string) {
  let query = supabase.from("leads").select("*");
  if (userId) query = query.eq("user_id", userId);
  const { data: allLeads, error } = await query;
  if (error) throw error;

  const totalLeads = allLeads.length;
  const closedLeads = allLeads.filter((l) => l.status === "closed").length;
  const todayFollowUps = allLeads.filter((l) => {
    if (!l.next_followup_at) return false;
    const d = new Date(l.next_followup_at);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;

  return { totalLeads, closedLeads, todayFollowUps };
}
