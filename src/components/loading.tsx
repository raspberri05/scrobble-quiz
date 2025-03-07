"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function Loadinf() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => setProgress(25), 1000);
    timer = setTimeout(() => setProgress(50), 2000);
    timer = setTimeout(() => setProgress(75), 3000);
    timer = setTimeout(() => setProgress(100), 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        {" "}
        <Progress value={progress} />
        <p>Generating Quiz</p>
      </div>
    </div>
  );
}
