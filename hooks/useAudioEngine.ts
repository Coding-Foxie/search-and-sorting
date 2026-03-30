"use client";

import { useRef, useEffect } from "react";

export const useAudioEngine = () => {
  const snapRef = useRef<HTMLAudioElement | null>(null);
  const successRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Pre-load sounds on mount
    snapRef.current = new Audio("/sounds/snap.mp3");
    successRef.current = new Audio("/sounds/success-chime.mp3");

    // Low latency settings
    if (snapRef.current) snapRef.current.volume = 0.2;
    if (successRef.current) successRef.current.volume = 0.5;
  }, []);

  const playSnap = () => {
    if (!snapRef.current) return;
    // Reset to start so it can play rapidly during fast sorts
    snapRef.current.currentTime = 0;
    snapRef.current.play().catch(() => {});
  };

  const playSuccess = () => {
    successRef.current?.play().catch(() => {});
  };

  return { playSnap, playSuccess };
};
