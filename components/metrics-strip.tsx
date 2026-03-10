"use client";

import { useEffect, useState } from "react";
import { getMetrics } from "@/lib/data";
import { Users, Briefcase, BarChart3, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({ end, duration = 2000, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

export function MetricsStrip() {
  const metrics = getMetrics();

  const items = [
    {
      label: "Total Builders",
      value: metrics.activeBuilders,
      icon: Users,
      prefix: "",
      suffix: "",
    },
    {
      label: "Total Projects",
      value: metrics.registeredCommitments,
      icon: Briefcase,
      prefix: "",
      suffix: "",
    },
    {
      label: "Avg Pledge",
      value: 5,
      icon: BarChart3,
      prefix: "",
      suffix: "%",
    },
    {
      label: "Est. Pledge Value",
      value: metrics.totalValue,
      icon: DollarSign,
      prefix: "$",
      suffix: "",
    },
  ];

  return (
    <section className="py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <Card
              key={item.label}
              className="relative overflow-hidden bg-card border-border p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold mt-1">
                    <AnimatedCounter 
                      end={item.value} 
                      prefix={item.prefix} 
                      suffix={item.suffix} 
                    />
                  </p>
                </div>
              </div>
              {/* Bottom accent border */}
              <div 
                className="absolute bottom-0 left-0 h-1 bg-primary" 
                style={{ width: `${Math.min(25 + index * 25, 100)}%` }}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
