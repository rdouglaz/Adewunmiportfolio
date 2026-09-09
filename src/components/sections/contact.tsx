"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto py-24">
      <SectionHeader
        id="contact"
        className="relative mb-14 static"
        title="Have an idea worth building?"
        desc="I'm always open to discussing new AI product ideas, collaborations, or interesting problems."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 items-start">
        <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl">
          <CardHeader>
            <CardTitle className="font-display text-2xl md:text-3xl">
              Send a message
            </CardTitle>
            <CardDescription>
              Tell me about your idea — I&apos;ll get back to you as soon as
              possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl">
            <CardContent className="flex items-center gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">Email</p>
                <a
                  href={`mailto:${config.email}`}
                  className="block truncate text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  {config.email}
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl">
            <CardContent className="flex items-center gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {config.location}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-500/25 bg-gradient-to-br from-blue-600/10 via-transparent to-sky-500/10 backdrop-blur-sm rounded-xl">
            <CardContent className="p-6">
              <p className="font-display text-lg font-semibold leading-snug">
                From first call to working prototype — faster than you think.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Product thinking, AI workflows, and rapid execution. If the
                problem is real, let&apos;s build the smallest version that
                solves it.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
