"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export default function ReportIssuePage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canSubmit = useMemo(() => {
    return message.trim().length > 0 && !isSubmitting;
  }, [message, isSubmitting]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDate = date.trim();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setSubmitError("Please describe the issue before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/report-issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName || null,
          date: trimmedDate || null,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const detail =
          errorBody && typeof errorBody.detail === "string"
            ? errorBody.detail
            : `Failed to submit (${response.status})`;

        throw new Error(detail);
      }

      setIsSubmitted(true);
      setName("");
      setDate("");
      setMessage("");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8efe5_0%,#ead8c3_100%)] px-4 py-8 text-[#2f2218] sm:px-6">
      <section className="mx-auto w-full max-w-3xl">
        <div className="rounded-[28px] border border-[#b99672] bg-[linear-gradient(145deg,#e8d2ba_0%,#d5b594_100%)] p-6 text-[#3f281a] shadow-[0_18px_40px_rgba(72,38,12,0.18)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8a5b36]">
            Guest Support
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#422b1c] sm:text-4xl">
            Report an issue
          </h1>
          <p className="mt-3 max-w-[60ch] text-sm leading-6 text-[#5f4430] sm:text-base">
            Let us know if something needs attention and we will get back to you
            as soon as possible.
          </p>

          {isSubmitted ? (
            <div className="mt-6 rounded-2xl border border-[#cfe0c3] bg-[#f3faed] p-5 text-[#355126]">
              <h2 className="text-xl font-semibold">Thank you</h2>
              <p className="mt-2 text-sm leading-6 sm:text-base">
                Your report has been submitted successfully.
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="rounded-full bg-[#6d8f4e] px-4 py-2.5 font-semibold text-white transition hover:bg-[#5d7c42]"
                >
                  Submit another issue
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="issue-name"
                  className="mb-1.5 block text-sm font-medium text-[#4d3526]"
                >
                  Name
                </label>
                <input
                  id="issue-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={80}
                  className="w-full rounded-xl border border-[#c6a27d] bg-[#f8efe4] px-3 py-2.5 outline-none transition focus:border-[#a6764d] focus:bg-[#fffaf3]"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label
                  htmlFor="issue-date"
                  className="mb-1.5 block text-sm font-medium text-[#4d3526]"
                >
                  Date
                </label>
                <input
                  id="issue-date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-xl border border-[#c6a27d] bg-[#f8efe4] px-3 py-2.5 outline-none transition focus:border-[#a6764d] focus:bg-[#fffaf3]"
                />
              </div>

              <div>
                <label
                  htmlFor="issue-message"
                  className="mb-1.5 block text-sm font-medium text-[#4d3526]"
                >
                  Whats going on?
                </label>
                <textarea
                  id="issue-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={2000}
                  rows={7}
                  required
                  className="w-full rounded-xl border border-[#c6a27d] bg-[#f8efe4] px-3 py-2.5 outline-none transition focus:border-[#a6764d] focus:bg-[#fffaf3]"
                  placeholder="Example: The kitchen sink is leaking under the cabinet."
                />
              </div>

              {submitError ? (
                <p className="text-sm font-medium text-[#b42318]">
                  {submitError}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="rounded-full bg-[#7a5130] px-5 py-2.5 font-semibold text-white transition hover:bg-[#684326] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit report"}
                </button>

                <Link
                  href="/"
                  className="inline-flex rounded-full border border-[#b88c67] bg-[#f6ead9] px-4 py-2.5 text-sm font-semibold text-[#5d3f29] transition hover:bg-[#efdfc9]"
                >
                  Back Home
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
