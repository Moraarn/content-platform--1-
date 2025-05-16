"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Eye, MessageSquare, Pause, Play, Share2, ThumbsUp, Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { CommentSection } from "@/components/comment-section"

export default function TVNewsPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [showCaptions, setShowCaptions] = useState(false)

  // Simulate TV news data fetching
  const news = {
    id: Number.parseInt(params.id),
    title: "Breaking: New Economic Policy Announced",
    description: "The government has announced a new economic policy aimed at boosting growth and creating jobs.",
    content: `
      <p>The government today unveiled a comprehensive economic policy package designed to stimulate growth and address unemployment challenges facing the nation.</p>
      
      <p>Finance Minister James Mwangi announced the measures during a press conference at the Treasury building, highlighting several key initiatives that will be implemented over the next six months.</p>
      
      <p>"This policy framework represents a bold step forward in our economic strategy," said Mwangi. "We are focusing on creating an enabling environment for businesses while ensuring inclusive growth that benefits all citizens."</p>
      
      <p>Key elements of the policy include:</p>
      <ul>
        <li>Tax incentives for small and medium enterprises</li>
        <li>Infrastructure development projects in underserved regions</li>
        <li>Digital economy initiatives to boost technology adoption</li>
        <li>Skills development programs targeting youth unemployment</li>
      </ul>
      
      <p>Economic analysts have generally responded positively to the announcement, though some have expressed concerns about implementation timelines and funding mechanisms.</p>
      
      <p>"The policy direction is promising, but success will depend on effective execution," said Dr. Sarah Odhiambo, an economist at the University of Nairobi. "Previous initiatives have sometimes faltered at the implementation stage."</p>
      
      <p>Business leaders from various sectors attended the announcement, with many expressing optimism about the potential impact on the economy.</p>
      
      <p>The government estimates that the measures could create up to 50,000 new jobs within the first year and potentially add 2 percentage points to GDP growth.</p>
    `,
    thumbnail: "/placeholder-hjb6v.png",
    source: "NTV",
    reporter: "John Kamau",
    reporterImage: "/placeholder-hfi61.png",
    date: "May 15, 2025",
    duration: "10:25",
    category: "Politics",
    isLive: false,
    viewCount: 1250,
    likes: 342,
    comments: 87,
    shares: 156,
    relatedNews: [
      {
        id: 2,
        title: "Business Leaders React to New Economic Policy",
        thumbnail: "/placeholder.svg?height=60&width=60&query=business meeting",
        source: "NTV",
        duration: "5:30",
      },
      {
        id: 3,
        title: "Opposition Criticizes Government's Economic Approach",
        thumbnail: "/placeholder.svg?height=60&width=60&query=parliament debate",
        source: "Nation TV",
        duration: "7:15",
      },
      {
        id: 4,
        title: "Market Response to Economic Policy Announcement",
        thumbnail: "/placeholder.svg?height=60&width=60&query=stock market",
        source: "CNBC Africa",
        duration: "4:45",
      },
    ],
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const maxTime = 625 // 10:25 in seconds

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
                  <AvatarImage src={news.reporterImage || "/placeholder.svg"} alt={news.reporter} />
                  <AvatarFallback>{news.reporter.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{news.reporter}</span>
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
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{news.viewCount} views</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="aspect-video bg-black relative rounded-lg overflow-hidden">
              <Image src={news.thumbnail || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 h-16 w-16"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
              </div>
              {showCaptions && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-center">
                  Finance Minister James Mwangi announces new economic policy measures.
                </div>
              )}
            </div>

            <div className="space-y-2">
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

              <div className="flex items-center justify-between">
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={showCaptions ? "bg-primary/10" : ""}
                >
                  {showCaptions ? "Hide Captions" : "Show Captions"}
                </Button>
              </div>
            </div>
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

          <Tabs defaultValue="comments">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>
            <TabsContent value="comments" className="mt-4">
              <CommentSection articleId={news.id} />
            </TabsContent>
            <TabsContent value="transcript" className="mt-4">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Full Transcript</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Badge>00:00</Badge>
                    <p className="text-sm">
                      Good evening and welcome to KTN News. I'm John Kamau with tonight's top story.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>00:15</Badge>
                    <p className="text-sm">
                      The government today unveiled a comprehensive economic policy package designed to stimulate growth
                      and address unemployment challenges facing the nation.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>00:45</Badge>
                    <p className="text-sm">
                      Finance Minister James Mwangi announced the measures during a press conference at the Treasury
                      building.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>01:10</Badge>
                    <p className="text-sm">
                      [Finance Minister James Mwangi speaking] "This policy framework represents a bold step forward in
                      our economic strategy. We are focusing on creating an enabling environment for businesses while
                      ensuring inclusive growth that benefits all citizens."
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>01:45</Badge>
                    <p className="text-sm">
                      The key elements of the policy include tax incentives for small and medium enterprises,
                      infrastructure development projects in underserved regions, digital economy initiatives, and
                      skills development programs targeting youth unemployment.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>02:30</Badge>
                    <p className="text-sm">
                      Economic analysts have generally responded positively to the announcement, though some have
                      expressed concerns about implementation.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>03:15</Badge>
                    <p className="text-sm">
                      [Dr. Sarah Odhiambo, Economist] "The policy direction is promising, but success will depend on
                      effective execution. Previous initiatives have sometimes faltered at the implementation stage."
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>04:00</Badge>
                    <p className="text-sm">
                      Business leaders from various sectors attended the announcement, with many expressing optimism
                      about the potential impact on the economy.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>05:30</Badge>
                    <p className="text-sm">
                      The government estimates that the measures could create up to 50,000 new jobs within the first
                      year and potentially add 2 percentage points to GDP growth.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>06:15</Badge>
                    <p className="text-sm">
                      Opposition leaders have criticized aspects of the plan, claiming it doesn't address structural
                      economic issues.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>07:45</Badge>
                    <p className="text-sm">
                      Markets responded positively to the announcement, with the stock exchange index rising by 1.5% by
                      close of trading.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>09:30</Badge>
                    <p className="text-sm">
                      Implementation of the policy is expected to begin next month, with the first quarterly review
                      scheduled for October.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Related News</h3>
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
                    <Link href={`/news/tv/${item.id}`} className="font-medium text-sm hover:underline line-clamp-2">
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
                  src="/placeholder.svg?height=60&width=60&query=tech news"
                  alt="Tech news"
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
              <div className="flex gap-3">
                <Image
                  src="/placeholder-iw1jq.png"
                  alt="Radio news"
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <Link href="/news/radio/1" className="font-medium text-sm hover:underline line-clamp-2">
                    Morning Business Report
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Radio
                    </Badge>
                    <span className="text-xs text-muted-foreground">Capital FM</span>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
