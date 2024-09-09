'use client'

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/shared/Navbar"
import { useUser } from "@clerk/nextjs"
import { Save } from "lucide-react"
import { getSettings, updateSettings } from "@/lib/actions/settings.actions"
import { redirect } from "next/navigation"

export default function SettingsPage() {
  const [description, setDescription] = useState("")
  const [responseFrequency, setResponseFrequency] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateSettings(user?.id!, {
      defaultAIDescription: description,
      averageAIRespondTime: responseFrequency
    });
    redirect("/home");
  }

  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (!user) return;
    getSettings(user.id).then((data: SettingsParams) => {
      setDescription(data.defaultAIDescription);
      setResponseFrequency(data.averageAIRespondTime);
    });
  }, [user]);

  if (!isLoaded) return null;

  if (isSignedIn)
    return (
      <div>
        <Navbar user={user} />
        <div className="container mx-auto py-10">
          <Card className="w-full p-7 max-w-2xl border-2 shadow-2xl border-[#EDEDED] bg-[#0e0e0e69] mx-auto text-[#EDEDED] rounded-3xl">
            <CardHeader>
              <CardTitle className="text-4xl tracking-wide text-[#DDC56FB0]">AI Settings</CardTitle>
              <CardDescription className="text-2xl">Customize your AI behavior</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 text-xl tracking-wide">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-2xl">Default AI Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter the default description for your AI"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px] bg-transparent text-[#EDEDED] outline-none text-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responseFrequency" className="text-2xl">Average AI Response Time (day)</Label>
                  <Input
                    id="responseFrequency"
                    type="number"
                    min="0"
                    step="0.1"
                    value={responseFrequency}
                    onChange={(e) => setResponseFrequency(Number(e.target.value))}
                    className="text-2xl bg-transparent text-[#EDEDED] outline-none"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <button type="submit">
                  <Save className="bg-[#515574] rounded-full p-2 w-12 h-12 hover:shadow-2xl transition-all hover:scale-110 hover:cursor-pointer" />
                </button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    )
}
