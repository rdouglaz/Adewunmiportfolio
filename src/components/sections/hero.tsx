import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { config } from "@/data/config";

import SectionWrapper from "../ui/section-wrapper";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <SectionWrapper id="hero" className={cn("relative w-full min-h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "min-h-[calc(100dvh-3rem)] md:min-h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:p-28"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col max-w-xl">
              <BlurIn delay={0.7}>
                <p className="md:self-start mt-4 font-medium text-sm sm:text-base md:text-lg text-slate-500 dark:text-zinc-400 cursor-default">
                  {config.author} — AI Product Builder
                </p>
              </BlurIn>

              <BlurIn delay={1}>
                <h1
                  className={cn(
                    "mt-3 font-display font-bold cursor-default",
                    "text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]",
                    "text-slate-900 dark:text-white text-center md:text-left"
                  )}
                >
                  Build AI products{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-400 dark:from-blue-400 dark:to-sky-300">
                    people actually use.
                  </span>
                </h1>
              </BlurIn>

              <BlurIn delay={1.2}>
                <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 dark:text-zinc-400 cursor-default text-center md:text-left">
                  {config.description.long}
                </p>
              </BlurIn>

              <BlurIn delay={1.35}>
                <p className="mt-4 flex items-center justify-center md:justify-start gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-zinc-500">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {config.location}
                </p>
              </BlurIn>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-fit">
                <BoxReveal delay={1.6} width="100%">
                  <Link href="#projects" className="block">
                    <Button className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-500 text-white dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-white">
                      View My Work
                      <ArrowDown size={18} aria-hidden="true" />
                    </Button>
                  </Link>
                </BoxReveal>
                <BoxReveal delay={1.75} width="100%">
                  <Link href="#contact" className="block">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto gap-2 border-blue-600/40 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      Let&apos;s Talk
                      <ArrowRight size={18} aria-hidden="true" />
                    </Button>
                  </Link>
                </BoxReveal>
              </div>

              <BlurIn delay={1.9}>
                <div className="mt-6 flex items-center justify-center md:justify-start gap-2">
                  <Link
                    href={config.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Adewunmi Saliu on X (Twitter)"
                  >
                    <Button variant="outline" size="icon" aria-label="X profile">
                      <SiX size={18} />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Adewunmi Saliu on GitHub"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="GitHub profile"
                    >
                      <SiGithub size={18} />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Adewunmi Saliu on LinkedIn"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="LinkedIn profile"
                    >
                      <SiLinkedin size={18} />
                    </Button>
                  </Link>
                </div>
              </BlurIn>
            </div>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
