import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ArticlesPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground mt-1">Discover and newstribe with our content</p>
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-8" />
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

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 md:w-[600px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allArticles.map((article) => (
              <ArticleCard key={article.id} article={article} sponsored={article.sponsor !== undefined} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Load More Articles
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="technology" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allArticles
              .filter((article) => article.category === "Technology")
              .map((article) => (
                <ArticleCard key={article.id} article={article} sponsored={article.sponsor !== undefined} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="business" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allArticles
              .filter((article) => article.category === "Business")
              .map((article) => (
                <ArticleCard key={article.id} article={article} sponsored={article.sponsor !== undefined} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allArticles
              .filter((article) => article.category === "Health")
              .map((article) => (
                <ArticleCard key={article.id} article={article} sponsored={article.sponsor !== undefined} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="environment" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allArticles
              .filter((article) => article.category === "Environment")
              .map((article) => (
                <ArticleCard key={article.id} article={article} sponsored={article.sponsor !== undefined} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const allArticles = [
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
    category: "Business",
    points: 60,
  },
  {
    id: 4,
    title: "The Rise of AI in Healthcare",
    excerpt: "How artificial intelligence is revolutionizing healthcare diagnosis and treatment.",
    image: "/ai-healthcare.png",
    author: "Sarah Thompson",
    date: "May 3, 2025",
    readTime: 8,
    category: "Health",
    points: 80,
  },
  {
    id: 5,
    title: "Sustainable Business Practices",
    excerpt: "How companies are adopting sustainable practices to reduce their environmental impact.",
    image: "/sustainable-business.png",
    author: "David Wilson",
    date: "May 1, 2025",
    readTime: 5,
    category: "Business",
    points: 50,
  },
  {
    id: 6,
    title: "Revolutionizing Mobile Money with M-Pesa",
    excerpt: "Discover how M-Pesa is changing the way people handle finances across Africa.",
    image: "/mobile-money-transactions.png",
    author: "Safaricom",
    date: "May 12, 2025",
    readTime: 4,
    category: "Technology",
    points: 40,
    sponsor: "Safaricom",
  },
  {
    id: 7,
    title: "The Future of Ride-Sharing in Urban Areas",
    excerpt: "How Uber is making transportation more accessible and efficient in cities.",
    image: "/placeholder-s0773.png",
    author: "Uber",
    date: "May 11, 2025",
    readTime: 3,
    category: "Business",
    points: 30,
    sponsor: "Uber",
  },
  {
    id: 8,
    title: "Nutrition Myths Debunked",
    excerpt: "Separating fact from fiction when it comes to common nutrition beliefs.",
    image: "/healthy-food-nutrition.png",
    author: "Dr. Emily Chen",
    date: "April 28, 2025",
    readTime: 6,
    category: "Health",
    points: 60,
  },
  {
    id: 9,
    title: "Renewable Energy Solutions for Homes",
    excerpt: "Practical ways to incorporate renewable energy into your home.",
    image: "/placeholder-ha4jh.png",
    author: "Robert Green",
    date: "April 25, 2025",
    readTime: 7,
    category: "Environment",
    points: 70,
  },
]
