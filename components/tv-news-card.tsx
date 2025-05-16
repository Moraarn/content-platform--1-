"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Clock, Eye, Maximize2, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface TVNewsCardProps {
  news: {
    id: number
    title: string
    excerpt: string
    thumbnail: string
    source: string
    date: string
    duration: string
    category: string
    isLive?: boolean
    viewCount: number
    videoUrl: string
  }
}

export function TVNewsCard({ news }: TVNewsCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullVideo, setShowFullVideo] = useState(false)

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="relative">
            <Image
              src={news.thumbnail || "/placeholder.svg"}
              alt={news.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={() => setShowFullVideo(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              TV
            </Badge>
            {news.isLive && (
              <Badge variant="destructive" className="animate-pulse">
                LIVE
              </Badge>
            )}
          </div>
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline">{news.category}</Badge>
              <Link href={`/news/tv/${news.id}`} className="hover:underline">
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
              <span>{news.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{news.viewCount}</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showFullVideo} onOpenChange={setShowFullVideo}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="aspect-video bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-16 w-16 text-white/70" />
            </div>
            <Image
              src={news.thumbnail || "/placeholder.svg"}
              alt={news.title}
              fill
              className="object-cover opacity-50"
            />
          </div>
          <div className="p-6">
            <DialogTitle>{news.title}</DialogTitle>
            <p className="mt-2 text-muted-foreground">{news.excerpt}</p>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <span className="font-medium">{news.source}</span>
              <span>•</span>
              <span>{news.date}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{news.duration}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
