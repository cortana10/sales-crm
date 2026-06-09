"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Phone, MapPin, Package, MessageCircle, RefreshCw, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import Link from "next/link";

const leadData = {
  id: "1",
  name: "Ahmad Fauzi",
  phone: "08123456789",
  city: "Jakarta",
  package_interest: "Umrah Berkah",
  source: "Meta Ads",
  status: "interested" as const,
  notes: "Lead tertarik paket Umrah Berkah. Keberatan harga dan masih berdiskusi dengan istri.",
  created_at: "2026-06-01",
  last_contact: "2026-06-07",
};

const timeline = [
  { type: "incoming", content: "Assalamu&apos;alaikum, saya tertarik dengan paket Umrah Berkah", time: "2 Jun 2026, 10:30" },
  { type: "outgoing", content: "Waalaikumsalam! Terima kasih minatnya. Kami ada promo early bird diskon 10% untuk pendaftaran bulan ini.", time: "2 Jun 2026, 10:35" },
  { type: "incoming", content: "Menarik, tapi saya masih mau diskusi dengan istri dulu", time: "3 Jun 2026, 14:20" },
  { type: "outgoing", content: "Tentu saja, silakan. Kami bisa kirimkan brosur lengkap via WA", time: "3 Jun 2026, 14:25" },
  { type: "incoming", content: "Iya, tolong dikirimkan brosur dan testimoni keluarga", time: "4 Jun 2026, 09:15" },
  { type: "system", content: "System: AI Summary - Lead tertarik paket Umrah Berkah. Keberatan harga dan masih berdiskusi dengan istri.", time: "7 Jun 2026" },
];

export default function LeadDetailPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams();

  return (
    <div className="space-y-6">
      <Link href="/leads" className="inline-flex items-center gap-1 text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Pipeline
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile + Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader className="p-4 pb-3 flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container font-title-md text-title-md">
                  {leadData.name.charAt(0)}
                </div>
                <div>
                  <CardTitle className="font-title-md">{leadData.name}</CardTitle>
                  <StatusBadge status={leadData.status} />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="flex items-center gap-2 text-body-sm">
                  <Phone className="w-4 h-4 text-on-surface-variant" />
                  <span>{leadData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <MapPin className="w-4 h-4 text-on-surface-variant" />
                  <span>{leadData.city}</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <Package className="w-4 h-4 text-on-surface-variant" />
                  <span>{leadData.package_interest}</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <span className="w-4 h-4 text-on-surface-variant text-xs flex items-center justify-center">S</span>
                  <span>{leadData.source}</span>
                </div>
              </div>
              {leadData.notes && (
                <div className="mt-3 p-3 bg-surface-container-low rounded-lg text-body-sm text-on-surface-variant">
                  {leadData.notes}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="font-title-md">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="space-y-4">
                {timeline.map((entry, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`flex flex-col items-center`}>
                      <div className={`w-2 h-2 rounded-full ${
                        entry.type === "incoming" ? "bg-primary-fixed-dim" :
                        entry.type === "outgoing" ? "bg-primary-container" : "bg-secondary-container"
                      } mt-1.5`} />
                      {i < timeline.length - 1 && <div className="w-px flex-1 bg-outline-variant mt-1" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className={`p-3 rounded-lg ${
                        entry.type === "incoming" ? "bg-surface-container-low" :
                        entry.type === "outgoing" ? "bg-primary-container/5 border border-primary-container/20" :
                        "bg-secondary-container/10 border border-secondary-container/20"
                      }`}>
                        <p className="text-body-sm text-on-surface">{entry.content}</p>
                        <p className="text-label-sm text-on-surface-variant mt-1">{entry.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: AI Sidekick */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">?</span>
            <h3 className="font-title-md text-title-md text-on-surface">AI Sidekick</h3>
          </div>

          {/* Chat Summary */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">??</span>
                <CardTitle className="font-label-md text-label-md">Chat Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-body-sm text-on-surface-variant">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline mt-1.5 shrink-0" />
                  Lead is highly interested in the Umrah Berkah package.
                </li>
                <li className="flex items-start gap-2 text-body-sm text-on-surface-variant">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline mt-1.5 shrink-0" />
                  Concerned about pricing, discussing with spouse.
                </li>
                <li className="flex items-start gap-2 text-body-sm text-on-surface-variant">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline mt-1.5 shrink-0" />
                  <span className="text-on-surface font-medium">Pending:</span> Requested brochure & testimonials.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Suggested Action */}
          <Card className="border-[#bae6fd] bg-[#f0f9ff]">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">??</span>
                <CardTitle className="font-label-md text-label-md text-primary-container">Suggested Action</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-body-sm text-on-surface-variant mb-3">
                Send brochure highlighting the Umrah Berkah package benefits, along with a testimonial from a family who traveled last Ramadan. Offer the early bird discount.
              </p>
              <Button size="sm" className="w-full bg-white text-primary-container border border-[#bae6fd] hover:bg-[#e0f2fe] shadow-sm">
                Generate Response
              </Button>
            </CardContent>
          </Card>

          {/* Draft Generator */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">??</span>
                <CardTitle className="font-label-md text-label-md">Draft Generator</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="bg-surface-container border border-outline-variant rounded-lg p-3 mb-3 text-body-sm text-on-surface italic">
                "Assalamu&apos;alaikum Kak {leadData.name}, kami ada promo early bird untuk paket Umrah Berkah diskon 10% untuk pendaftaran bulan ini. Berikut brosur dan testimoni keluarga yang sudah berangkat bersama kami...
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <RefreshCw className="w-3.5 h-3.5" /> Re-roll
                </Button>
                <Button size="sm" className="flex-1">
                  <Copy className="w-3.5 h-3.5" /> Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
