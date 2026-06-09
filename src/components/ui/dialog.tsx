"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-lg max-w-lg w-full mx-4 max-h-[85vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center justify-between px-6 pt-6 pb-0", className)}>{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-title-md text-title-md text-on-surface">{children}</h2>;
}

export function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end gap-2 px-6 pb-6 pt-2">{children}</div>;
}

export function DialogClose({ onClose }: { onClose: () => void }) {
  return (
    <button onClick={onClose} className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
      <X className="w-4 h-4" />
    </button>
  );
}
