"use client"

import * as React from "react"
import { Wand2, Save, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { usePageHeader } from "@/hooks/use-page-header"

export function ContentPage() {
  const [topic, setTopic] = React.useState("")
  const [generated, setGenerated] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [isPosting, setIsPosting] = React.useState(false)

  const header = usePageHeader({
    title: "Content Gen",
    description: "Generate marketing copy or posts, then save a draft or publish it.",
  })

  async function handleGenerate() {
    if (!topic.trim()) return
    setIsGenerating(true)
    try {
      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      })
      if (!res.ok) throw new Error("Failed to generate content")
      const data = await res.json()
      setGenerated(data.content ?? "")
    } catch (err) {
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleSave() {
    if (!generated.trim()) return
    setIsSaving(true)
    try {
      await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, content: generated }),
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  async function handlePost() {
    if (!generated.trim()) return
    setIsPosting(true)
    try {
      await fetch("/api/content/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, content: generated }),
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div className="space-y-6">
      {header}

      <Card>
        <CardHeader>
          <CardTitle>Generate</CardTitle>
          <CardDescription>
            Describe what you want and generate a draft.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic / prompt</Label>
            <Input
              id="topic"
              placeholder="e.g. Announce our new katana restock"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <Button onClick={handleGenerate} disabled={isGenerating || !topic.trim()}>
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Draft</CardTitle>
          <CardDescription>Edit before saving or posting.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Generated content will appear here — you can edit it."
            value={generated}
            onChange={(e) => setGenerated(e.target.value)}
            rows={10}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving || !generated.trim()}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button onClick={handlePost} disabled={isPosting || !generated.trim()}>
              {isPosting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isPosting ? "Posting..." : "Post"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}