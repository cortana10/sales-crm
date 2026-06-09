"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import type { Lead } from "@/types";
import { useAuth } from "@/lib/auth-context";
import { getLeads } from "@/lib/data";

export default function LeadsListPage() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getLeads(user.id)
      .then(setLeads)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const filtered = search
    ? leads.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase())
      )
    : leads;

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
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            All Leads
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            {leads.length} total leads
          </p>
        </div>
        <Button>
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
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">
                    Name
                  </th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">
                    Contact
                  </th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">
                    Package
                  </th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">
                    Source
                  </th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">
                    Status
                  </th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">
                    Next Follow Up
                  </th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors"
                  >
                    <td className="py-3 px-4">
                      <a
                        href={`/leads/${lead.id}`}
                        className="font-label-md text-on-surface hover:text-primary-container"
                      >
                        {lead.name}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-body-sm text-on-surface-variant">
                      {lead.phone}
                    </td>
                    <td className="py-3 px-4 text-body-sm text-on-surface-variant">
                      {lead.package_interest}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">
                        {lead.source.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-3 px-4 text-body-sm text-on-surface-variant">
                      {lead.next_followup_at
                        ? new Date(lead.next_followup_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() =>
                          window.open(
                            `https://wa.me/${lead.phone.replace(/^0/, "62")}`,
                            "_blank"
                          )
                        }
                      >
                        WA
                      </Button>
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