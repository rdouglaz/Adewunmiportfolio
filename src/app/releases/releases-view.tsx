"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Download, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import releases, { type Release } from "@/data/releases";

export default function ReleasesView() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-28 md:pt-36">
      <div className="mb-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          Shipped &amp; shipping
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
          Releases
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Products I&apos;ve built and released — open source and commercial.
          Grab the latest release or dig into the source.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {releases.map((release, index) => (
          <ReleaseCard key={release.id} release={release} index={index} />
        ))}
      </div>
    </div>
  );
}

const ReleaseCard = ({
  release,
  index,
}: {
  release: Release;
  index: number;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Card
        className={cn(
          "group flex h-full flex-col border-border/60 bg-card/60 backdrop-blur-sm",
          "transition-[border-color,box-shadow,transform] duration-300",
          "hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.35)]"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                {release.tagline}
              </p>
              <CardTitle className="mt-1 font-display text-2xl font-bold tracking-tight">
                {release.name}
              </CardTitle>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                  release.license === "Open source"
                    ? "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                )}
              >
                {release.license}
              </span>
              <span className="rounded-md bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-secondary-foreground">
                {release.version}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {release.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {release.tech.map((item) => (
              <span
                key={item}
                className="rounded-md bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-secondary-foreground"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-border/60 pt-4">
            <div className="flex flex-wrap gap-2">
              {release.releaseUrl ? (
                <Link
                  href={release.releaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400">
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Latest Release
                  </span>
                </Link>
              ) : (
                <span
                  title="Add releaseUrl in src/data/releases.ts"
                  className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-dashed border-border px-4 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Release coming soon
                </span>
              )}
              {release.repoUrl && (
                <Link
                  href={release.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-xs font-medium transition-colors hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-300">
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    Source
                  </span>
                </Link>
              )}
            </div>
            {release.links.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {release.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/rellink inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="h-3 w-3 transition-transform group-hover/rellink:translate-x-0.5 group-hover/rellink:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}
