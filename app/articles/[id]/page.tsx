"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Calendar, Clock, Headphones, MessageSquare, Share2, Star, ThumbsUp } from "lucide-react"
import { CommentSection } from "@/components/comment-section"
import { ArticleQuestions } from "@/components/article-questions"
import { PointsEarnedDialog } from "@/components/points-earned-dialog"

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [isReading, setIsReading] = useState(false)
  const [showPointsDialog, setShowPointsDialog] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  // Simulate article data fetching
  const article = {
    id: Number.parseInt(params.id),
    title: "The Future of Technology in Africa",
    content: `
      <p>Africa is on the brink of a technological revolution. With a young population and increasing internet penetration, the continent is poised to leapfrog traditional development stages and embrace cutting-edge technologies.</p>
      
      <p>Mobile technology has already transformed how Africans access financial services, with mobile money platforms like M-Pesa leading the way. Now, innovations in areas such as renewable energy, healthcare, and education are creating new opportunities for growth and development.</p>
      
      <p>Startups across the continent are attracting record levels of investment, with tech hubs in Lagos, Nairobi, Cape Town, and Cairo becoming globally recognized centers of innovation. These entrepreneurs are developing solutions tailored to local challenges, from solar-powered irrigation systems to telemedicine platforms that extend healthcare to rural areas.</p>
      
      <p>The rise of blockchain technology is also making an impact, with applications ranging from secure land registries to transparent supply chains for agricultural products. This technology has the potential to address issues of trust and corruption that have historically hindered development.</p>
      
      <p>As connectivity continues to improve and costs decrease, more Africans are gaining access to digital services and information. This digital inclusion is empowering individuals and communities, creating new economic opportunities, and giving voice to previously marginalized groups.</p>
      
      <p>However, challenges remain. Digital divides between urban and rural areas, as well as between different socioeconomic groups, must be addressed to ensure that technological benefits are widely shared. Additionally, issues of data privacy, cybersecurity, and digital rights require attention as the continent's digital ecosystem evolves.</p>
      
      <p>Despite these challenges, the future of technology in Africa looks promising. With continued investment, supportive policies, and a focus on inclusive innovation, technology has the potential to accelerate sustainable development across the continent and position Africa as a global leader in digital innovation.</p>
    `,
    image: "/placeholder-j3wk0.png",
    author: "John Doe",
    authorImage: "/diverse-group.png",
    date: "May 10, 2025",
    readTime: 5,
    category: "Technology",
    points: 50,
    sponsored: false,
    trustRating: 4.5,
    blockchainVerified: true,
    comments: 24,
    likes: 156,
    shares: 42,
  }

  // Simulate reading time tracking
  useEffect(() => {
    if (isReading) {
      const interval = setInterval(() => {
        setReadingTime((prev) => {
          const newTime = prev + 1
          // Calculate progress as a percentage of the estimated read time
          const progress = Math.min((newTime / (article.readTime * 60)) * 100, 100)
          setReadingProgress(progress)

          // If user has read enough of the article, show points dialog
          if (progress >= 80 && earnedPoints === 0) {
            setEarnedPoints(article.points)
            setShowPointsDialog(true)
          }

          return newTime
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isReading, article.readTime, earnedPoints, article.points])

  // Start tracking when user views the article
  useEffect(() => {
    setIsReading(true)

    return () => {
      setIsReading(false)
    }
  }, [])

  // Format seconds to minutes and seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="container py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Link href="/articles" className="text-sm text-muted-foreground hover:underline">
              ← Back to Articles
            </Link>
            <h1 className="text-3xl font-bold mt-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.authorImage || "/placeholder.svg"} alt={article.author} />
                  <AvatarFallback>{article.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
              <Badge variant="outline" className="gap-1">
                <BookOpen className="h-3 w-3" />
                {article.category}
              </Badge>
              {article.blockchainVerified && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Blockchain Verified
                </Badge>
              )}
            </div>
          </div>

          <div className="relative">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              width={800}
              height={400}
              className="w-full rounded-lg object-cover h-[300px]"
            />
            <Button
              variant="secondary"
              className="absolute top-4 right-4 gap-2 px-4 py-2 shadow-md hover:shadow-lg transition-all"
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
            >
              <Headphones className="h-4 w-4" />
              {isAudioPlaying ? "Pause Audio" : "Listen to Article"}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Reading Progress</span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(readingTime)} / {article.readTime}:00
                </span>
              </div>
              <Badge variant="outline" className="gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                {article.points} points
              </Badge>
            </div>
            <Progress value={readingProgress} className="h-2" />
          </div>

          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-1">
                <ThumbsUp className="h-4 w-4" />
                Like ({article.likes})
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                Comment ({article.comments})
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share ({article.shares})
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Rate this article:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button key={star} variant="ghost" size="icon" className="h-8 w-8">
                    <Star
                      className={`h-4 w-4 ${star <= Math.round(article.trustRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                    <span className="sr-only">Rate {star} stars</span>
                  </Button>
                ))}
              </div>
              <span className="text-sm font-medium">{article.trustRating}</span>
            </div>
          </div>

          <Tabs defaultValue="questions">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="questions">Comprehension Questions</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="questions" className="mt-4">
              <ArticleQuestions articleId={article.id} />
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              <CommentSection articleId={article.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Related Articles</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((id) => (
                <div key={id} className="flex gap-3">
                  <Image
                    src={`/open-book-knowledge.png?height=60&width=60&query=article ${id}`}
                    alt="Related article"
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <Link href={`/articles/${id}`} className="font-medium text-sm hover:underline line-clamp-2">
                      {id === 1
                        ? "The Rise of AI in Everyday Life"
                        : id === 2
                          ? "Sustainable Energy Solutions for Africa"
                          : "Digital Transformation in Business"}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">
                      {id * 3 + 2} min read • {id * 10 + 20} points
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/articles">View More</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold">Recommended Quizzes</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2].map((id) => (
                <div key={id} className="space-y-2">
                  <Link href={`/quizzes/${id}`} className="font-medium text-sm hover:underline">
                    {id === 1 ? "Technology Trends Quiz" : "Environmental Awareness Challenge"}
                  </Link>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{id === 1 ? 8 : 10} questions</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span>{id === 1 ? 80 : 100} points</span>
                    </div>
                  </div>
                  {id === 1 && (
                    <Badge variant="outline" className="text-xs bg-primary/10 gap-1">
                      <Award className="h-3 w-3 text-primary" />
                      Win Airtime
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/quizzes">View More Quizzes</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {showPointsDialog && (
        <PointsEarnedDialog points={earnedPoints} open={showPointsDialog} onClose={() => setShowPointsDialog(false)} />
      )}
    </div>
  )
}
