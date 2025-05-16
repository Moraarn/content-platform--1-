"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Award, SnowflakeIcon as Confetti, Share2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface PointsEarnedDialogProps {
  points: number
  open: boolean
  onClose: () => void
}

export function PointsEarnedDialog({ points, open, onClose }: PointsEarnedDialogProps) {
  const [progress, setProgress] = useState(0)
  const [currentPoints, setCurrentPoints] = useState(1250) // Simulated current points
  const [newTotal, setNewTotal] = useState(currentPoints)

  useEffect(() => {
    if (open) {
      // Animate progress bar
      const timer = setTimeout(() => {
        setProgress(100)
      }, 500)

      // Animate points counter
      let startPoints = currentPoints
      const targetPoints = currentPoints + points
      const duration = 1500 // ms
      const interval = 50 // ms
      const step = (targetPoints - startPoints) / (duration / interval)

      const pointsTimer = setInterval(() => {
        startPoints += step
        if (startPoints >= targetPoints) {
          setNewTotal(targetPoints)
          clearInterval(pointsTimer)
        } else {
          setNewTotal(Math.floor(startPoints))
        }
      }, interval)

      return () => {
        clearTimeout(timer)
        clearInterval(pointsTimer)
      }
    }
  }, [open, points, currentPoints])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Congratulations!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Confetti className="h-8 w-8 text-primary animate-bounce" />
            </div>
            <div className="bg-primary/10 rounded-full p-6">
              <Award className="h-12 w-12 text-primary" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">+{points} Points Earned!</h3>
            <p className="text-muted-foreground">You've earned points for engaging with this content</p>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>Previous total</span>
              <span>{currentPoints} points</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm font-medium">
              <span>New total</span>
              <span>{newTotal} points</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button className="w-full gap-2" onClick={onClose}>
            Continue Reading
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Share2 className="h-4 w-4" />
            Share Your Achievement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
