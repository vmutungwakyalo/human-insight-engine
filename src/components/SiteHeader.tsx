import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

const NAV = [
  { to: "/path", label: "The Path" },
  { to: "/codex", label: "The Codex" },
  { to: "/counsel", label: "The Counsel" },
  { to: "/drill", label: "Drill Room" },
  { to: "/mirror", label: "The Mirror" },
] as const;

export function SiteHeader() {
  const { user, isAdmin } = useSession();
  const nav = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    nav({ to: "/", replace: true });
  };
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="font-serif text-xl tracking-[0.2em] text-primary">
          STRATAGEM
        </Link>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={signOut}
              className="rounded-md border border-border px-3 py-1 hover:text-foreground"
            >
              Sign out
            </button>
          ) : (
            <Link to="/auth" className="rounded-md border border-primary px-3 py-1 text-primary">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export function PageTitle({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">{kicker}</p>
      <h1 className="mt-2 text-4xl text-foreground md:text-5xl">{title}</h1>
      {children && <div className="mt-4 text-muted-foreground">{children}</div>}
    </div>
  );
}
