"use client";

import { useState, useEffect } from "react";
import { KPICard } from "@/components/dashboard/kpi-cards";
import { DailyMission } from "@/components/dashboard/daily-mission";
import { LeadSourceChart } from "@/components/dashboard/lead-source-chart";
import { ClosingTrendChart } from "@/components/dashboard/closing-trend-chart";
import { Users, Target, CheckCircle, CalendarClock, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getLeads, getTodayFollowUps } from "@/lib/data";

export default function DashboardPage() {
  const { user } = useAuth();
  const [totalLeads, setTotalLeads] = useState(0);
  const [closedLeads, setClosedLeads] = useState(0);
  const [todayFollowUps, setTodayFollowUps] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      getLeads(user.id),
      getTodayFollowUps(user.id),
    ])
      .then(([leads, followups]) => {
        setTotalLeads(leads.length);
        setClosedLeads(leads.filter((l) => l.status === "closed").length);
        setTodayFollowUps(followups.length);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const kpiData = [
    {
      title: "Total Leads",
      value: loading ? "..." : totalLeads,
      icon: <Users className="w-5 h-5" />,
      trend: "up" as const,
      trendValue: "All time",
    },
    {
      title: "Target Jamaah",
      value: `${closedLeads}/10`,
      subtitle: "Bulan Ini",
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Closing Bulan Ini",
      value: loading ? "..." : closedLeads,
      icon: <CheckCircle className="w-5 h-5" />,
      trend: "up" as const,
      trendValue: `${Math.round((closedLeads / 10) * 100)}% to target`,
    },
    {
      title: "Follow Up Hari Ini",
      value: loading ? "..." : todayFollowUps,
      icon: <CalendarClock className="w-5 h-5" />,
      trend: "up" as const,
      trendValue: "Pending",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-on-surface-variant" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Dashboard</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Selamat datang kembali! Berikut overview CRM Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DailyMission />
        </div>
        <div className="space-y-6">
          <LeadSourceChart />
        </div>
      </div>

      <ClosingTrendChart />
    </div>
  );
}
