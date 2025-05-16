"use client"

import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Pause,
  Play,
  Share2,
  SkipBack,
  SkipForward,
  ThumbsUp,
  Volume2,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { CommentSection } from "@/components/comment-section"

export default function RadioNewsPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [playbackRate, setPlaybackRate] = useState(1)

  // Simulate radio news data fetching
  const news = {
    id: Number.parseInt(params.id),
    title: "Morning Business Report",
    description: "A comprehensive look at today's business news and market updates.",
    content: `
      <p>In today's Morning Business Report, we cover the latest economic developments, market trends, and business news from across the region and beyond.</p>
      
      <p>Our top story focuses on the government's new economic policy announcement, which aims to stimulate growth and create jobs through a series of targeted interventions.</p>
      
      <p>We'll also analyze the market response to this announcement, with insights from leading economists and business leaders on what these changes might mean for various sectors.</p>
      
      <p>Additionally, we'll look at the latest corporate earnings reports, merger and acquisition activities, and significant developments in the technology, finance, and manufacturing sectors.</p>
      
      <p>Our international business segment covers global market trends, trade developments, and how external factors are influencing our local economy.</p>
      
      <p>Finally, we'll provide practical advice for investors and business owners on how to navigate the current economic landscape and position themselves for success in the coming months.</p>
    `,
    thumbnail: "/placeholder.svg?height=400&width=800&query=radio studio business report",
    source: "Nation FM",
    host: "Sarah Johnson",
    hostImage: "/placeholder.svg?height=40&width=40&query=female radio host",
    date: "May 15, 2025",
    duration: "15:30",
    category: "Business",
    hasTranscript: true,
    likes: 156,
    comments: 42,
    shares: 78,
    relatedNews: [
      {
        id: 2,
        title: "Health Focus: New Vaccine Development",
        thumbnail: "/placeholder-wczu9.png",
        source: "Easy FM",
        duration: "22:45",
      },
      {
        id: 3,
        title: "Entertainment Weekly Roundup",
        thumbnail: "/placeholder-eyo3j.png",
        source: "QFM",
        duration: "18:20",
      },
      {
        id: 4,
        title: "Tech Talk: Latest Innovations",
        thumbnail: "/placeholder.svg?height=60&width=60&query=technology radio program",
        source: "Nation FM",
        duration: "12:15",
      },
    ],
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  function convertTimeToSeconds(timeString: string) {
    const [minutes, seconds] = timeString.split(":").map(Number)
    return minutes * 60 + seconds
  }

  const maxTime = convertTimeToSeconds(news.duration)

  const skipForward = () => {
    setCurrentTime(Math.min(currentTime + 30, maxTime))
  }

  const skipBackward = () => {
    setCurrentTime(Math.max(currentTime - 15, 0))
  }

  return (
    <div className="container py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Link href="/news" className="text-sm text-muted-foreground hover:underline">
              ← Back to News Hub
            </Link>
            <h1 className="text-3xl font-bold mt-4">{news.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={news.hostImage || "/placeholder.svg"} alt={news.host} />
                  <AvatarFallback>{news.host.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{news.host}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{news.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{news.duration}</span>
              </div>
              <Badge variant="outline">{news.category}</Badge>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={news.thumbnail || "/placeholder.svg"}
              alt={news.title}
              width={800}
              height={400}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-6">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={skipBackward}
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-16 w-16 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={skipForward}
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-sm">{formatTime(currentTime)}</span>
                  <div className="flex-1">
                    <Slider
                      value={[currentTime]}
                      max={maxTime}
                      step={1}
                      onValueChange={(value) => setCurrentTime(value[0])}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-sm">{news.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  className="w-[100px]"
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0])}
                />
              </div>
              <Select
                value={playbackRate.toString()}
                onValueChange={(value) => setPlaybackRate(Number.parseFloat(value))}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x</SelectItem>
                  <SelectItem value="0.75">0.75x</SelectItem>
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="1.25">1.25x</SelectItem>
                  <SelectItem value="1.5">1.5x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>

          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-1">
                <ThumbsUp className="h-4 w-4" />
                Like ({news.likes})
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                Comment ({news.comments})
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share ({news.shares})
              </Button>
            </div>
          </div>

          <Tabs defaultValue="transcript">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="transcript" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <h3 className="font-semibold">Full Transcript</h3>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" />
                    Download Transcript
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Badge>00:00</Badge>
                    <p className="text-sm">Welcome to our morning business report. I'm Sarah Johnson.</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>00:15</Badge>
                    <p className="text-sm">
                      Today we'll be covering the latest market updates, economic policy changes, and business news from
                      around the region.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>00:30</Badge>
                    <p className="text-sm">
                      Let's start with the breaking news about the government's new economic policy announcement.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>01:45</Badge>
                    <p className="text-sm">
                      The policy aims to boost growth by providing tax incentives for small businesses and startups.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>02:30</Badge>
                    <p className="text-sm">
                      Experts are predicting this could create thousands of new jobs in the technology and manufacturing
                      sectors.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>03:15</Badge>
                    <p className="text-sm">
                      Moving on to market updates, the stock exchange saw significant gains yesterday with the index
                      rising by 2.3%.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>04:00</Badge>
                    <p className="text-sm">
                      Technology and financial stocks led the rally, with several companies reporting better than
                      expected quarterly results.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>05:30</Badge>
                    <p className="text-sm">
                      In international news, trade negotiations between our country and regional partners are
                      progressing well.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>07:15</Badge>
                    <p className="text-sm">
                      The central bank has maintained interest rates, citing stable inflation figures and positive
                      economic indicators.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>09:00</Badge>
                    <p className="text-sm">
                      Several major companies have announced expansion plans that could significantly impact the job
                      market.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>11:30</Badge>
                    <p className="text-sm">
                      That's all for our morning business report. Join us again tomorrow for more updates. I'm Sarah
                      Johnson, thank you for listening.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              <CommentSection articleId={news.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Related Programs</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {news.relatedNews.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <Link href={`/news/radio/${item.id}`} className="font-medium text-sm hover:underline line-clamp-2">
                      {item.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{item.source}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold">Latest News</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Image
                  src="/placeholder-gh3f6.png"
                  alt="TV news"
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <Link href="/news/tv/1" className="font-medium text-sm hover:underline line-clamp-2">
                    Breaking: New Economic Policy Announced
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      TV
                    </Badge>
                    <span className="text-xs text-muted-foreground">KTN News</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Image
                  src="/placeholder-prewd.png"
                  alt="Print news"
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <Link href="/news/print/1" className="font-medium text-sm hover:underline line-clamp-2">
                    Analysis: The Changing Landscape of Global Politics
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Print
                    </Badge>
                    <span className="text-xs text-muted-foreground">Daily Nation</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Image
                  src="/placeholder-iq3zl.png"
                  alt="TV news"
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <Link href="/news/tv/2" className="font-medium text-sm hover:underline line-clamp-2">
                    Tech Giants Announce New Partnership
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      TV
                    </Badge>
                    <span className="text-xs text-muted-foreground">NTV</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
