import Link from "next/link";
import { categories } from "./types";

function getDomain(href?: string): string {
  if (!href) return "";

  try {
    return new URL(href).hostname.replace("www.", "");
  } catch {
    return href;
  }
}

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7efe2_0%,#eadbc5_100%)] px-4 py-8 text-[#2f2218] sm:px-6">
      <section className="mx-auto w-full max-w-6xl">
        <header className="mb-8 text-center">
          <p className="text-xs font-bold tracking-[0.08em] text-[#6f5138] uppercase">
            Local Picks
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Recommendations
          </h1>
          <p className="mt-2 text-sm text-[#6f5138] sm:text-base">
            Coffee, restaurants, nightlife, and activities we love.
          </p>
        </header>

        <div className="space-y-6">
          {categories.map((category) => (
            <section
              key={category.title}
              className="rounded-2xl border border-[#d6b99a] bg-[#fff8ef] p-5 shadow-[0_10px_24px_rgba(72,38,12,0.1)] sm:p-6"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-[#4d3422]">
                  {category.title}
                </h2>
                <p className="mt-1 text-sm text-[#6f5138]">
                  {category.description}
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => {
                  const domain = getDomain(item.href);

                  return (
                    <li
                      key={item.name}
                      className="rounded-xl border border-[#e4ccb1] bg-white/80 p-4"
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block"
                        >
                          <p className="text-base font-semibold text-[#5d3f29] hover:underline">
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm text-[#7b5b42]">
                            {item.note}
                          </p>
                          <div className="mt-3 flex items-center gap-2 rounded-md border border-[#ead7c2] bg-[#fff8ef] px-2 py-1.5">
                            <img
                              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                              alt=""
                              className="h-4 w-4"
                            />
                            <span className="truncate text-xs text-[#6f5138]">
                              {domain}
                            </span>
                            <span className="ml-auto text-xs font-semibold text-[#7a5130]">
                              Visit site
                            </span>
                          </div>
                        </a>
                      ) : (
                        <>
                          <p className="text-base font-semibold text-[#5d3f29]">
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm text-[#7b5b42]">
                            {item.note}
                          </p>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8 text-center">
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
