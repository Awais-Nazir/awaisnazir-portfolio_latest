"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function NavigationProgressBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // When route changes, complete progress quickly
    if (loading) {
      setProgress(100);
      const timeout = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  useEffect(() => {
    function handleLinkClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      // Only trigger for internal page changes (not hashes, not target="_blank", not external)
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        href !== pathname &&
        !anchor.target &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        setLoading(true);
        setProgress(30);
        setTimeout(() => setProgress(75), 120);
      }
    }

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [pathname]);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-[9999] h-[2.5px] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#e6b158] via-[#f0c276] to-[#ffe0a5] shadow-[0_0_12px_rgba(240,194,118,0.7)] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
