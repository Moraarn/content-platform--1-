import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface NewsCardProps {
  news: {
    id: number
    title: string
    excerpt: string
    image: string
    source: string
    date: string
    readTime: number
    category: string
    isPremium?: boolean
  }
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Link href={`/news/print/${news.id}`}>
          <Image
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        </Link>
        {news.isPremium && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Premium
          </Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline">{news.category}</Badge>
            <Link href={`/news/print/${news.id}`} className="hover:underline">
              <h3 className="font-bold mt-1 line-clamp-2">{news.title}</h3>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{news.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">{news.source}</span>
          <span>•</span>
          <span>{news.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{news.readTime} min read</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
