import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Clock, Share2, Star, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ArticleCardProps {
  article: {
    id: number
    title: string
    excerpt: string
    image: string
    author: string
    date: string
    readTime: number
    category: string
    points: number
    sponsor?: string
  }
  sponsored?: boolean
}

export function ArticleCard({ article, sponsored = false }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Link href={`/articles/${article.id}`}>
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        </Link>
        {sponsored && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Sponsored by {article.sponsor}
          </Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">
              {article.category} • {article.date}
            </p>
            <Link href={`/articles/${article.id}`} className="hover:underline">
              <h3 className="font-bold mt-1 line-clamp-2">{article.title}</h3>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{article.readTime} min read</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Volume2 className="h-4 w-4" />
            <span className="sr-only">Listen</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Badge variant="outline" className="ml-1">
            <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
            {article.points} pts
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
