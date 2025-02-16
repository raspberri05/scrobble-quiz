import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Question } from "@/types";

interface QuizDisplayProps {
  questions: Question[];
}

export default function QuizDisplay({ questions }: QuizDisplayProps) {
  const [localQuestions, setLocalQuestions] = useState(questions);
  const [selected, setSelected] = useState("");
  const [counter, setCounter] = useState(0);
  const [end, setEnd] = useState(false);

  function next() {
    if (selected == localQuestions[counter].answer) {
      const questions_temp = localQuestions;
      questions_temp[counter].correct = true;
      setLocalQuestions(questions_temp);
    }
    setCounter(counter + 1);
    if (counter == localQuestions.length - 1) {
      console.log(localQuestions);
      setEnd(true);
    }
  }
  return (
    <div>
      {localQuestions != undefined && !end && (
        <div className="max-w-2xl mx-auto p-6  rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            {localQuestions[counter].question}
          </h2>
          <RadioGroup
            value={selected}
            onValueChange={setSelected}
            className="space-y-3"
          >
            {localQuestions[counter].options.map((answer: string) => (
              <div
                key={answer}
                className="flex items-center space-x-2 p-3 rounded-md border"
              >
                <RadioGroupItem value={answer} id={answer} />
                <Label htmlFor={answer} className="flex-grow cursor-pointer">
                  {answer}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Button className="mt-6 w-full" disabled={!selected} onClick={next}>
            Next Question
          </Button>
        </div>
      )}
      {end && (
        <div>
          <p>End of Quiz</p>
        </div>
      )}
    </div>
  );
}
