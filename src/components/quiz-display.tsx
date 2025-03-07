"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Question } from "@/types"
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react"

interface QuizDisplayProps {
  questions: Question[]
}

export default function QuizDisplay({ questions }: QuizDisplayProps) {
  const [localQuestions, setLocalQuestions] = useState(questions)
  const [selected, setSelected] = useState("")
  const [counter, setCounter] = useState(0) // Start from 0 for first question
  const [correct, setCorrect] = useState(0)
  const [end, setEnd] = useState(false)
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(""))
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  function next() {
    // Store the user's answer
    const updatedAnswers = [...userAnswers]
    updatedAnswers[counter] = selected
    setUserAnswers(updatedAnswers)

    // Check if answer is correct
    if (selected === localQuestions[counter].answer) {
      const questions_temp = [...localQuestions]
      questions_temp[counter].correct = true
      setLocalQuestions(questions_temp)
      setCorrect(correct + 1)
    }

    // Clear selection for next question
    setSelected("")

    // Move to next question or end quiz
    if (counter === localQuestions.length - 1) {
      setEnd(true)
      console.log(localQuestions)
    } else {
      setCounter(counter + 1)
    }
  }

  const toggleQuestion = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index)
  }

  const scorePercentage = Math.round((correct / localQuestions.length) * 100)

  return (
    <div>
      {localQuestions != undefined && !end && (
        <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Question {counter + 1} of {localQuestions.length}
            </h2>
          </div>

          <h3 className="text-xl mb-4">{localQuestions[counter].question}</h3>

          <RadioGroup value={selected} onValueChange={setSelected} className="space-y-3">
            {localQuestions[counter].options.map((answer: string) => (
              <div
                key={answer}
                className="flex items-center space-x-2 p-3 rounded-md border hover:bg-accent/50 transition-colors"
              >
                <RadioGroupItem value={answer} id={answer} />
                <Label htmlFor={answer} className="flex-grow cursor-pointer">
                  {answer}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button className="mt-6 w-full" disabled={!selected} onClick={next}>
            {counter === localQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </div>
      )}

      {end && (
        <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Quiz Results</h2>
            <div className="text-xl">
              Your score:{" "}
              <span className="font-bold">
                {correct}/{localQuestions.length}
              </span>{" "}
              ({scorePercentage}%)
            </div>
            <div className="mt-2 text-muted-foreground">
              {scorePercentage >= 80 ? "Excellent work!" : scorePercentage >= 60 ? "Good job!" : "Try Again!"}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b pb-2">Question Summary</h3>
            <p className="text-sm text-muted-foreground mb-4">Click on a question to see all answer options</p>

            {localQuestions.map((question, index) => {
              const isCorrect = userAnswers[index] === question.answer
              const isExpanded = expandedQuestion === index

              return (
                <div
                  key={index}
                  className={`border rounded-lg p-4 transition-all duration-200 ${isExpanded ? "shadow-md" : ""} hover:bg-accent/5 cursor-pointer`}
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">
                          {index + 1}. {question.question}
                        </h4>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>

                      {!isExpanded && (
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex items-center">
                            <span className="w-32 text-muted-foreground">Your answer:</span>
                            <span className={isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                              {userAnswers[index] || "No answer provided"}
                            </span>
                          </div>

                          {!isCorrect && (
                            <div className="flex items-center">
                              <span className="w-32 text-muted-foreground">Correct answer:</span>
                              <span className="text-green-600 font-medium">{question.answer}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {isExpanded && (
                        <div className="mt-4 space-y-3">
                          <div className="text-sm font-medium mb-2">All options:</div>
                          {question.options.map((option) => {
                            const isUserAnswer = option === userAnswers[index]
                            const isCorrectAnswer = option === question.answer

                            return (
                              <div
                                key={option}
                                className={`p-3 rounded-md border ${
                                  isCorrectAnswer
                                    ? "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800"
                                    : isUserAnswer && !isCorrectAnswer
                                      ? "bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800"
                                      : "dark:border-gray-700"
                                }`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  <div className="flex items-center gap-2">
                                    {isUserAnswer && <span className="text-sm text-muted-foreground">Your answer</span>}
                                    {isCorrectAnswer && <CheckCircle className="h-4 w-4 text-green-500" />}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Button className="mt-8 w-full" onClick={() => window.location.reload()}>
            Generate New Quiz
          </Button>
        </div>
      )}
    </div>
  )
}

