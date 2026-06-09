"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        router.replace("/dashboard");
      } else {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        setError("Check your email for confirmation link.");
        setMode("login");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-on-primary" />
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Personal AI Umrah CRM</h1>
        <p className="text-body-sm text-on-surface-variant mt-2">
          {mode === "login" ? "Sign in to manage your leads and sales" : "Create your account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1.5">Email</label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1.5">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-label-sm text-error bg-error-container/20 rounded-lg p-2 text-center">{error}</p>
        )}

        <Button className="w-full" size="lg" type="submit" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {mode === "login" ? "Sign In" : "Register"}
        </Button>

        <p className="text-center text-label-sm text-on-surface-variant">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button type="button" className="text-primary-container hover:underline font-label-sm" onClick={() => { setMode("register"); setError(""); }}>
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" className="text-primary-container hover:underline font-label-sm" onClick={() => { setMode("login"); setError(""); }}>
                Sign In
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}