"use client";

import { useState } from "react";
import { Target, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-on-primary" />
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Personal AI Umrah CRM</h1>
        <p className="text-body-sm text-on-surface-variant mt-2">Sign in to manage your leads and sales</p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1.5">Email</label>
          <Input type="email" placeholder="your@email.com" />
        </div>
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1.5">Password</label>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Enter password" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <Button className="w-full" size="lg">
          Sign In
        </Button>
        <p className="text-center text-label-sm text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <button className="text-primary-container hover:underline font-label-sm">Register</button>
        </p>
      </div>
    </div>
  );
}
