"use client";

import * as React from "react";
import { config } from "@/data/config";

const siteHost = (() => {
  try {
    return new URL(config.site).hostname;
  } catch {
    return "";
  }
})();
const ENDPOINT = "/api/collect";
const KEY = "portfolio:site";

const isLocal = (h: string) =>
  h === "localhost" ||
  h === "127.0.0.1" ||
  h === siteHost ||
  (siteHost !== "" && h.endsWith(`.${siteHost}`));

// records the deployment hostname once per browser, so I know where builds run.
export default function Analytics() {
  React.useEffect(() => {
    const host = window.location.hostname;
    if (isLocal(host)) return;

    try {
      if (localStorage.getItem(KEY) === host) return;
      localStorage.setItem(KEY, host);
    } catch {
      /* private mode */
    }

    // text/plain -> simple request, no preflight
    const body = new Blob([JSON.stringify({ host })], { type: "text/plain" });
    navigator.sendBeacon?.(ENDPOINT, body);
  }, []);

  return null;
}
