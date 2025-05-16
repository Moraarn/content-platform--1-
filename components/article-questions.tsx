"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Award, CheckCircle, XCircle } from "lucide-react"
import { PointsEarnedDialog } from "@/components/points-earned-dialog"

interface ArticleQuestionsProps {
  articleId: number
}

export function ArticleQuestions({ articleId }: ArticleQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""))
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showPointsDialog, setShowPointsDialog] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    setScore(correctAnswers)
    setSubmitted(true)

    // Show points dialog if user got at least half correct
    if (correctAnswers >= questions.length / 2) {
      setShowPointsDialog(true)
    }
  }

  const currentQ = questions[currentQuestion]
  const isAnswered = answers[currentQuestion] !== ""
  const isLastQuestion = currentQuestion === questions.length - 1
  const allAnswered = answers.every((answer) => answer !== "")

  return (
    <Card>
      <CardHeader className="pb-3">
        <h3 className="font-semibold">Test Your Understanding</h3>
        <p className="text-sm text-muted-foreground">Answer these questions to earn points</p>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Quiz Complete!</h3>
              <p className="text-muted-foreground mt-1">
                You scored {score} out of {questions.length}
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    {answers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">{question.question}</p>
                      <p className="text-sm mt-1">
                        Your answer:{" "}
                        <span
                          className={
                            answers[index] === question.correctAnswer
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }
                        >
                          {question.options.find((opt) => opt.value === answers[index])?.label || "Not answered"}
                        </span>
                      </p>
                      {answers[index] !== question.correctAnswer && (
                        <p className="text-sm mt-1">
                          Correct answer:{" "}
                          <span className="text-green-600 font-medium">
                            {question.options.find((opt) => opt.value === question.correctAnswer)?.label}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>
                {allAnswered
                  ? "All questions answered"
                  : `${answers.filter((a) => a !== "").length}/${questions.length} answered`}
              </span>
            </div>

            <div>
              <h4 className="font-medium mb-3">{currentQ.question}</h4>
              <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                {currentQ.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className={submitted ? "justify-center" : "justify-between"}>
        {submitted ? (
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        ) : (
          <>
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <div>
              {isLastQuestion ? (
                <Button onClick={handleSubmit} disabled={!allAnswered}>
                  Submit
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!isAnswered}>
                  Next
                </Button>
              )}
            </div>
          </>
        )}
      </CardFooter>

      {showPointsDialog && (
        <PointsEarnedDialog points={30} open={showPointsDialog} onClose={() => setShowPointsDialog(false)} />
      )}
    </Card>
  )
}

const questions = [
  {
    question: "What technology has already transformed how Africans access financial services?",
    options: [
      { value: "a", label: "Blockchain" },
      { value: "b", label: "Mobile money platforms like M-Pesa" },
      { value: "c", label: "Artificial Intelligence" },
      { value: "d", label: "Virtual Reality" },
    ],
    correctAnswer: "b",
  },
  {
    question: "Which cities are mentioned as globally recognized centers of innovation in Africa?",
    options: [
      { value: "a", label: "Accra, Johannesburg, Tunis" },
      { value: "b", label: "Lagos, Nairobi, Cape Town, Cairo" },
      { value: "c", label: "Kigali, Addis Ababa, Casablanca" },
      { value: "d", label: "Dakar, Abuja, Durban" },
    ],
    correctAnswer: "b",
  },
  {
    question: "What is one application of blockchain technology mentioned in the article?",
    options: [
      { value: "a", label: "Digital currencies" },
      { value: "b", label: "Gaming platforms" },
      { value: "c", label: "Secure land registries" },
      { value: "d", label: "Social media networks" },
    ],
    correctAnswer: "c",
  },
  {
    question: "According to the article, what is one challenge that remains for technology in Africa?",
    options: [
      { value: "a", label: "Lack of innovation" },
      { value: "b", label: "Digital divides between urban and rural areas" },
      { value: "c", label: "Insufficient population" },
      { value: "d", label: "Too much foreign investment" },
    ],
    correctAnswer: "b",
  },
  {
    question:
      "What factor is mentioned as contributing to Africa's potential to leapfrog traditional development stages?",
    options: [
      { value: "a", label: "Colonial history" },
      { value: "b", label: "Natural resources" },
      { value: "c", label: "Young population and increasing internet penetration" },
      { value: "d", label: "International aid" },
    ],
    correctAnswer: "c",
  },
]
