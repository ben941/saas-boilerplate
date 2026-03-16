"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const TONES = ["Professional", "Casual", "Academic"] as const;
type Tone = (typeof TONES)[number];

export function BlogGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Generate a Blog Post
        </CardTitle>
        <CardDescription>
          Enter a topic and choose a tone to generate your blog post.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Topic input */}
        <div className="space-y-2">
          <label
            htmlFor="topic"
            className="text-sm font-medium leading-none"
          >
            Topic or prompt
          </label>
          <Textarea
            id="topic"
            placeholder="e.g. The future of renewable energy in urban areas..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={4}
          />
        </div>

        {/* Tone selector */}
        <div className="space-y-2">
          <span className="text-sm font-medium leading-none">Tone</span>
          <div className="flex gap-2">
            {TONES.map((t) => (
              <Button
                key={t}
                variant={tone === t ? "default" : "outline"}
                size="sm"
                onClick={() => setTone(t)}
                className={cn(
                  tone === t && "pointer-events-none"
                )}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <div className="relative">
          <Button disabled className="w-full" size="lg">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Coming soon &mdash; you&apos;ll build this in the course!
          </p>
        </div>

        {/* Placeholder for generated content */}
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Your generated blog post will appear here.
        </div>
      </CardContent>
    </Card>
  );
}
