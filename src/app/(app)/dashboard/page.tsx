"use client";

import { KPICard } from "@/components/dashboard/kpi-cards";
import { DailyMission } from "@/components/dashboard/daily-mission";
import { LeadSourceChart } from "@/components/dashboard/lead-source-chart";
import { ClosingTrendChart } from "@/components/dashboard/closing-trend-chart";
import { Users, Target, CheckCircle, CalendarClock } from "lucide-react";

const kpiData = [
  { title: "Total Leads", value: 156, icon: <Users className="w-5 h-5" />, trend: "up" as const, trendValue: "+12% this month" },
  { title: "Target Jamaah", value: "5/10", subtitle: "Bulan Ini", icon: <Target className="w-5 h-5" /> },
  { title: "Closing Bulan Ini", value: 5, icon: <CheckCircle className="w-5 h-5" />, trend: "up" as const, trendValue: "50% to target" },
  { title: "Follow Up Hari Ini", value: 12, icon: <CalendarClock className="w-5 h-5" />, trend: "up" as const, trendValue: "3 completed" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Dashboard</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">Selamat datang kembali! Berikut overview CRM Anda.</p>
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
