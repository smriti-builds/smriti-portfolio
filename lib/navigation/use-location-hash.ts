"use client";

import { useSyncExternalStore } from "react";

function getHashFromLocation(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.hash.replace(/^#/, "");
}

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

function getHashSnapshot() {
  return getHashFromLocation();
}

function getServerHashSnapshot() {
  return "";
}

export function useLocationHash() {
  return useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);
}
