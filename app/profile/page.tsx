"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ChevronRight, Gift, HelpCircle, Star, Trophy, User } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20 mb-2">
                    <AvatarImage src="/placeholder.svg?height=80&width=80&query=user" alt="@user" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-sm text-muted-foreground">@johndoe</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <User className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Points</span>
                    <span className="font-medium">1,250</span>
                  </div>
                  <Progress value={62.5} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span>Level 2</span>
                    <span>2,000 for Level 3</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary mb-1" />
                    <span className="text-lg font-bold">42</span>
                    <span className="text-xs text-muted-foreground">Articles Read</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <HelpCircle className="h-5 w-5 text-primary mb-1" />
                    <span className="text-lg font-bold">15</span>
                    <span className="text-xs text-muted-foreground">Quizzes Taken</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <Trophy className="h-5 w-5 text-primary mb-1" />
                    <span className="text-lg font-bold">3</span>
                    <span className="text-xs text-muted-foreground">Prizes Won</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <Gift className="h-5 w-5 text-primary mb-1" />
                    <span className="text-lg font-bold">5</span>
                    <span className="text-xs text-muted-foreground">Rewards Redeemed</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/rewards">
                  Redeem Points
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Your content preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Favorite Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Technology</Badge>
                    <Badge variant="secondary">Politics</Badge>
                    <Badge variant="secondary">Finance</Badge>
                    <Badge variant="secondary">Health</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Language Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">English (Primary)</Badge>
                    <Badge variant="outline">Swahili</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="trust">Trust Ratings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                        <div className={`p-2 rounded-full bg-${activity.color}-100`}>{activity.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                            {activity.points && (
                              <Badge variant="outline" className="text-xs gap-1">
                                <Star className="h-3 w-3 fill-primary text-primary" />
                                {activity.points} pts
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("activity")}>
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Quizzes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topQuizzes.map((quiz, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
                            <span className="font-bold text-primary">{index + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{quiz.title}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{quiz.score}</span>
                              <Badge variant="outline" className="text-xs">
                                {quiz.points} pts
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reading Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted p-3 rounded-lg text-center">
                          <p className="text-2xl font-bold">42</p>
                          <p className="text-xs text-muted-foreground">Articles Read</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg text-center">
                          <p className="text-2xl font-bold">3.5h</p>
                          <p className="text-xs text-muted-foreground">Reading Time</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Most Read Categories</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Technology</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Politics</span>
                              <span>25%</span>
                            </div>
                            <Progress value={25} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Finance</span>
                              <span>10%</span>
                            </div>
                            <Progress value={10} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {activityDays.map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <h3 className="text-sm font-medium mb-3">{day.date}</h3>
                        <div className="space-y-4">
                          {day.activities.map((activity, actIndex) => (
                            <div
                              key={actIndex}
                              className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                            >
                              <div className={`p-2 rounded-full bg-${activity.color}-100`}>{activity.icon}</div>
                              <div className="flex-1">
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                                  {activity.points && (
                                    <Badge variant="outline" className="text-xs gap-1">
                                      <Star className="h-3 w-3 fill-primary text-primary" />
                                      {activity.points} pts
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rewards History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rewardsHistory.map((reward, index) => (
                      <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Gift className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{reward.title}</p>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{reward.date}</span>
                            <Badge variant="outline" className="text-xs">
                              {reward.points} pts
                            </Badge>
                            <Badge variant={reward.status === "Redeemed" ? "secondary" : "outline"} className="text-xs">
                              {reward.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/rewards">Browse Available Rewards</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="trust" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trust Ratings</CardTitle>
                  <CardDescription>Your ratings of article trustworthiness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trustRatings.map((rating, index) => (
                      <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                        <Image
                          src={`/placeholder.svg?height=60&width=60&query=article ${index}`}
                          alt={rating.title}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <Link href={`/articles/${index + 1}`} className="font-medium hover:underline">
                            {rating.title}
                          </Link>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${star <= rating.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">{rating.rating}/5</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{rating.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Sample data
const recentActivity = [
  {
    icon: <BookOpen className="h-4 w-4 text-green-600" />,
    color: "green",
    title: "Read Article",
    description: "The Future of Technology in Africa",
    time: "2 hours ago",
    points: 50,
  },
  {
    icon: <HelpCircle className="h-4 w-4 text-blue-600" />,
    color: "blue",
    title: "Completed Quiz",
    description: "Safaricom Services Quiz",
    time: "Yesterday",
    points: 80,
  },
  {
    icon: <Gift className="h-4 w-4 text-purple-600" />,
    color: "purple",
    title: "Redeemed Reward",
    description: "Airtime worth Ksh 500",
    time: "3 days ago",
    points: -500,
  },
]

const activityDays = [
  {
    date: "Today",
    activities: [
      {
        icon: <BookOpen className="h-4 w-4 text-green-600" />,
        color: "green",
        title: "Read Article",
        description: "The Future of Technology in Africa",
        time: "2 hours ago",
        points: 50,
      },
    ],
  },
  {
    date: "Yesterday",
    activities: [
      {
        icon: <HelpCircle className="h-4 w-4 text-blue-600" />,
        color: "blue",
        title: "Completed Quiz",
        description: "Safaricom Services Quiz",
        time: "1:30 PM",
        points: 80,
      },
      {
        icon: <BookOpen className="h-4 w-4 text-green-600" />,
        color: "green",
        title: "Read Article",
        description: "Understanding Climate Change",
        time: "10:15 AM",
        points: 70,
      },
    ],
  },
  {
    date: "May 13, 2025",
    activities: [
      {
        icon: <Gift className="h-4 w-4 text-purple-600" />,
        color: "purple",
        title: "Redeemed Reward",
        description: "Airtime worth Ksh 500",
        time: "4:45 PM",
        points: -500,
      },
      {
        icon: <BookOpen className="h-4 w-4 text-green-600" />,
        color: "green",
        title: "Read Article",
        description: "Financial Literacy for Beginners",
        time: "2:20 PM",
        points: 60,
      },
    ],
  },
]

const topQuizzes = [
  {
    title: "Safaricom Services Quiz",
    score: "7/8 correct",
    points: 70,
  },
  {
    title: "Technology Trends Quiz",
    score: "9/10 correct",
    points: 90,
  },
  {
    title: "African History Challenge",
    score: "8/10 correct",
    points: 80,
  },
]

const rewardsHistory = [
  {
    title: "Airtime Voucher",
    description: "Ksh 500 Safaricom Airtime",
    date: "May 13, 2025",
    points: 500,
    status: "Redeemed",
  },
  {
    title: "Shopping Voucher",
    description: "Ksh 1,000 Naivas Supermarket Voucher",
    date: "April 28, 2025",
    points: 1000,
    status: "Redeemed",
  },
  {
    title: "Movie Tickets",
    description: "2 Tickets for IMAX Cinema",
    date: "April 10, 2025",
    points: 800,
    status: "Expired",
  },
]

const trustRatings = [
  {
    title: "The Future of Technology in Africa",
    rating: 5,
    date: "Rated 2 hours ago",
  },
  {
    title: "Understanding Climate Change",
    rating: 4,
    date: "Rated yesterday",
  },
  {
    title: "Financial Literacy for Beginners",
    rating: 3,
    date: "Rated 3 days ago",
  },
  {
    title: "The Rise of AI in Everyday Life",
    rating: 5,
    date: "Rated 1 week ago",
  },
]
