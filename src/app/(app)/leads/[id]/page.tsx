"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Package,
  MessageCircle,
  RefreshCw,
  Copy,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { getLead, getMessages, sendMessage, updateLeadStatus } from "@/lib/data";
import type { Lead, Message, LeadStatus } from "@/types";
import { PIPELINE_STAGES, STATUS_LABELS } from "@/types";

export default function LeadDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const [lead, setLead] = useState<Lead | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMsg, setNewMsg] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!user || !params.id) return;
    setLoading(true);
    Promise.all([
      getLead(params.id as string),
      getMessages(params.id as string),
    ])
      .then(([leadData, messagesData]) => {
        setLead(leadData);
        setMessages(messagesData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, params.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !lead || !user) return;
    setSending(true);
    try {
      const msg = await sendMessage(lead.id, newMsg.trim());
      setMessages((prev) => [...prev, msg]);
      setNewMsg("");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!lead) return;
    try {
      await updateLeadStatus(lead.id, status as LeadStatus);
      setLead((prev) => (prev ? { ...prev, status: status as LeadStatus } : prev));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-on-surface-variant" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-16">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">
          Lead not found
        </h2>
        <Link href="/leads" className="text-primary-container hover:underline text-label-sm">
          Back to Pipeline
        </Link>
      </div>
    );
  }

  const statusOptions = PIPELINE_STAGES.map((s) => ({
    value: s,
    label: STATUS_LABELS[s],
  }));

  return (
    <div className="space-y-6">
      <Link
        href="/leads"
        className="inline-flex items-center gap-1 text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
      >
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
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <CardTitle className="font-title-md">{lead.name}</CardTitle>
                  <StatusBadge status={lead.status} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  options={statusOptions}
                  value={lead.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-40"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${lead.phone.replace(/^0/, "62")}`,
                      "_blank"
                    )
                  }
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="flex items-center gap-2 text-body-sm">
                  <Phone className="w-4 h-4 text-on-surface-variant" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <MapPin className="w-4 h-4 text-on-surface-variant" />
                  <span>{lead.city || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <Package className="w-4 h-4 text-on-surface-variant" />
                  <span>{lead.package_interest || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <span className="w-4 h-4 text-on-surface-variant text-xs flex items-center justify-center">
                    S
                  </span>
                  <span>{lead.source.replace("_", " ")}</span>
                </div>
              </div>
              {lead.notes && (
                <div className="mt-3 p-3 bg-surface-container-low rounded-lg text-body-sm text-on-surface-variant">
                  {lead.notes}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline / Messages */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="font-title-md">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <p className="text-body-sm text-on-surface-variant text-center py-8">
                    No messages yet
                  </p>
                )}
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 ${
                          msg.direction === "incoming"
                            ? "bg-primary-fixed-dim"
                            : "bg-primary-container"
                        }`}
                      />
                    </div>
                    <div className="flex-1 pb-2">
                      <div
                        className={`p-3 rounded-lg ${
                          msg.direction === "incoming"
                            ? "bg-surface-container-low"
                            : "bg-primary-container/5 border border-primary-container/20"
                        }`}
                      >
                        <p className="text-body-sm text-on-surface">
                          {msg.content}
                        </p>
                        <p className="text-label-sm text-on-surface-variant mt-1">
                          {new Date(msg.created_at).toLocaleString()}
                        </p>
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
            <span className="text-xl">AI</span>
            <h3 className="font-title-md text-title-md text-on-surface">
              AI Sidekick
            </h3>
          </div>

          {/* Quick Message */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="font-label-md text-label-md">
                Quick Message
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <form onSubmit={handleSendMessage} className="space-y-3">
                <textarea
                  className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container min-h-[80px]"
                  placeholder="Type a message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    size="sm"
                    className="flex-1"
                    disabled={sending || !newMsg.trim()}
                  >
                    {sending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <MessageCircle className="w-3.5 h-3.5" />
                    )}
                    Send
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> AI Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Draft Generator */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="font-label-md text-label-md">
                Suggested Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-body-sm text-on-surface-variant">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 shrink-0" />
                  Follow up with lead about their preferred package
                </li>
                <li className="flex items-start gap-2 text-body-sm text-on-surface-variant">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 shrink-0" />
                  Share testimonial from recent Umrah travelers
                </li>
                <li className="flex items-start gap-2 text-body-sm text-on-surface-variant">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 shrink-0" />
                  Offer early bird discount
                </li>
              </ul>
              <Button size="sm" variant="outline" className="w-full mt-3">
                <Copy className="w-3.5 h-3.5" /> Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
