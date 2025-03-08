"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50; // Update every 50ms for smooth animation
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, interval);

    // Clear interval after duration
    const cleanup = setTimeout(() => {
      clearInterval(timer);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(cleanup);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <Progress value={progress} />
        <p>Generating Quiz</p>
      </div>
    </div>
  );
}
