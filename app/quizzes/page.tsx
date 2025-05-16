import { QuizCard } from "@/components/quiz-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, HelpCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function QuizzesPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground mt-1">Test your knowledge and earn points</p>
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search quizzes..." className="pl-8" />
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="points">Highest Points</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 gap-1">
            <Award className="h-3 w-3 text-primary" />
            Featured
          </Badge>
          <h2 className="text-2xl font-bold">Sponsored Quizzes</h2>
        </div>
        <p className="text-muted-foreground">Complete these quizzes for a chance to win special prizes</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allQuizzes
            .filter((quiz) => quiz.sponsored)
            .map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
        </div>
      </section>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 md:w-[600px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allQuizzes
              .filter((quiz) => !quiz.sponsored)
              .map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              Load More Quizzes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="general" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allQuizzes
              .filter((quiz) => !quiz.sponsored && quiz.category === "General")
              .map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="technology" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allQuizzes
              .filter((quiz) => !quiz.sponsored && quiz.category === "Technology")
              .map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allQuizzes
              .filter((quiz) => !quiz.sponsored && quiz.category === "History")
              .map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="science" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allQuizzes
              .filter((quiz) => !quiz.sponsored && quiz.category === "Science")
              .map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const allQuizzes = [
  {
    id: 1,
    title: "Test Your Knowledge on African History",
    description: "10 questions to test how well you know African history.",
    image: "/placeholder-rue0l.png",
    category: "History",
    questions: 10,
    points: 100,
    sponsored: false,
  },
  {
    id: 2,
    title: "Safaricom Services Quiz",
    description: "How well do you know Safaricom's products and services?",
    image: "/placeholder-qlhap.png",
    category: "Technology",
    questions: 8,
    points: 80,
    sponsored: true,
    sponsor: "Safaricom",
    prize: "Airtime worth Ksh 1,000",
  },
  {
    id: 3,
    title: "General Knowledge Challenge",
    description: "Test your knowledge across various subjects.",
    image: "/placeholder-dbyd4.png",
    category: "General",
    questions: 15,
    points: 150,
    sponsored: false,
  },
  {
    id: 4,
    title: "Technology Trends Quiz",
    description: "How well do you know the latest technology trends?",
    image: "/tech-trends-quiz.png",
    category: "Technology",
    questions: 10,
    points: 100,
    sponsored: false,
  },
  {
    id: 5,
    title: "Environmental Awareness Challenge",
    description: "Test your knowledge about environmental issues and solutions.",
    image: "/environmental-quiz.png",
    category: "Science",
    questions: 12,
    points: 120,
    sponsored: false,
  },
  {
    id: 6,
    title: "Uber Ride Experience Quiz",
    description: "How much do you know about Uber's services and features?",
    image: "/placeholder-s0773.png",
    category: "Technology",
    questions: 8,
    points: 80,
    sponsored: true,
    sponsor: "Uber",
    prize: "Ride voucher worth Ksh 500",
  },
  {
    id: 7,
    title: "World Geography Challenge",
    description: "Test your knowledge of countries, capitals, and landmarks.",
    image: "/geography-quiz.png",
    category: "General",
    questions: 15,
    points: 150,
    sponsored: false,
  },
  {
    id: 8,
    title: "Science Facts Quiz",
    description: "How much do you know about basic scientific principles?",
    image: "/science-quiz.png",
    category: "Science",
    questions: 10,
    points: 100,
    sponsored: false,
  },
  {
    id: 9,
    title: "Mobile Banking Quiz",
    description: "Test your knowledge about mobile banking services and security.",
    image: "/mobile-banking-quiz.png",
    category: "Technology",
    questions: 8,
    points: 80,
    sponsored: true,
    sponsor: "KCB Bank",
    prize: "KCB voucher worth Ksh 1,000",
  },
]
