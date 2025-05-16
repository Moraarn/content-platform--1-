import { ArticleCard } from "@/components/article-card"
import { QuizCard } from "@/components/quiz-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container py-6 space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">For You</h2>
          <Button variant="ghost" size="sm" className="gap-1">
            <Sparkles className="h-4 w-4" />
            AI Recommendations
          </Button>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>
          <TabsContent value="articles" className="mt-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <Link href="/articles">View All Articles</Link>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="quizzes" className="mt-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <Link href="/quizzes">View All Quizzes</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Sponsored Content</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sponsoredContent.map((content) => (
            <ArticleCard key={content.id} article={content} sponsored />
          ))}
        </div>
      </section>
    </div>
  )
}

// Sample data
const featuredArticles = [
  {
    id: 1,
    title: "The Future of Technology in Africa",
    excerpt: "Exploring how technology is transforming the African continent and creating new opportunities.",
    image: "/interconnected-technology.png",
    author: "John Doe",
    date: "May 10, 2025",
    readTime: 5,
    category: "Technology",
    points: 50,
  },
  {
    id: 2,
    title: "Understanding Climate Change",
    excerpt: "A comprehensive look at the causes and effects of climate change and what we can do about it.",
    image: "/climate-change-impacts.png",
    author: "Jane Smith",
    date: "May 8, 2025",
    readTime: 7,
    category: "Environment",
    points: 70,
  },
  {
    id: 3,
    title: "Financial Literacy for Beginners",
    excerpt: "Essential financial concepts everyone should know to build a secure financial future.",
    image: "/finance-growth.png",
    author: "Michael Johnson",
    date: "May 5, 2025",
    readTime: 6,
    category: "Finance",
    points: 60,
  },
]

const featuredQuizzes = [
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
]

const sponsoredContent = [
  {
    id: 1,
    title: "Revolutionizing Mobile Money with M-Pesa",
    excerpt: "Discover how M-Pesa is changing the way people handle finances across Africa.",
    image: "/mobile-money-transactions.png",
    author: "Safaricom",
    date: "May 12, 2025",
    readTime: 4,
    category: "Finance",
    points: 40,
    sponsor: "Safaricom",
  },
  {
    id: 2,
    title: "The Future of Ride-Sharing in Urban Areas",
    excerpt: "How Uber is making transportation more accessible and efficient in cities.",
    image: "/placeholder-lo5lm.png",
    author: "Uber",
    date: "May 11, 2025",
    readTime: 3,
    category: "Transportation",
    points: 30,
    sponsor: "Uber",
  },
]
