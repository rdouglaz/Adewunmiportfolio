"use client";

import { motion } from "motion/react";
import { Boxes, BrainCircuit, Rocket } from "lucide-react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Card, CardContent } from "@/components/ui/card";

const PILLARS = [
  {
    icon: Boxes,
    title: "Product thinking",
    text: "Starting from the real operational or creative problem — not the technology.",
  },
  {
    icon: BrainCircuit,
    title: "AI systems",
    text: "LLMs, RAG, and workflows composed into dependable product behavior.",
  },
  {
    icon: Rocket,
    title: "Practical execution",
    text: "Rapid prototypes that harden into production-ready tools people use daily.",
  },
];

const AboutSection = () => {
  return (
    <SectionWrapper
      id="about"
      className="flex w-full min-h-screen flex-col justify-center py-24"
    >
      <SectionHeader
        id="about"
        title="How I Think"
        desc="Product thinking, AI systems, practical execution"
        className="static mb-14"
      />
      <div className="mx-auto w-full max-w-4xl px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          I design and ship{" "}
          <strong className="font-semibold text-foreground">
            AI-native products
          </strong>{" "}
          that solve real operational and creative problems. My work sits at the
          intersection of product thinking, AI systems, and practical
          execution. I focus on turning messy real-world workflows into clean,
          production-ready tools that people actually use every day.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="h-full border-border/60 bg-card/60 backdrop-blur-sm transition-colors duration-300 hover:border-blue-500/40">
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                    <pillar.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pillar.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
