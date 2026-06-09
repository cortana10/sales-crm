"use client";

import { Bell, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const { user, signOut, loading } = useAuth();

  return (
    <header className="flex items-center h-16 px-6 border-b border-outline-variant bg-surface-container-lowest gap-4">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Bell className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <Input
            placeholder="Search leads..."
            className="pl-9 h-9 bg-surface-container-low text-body-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <span className="text-label-sm text-on-surface-variant hidden sm:block">
            {user.email}
          </span>
        )}
        <Button variant="ghost" size="icon" onClick={signOut} disabled={loading} title="Sign out">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
        </Button>
      </div>
    </header>
  );
}
