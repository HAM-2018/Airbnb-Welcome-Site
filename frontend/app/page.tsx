"use client"
import { useState } from "react";
import Link from "next/link";
import { cards, faqData } from "./types";

export default function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const wifi = {
    network: "Guesthouse_WiFi_EXT",
    password: "Guesthouse2018",
  };

  const homeHighlights = [
    "A quiet, private stay designed for rest and recharge",
    "Fast Wi-Fi and comfortable spaces for both work and downtime",
    "Walkable to the river, coffee, and downtown area if your up for and adventure",
  ]; 

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fef9f2_0%,#f5ede2_100%)] px-4 py-6 text-[#2f2620] sm:px-6 sm:py-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,#f2dfc8_0%,transparent_35%),radial-gradient(circle_at_90%_20%,#e8cba7_0%,transparent_30%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(68,50,35,0.02)_1px,transparent_1px)] [background-size:100%_8px]"
        aria-hidden="true"
      />

      <section className="relative z-10 mx-auto w-full max-w-5xl rounded-3xl border border-[#e7d7c4] bg-[linear-gradient(135deg,#fff6ea_0%,#faefe1_100%)] p-6 shadow-[0_10px_30px_rgba(121,85,52,0.12)] sm:p-8">
        <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-[#7f5e40]">
          Welcome to your stay
        </p>
        <h1 className="mt-2 mb-3 text-4xl leading-tight font-semibold sm:text-5xl">
          Your home away from home
        </h1>
        <p className="m-0 max-w-[68ch] text-[1.04rem] leading-7 text-[#473728]">
          We are glad you are here. This space was prepared to feel calm, cozy,
          and easy from the moment you walk in. Below you will find the key
          details for your stay plus quick links if you need anything.
        </p>
        <ul className="mt-5 grid list-disc gap-2 pl-5 text-[#4c3b2c]">
          {homeHighlights.map((item) => (
            <li key={item} className="leading-6">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link
            href="/faq"
            className="rounded-full bg-[#45bb3a] px-4 py-2.5 font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
          >
            House FAQ
          </Link>
          <Link
            href="/recommendations"
            className="rounded-full bg-[#45bb3a] px-4 py-2.5 font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
          >
            Neighborhood picks
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-4 w-full max-w-5xl rounded-2xl border border-[#e8d8c7] bg-[#fff8f0] p-5 sm:p-6">
        <div>
          <h2 className="m-0 text-[1.35rem] font-semibold">Wi-Fi</h2>
          <p className="mt-1 text-[#6a5646]">Connect quickly and settle in.</p>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <InfoPill label="Network" value={wifi.network} />
          <InfoPill label="Password" value={wifi.password} />
        </div>

      </section>

      <section className="relative z-10 mx-auto mt-4 grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <article
            key={c.title}
            className="rounded-2xl border border-[#e6d4c0] bg-white p-4 shadow-[0_8px_22px_rgba(109,74,43,0.08)]"
          >
            <h3 className="mb-2.5 text-[1.04rem] font-semibold text-[#3e2f23]">
              {c.title}
            </h3>
            <ul className="grid list-disc gap-2 pl-4.5 text-[#594737]">
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <section className="relative z-10 mx-auto mt-4 w-full max-w-5xl rounded-2xl border border-[#e8d8c7] bg-[#fff8f0] p-5 sm:p-6">
        <h1 className="text-3xl font-bold mb-8 ">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{item.question}</h3>
              <span className="text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>

            {openIndex === index && (
              <p className="mt-3 text-gray-600">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
      </section>

      <footer className="relative z-10 mx-auto mt-5 w-full max-w-5xl px-1 pt-2 text-[0.95rem] text-[#5e4a3a]">
        <p className="my-1">
          Need something? Please reach out to us on the AirBnB app with any other questions you may have!
        </p>
        <p className="my-1 font-bold">Emergency: call 911</p>
      </footer>
    </main>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[220px] rounded-xl border border-[#d7c0a8] bg-white px-3 py-2.5">
      <div className="text-[0.72rem] font-semibold tracking-[0.06em] text-[#7c6351] uppercase">
        {label}
      </div>
      <div className="mt-1 break-words text-[1.1rem] font-bold text-[#3a2d23]">
        {value}
      </div>
    </div>
  );
}
