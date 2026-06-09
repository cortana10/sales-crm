"use client";

import { useState, useEffect } from "react";
import { Upload, Search, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";
import { getAlumni } from "@/lib/data";
import type { Alumni } from "@/types";

const campaignTemplates = [
  { id: "umrah_keluarga", label: "Umrah Keluarga", icon: "???????????" },
  { id: "umrah_orang_tua", label: "Umrah Orang Tua", icon: "??" },
  { id: "haji_khusus", label: "Haji Khusus", icon: "??" },
  { id: "haji_mujamalah", label: "Haji Mujamalah", icon: "??" },
  { id: "badal_umrah", label: "Badal Umrah", icon: "??" },
];

export default function AlumniPage() {
  const { user } = useAuth();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("umrah_keluarga");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getAlumni(user.id)
      .then(setAlumni)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const filtered = search
    ? alumni.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.phone.includes(search)
      )
    : alumni;

  const totalActiveThisYear = alumni.filter(
    (a) => a.departure_year === new Date().getFullYear()
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-on-surface-variant" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            Alumni & Campaign Center
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Manage alumni database and create broadcast campaigns.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowImport(true)}>
            <Upload className="w-4 h-4" /> Import CSV
          </Button>
          <Button onClick={() => setShowBroadcast(true)}>
            <Send className="w-4 h-4" /> New Campaign
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <CardContent className="p-0">
            <p className="text-label-sm text-on-surface-variant">Total Alumni</p>
            <p className="font-title-md text-title-md text-on-surface mt-1">
              {alumni.length}
            </p>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent className="p-0">
            <p className="text-label-sm text-on-surface-variant">Active This Year</p>
            <p className="font-title-md text-title-md text-on-surface mt-1">
              {totalActiveThisYear}
            </p>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent className="p-0">
            <p className="text-label-sm text-on-surface-variant">Campaign Reach Est.</p>
            <p className="font-title-md text-title-md text-on-surface mt-1">
              {alumni.length * 2}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alumni Table */}
      <Card>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="font-title-md">Alumni Database</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <Input
                placeholder="Search alumni..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Name</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Phone</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Departure</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Package</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors"
                  >
                    <td className="py-3 px-4 font-label-md text-on-surface">{a.name}</td>
                    <td className="py-3 px-4 text-body-sm text-on-surface-variant">{a.phone}</td>
                    <td className="py-3 px-4 text-body-sm text-on-surface-variant">
                      {a.departure_year || "-"}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{a.package_name || "-"}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() =>
                          window.open(
                            `https://wa.me/${a.phone.replace(/^0/, "62")}`,
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

      {/* Campaign Templates */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="font-title-md">Campaign Templates</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {campaignTemplates.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTemplate(t.id);
                  setShowBroadcast(true);
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                  selectedTemplate === t.id
                    ? "border-primary-container bg-primary-container/5"
                    : "border-outline-variant hover:border-outline bg-surface-container-lowest"
                }`}
              >
                <span className="text-2xl">{t.icon}</span>
                <span className="text-label-sm text-on-surface text-center">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Import Dialog */}
      <Dialog open={showImport} onOpenChange={setShowImport}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Alumni CSV</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-body-sm text-on-surface-variant">
              Upload a CSV file with columns: Name, Phone, Departure Year, Package
            </p>
            <div className="border-2 border-dashed border-outline-variant rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-on-surface-variant mx-auto mb-2" />
              <p className="text-label-sm text-on-surface-variant">
                Drop CSV file here or click to browse
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImport(false)}>
              Cancel
            </Button>
            <Button disabled>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Broadcast Dialog */}
      <Dialog open={showBroadcast} onOpenChange={setShowBroadcast}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1">
                Template
              </label>
              <select className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-sm text-on-surface">
                {campaignTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1">
                Message
              </label>
              <textarea
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-sm text-on-surface min-h-[120px]"
                placeholder="Your broadcast message..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBroadcast(false)}>
              Cancel
            </Button>
            <Button disabled>Send Broadcast</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
