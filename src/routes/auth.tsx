import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageTitle } from "@/components/SiteHeader";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in | STRATAGEM" },
      {
        name: "description",
        content: "Sign in to STRATAGEM to save your Counsel, Drill Room and tutor conversations.",
      },
      { property: "og:title", content: "Sign in — STRATAGEM" },
      { property: "og:description", content: "Save your conversations and progress." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "forgot" | "reset">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("mode") === "recovery") {
      setMode("reset");
    }
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("reset");
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMsg(error.message);
        else nav({ to: "/counsel" });
      } else if (mode === "up") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin, data: { display_name: name } },
        });
        setMsg(error ? error.message : "Check your email to confirm your account, then sign in.");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth?mode=recovery`,
        });
        setMsg(
          error
            ? error.message
            : "If an account exists for that email, you'll receive a password reset link.",
        );
      } else {
        if (password !== confirmPassword) {
          setMsg("The passwords do not match.");
          return;
        }
        const { error } = await supabase.auth.updateUser({ password });
        if (error) setMsg(error.message);
        else nav({ to: "/counsel" });
      }
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const field =
    "w-full rounded-md border border-input bg-card px-4 py-2 outline-none focus:border-primary";
  const title = {
    in: "Sign in",
    up: "Create account",
    forgot: "Forgot password",
    reset: "Choose a new password",
  }[mode];
  return (
    <div className="mx-auto max-w-md px-6 py-14">
      <PageTitle kicker="Account" title={title}>
        {mode === "in" || mode === "up"
          ? "Saved conversations follow you across devices."
          : mode === "forgot"
            ? "Enter your account email and we'll send you a reset link."
            : "Enter and confirm your new password."}
      </PageTitle>
      <form onSubmit={submit} className="space-y-3">
        {mode === "up" && (
          <input
            className={field}
            placeholder="Display name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        {mode !== "reset" && (
          <input
            className={field}
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {mode !== "forgot" && (
          <>
            <input
              className={field}
              type="password"
              required
              minLength={6}
              placeholder={mode === "reset" ? "New password" : "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {mode === "reset" && (
              <input
                className={field}
                type="password"
                required
                minLength={6}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
          </>
        )}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {busy
            ? "Please wait…"
            : {
                in: "Sign in",
                up: "Create account",
                forgot: "Send reset link",
                reset: "Update password",
              }[mode]}
        </button>
      </form>
      {msg && <p className="mt-4 text-sm text-muted-foreground">{msg}</p>}
      {mode === "in" && (
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          <button
            onClick={() => {
              setMode("forgot");
              setMsg(null);
            }}
            className="text-sm text-primary"
          >
            Forgot password?
          </button>
          <button
            onClick={() => {
              setMode("up");
              setMsg(null);
            }}
            className="text-sm text-primary"
          >
            No account? Create one
          </button>
        </div>
      )}
      {(mode === "up" || mode === "forgot" || mode === "reset") && (
        <button
          onClick={() => {
            setMode("in");
            setMsg(null);
          }}
          className="mt-6 text-sm text-primary"
        >
          Have an account? Sign in
        </button>
      )}
    </div>
  );
}
