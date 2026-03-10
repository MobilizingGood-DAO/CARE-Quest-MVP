"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ChartDataItem {
  type: string;
  count: number;
}

const chartConfig = {
  count: {
    label: "Commitments",
  },
};

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function CommitmentChart({ data }: { data: ChartDataItem[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="type" 
            width={120}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={40}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
