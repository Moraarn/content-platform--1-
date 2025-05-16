"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Search } from "lucide-react"
import { NewsCard } from "@/components/news-card"
import { TVNewsCard } from "@/components/tv-news-card"
import { RadioNewsCard } from "@/components/radio-news-card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function NewsPage() {
  const [date, setDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">News Hub</h1>
          <p className="text-muted-foreground mt-1">All news content from Nation Media Group</p>
          <p className="text-muted-foreground mt-1">All your news sources in one place</p>
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search across all media..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFilters.includes("politics") ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFilter("politics")}
        >
          Politics
        </Button>
        <Button
          variant={activeFilters.includes("business") ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFilter("business")}
        >
          Business
        </Button>
        <Button
          variant={activeFilters.includes("technology") ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFilter("technology")}
        >
          Technology
        </Button>
        <Button
          variant={activeFilters.includes("health") ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFilter("health")}
        >
          Health
        </Button>
        <Button
          variant={activeFilters.includes("entertainment") ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFilter("entertainment")}
        >
          Entertainment
        </Button>
        <Button
          variant={activeFilters.includes("sports") ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFilter("sports")}
        >
          Sports
        </Button>
        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])}>
            Clear filters
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tv">TV</TabsTrigger>
          <TabsTrigger value="radio">Radio</TabsTrigger>
          <TabsTrigger value="print">Print</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tvNews.map((news) => (
              <TVNewsCard key={news.id} news={news} />
            ))}
            {radioNews.map((news) => (
              <RadioNewsCard key={news.id} news={news} />
            ))}
            {printNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tv" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tvNews.map((news) => (
              <TVNewsCard key={news.id} news={news} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="radio" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {radioNews.map((news) => (
              <RadioNewsCard key={news.id} news={news} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="print" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {printNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const tvNews = [
  {
    id: 1,
    title: "Breaking: New Economic Policy Announced",
    excerpt: "The government has announced a new economic policy aimed at boosting growth and creating jobs.",
    thumbnail: "/placeholder-gh3f6.png",
    source: "NTV",
    date: "May 15, 2025",
    duration: "10:25",
    category: "Politics",
    isLive: true,
    viewCount: 1250,
    videoUrl: "#",
  },
  {
    id: 2,
    title: "Tech Giants Announce New Partnership",
    excerpt: "Major technology companies have formed a new alliance to develop AI standards.",
    thumbnail: "/placeholder-iq3zl.png",
    source: "NTV",
    date: "May 14, 2025",
    duration: "8:15",
    category: "Technology",
    isLive: false,
    viewCount: 890,
    videoUrl: "#",
  },
  {
    id: 3,
    title: "Sports Update: National Team Qualifies for Finals",
    excerpt: "The national team has secured a spot in the finals after a thrilling match yesterday.",
    thumbnail: "/placeholder-xlsso.png",
    source: "Nation TV",
    date: "May 13, 2025",
    duration: "5:40",
    category: "Sports",
    isLive: false,
    viewCount: 1560,
    videoUrl: "#",
  },
]

const radioNews = [
  {
    id: 1,
    title: "Morning Business Report",
    excerpt: "A comprehensive look at today's business news and market updates.",
    thumbnail: "/placeholder-iw1jq.png",
    source: "Nation FM",
    date: "May 15, 2025",
    duration: "15:30",
    category: "Business",
    hasTranscript: true,
    audioUrl: "#",
  },
  {
    id: 2,
    title: "Health Focus: New Vaccine Development",
    excerpt: "Experts discuss the latest developments in vaccine research and public health initiatives.",
    thumbnail: "/placeholder-wczu9.png",
    source: "Easy FM",
    date: "May 14, 2025",
    duration: "22:45",
    category: "Health",
    hasTranscript: true,
    audioUrl: "#",
  },
  {
    id: 3,
    title: "Entertainment Weekly Roundup",
    excerpt: "Catch up on all the entertainment news and celebrity updates from the past week.",
    thumbnail: "/placeholder-eyo3j.png",
    source: "QFM",
    date: "May 12, 2025",
    duration: "18:20",
    category: "Entertainment",
    hasTranscript: false,
    audioUrl: "#",
  },
]

const printNews = [
  {
    id: 1,
    title: "Analysis: The Changing Landscape of Global Politics",
    excerpt: "An in-depth analysis of how geopolitical shifts are affecting international relations and trade.",
    image: "/placeholder-prewd.png",
    source: "Daily Nation",
    date: "May 15, 2025",
    readTime: 8,
    category: "Politics",
    isPremium: true,
  },
  {
    id: 2,
    title: "The Future of Renewable Energy in Africa",
    excerpt: "How renewable energy projects are transforming the power sector across the continent.",
    image: "/placeholder-nmloa.png",
    source: "Business Daily",
    date: "May 14, 2025",
    readTime: 6,
    category: "Technology",
    isPremium: false,
  },
  {
    id: 3,
    title: "New Study Reveals Benefits of Mediterranean Diet",
    excerpt:
      "Research confirms the health benefits of following a Mediterranean diet rich in olive oil and vegetables.",
    image: "/mediterranean-feast.png",
    source: "Nation Health",
    date: "May 13, 2025",
    readTime: 5,
    category: "Health",
    isPremium: false,
  },
]
