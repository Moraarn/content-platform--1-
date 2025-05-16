"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, Reply, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CommentSectionProps {
  articleId: number
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(sampleComments)

  const handleSubmitComment = () => {
    if (!comment.trim()) return

    const newComment = {
      id: comments.length + 1,
      user: {
        name: "You",
        image: "/placeholder.svg?height=40&width=40&query=user",
        username: "current_user",
      },
      content: comment,
      timestamp: "Just now",
      likes: 0,
      replies: [],
    }

    setComments([newComment, ...comments])
    setComment("")
  }

  const handleLike = (commentId: number) => {
    setComments(comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40&query=user" alt="@you" />
            <AvatarFallback>YOU</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitComment} disabled={!comment.trim()}>
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.user.image || "/placeholder.svg"} alt={comment.user.name} />
              <AvatarFallback>{comment.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.user.name}</span>
                <span className="text-xs text-muted-foreground">@{comment.user.username}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="mt-1 text-sm">{comment.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs gap-1"
                  onClick={() => handleLike(comment.id)}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  {comment.likes > 0 && comment.likes}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs gap-1">
                  <Reply className="h-3.5 w-3.5" />
                  Reply
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    {comment.user.username === "current_user" && <DropdownMenuItem>Delete</DropdownMenuItem>}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {comment.replies.length > 0 && (
                <div className="mt-4 space-y-4 pl-4 border-l">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.user.image || "/placeholder.svg"} alt={reply.user.name} />
                        <AvatarFallback>{reply.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{reply.user.name}</span>
                          <span className="text-xs text-muted-foreground">@{reply.user.username}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                        </div>
                        <p className="mt-1 text-sm">{reply.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            {reply.likes > 0 && reply.likes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const sampleComments = [
  {
    id: 1,
    user: {
      name: "Jane Smith",
      image: "/diverse-woman-portrait.png",
      username: "jane_smith",
    },
    content:
      "This article provides great insights into how technology is transforming Africa. I particularly liked the section on mobile money platforms.",
    timestamp: "2 hours ago",
    likes: 12,
    replies: [
      {
        id: 101,
        user: {
          name: "Michael Johnson",
          image: "/placeholder.svg?height=40&width=40&query=man",
          username: "michael_j",
        },
        content: "I agree! M-Pesa has completely changed how people handle finances in Kenya and beyond.",
        timestamp: "1 hour ago",
        likes: 5,
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "David Wilson",
      image: "/diverse-group.png",
      username: "david_w",
    },
    content:
      "I'd love to see more examples of how blockchain is being used for land registries. Does anyone have links to specific projects?",
    timestamp: "3 hours ago",
    likes: 8,
    replies: [],
  },
  {
    id: 3,
    user: {
      name: "Sarah Thompson",
      image: "/placeholder.svg?height=40&width=40&query=woman profile",
      username: "sarah_t",
    },
    content:
      "The point about digital divides is crucial. We need to ensure that technological benefits reach rural areas too, not just major cities.",
    timestamp: "5 hours ago",
    likes: 15,
    replies: [],
  },
]
