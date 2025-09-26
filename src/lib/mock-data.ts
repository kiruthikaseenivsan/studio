import { Users, Clock, BarChart2, Zap } from 'lucide-react';

export const usageStats = [
  {
    title: 'Total Queries Today',
    value: '1.2M',
    description: '+20.1% from yesterday',
    icon: BarChart2,
  },
  {
    title: 'Active Users Now',
    value: '180,230',
    description: '+18.7% from last hour',
    icon: Users,
  },
  {
    title: 'Peak Time (Today)',
    value: '4:00 PM UTC',
    description: 'Average peak time this week',
    icon: Clock,
  },
  {
    title: 'API Health',
    value: '99.98%',
    description: 'Uptime over the last 24h',
    icon: Zap,
  },
];

export const usageOverTime = [
  { time: '12 AM', queries: Math.floor(Math.random() * 3000) + 1000 },
  { time: '2 AM', queries: Math.floor(Math.random() * 3000) + 1200 },
  { time: '4 AM', queries: Math.floor(Math.random() * 3000) + 1500 },
  { time: '6 AM', queries: Math.floor(Math.random() * 3000) + 2000 },
  { time: '8 AM', queries: Math.floor(Math.random() * 3000) + 2800 },
  { time: '10 AM', queries: Math.floor(Math.random() * 3000) + 4000 },
  { time: '12 PM', queries: Math.floor(Math.random() * 3000) + 5000 },
  { time: '2 PM', queries: Math.floor(Math.random() * 3000) + 5500 },
  { time: '4 PM', queries: Math.floor(Math.random() * 3000) + 6000 },
  { time: '6 PM', queries: Math.floor(Math.random() * 3000) + 5200 },
  { time: '8 PM', queries: Math.floor(Math.random() * 3000) + 4500 },
  { time: '10 PM', queries: Math.floor(Math.random() * 3000) + 3500 },
];

export const usageByCountry = [
  { country: 'USA', value: 40, fill: 'var(--color-chart-1)' },
  { country: 'India', value: 25, fill: 'var(--color-chart-2)' },
  { country: 'UK', value: 15, fill: 'var(--color-chart-3)' },
  { country: 'Canada', value: 10, fill: 'var(--color-chart-4)' },
  { country: 'Other', value: 10, fill: 'var(--color-muted)' },
];
