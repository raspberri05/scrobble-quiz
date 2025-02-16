"use client";

import Loading from "@/components/loading";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Question } from "@/types";
import QuizDisplay from "@/components/quiz-display";

function QuizContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const period = searchParams.get("period");
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/main?username=${username}&period=${period}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setLoading(false);
          setQuestions(data.questions);
        }
      });
  }, [username, period]);

  return (
    <div>
      {loading && <Loading />}
      {!loading && <QuizDisplay questions={questions} />}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <QuizContent />
    </Suspense>
  );
}
