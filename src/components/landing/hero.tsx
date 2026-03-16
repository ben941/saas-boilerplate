import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-primary)/10%,transparent_60%)]" />

      <div className="container mx-auto px-4 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Generate Blog Posts with AI
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Create high-quality, SEO-optimized blog content in minutes. Powered by
          AI, built for creators.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Button render={<Link href="/signup" />} size="lg">
            Get Started Free
          </Button>
          <Button render={<a href="#pricing" />} variant="outline" size="lg">
            See Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
