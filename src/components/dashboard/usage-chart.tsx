'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { usageOverTime } from '@/lib/mock-data';

const chartConfig = {
  queries: {
    label: 'Queries',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function UsageChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart
        accessibilityLayer
        data={usageOverTime}
        margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => `${Number(value) / 1000}k`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="queries" fill="var(--color-queries)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
