"use client";

import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Lead, LeadStatus } from "@/types";
import { useAuth } from "@/lib/auth-context";
import { getLeads, createLead, updateLeadStatus } from "@/lib/data";

const PIPELINE_COLUMNS: { id: LeadStatus; label: string; color: string }[] = [
  { id: "new_lead", label: "New Lead", color: "bg-outline" },
  { id: "contacted", label: "Contacted", color: "bg-primary-fixed-dim" },
  { id: "interested", label: "Interested", color: "bg-secondary-container" },
  { id: "waiting_decision", label: "Waiting Decision", color: "bg-secondary-fixed-dim" },
  { id: "dp_paid", label: "DP Paid", color: "bg-primary-container" },
  { id: "closed", label: "Closed", color: "bg-primary" },
];

export default function PipelinePage() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [newLead, setNewLead] = useState({ name: "", phone: "", city: "", package_interest: "", source: "manual_input" as const });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getLeads(user.id)
      .then(setLeads)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const filteredLeads = leads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );
  const getLeadsByStatus = (status: LeadStatus) =>
    filteredLeads.filter((l) => l.status === status);

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setAdding(true);
    try {
      const created = await createLead({
        ...newLead,
        user_id: user.id,
        status: "new_lead",
        notes: "",
      });
      setLeads((prev) => [created, ...prev]);
      setShowAddDialog(false);
      setNewLead({ name: "", phone: "", city: "", package_interest: "", source: "manual_input" });
    } catch (err) {
      console.error("Failed to create lead:", err);
    } finally {
      setAdding(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Pipeline</h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Kelola leads dari awal hingga closing.
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4" /> Add Lead
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <Input
            placeholder="Search leads..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_COLUMNS.map((col) => {
          const columnLeads = getLeadsByStatus(col.id);
          return (
            <div
              key={col.id}
              className="w-[300px] shrink-0 flex flex-col gap-2 bg-surface-container-low rounded-xl p-3 border border-outline-variant"
            >
              <div className="flex items-center justify-between px-1 py-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${col.color}`} />
                  <h3 className="text-label-sm text-on-surface-variant uppercase tracking-wide font-label-md">
                    {col.label}
                  </h3>
                </div>
                <Badge variant="outline" className="text-xs">
                  {columnLeads.length}
                </Badge>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-280px)]">
                {columnLeads.map((lead) => (
                  <a
                    key={lead.id}
                    href={`/leads/${lead.id}`}
                    className="block bg-surface-container-lowest border border-outline-variant rounded-lg p-3 hover:border-outline transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-title-md text-title-md text-on-surface">
                          {lead.name}
                        </h4>
                        <span className="text-label-sm text-on-surface-variant">
                          {lead.city}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-body-sm text-on-surface-variant mt-1">
                      <span className="text-xs">{lead.package_interest}</span>
                    </div>
                    <div className="flex items-center gap-1 text-body-sm text-on-surface-variant mt-1">
                      <span className="text-xs">
                        Follow up:{" "}
                        {lead.next_followup_at
                          ? new Date(lead.next_followup_at).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-outline-variant flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `https://wa.me/${lead.phone.replace(/^0/, "62")}`,
                            "_blank"
                          );
                        }}
                      >
                        WhatsApp
                      </Button>
                      <select
                        className="text-xs h-7 rounded border border-outline-variant bg-transparent px-1"
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as LeadStatus)
                        }
                        onClick={(e) => e.preventDefault()}
                      >
                        {PIPELINE_COLUMNS.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </a>
                ))}
                {columnLeads.length === 0 && (
                  <div className="flex-1 flex items-center justify-center min-h-[100px] border-2 border-dashed border-outline-variant rounded-lg m-1">
                    <span className="text-body-sm text-on-surface-variant">
                      Drop lead here
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddLead}>
            <div className="space-y-4 py-2">
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1">
                  Name
                </label>
                <Input
                  value={newLead.name}
                  onChange={(e) =>
                    setNewLead({ ...newLead, name: e.target.value })
                  }
                  placeholder="Lead name"
                  required
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1">
                  Phone
                </label>
                <Input
                  value={newLead.phone}
                  onChange={(e) =>
                    setNewLead({ ...newLead, phone: e.target.value })
                  }
                  placeholder="08123456789"
                  required
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1">
                  City
                </label>
                <Input
                  value={newLead.city}
                  onChange={(e) =>
                    setNewLead({ ...newLead, city: e.target.value })
                  }
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1">
                  Package Interest
                </label>
                <Input
                  value={newLead.package_interest}
                  onChange={(e) =>
                    setNewLead({
                      ...newLead,
                      package_interest: e.target.value,
                    })
                  }
                  placeholder="e.g. Umrah Berkah"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={adding}>
                {adding ? "Adding..." : "Add Lead"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}