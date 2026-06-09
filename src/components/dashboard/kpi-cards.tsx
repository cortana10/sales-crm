"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down";
  trendValue?: string;
  icon?: React.ReactNode;
}

export function KPICard({ title, value, subtitle, trend, trendValue, icon }: KPICardProps) {
  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-label-sm text-on-surface-variant">{title}</p>
            <p className="font-title-md text-title-md text-on-surface">{value}</p>
            {subtitle && <p className="text-label-sm text-on-surface-variant">{subtitle}</p>}
            {trend && trendValue && (
              <div className="flex items-center gap-1 mt-1">
                {trend === "up" ? <TrendingUp className="w-3.5 h-3.5 text-primary-container" /> : <TrendingDown className="w-3.5 h-3.5 text-error" />}
                <span className={cn("text-label-sm", trend === "up" ? "text-primary-container" : "text-error")}>{trendValue}</span>
              </div>
            )}
          </div>
          {icon && <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
