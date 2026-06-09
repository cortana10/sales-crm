"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  GraduationCap,
  ChevronLeft,
  Target,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Pipeline", icon: GitBranch },
  { href: "/leads/list", label: "All Leads", icon: Users },
  { href: "/alumni", label: "Alumni Campaign", icon: GraduationCap },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-outline-variant bg-surface-container-lowest transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-outline-variant gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
          <Target className="w-4 h-4 text-on-primary" />
        </div>
        {!collapsed && (
          <span className="font-title-md text-title-md text-on-surface truncate">
            Umrah CRM
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                isActive
                  ? "bg-primary-container/10 text-primary-container font-label-md"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="text-label-md">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-outline-variant">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          <ChevronLeft className={cn("w-5 h-5 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && <span className="text-label-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
