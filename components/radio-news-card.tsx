"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { FileText, Pause, Play, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface RadioNewsCardProps {
  news: {
    id: number
    title: string
    excerpt: string
    thumbnail: string
    source: string
    date: string
    duration: string
    category: string
    hasTranscript: boolean
    audioUrl: string
  }
}

export function RadioNewsCard({ news }: RadioNewsCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showTranscript, setShowTranscript] = useState(false)
  const [volume, setVolume] = useState(80)
  const maxTime = convertTimeToSeconds(news.duration)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  function convertTimeToSeconds(timeString: string) {
    const [minutes, seconds] = timeString.split(":").map(Number)
    return minutes * 60 + seconds
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative">
          <Image
            src={news.thumbnail || "/placeholder.svg"}
            alt={news.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
          <Badge variant="outline" className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm">
            Radio
          </Badge>
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline">{news.category}</Badge>
              <Link href={`/news/radio/${news.id}`} className="hover:underline">
                <h3 className="font-bold mt-1 line-clamp-2">{news.title}</h3>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{news.excerpt}</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <div className="flex-1">
                <Slider
                  value={[currentTime]}
                  max={maxTime}
                  step={1}
                  onValueChange={(value) => setCurrentTime(value[0])}
                />
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(currentTime)} / {news.duration}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                className="flex-1"
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{news.source}</span>
            <span>•</span>
            <span>{news.date}</span>
          </div>
          {news.hasTranscript && (
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowTranscript(true)}>
              <FileText className="h-4 w-4" />
              Transcript
            </Button>
          )}
        </CardFooter>
      </Card>

      {news.hasTranscript && (
        <Dialog open={showTranscript} onOpenChange={setShowTranscript}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{news.title} - Transcript</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge>00:00</Badge>
                  <p>Welcome to our morning business report. I'm Sarah Johnson.</p>
                </div>
                <div className="flex gap-2">
                  <Badge>00:15</Badge>
                  <p>
                    Today we'll be covering the latest market updates, economic policy changes, and business news from
                    around the region.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge>00:30</Badge>
                  <p>Let's start with the breaking news about the government's new economic policy announcement.</p>
                </div>
                <div className="flex gap-2">
                  <Badge>01:45</Badge>
                  <p>The policy aims to boost growth by providing tax incentives for small businesses and startups.</p>
                </div>
                <div className="flex gap-2">
                  <Badge>02:30</Badge>
                  <p>
                    Experts are predicting this could create thousands of new jobs in the technology and manufacturing
                    sectors.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge>03:15</Badge>
                  <p>
                    Moving on to market updates, the stock exchange saw significant gains yesterday with the index
                    rising by 2.3%.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge>04:00</Badge>
                  <p>
                    Technology and financial stocks led the rally, with several companies reporting better than expected
                    quarterly results.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge>05:30</Badge>
                  <p>
                    In international news, trade negotiations between our country and regional partners are progressing
                    well.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge>07:15</Badge>
                  <p>
                    The central bank has maintained interest rates, citing stable inflation figures and positive
                    economic indicators.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge>09:00</Badge>
                  <p>
                    Several major companies have announced expansion plans that could significantly impact the job
                    market.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge>11:30</Badge>
                  <p>
                    That's all for our morning business report. Join us again tomorrow for more updates. I'm Sarah
                    Johnson, thank you for listening.
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
