import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { Streamdown } from "streamdown";
import { ArrowUp, Square, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

type Thread = { id: string; title: string; updated_at: string };

export function ChatPanel(props: { mode: string; placeholder: string; intro?: string }) {
  const { user } = useSession();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [historyError, setHistoryError] = useState("");
  const [deletingThreadId, setDeletingThreadId] = useState<string | null>(null);
  const [active, setActive] = useState<{ id: string | null; messages: UIMessage[]; key: number }>({
    id: null,
    messages: [],
    key: 0,
  });

  const loadThreads = async () => {
    if (!user) return setThreads([]);
    const { data } = await supabase
      .from("threads")
      .select("id,title,updated_at")
      .eq("mode", props.mode)
      .order("updated_at", { ascending: false })
      .limit(30);
    setThreads(data ?? []);
  };

  const deleteThread = async (id: string) => {
    const thread = threads.find((item) => item.id === id);
    if (!thread || !window.confirm(`Delete "${thread.title}" and all its saved messages?`)) return;

    setHistoryError("");
    setDeletingThreadId(id);
    const { data, error } = await supabase.from("threads").delete().eq("id", id).select("id");
    setDeletingThreadId(null);
    if (error) {
      setHistoryError(`Couldn't delete this conversation: ${error.message}`);
      return;
    }
    if (!data?.length) {
      setHistoryError("This conversation could not be found or deleted.");
      return;
    }

    setThreads((current) => current.filter((item) => item.id !== id));
    setActive((current) =>
      current.id === id ? { id: null, messages: [], key: current.key + 1 } : current,
    );
  };

  const deleteMessage = async (threadId: string, messageId: string) => {
    setHistoryError("");
    const { data, error } = await supabase
      .from("messages")
      .delete()
      .eq("thread_id", threadId)
      .eq("message->>id", messageId)
      .select("id");
    if (error) {
      setHistoryError(`Couldn't delete this message: ${error.message}`);
      return;
    }
    if (!data?.length) {
      setHistoryError("This message could not be found or deleted.");
      return;
    }

    setActive((current) =>
      current.id === threadId
        ? {
            ...current,
            messages: current.messages.filter((message) => message.id !== messageId),
            key: current.key + 1,
          }
        : current,
    );
  };
  useEffect(() => {
    void loadThreads(); /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [user?.id, props.mode]);

  const open = async (id: string) => {
    const { data } = await supabase
      .from("messages")
      .select("message")
      .eq("thread_id", id)
      .order("created_at");
    setActive((a) => ({
      id,
      messages: (data ?? []).map((r) => r.message as unknown as UIMessage),
      key: a.key + 1,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      {user ? (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setActive((a) => ({ id: null, messages: [], key: a.key + 1 }))}
            className="rounded-md border border-primary px-3 py-1 text-primary"
          >
            + New
          </button>
          {threads.map((t) => (
            <div key={t.id} className="flex items-center rounded-md border border-border">
              <button
                onClick={() => open(t.id)}
                className={`max-w-[14rem] truncate px-3 py-1 ${active.id === t.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t.title}
              </button>
              <button
                type="button"
                aria-label={`Delete conversation: ${t.title}`}
                title="Delete conversation"
                disabled={deletingThreadId === t.id}
                onClick={() => void deleteThread(t.id)}
                className="grid size-7 shrink-0 place-items-center rounded-r-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          <Link to="/auth" className="text-primary">
            Sign in
          </Link>{" "}
          to save your conversations.
        </p>
      )}
      {historyError && (
        <p role="alert" className="text-sm text-destructive">
          {historyError}
        </p>
      )}
      <Conversation
        key={`${props.mode}-${active.key}`}
        {...props}
        userId={user?.id ?? null}
        threadId={active.id}
        initial={active.messages}
        onDeleteMessage={deleteMessage}
        onThread={(id) => {
          setActive((a) => ({ ...a, id }));
          void loadThreads();
        }}
      />
    </div>
  );
}

function Conversation({
  mode,
  placeholder,
  intro,
  userId,
  threadId,
  initial,
  onThread,
  onDeleteMessage,
}: {
  mode: string;
  placeholder: string;
  intro?: string;
  userId: string | null;
  threadId: string | null;
  initial: UIMessage[];
  onThread: (id: string) => void;
  onDeleteMessage: (threadId: string, messageId: string) => Promise<void>;
}) {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { mode } }),
    [mode],
  );
  const tid = useRef<string | null>(threadId);
  const save = async (m: UIMessage) => {
    if (!userId || !tid.current) return;
    await supabase
      .from("messages")
      .insert({ thread_id: tid.current, user_id: userId, message: JSON.parse(JSON.stringify(m)) });
    await supabase
      .from("threads")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", tid.current);
  };
  const { messages, sendMessage, status, stop, error } = useChat({
    messages: initial,
    transport,
    onFinish: ({ message }) => {
      void save(message);
    },
  });
  const [input, setInput] = useState("");
  const busy = status === "submitted" || status === "streaming";
  const lastSaved = useRef(initial.length);

  // Persist the user's message once it appears in the list.
  useEffect(() => {
    const m = messages[messages.length - 1];
    if (m && m.role === "user" && messages.length > lastSaved.current) {
      lastSaved.current = messages.length;
      void save(m);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    if (userId && !tid.current) {
      const { data } = await supabase
        .from("threads")
        .insert({ user_id: userId, mode, title: text.slice(0, 60) })
        .select("id")
        .single();
      if (data) {
        tid.current = data.id;
        onThread(data.id);
      }
    }
    sendMessage({ text });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-6">
        {messages.length === 0 && intro && <p className="text-muted-foreground italic">{intro}</p>}
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user" ? "flex items-start justify-end gap-2" : "flex items-start gap-2"
            }
          >
            <div
              className={
                m.role === "user"
                  ? "max-w-[80%] rounded-md bg-secondary px-4 py-3 text-secondary-foreground"
                  : "prose-stratagem"
              }
            >
              {m.parts.map((p, i) =>
                p.type === "text" ? (
                  m.role === "user" ? (
                    <p key={i} className="whitespace-pre-wrap">
                      {p.text}
                    </p>
                  ) : (
                    <Streamdown key={i}>{p.text}</Streamdown>
                  )
                ) : p.type === "reasoning" && p.text ? (
                  <details key={i} className="mb-2 text-xs text-muted-foreground">
                    <summary className="cursor-pointer">Reasoning</summary>
                    <p className="mt-1 whitespace-pre-wrap">{p.text}</p>
                  </details>
                ) : null,
              )}
            </div>
            {userId && threadId && (
              <button
                type="button"
                aria-label="Delete saved message"
                title="Delete saved message"
                disabled={busy}
                onClick={() => {
                  if (window.confirm("Delete this saved message?")) {
                    void onDeleteMessage(threadId, m.id);
                  }
                }}
                className="mt-1 grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
        ))}
        {status === "submitted" && (
          <p className="animate-pulse text-sm text-primary">Considering…</p>
        )}
        {error && (
          <p className="text-sm text-destructive">
            {error.message || "Something went wrong. Try again."}
          </p>
        )}
      </div>
      <form
        onSubmit={submit}
        className="sticky bottom-4 flex items-end gap-2 rounded-lg border border-border bg-card p-2 shadow-lg"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) void submit(e);
          }}
          placeholder={placeholder}
          rows={2}
          className="min-h-[3rem] flex-1 resize-none bg-transparent px-2 py-1 text-foreground outline-none placeholder:text-muted-foreground"
        />
        {busy ? (
          <button
            type="button"
            onClick={stop}
            aria-label="Stop"
            className="grid size-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"
          >
            <Square className="size-4" />
          </button>
        ) : (
          <button
            type="submit"
            aria-label="Send"
            disabled={!input.trim()}
            className="grid size-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground disabled:opacity-40"
          >
            <ArrowUp className="size-4" />
          </button>
        )}
      </form>
    </div>
  );
}
