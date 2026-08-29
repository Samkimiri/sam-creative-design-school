"use client";

import { useEffect } from "react";

export default function PremiumMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));

    // Content that mounts later (e.g. switching a tab, opening a modal) never
    // appears in the initial querySelectorAll above, so it would stay stuck at
    // opacity: 0 forever without this - watch for new [data-reveal] nodes too.
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.matches("[data-reveal]")) {
            if (reduceMotion) {
              node.classList.add("is-visible");
            } else {
              observer.observe(node);
            }
          }

          node.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((child) => {
            if (reduceMotion) {
              child.classList.add("is-visible");
            } else {
              observer.observe(child);
            }
          });
        });
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
