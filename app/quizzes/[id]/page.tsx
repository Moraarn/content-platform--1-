"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Award, CheckCircle, Clock, HelpCircle, XCircle } from "lucide-react"
import { PointsEarnedDialog } from "@/components/points-earned-dialog"

export default function QuizPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [timeRemaining, setTimeRemaining] = useState(60) // seconds per question
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [showPointsDialog, setShowPointsDialog] = useState(false)

  // Simulate quiz data fetching
  const quiz = {
    id: Number.parseInt(params.id),
    title: "Safaricom Services Quiz",
    description: "How well do you know Safaricom's products and services?",
    image: "/placeholder-qlhap.png",
    category: "Technology",
    questions: sampleQuestions,
    totalQuestions: 8,
    points: 80,
    sponsored: true,
    sponsor: "Safaricom",
    prize: "Airtime worth Ksh 1,000",
    timeLimit: 60, // seconds per question
  }

  useEffect(() => {
    // Initialize answers array
    if (answers.length === 0 && quiz.questions) {
      setAnswers(Array(quiz.questions.length).fill(""))
    }
  }, [quiz.questions, answers.length])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (quizStarted && !quizCompleted) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time's up for this question, move to next
            if (currentQuestion < quiz.questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1)
              return quiz.timeLimit
            } else {
              // End quiz if it's the last question
              handleSubmitQuiz()
              return 0
            }
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [quizStarted, quizCompleted, currentQuestion, quiz.questions, quiz.timeLimit])

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setTimeRemaining(quiz.timeLimit)
  }

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeRemaining(quiz.timeLimit)
    } else {
      handleSubmitQuiz()
    }
  }

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctCount = 0
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++
      }
    })

    setScore(correctCount)
    setQuizCompleted(true)

    // Show points dialog if user got at least half correct
    if (correctCount >= quiz.questions.length / 2) {
      const earnedPoints = Math.round((correctCount / quiz.questions.length) * quiz.points)
      setTimeout(() => {
        setShowPointsDialog(true)
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const currentQ = quiz.questions[currentQuestion]
  const isAnswered = answers[currentQuestion] !== ""
  const isLastQuestion = currentQuestion === quiz.questions.length - 1

  return (
    <div className="container py-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/quizzes" className="text-sm text-muted-foreground hover:underline">
          ← Back to Quizzes
        </Link>

        <div className="mt-4 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <Image
              src={quiz.image || "/placeholder.svg"}
              alt={quiz.title}
              width={300}
              height={200}
              className="rounded-lg object-cover w-full md:w-[300px] h-[200px]"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{quiz.category}</Badge>
                {quiz.sponsored && <Badge variant="secondary">Sponsored by {quiz.sponsor}</Badge>}
              </div>
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <p className="text-muted-foreground">{quiz.description}</p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{quiz.totalQuestions} questions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{quiz.timeLimit} sec per question</span>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Award className="h-3 w-3 text-primary" />
                  {quiz.points} points
                </Badge>
              </div>
              {quiz.sponsored && quiz.prize && (
                <div className="pt-2">
                  <Badge variant="outline" className="bg-primary/10 gap-1">
                    <Award className="h-3 w-3 text-primary" />
                    Prize: {quiz.prize}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {!quizStarted ? (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Ready to start the quiz?</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This quiz has {quiz.totalQuestions} questions. You'll have {quiz.timeLimit} seconds to answer each
                  question.
                  {quiz.sponsored &&
                    quiz.prize &&
                    ` Complete the quiz with a high score for a chance to win ${quiz.prize}.`}
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={handleStartQuiz}>Start Quiz</Button>
              </CardFooter>
            </Card>
          ) : quizCompleted ? (
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Quiz Completed!</h2>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg mb-4">
                  You scored <span className="font-bold">{score}</span> out of {quiz.questions.length}
                </p>

                <div className="space-y-6 mt-8">
                  <h3 className="font-semibold text-left">Your Answers</h3>
                  {quiz.questions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-4 text-left">
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
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link href="/quizzes">More Quizzes</Link>
                </Button>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className={`text-sm font-medium ${timeRemaining < 10 ? "text-red-500" : ""}`}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </div>
                <Progress value={(timeRemaining / quiz.timeLimit) * 100} className="h-2 mt-2" />
              </CardHeader>
              <CardContent className="py-4">
                <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
                <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                  <div className="space-y-3">
                    {currentQ.options.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent"
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {isAnswered ? "Answer selected" : "Select an answer"}
                </div>
                <Button onClick={handleNextQuestion} disabled={!isAnswered}>
                  {isLastQuestion ? "Finish Quiz" : "Next Question"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>

      {showPointsDialog && (
        <PointsEarnedDialog
          points={Math.round((score / quiz.questions.length) * quiz.points)}
          open={showPointsDialog}
          onClose={() => setShowPointsDialog(false)}
        />
      )}
    </div>
  )
}

const sampleQuestions = [
  {
    question: "What year was M-Pesa launched in Kenya?",
    options: [
      { value: "a", label: "2005" },
      { value: "b", label: "2007" },
      { value: "c", label: "2009" },
      { value: "d", label: "2011" },
    ],
    correctAnswer: "b",
  },
  {
    question: "Which of the following is NOT a Safaricom service?",
    options: [
      { value: "a", label: "M-Shwari" },
      { value: "b", label: "M-Pesa" },
      { value: "c", label: "M-Kopa" },
      { value: "d", label: "M-Transfer" },
    ],
    correctAnswer: "d",
  },
  {
    question: "What is the maximum amount you can hold in your M-Pesa account?",
    options: [
      { value: "a", label: "Ksh 50,000" },
      { value: "b", label: "Ksh 100,000" },
      { value: "c", label: "Ksh 150,000" },
      { value: "d", label: "Ksh 300,000" },
    ],
    correctAnswer: "c",
  },
  {
    question: "Which of these is a Safaricom home internet service?",
    options: [
      { value: "a", label: "Home Fiber" },
      { value: "b", label: "Home Connect" },
      { value: "c", label: "Home Link" },
      { value: "d", label: "Home Net" },
    ],
    correctAnswer: "a",
  },
  {
    question: "What color is primarily associated with the Safaricom brand?",
    options: [
      { value: "a", label: "Blue" },
      { value: "b", label: "Red" },
      { value: "c", label: "Green" },
      { value: "d", label: "Yellow" },
    ],
    correctAnswer: "c",
  },
  {
    question: "Which of these is Safaricom's music streaming service?",
    options: [
      { value: "a", label: "Safaricom Music" },
      { value: "b", label: "Songa" },
      { value: "c", label: "Skiza" },
      { value: "d", label: "Bonga" },
    ],
    correctAnswer: "b",
  },
  {
    question: "What is the name of Safaricom's loyalty program?",
    options: [
      { value: "a", label: "Safaricom Rewards" },
      { value: "b", label: "Safaricom Plus" },
      { value: "c", label: "Bonga Points" },
      { value: "d", label: "Pesa Points" },
    ],
    correctAnswer: "c",
  },
  {
    question: "Which short code is used to check your M-Pesa balance?",
    options: [
      { value: "a", label: "*144#" },
      { value: "b", label: "*456#" },
      { value: "c", label: "*234#" },
      { value: "d", label: "*334#" },
    ],
    correctAnswer: "a",
  },
]
