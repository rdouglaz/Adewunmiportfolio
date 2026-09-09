"use client";

import React from "react";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

import projects, { type Project } from "@/data/projects";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ProjectsSection = () => {
  return (
    <SectionWrapper
      id="projects"
      className="mx-auto w-full max-w-6xl px-4 py-24"
    >
      <SectionHeader
        id="projects"
        title="Selected Work"
        desc="AI products people actually use"
        className="static mb-14"
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
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
                {project.category}
              </p>
              <CardTitle className="mt-1 font-display text-2xl font-bold tracking-tight">
                {project.title}
              </CardTitle>
            </div>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                project.status === "Live"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
              )}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
                    project.status === "Live" ? "bg-emerald-500" : "bg-amber-500"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex h-2 w-2 rounded-full",
                    project.status === "Live" ? "bg-emerald-500" : "bg-amber-500"
                  )}
                />
              </span>
              {project.status}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-5">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Problem
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Approach
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {project.approach}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Key features
            </h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <li key={feature}>
                  <Badge
                    variant="secondary"
                    className="border border-blue-500/20 bg-blue-500/[0.07] font-normal text-foreground/90"
                  >
                    {feature}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex flex-wrap gap-2 border-t border-border/60 pt-4">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-md bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-secondary-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
};

export default ProjectsSection;
