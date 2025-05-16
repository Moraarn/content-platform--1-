"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Headphones, MessageSquare, Share2, ThumbsUp } from "lucide-react"
import { CommentSection } from "@/components/comment-section"

export default function PrintNewsPage({ params }: { params: { id: string } }) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  // Simulate print news data fetching
  const news = {
    id: Number.parseInt(params.id),
    title: "Analysis: The Changing Landscape of Global Politics",
    subtitle: "How geopolitical shifts are affecting international relations and trade",
    content: `
      <p>The global political landscape is undergoing significant transformation, with implications for international relations, trade agreements, and regional stability. This analysis examines the key trends and their potential impact on both global and local scales.</p>
      
      <h3>Shifting Power Dynamics</h3>
      <p>The traditional Western-dominated international order is increasingly being challenged by rising powers, particularly in Asia. China's economic and military expansion, Russia's assertiveness in its sphere of influence, and India's growing global presence are reshaping power dynamics that have been relatively stable since the end of the Cold War.</p>
      
      <p>These shifts are evident in international institutions, where emerging powers are demanding greater representation and influence. The establishment of alternative frameworks like the BRICS group and the Asian Infrastructure Investment Bank reflects this changing reality.</p>
      
      <h3>Technological Competition</h3>
      <p>Technology has emerged as a critical battleground in geopolitical competition. The race for dominance in artificial intelligence, quantum computing, and 5G networks is not merely about commercial advantage but is increasingly viewed through a national security lens.</p>
      
      <p>Countries are implementing more restrictive policies on technology transfer, foreign investment, and data flows, potentially fragmenting the global digital economy into competing spheres of influence.</p>
      
      <h3>Climate Politics</h3>
      <p>Climate change has become a central issue in international relations, with countries negotiating complex agreements on emissions reductions and climate finance. The transition to renewable energy is altering traditional energy geopolitics, potentially reducing the strategic importance of oil-producing regions while creating new dependencies around critical minerals needed for clean energy technologies.</p>
      
      <h3>Regional Integration and Fragmentation</h3>
      <p>While some regions are pursuing deeper integration through trade agreements and political cooperation, others are experiencing fragmentation due to nationalist movements and sovereignty concerns. The European Union continues to face challenges to its cohesion, while new regional frameworks are emerging in Africa, Asia, and Latin America.</p>
      
      <h3>Implications for Global Governance</h3>
      <p>These trends are testing the resilience of the post-World War II international order. Multilateral institutions are under pressure to reform and adapt to new realities, while the principles of liberal internationalism face challenges from both authoritarian states and populist movements within democracies.</p>
      
      <p>The coming decade will likely see continued contestation over the rules and norms that govern international relations, with significant implications for global stability, economic development, and human security.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&query=global politics summit",
    source: "Daily Nation",
    author: "Dr. James Mwangi",
    authorTitle: "International Relations Analyst",
    authorImage: "/placeholder.svg?height=40&width=40&query=professor politics",
    date: "May 15, 2025",
    readTime: 8,
    category: "Politics",
    isPremium: true,
    likes: 245,
    comments: 68,
    shares: 112,
    relatedNews: [
      {
        id: 2,
        title: "The Future of Renewable Energy in Africa",
        image: "/placeholder-nmloa.png",
        source: "Business Daily",
        readTime: 6,
      },
      {
        id: 3,
        title: "New Study Reveals Benefits of Mediterranean Diet",
        image: "/mediterranean-feast.png",
        source: "Nation Health",
        readTime: 5,
      },
      {
        id: 4,
        title: "Digital Transformation in Banking Sector",
        image: "/placeholder.svg?height=60&width=60&query=digital banking",
        source: "Business Daily",
        readTime: 7,
      },
    ],
  }

  return (
    <div className="container py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Link href="/news" className="text-sm text-muted-foreground hover:underline">
              ← Back to News Hub
            </Link>
            {news.isPremium && <Badge className="ml-2 bg-primary">Premium</Badge>}
            <h1 className="text-3xl font-bold mt-4">{news.title}</h1>
            <p className="text-xl text-muted-foreground mt-2">{news.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={news.authorImage || "/placeholder.svg"} alt={news.author} />
                  <AvatarFallback>{news.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="text-sm font-medium">{news.author}</span>
                  <p className="text-xs text-muted-foreground">{news.authorTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{news.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{news.readTime} min read</span>
              </div>
              <Badge variant="outline">{news.category}</Badge>
            </div>
          </div>

          <div className="relative">
            <Image
              src={news.image || "/placeholder.svg"}
              alt={news.title}
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
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="comments" className="mt-4">
              <CommentSection articleId={news.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Related Articles</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {news.relatedNews.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <Link href={`/news/print/${item.id}`} className="font-medium text-sm hover:underline line-clamp-2">
                      {item.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{item.source}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{item.readTime} min read</span>
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

          <Card>
            <CardHeader>
              <h3 className="font-semibold">Trending Topics</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  #EconomicPolicy
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  #GlobalPolitics
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  #ClimateAction
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  #TechInnovation
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  #HealthCare
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  #AfricanBusiness
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  #RenewableEnergy
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  #DigitalTransformation
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
