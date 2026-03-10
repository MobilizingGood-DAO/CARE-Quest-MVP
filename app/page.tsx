import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MetricsStrip } from "@/components/metrics-strip";
import { Briefcase } from "lucide-react";

const programs = [
  "Build Games",
  "Codebase",
  "Retro9000",
  "InfraBUIDL()",
  "Other",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm text-primary">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Tracking Avalanche Public Goods Commitments</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Builder Pledges for{" "}
              <span className="text-primary">
                Ecosystem Public Goods
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl text-pretty leading-relaxed">
              CARE QUEST tracks commitments from builders who pledge a percentage of their grant/project 
              revenue to support Avalanche ecosystem public goods.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button asChild size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/register">
                  Make Your Pledge
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted/50">
                <Link href="/dashboard">
                  View Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <MetricsStrip />

      {/* Recent Commitments */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Recent Commitments</h2>
              <p className="text-muted-foreground text-sm">Live feed of builder pledges to public goods</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">View All</Link>
            </Button>
          </div>

          <Card className="bg-card border-border p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No commitments yet</h3>
            <p className="text-muted-foreground text-sm">Be the first to make a pledge!</p>
          </Card>
        </div>
      </section>

      {/* Supported Programs */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Supported Programs</h2>
            <p className="text-muted-foreground">
              Commitments flow through these Avalanche ecosystem programs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {programs.map((program) => (
              <Card
                key={program}
                className="bg-card border-border p-6 text-center hover:bg-muted/20 transition-colors cursor-pointer"
              >
                <span className="font-medium">{program}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 my-8 mx-4 md:mx-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Make Your Commitment?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join the growing community of Avalanche builders committed to supporting ecosystem public goods.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/register">
                Register Your Pledge
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">CQ</span>
              </div>
              <span>CARE QUEST - Avalanche Public Goods</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/proofs" className="hover:text-foreground transition-colors">
                Treasury Transparency
              </Link>
              <Link href="/leaderboard" className="hover:text-foreground transition-colors">
                Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
