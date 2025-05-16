import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"
import { RedeemPointsDialog } from "@/components/redeem-points-dialog"

export default function RewardsPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">Rewards Marketplace</h1>
          <p className="text-muted-foreground mt-1">Redeem your points for exciting rewards</p>
        </div>
        <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-bold text-lg">1,250</span>
          </div>
          <span className="text-muted-foreground">Available Points</span>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 md:w-[600px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="airtime">Airtime</TabsTrigger>
          <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="airtime" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allRewards
              .filter((reward) => reward.category === "Airtime")
              .map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="vouchers" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allRewards
              .filter((reward) => reward.category === "Vouchers")
              .map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="experiences" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allRewards
              .filter((reward) => reward.category === "Experiences")
              .map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="merchandise" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allRewards
              .filter((reward) => reward.category === "Merchandise")
              .map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface RewardCardProps {
  reward: {
    id: number
    title: string
    description: string
    image: string
    points: number
    category: string
    available: boolean
    sponsor?: string
    featured?: boolean
    expiresAt?: string
  }
}

function RewardCard({ reward }: RewardCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={reward.image || "/placeholder.svg"}
          alt={reward.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        {reward.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
        {reward.sponsor && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            By {reward.sponsor}
          </Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="space-y-1">
          <Badge variant="outline">{reward.category}</Badge>
          <h3 className="font-bold">{reward.title}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{reward.description}</p>
        {reward.expiresAt && <p className="text-xs text-muted-foreground mt-2">Expires: {reward.expiresAt}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="font-bold">{reward.points}</span>
          <span className="text-sm text-muted-foreground">points</span>
        </div>
        <RedeemPointsDialog reward={reward} />
      </CardFooter>
    </Card>
  )
}

const allRewards = [
  {
    id: 1,
    title: "Ksh 100 Airtime",
    description: "Redeem for Ksh 100 airtime for any network",
    image: "/placeholder.svg?height=200&width=400&query=mobile airtime",
    points: 100,
    category: "Airtime",
    available: true,
  },
  {
    id: 2,
    title: "Ksh 500 Airtime",
    description: "Redeem for Ksh 500 airtime for any network",
    image: "/placeholder.svg?height=200&width=400&query=mobile phone",
    points: 500,
    category: "Airtime",
    available: true,
  },
  {
    id: 3,
    title: "Ksh 1,000 Shopping Voucher",
    description: "Redeem for a Ksh 1,000 shopping voucher at Naivas Supermarket",
    image: "/placeholder.svg?height=200&width=400&query=supermarket shopping",
    points: 1000,
    category: "Vouchers",
    available: true,
    sponsor: "Naivas",
    featured: true,
  },
  {
    id: 4,
    title: "Movie Tickets for Two",
    description: "Redeem for two movie tickets at IMAX Cinema",
    image: "/placeholder.svg?height=200&width=400&query=cinema tickets",
    points: 800,
    category: "Experiences",
    available: true,
    expiresAt: "June 30, 2025",
  },
  {
    id: 5,
    title: "Branded T-Shirt",
    description: "Redeem for a high-quality branded t-shirt",
    image: "/placeholder.svg?height=200&width=400&query=branded tshirt",
    points: 600,
    category: "Merchandise",
    available: true,
  },
  {
    id: 6,
    title: "Ksh 2,000 Uber Voucher",
    description: "Redeem for Ksh 2,000 worth of Uber rides",
    image: "/placeholder.svg?height=200&width=400&query=uber ride",
    points: 2000,
    category: "Vouchers",
    available: true,
    sponsor: "Uber",
  },
  {
    id: 7,
    title: "Coffee Shop Gift Card",
    description: "Redeem for a Ksh 500 gift card at Java House",
    image: "/placeholder.svg?height=200&width=400&query=coffee shop",
    points: 500,
    category: "Vouchers",
    available: true,
  },
  {
    id: 8,
    title: "Wireless Earbuds",
    description: "Redeem for a pair of high-quality wireless earbuds",
    image: "/placeholder.svg?height=200&width=400&query=wireless earbuds",
    points: 3000,
    category: "Merchandise",
    available: true,
    featured: true,
  },
]
