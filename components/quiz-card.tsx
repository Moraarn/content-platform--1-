import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Award, HelpCircle, Star } from "lucide-react"

interface QuizCardProps {
  quiz: {
    id: number
    title: string
    description: string
    image: string
    category: string
    questions: number
    points: number
    sponsored: boolean
    sponsor?: string
    prize?: string
  }
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Link href={`/quizzes/${quiz.id}`}>
          <Image
            src={quiz.image || "/placeholder.svg"}
            alt={quiz.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        </Link>
        {quiz.sponsored && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Sponsored by {quiz.sponsor}
          </Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <div>
          <p className="text-sm text-muted-foreground">{quiz.category}</p>
          <Link href={`/quizzes/${quiz.id}`} className="hover:underline">
            <h3 className="font-bold mt-1 line-clamp-2">{quiz.title}</h3>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
          <span>{quiz.questions} questions</span>
        </div>
        <div className="flex items-center gap-2">
          {quiz.sponsored && quiz.prize && (
            <Badge variant="outline" className="bg-primary/10">
              <Award className="h-3 w-3 mr-1 text-primary" />
              {quiz.prize}
            </Badge>
          )}
          <Badge variant="outline">
            <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
            {quiz.points} pts
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
