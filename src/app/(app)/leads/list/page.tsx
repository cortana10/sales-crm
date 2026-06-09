"use client";

import { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import type { Lead } from "@/types";

const mockLeads: Lead[] = [
  { id: "1", name: "Ahmad Fauzi", phone: "08123456789", city: "Jakarta", package_interest: "Umrah Berkah", source: "meta_ads", status: "new_lead", created_at: "2026-06-01", next_followup_at: "2026-06-10" },
  { id: "2", name: "Siti Nurhaliza", phone: "08234567890", city: "Bandung", package_interest: "Umrah Keluarga", source: "referral", status: "contacted", created_at: "2026-05-28", next_followup_at: "2026-06-09" },
  { id: "3", name: "Budi Santoso", phone: "08345678901", city: "Surabaya", package_interest: "VIP Executive", source: "alumni", status: "interested", created_at: "2026-05-25" },
  { id: "4", name: "Yusuf Ibrahim", phone: "08456789012", city: "Medan", package_interest: "Haji Khusus", source: "manual_input", status: "waiting_decision", created_at: "2026-05-20" },
  { id: "5", name: "Tariq Mansoor", phone: "08567890123", city: "Makassar", package_interest: "Custom Family", source: "referral", status: "contacted", created_at: "2026-06-02", next_followup_at: "2026-06-11" },
  { id: "6", name: "Fatimah Azzahra", phone: "08678901234", city: "Yogyakarta", package_interest: "Umrah Berkah", source: "meta_ads", status: "new_lead", created_at: "2026-06-05" },
  { id: "7", name: "H. Mahmud", phone: "08789012345", city: "Semarang", package_interest: "Haji Khusus", source: "alumni", status: "dp_paid", created_at: "2026-05-15" },
  { id: "8", name: "Ibu Siti R.", phone: "08890123456", city: "Bogor", package_interest: "Umrah Keluarga", source: "referral", status: "closed", created_at: "2026-05-10" },
];

export default function LeadsListPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">All Leads</h1>
          <p className="text-body-sm text-on-surface-variant mt-1">{mockLeads.length} total leads</p>
        </div>
        <Button><Plus className="w-4 h-4" /> Add Lead</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <Input placeholder="Search leads..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4" /> Filter</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Name</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Contact</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Package</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Source</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Status</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Next Follow Up</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4">
                      <a href={`/leads/${lead.id}`} className="font-label-md text-on-surface hover:text-primary-container">
                        {lead.name}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-body-sm text-on-surface-variant">{lead.phone}</td>
                    <td className="py-3 px-4 text-body-sm text-on-surface-variant">{lead.package_interest}</td>
                    <td className="py-3 px-4"><Badge variant="outline">{lead.source.replace("_", " ")}</Badge></td>
                    <td className="py-3 px-4"><StatusBadge status={lead.status} /></td>
                    <td className="py-3 px-4 text-body-sm text-on-surface-variant">{lead.next_followup_at ? new Date(lead.next_followup_at).toLocaleDateString() : "-"}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="text-xs h-7">WA</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
