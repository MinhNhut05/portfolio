import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { copy } from "@/content/copy";
import { site } from "@/content/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title", { name: site.name }),
    description: t("description"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const { hero } = copy;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-[var(--gutter)] py-[var(--section-py)]">
      <div className="w-full max-w-(--maxw) flex flex-col gap-[var(--s-6)]">
        <p className="font-body text-[var(--text-eyebrow)] uppercase tracking-[0.22em] text-gold-500 flex items-center gap-3">
          <span className="inline-block h-px w-6 bg-gold-500" />
          {hero.eyebrow}
        </p>

        <h1 className="font-display font-black text-[var(--text-hero)] leading-[0.98] text-text-hi">
          {hero.title}{" "}
          <span className="italic text-son-400">{hero.titleAccent}</span>
        </h1>

        <p className="font-body text-[var(--text-h2)] text-text-mid">
          {hero.sub}
        </p>

        <p className="font-body text-sm text-text-lo mt-[var(--s-12)]">
          ↓ {hero.scrollHint}
        </p>
      </div>
    </main>
  );
}