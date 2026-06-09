"use client";

import { useState } from "react";
import { Upload, Search, Send, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";

const mockAlumni = [
  { id: "1", name: "Hj. Fatimah", phone: "08111111111", departure_year: 2023, package_name: "Umrah Berkah" },
  { id: "2", name: "H. Ahmad S.", phone: "08222222222", departure_year: 2024, package_name: "Umrah Keluarga" },
  { id: "3", name: "Ibu Siti R.", phone: "08333333333", departure_year: 2023, package_name: "VIP Executive" },
  { id: "4", name: "Bapak Mahmud", phone: "08444444444", departure_year: 2022, package_name: "Umrah Berkah" },
  { id: "5", name: "Keluarga Hasan", phone: "08555555555", departure_year: 2024, package_name: "Haji Khusus" },
];

const campaignTemplates = [
  { id: "umrah_keluarga", label: "Umrah Keluarga", icon: "???????????" },
  { id: "umrah_orang_tua", label: "Umrah Orang Tua", icon: "????" },
  { id: "haji_khusus", label: "Haji Khusus", icon: "??" },
  { id: "haji_mujamalah", label: "Haji Mujamalah", icon: "??" },
  { id: "badal_umrah", label: "Badal Umrah", icon: "??" },
];

export default function AlumniPage() {
  const [search, setSearch] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("umrah_keluarga");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Alumni & Campaign Center</h1>
          <p className="text-body-sm text-on-surface-variant mt-1">Manage alumni database and create broadcast campaigns.</p>
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
            <p className="font-title-md text-title-md text-on-surface mt-1">2,450</p>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent className="p-0">
            <p className="text-label-sm text-on-surface-variant">Active This Year</p>
            <p className="font-title-md text-title-md text-on-surface mt-1">1,280</p>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent className="p-0">
            <p className="text-label-sm text-on-surface-variant">Campaign Reach Est.</p>
            <p className="font-title-md text-title-md text-on-surface mt-1">4,120</p>
          </CardContent>
        </Card>
      </div>

      {/* Alumni Table */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="font-title-md">Alumni Database</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <Input placeholder="Search alumni..." className="pl-9 h-8 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="text-left text-label-sm text-on-surface-variant py-2 px-2">Name</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-2 px-2">Phone</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-2 px-2">Year</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-2 px-2">Package</th>
                  <th className="text-left text-label-sm text-on-surface-variant py-2 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockAlumni.map((a) => (
                  <tr key={a.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-2 text-body-sm text-on-surface">{a.name}</td>
                    <td className="py-3 px-2 text-body-sm text-on-surface-variant">{a.phone}</td>
                    <td className="py-3 px-2 text-body-sm text-on-surface-variant">{a.departure_year}</td>
                    <td className="py-3 px-2"><Badge variant="default">{a.package_name}</Badge></td>
                    <td className="py-3 px-2">
                      <Button variant="ghost" size="sm" className="text-xs h-7">Message</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Import Dialog */}
      <Dialog open={showImport} onOpenChange={setShowImport}>
        <DialogHeader>
          <DialogTitle>Import Alumni CSV</DialogTitle>
          <DialogClose onClose={() => setShowImport(false)} />
        </DialogHeader>
        <DialogContent>
          <div className="space-y-3">
            <div className="border-2 border-dashed border-outline-variant rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 mx-auto text-on-surface-variant" />
              <p className="text-body-sm text-on-surface-variant mt-2">Drop your CSV file here or click to browse</p>
              <p className="text-label-sm text-on-surface-variant mt-1">Expected columns: Name, Phone, Departure Year, Package</p>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowImport(false)}>Cancel</Button>
          <Button onClick={() => setShowImport(false)}>Import</Button>
        </DialogFooter>
      </Dialog>

      {/* Broadcast Dialog */}
      <Dialog open={showBroadcast} onOpenChange={setShowBroadcast}>
        <DialogHeader>
          <DialogTitle>New Campaign</DialogTitle>
          <DialogClose onClose={() => setShowBroadcast(false)} />
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            {/* Step 1: Template */}
            <div>
              <label className="block text-label-sm text-on-surface mb-2">1. Campaign Template</label>
              <div className="grid grid-cols-3 gap-2">
                {campaignTemplates.map((t) => (
                  <button key={t.id} onClick={() => setSelectedTemplate(t.id)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      selectedTemplate === t.id
                        ? "border-primary-container bg-primary-container/5"
                        : "border-outline-variant hover:border-outline"
                    }`}
                  >
                    <div className="text-xl">{t.icon}</div>
                    <div className="text-label-sm text-on-surface mt-1">{t.label}</div>
                  </button>
                ))}
              </div>
            </div>
            {/* Step 2: Audience */}
            <div>
              <label className="block text-label-sm text-on-surface mb-2">2. Target Audience</label>
              <select className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-sm">
                <option>Alumni &gt; 2 Years Ago</option>
                <option>Premium Package Alumni</option>
                <option>All Dormant Contacts</option>
                <option>Custom Segment...</option>
              </select>
              <p className="text-label-sm text-on-surface-variant mt-1">Est. Reach: 4,120 contacts</p>
            </div>
            {/* Step 3: Message Preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-label-sm text-on-surface">3. Message Preview</label>
                <Button variant="ghost" size="sm" className="text-xs">Edit Template</Button>
              </div>
              <div className="bg-surface-container border border-outline-variant rounded-lg p-3 text-body-sm text-on-surface space-y-1">
                <p>Assalamu&apos;alaikum <span className="bg-secondary-container/30 text-secondary px-1 rounded text-xs">[Nama]</span>,</p>
                <p>Rindu Baitullah? Spesial untuk alumni kami, nikmati promo <strong>Umrah Keluarga</strong> keberangkatan <span className="bg-secondary-container/30 text-secondary px-1 rounded text-xs">[Bulan]</span>.</p>
                <p>Dapatkan potongan s/d Rp 2.000.000/pax. Kuota terbatas! Balas &quot;INFO&quot; untuk detail.</p>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <div className="flex-1">
            <Button variant="ghost" size="sm" className="text-xs">Save as Draft</Button>
          </div>
          <Button variant="outline" onClick={() => setShowBroadcast(false)}>Cancel</Button>
          <Button onClick={() => setShowBroadcast(false)}>
            <Rocket className="w-4 h-4" /> Launch Broadcast
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
