"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";
import type { Lead, LeadStatus } from "@/types";

const PIPELINE_COLUMNS: { id: LeadStatus; label: string; color: string }[] = [
  { id: "new_lead", label: "New Lead", color: "bg-outline" },
  { id: "contacted", label: "Contacted", color: "bg-primary-fixed-dim" },
  { id: "interested", label: "Interested", color: "bg-secondary-container" },
  { id: "waiting_decision", label: "Waiting Decision", color: "bg-secondary-fixed-dim" },
  { id: "dp_paid", label: "DP Paid", color: "bg-primary-container" },
  { id: "closed", label: "Closed", color: "bg-primary" },
];

const mockLeads: Lead[] = [
  { id: "1", name: "Ahmad Fauzi", phone: "08123456789", city: "Jakarta", package_interest: "Umrah Berkah", source: "meta_ads", status: "new_lead", notes: "", created_at: "2026-06-01T10:00:00Z" },
  { id: "2", name: "Siti Nurhaliza", phone: "08234567890", city: "Bandung", package_interest: "Umrah Keluarga", source: "referral", status: "contacted", notes: "Tertarik setelah diskusi", created_at: "2026-05-28T10:00:00Z", next_followup_at: "2026-06-10T10:00:00Z" },
  { id: "3", name: "Budi Santoso", phone: "08345678901", city: "Surabaya", package_interest: "VIP Executive", source: "alumni", status: "interested", notes: "Minta detail harga", created_at: "2026-05-25T10:00:00Z", next_followup_at: "2026-06-09T10:00:00Z" },
  { id: "4", name: "Yusuf Ibrahim", phone: "08456789012", city: "Medan", package_interest: "Haji Khusus", source: "manual_input", status: "waiting_decision", notes: "Diskusi dengan keluarga", created_at: "2026-05-20T10:00:00Z" },
  { id: "5", name: "Tariq Mansoor", phone: "08567890123", city: "Makassar", package_interest: "Custom Family Package", source: "referral", status: "contacted", notes: "", created_at: "2026-06-02T10:00:00Z", next_followup_at: "2026-06-09T10:00:00Z" },
  { id: "6", name: "Fatimah Azzahra", phone: "08678901234", city: "Yogyakarta", package_interest: "Umrah Berkah", source: "meta_ads", status: "new_lead", notes: "Bertanya via WA", created_at: "2026-06-05T10:00:00Z" },
];

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  const getLeadsByStatus = (status: LeadStatus) => filteredLeads.filter(l => l.status === status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Pipeline</h1>
          <p className="text-body-sm text-on-surface-variant mt-1">Kelola leads dari awal hingga closing.</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4" /> Add Lead
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <Input placeholder="Search leads..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_COLUMNS.map((col) => {
          const columnLeads = getLeadsByStatus(col.id);
          return (
            <div key={col.id} className="w-[300px] shrink-0 flex flex-col gap-2 bg-surface-container-low rounded-xl p-3 border border-outline-variant">
              <div className="flex items-center justify-between px-1 py-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${col.color}`} />
                  <h3 className="text-label-sm text-on-surface-variant uppercase tracking-wide font-label-md">{col.label}</h3>
                </div>
                <Badge variant="outline" className="text-xs">{columnLeads.length}</Badge>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-280px)]">
                {columnLeads.map((lead) => (
                  <a key={lead.id} href={`/leads/${lead.id}`} className="block bg-surface-container-lowest border border-outline-variant rounded-lg p-3 hover:border-outline transition-colors group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-title-md text-title-md text-on-surface">{lead.name}</h4>
                        <span className="text-label-sm text-on-surface-variant">{lead.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-body-sm text-on-surface-variant mt-1">
                      <span className="text-xs">{lead.package_interest}</span>
                    </div>
                    <div className="flex items-center gap-1 text-body-sm text-on-surface-variant mt-1">
                      <span className="text-xs">Follow up: {lead.next_followup_at ? new Date(lead.next_followup_at).toLocaleDateString() : "N/A"}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-outline-variant flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="text-xs h-7">WhatsApp</Button>
                      <Button variant="ghost" size="sm" className="text-xs h-7">Edit</Button>
                    </div>
                  </a>
                ))}
                {columnLeads.length === 0 && (
                  <div className="flex-1 flex items-center justify-center min-h-[100px] border-2 border-dashed border-outline-variant rounded-lg m-1">
                    <span className="text-body-sm text-on-surface-variant">Drop lead here</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogClose onClose={() => setShowAddDialog(false)} />
        </DialogHeader>
        <DialogContent>
          <div className="space-y-3">
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1">Name</label>
              <Input placeholder="Full name" />
            </div>
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1">Phone</label>
              <Input placeholder="WhatsApp number" />
            </div>
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1">City</label>
              <Input placeholder="City" />
            </div>
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1">Package Interest</label>
              <Input placeholder="e.g. Umrah Berkah" />
            </div>
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1">Source</label>
              <select className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-sm">
                <option>Meta Ads</option>
                <option>Alumni</option>
                <option>Referral</option>
                <option>Manual Input</option>
              </select>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={() => setShowAddDialog(false)}>Save Lead</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
