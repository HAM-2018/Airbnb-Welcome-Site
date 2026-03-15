"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type GuestbookEntry = {
  id: number;
  name: string | null;
  location: string | null;
  message: string;
  created_at: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

const ENTRIES_PER_PAGE = 4;
const PAGES_PER_SPREAD = 2;
const ENTRIES_PER_SPREAD = ENTRIES_PER_PAGE * PAGES_PER_SPREAD;

export default function VirtualGuestbookPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState<"left" | "right" | null>(null);

  const canSubmit = useMemo(
    () => message.trim().length > 0 && !isSubmitting,
    [message, isSubmitting],
  );

  const spreadCount = Math.max(1, Math.ceil(entries.length / ENTRIES_PER_SPREAD));
  const hasPreviousSpread = spreadIndex > 0;
  const hasNextSpread = spreadIndex < spreadCount - 1;

  const spreadEntries = useMemo(() => {
    const start = spreadIndex * ENTRIES_PER_SPREAD;
    return entries.slice(start, start + ENTRIES_PER_SPREAD);
  }, [entries, spreadIndex]);

  const leftPageEntries = spreadEntries.slice(0, ENTRIES_PER_PAGE);
  const rightPageEntries = spreadEntries.slice(ENTRIES_PER_PAGE, ENTRIES_PER_SPREAD);

  const leftPageNumber = spreadIndex * PAGES_PER_SPREAD + 1;
  const rightPageNumber = leftPageNumber + 1;

  useEffect(() => {
    if (!turnDirection) return;

    const timer = window.setTimeout(() => {
      setTurnDirection(null);
    }, 480);

    return () => window.clearTimeout(timer);
  }, [turnDirection]);

  useEffect(() => {
    const maxSpreadIndex = Math.max(0, spreadCount - 1);
    setSpreadIndex((prev) => Math.min(prev, maxSpreadIndex));
  }, [spreadCount]);

  async function loadEntries() {
    setIsLoading(true);
    setLoadError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/guestbook?limit=80`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Failed to load entries (${res.status})`);
      }

      const data = (await res.json()) as GuestbookEntry[];
      setEntries(data);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load entries.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadEntries();
  }, []);

  function goToPreviousSpread() {
    if (!hasPreviousSpread) return;
    setTurnDirection("left");
    setSpreadIndex((prev) => prev - 1);
  }

  function goToNextSpread() {
    if (!hasNextSpread) return;
    setTurnDirection("right");
    setSpreadIndex((prev) => prev + 1);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedMessage = message.trim();
    const trimmedName = name.trim();
    const trimmedLocation = location.trim();

    if (!trimmedMessage) {
      setSubmitError("Please enter a message.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/guestbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName.length > 0 ? trimmedName : null,
          location: trimmedLocation.length > 0 ? trimmedLocation: null,
          message: trimmedMessage,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit (${res.status})`);
      }

      const created = (await res.json()) as GuestbookEntry;
      setEntries((prev) => [created, ...prev]);
      setSpreadIndex(0);
      setMessage("");
      setName("");
      setLocation("");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not submit your message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function renderEntries(pageEntries: GuestbookEntry[]) {
    if (isLoading) {
      return <p className="text-[#5d4634]">Loading entries...</p>;
    }

    if (loadError) {
      return <p className="text-sm text-red-700">{loadError}</p>;
    }

    if (entries.length === 0) {
      return <p className="text-[#5d4634]">No entries yet. Be the first.</p>;
    }

    if (pageEntries.length === 0) {
      return <p className="text-[#7b5b42]">This page is empty.</p>;
    }

    return (
      <ul className="space-y-3">
        {pageEntries.map((entry) => (
          <li key={entry.id} className="rounded-lg border border-[#e8d6c1] bg-white/70 p-3">
            <p className="text-sm text-[#3e2f24]">{entry.message}</p>
            <p className="mt-1 text-xs text-[#7b5b42]">
              {entry.name ?? "Anonymous"} - {new Date(entry.created_at).toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-[#7b5b42]"> {entry.location ? `From - ${entry.location}` : ""}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7efe2_0%,#eadbc5_100%)] px-4 py-8 text-[#2f2218] sm:px-6">
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="mb-6 text-center">
          <p className="text-xs font-bold tracking-[0.08em] text-[#6f5138] uppercase">
            Virtual Guestbook
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Leave a note in our guestbook
          </h1>
        </header>

        <div className="relative rounded-[30px] border border-[#c9a783] bg-[linear-gradient(135deg,#c49566_0%,#a97449_100%)] p-4 shadow-[0_22px_45px_rgba(72,38,12,0.25)] sm:p-6">
          <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-[14px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#8b5c36_0%,#6d4427_100%)] shadow-[inset_0_0_8px_rgba(0,0,0,0.25)] sm:block" />

          <div
            className={`origin-center [backface-visibility:hidden] grid min-h-[560px] grid-cols-1 gap-3 rounded-[22px] bg-[#8f603f]/20 p-3 sm:grid-cols-2 sm:gap-5 sm:p-4 ${
              turnDirection === "left"
                ? "animate-book-flip-left"
                : turnDirection === "right"
                  ? "animate-book-flip-right"
                  : ""
            }`}
          >
            <article className="rounded-[18px] border border-[#e4ccb1] bg-[linear-gradient(180deg,#fffdf8_0%,#f7ecde_100%)] p-6">
              <p className="mb-3 text-sm font-semibold tracking-[0.06em] text-[#8a5f3f] uppercase">
                Page {leftPageNumber}
              </p>
              {renderEntries(leftPageEntries)}
            </article>

            <article className="rounded-[18px] border border-[#e4ccb1] bg-[linear-gradient(180deg,#fffdf8_0%,#f7ecde_100%)] p-6">
              <p className="mb-3 text-sm font-semibold tracking-[0.06em] text-[#8a5f3f] uppercase">
                Page {rightPageNumber}
              </p>
              {renderEntries(rightPageEntries)}
            </article>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goToPreviousSpread}
            disabled={!hasPreviousSpread || isLoading}
            aria-label="Previous guestbook pages"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#b88c67] bg-[#f6ead9] text-xl font-semibold text-[#5d3f29] transition hover:bg-[#f0e1cb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            &larr;
          </button>

          <p className="min-w-[130px] text-center text-sm font-semibold text-[#6f5138]">
            Spread {spreadIndex + 1} of {spreadCount}
          </p>

          <button
            type="button"
            onClick={goToNextSpread}
            disabled={!hasNextSpread || isLoading}
            aria-label="Next guestbook pages"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#b88c67] bg-[#f6ead9] text-xl font-semibold text-[#5d3f29] transition hover:bg-[#f0e1cb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            &rarr;
          </button>
        </div>

        <article className="mt-6 rounded-[18px] border border-[#e4ccb1] bg-[linear-gradient(180deg,#fffdf8_0%,#f7ecde_100%)] p-6 shadow-[0_12px_25px_rgba(72,38,12,0.14)]">
          <p className="mb-3 text-sm font-semibold tracking-[0.06em] text-[#8a5f3f] uppercase">
            Leave a Message
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-[#5d4634]" htmlFor="guest-name">
                Name (optional)
              </label>
              <input
                id="guest-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                className="w-full rounded-md border border-[#dcc3aa] bg-white px-3 py-2 outline-none focus:border-[#b07a50]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#5d4634]" htmlFor="guest-message">
                Message
              </label>
              <textarea
                id="guest-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                rows={6}
                className="w-full rounded-md border border-[#dcc3aa] bg-white px-3 py-2 outline-none focus:border-[#b07a50]"
                required
              />
              <label className="mb-1 block text-sm text-[#5d4634]" htmlFor="guest-message">
                Where are you from? (optional)
              </label>
              <textarea
                id="guest-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                maxLength={200}
                rows={1}
                className="w-full rounded-md border border-[#dcc3aa] bg-white px-3 py-2 outline-none focus:border-[#b07a50]" />
            </div>

            {submitError && <p className="text-sm text-red-700">{submitError}</p>}

            <button
              type="submit"
              disabled={!canSubmit}
              className="rounded-full bg-[#7a5130] px-4 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </article>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-flex rounded-full border border-[#b88c67] bg-[#f6ead9] px-4 py-2 text-sm font-semibold text-[#5d3f29]"
          >
            Back Home
          </Link>
        </div>
      </section>

    </main>
  );
}
