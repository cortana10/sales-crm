"use client";

import { Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex items-center h-16 px-6 border-b border-outline-variant bg-surface-container-lowest gap-4">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <Input
            placeholder="Search leads..."
            className="pl-9 h-9 bg-surface-container-low text-body-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
