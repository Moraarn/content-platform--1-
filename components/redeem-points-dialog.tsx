"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gift, Phone, Star } from "lucide-react"

interface RedeemPointsDialogProps {
  reward: {
    id: number
    title: string
    points: number
    category: string
  }
}

export function RedeemPointsDialog({ reward }: RedeemPointsDialogProps) {
  const [open, setOpen] = useState(false)
  const [redeemMethod, setRedeemMethod] = useState("web")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [ussdCode, setUssdCode] = useState("*123*456#")
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isRedeemed, setIsRedeemed] = useState(false)

  const handleRedeem = () => {
    setIsRedeeming(true)

    // Simulate API call
    setTimeout(() => {
      setIsRedeeming(false)
      setIsRedeemed(true)
    }, 2000)
  }

  const resetDialog = () => {
    setIsRedeemed(false)
    setRedeemMethod("web")
    setPhoneNumber("")
    setOpen(false)
  }

  const userPoints = 1250 // Simulated user points
  const canRedeem = userPoints >= reward.points

  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={!canRedeem} variant={canRedeem ? "default" : "outline"} size="sm">
        {canRedeem ? "Redeem" : "Not Enough Points"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isRedeemed ? "Redemption Successful!" : "Redeem Reward"}</DialogTitle>
            {!isRedeemed && (
              <DialogDescription>
                You are about to redeem {reward.title} for {reward.points} points.
              </DialogDescription>
            )}
          </DialogHeader>

          {isRedeemed ? (
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 rounded-full p-6">
                <Gift className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Reward Redeemed!</h3>
                <p className="text-muted-foreground">
                  You have successfully redeemed {reward.title} for {reward.points} points.
                </p>
                {redeemMethod === "web" ? (
                  <p className="text-sm">
                    Your reward code is:{" "}
                    <span className="font-bold">
                      REW-{Math.floor(Math.random() * 10000)}-{Math.floor(Math.random() * 10000)}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm">Your reward has been sent to {phoneNumber}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-bold">{reward.points}</span>
                  <span className="text-sm text-muted-foreground">points</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Your balance: <span className="font-medium">{userPoints} points</span>
                </div>
              </div>

              <Tabs defaultValue="web" onValueChange={setRedeemMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="web">Web</TabsTrigger>
                  <TabsTrigger value="ussd">USSD</TabsTrigger>
                </TabsList>
                <TabsContent value="web" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">We'll send your reward to this phone number</p>
                  </div>
                </TabsContent>
                <TabsContent value="ussd" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>USSD Code</Label>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{ussdCode}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Dial this code on your phone to redeem your reward</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-col gap-2">
            {isRedeemed ? (
              <Button onClick={resetDialog} className="w-full">
                Done
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleRedeem}
                  className="w-full"
                  disabled={(redeemMethod === "web" && !phoneNumber) || isRedeeming}
                >
                  {isRedeeming ? "Processing..." : "Confirm Redemption"}
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)} className="w-full" disabled={isRedeeming}>
                  Cancel
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
