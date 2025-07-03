import { StudySession } from '@/types'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'; 
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';



type Data = {
  date: string,
  duration: string | number
};

const chartConfig = {
  duration: {
    label: "Duration",
    color: "#2563eb"
  }
} satisfies ChartConfig;


export default function chart({ studySessions }: { studySessions: StudySession[] }) {
  const [chartData, setChartData] = useState<Data[] | undefined>(undefined);
  
  useEffect(() => {
    let _data = studySessions.map((ss) => {
      return {
        'date': format(ss.created_at, 'MMM d, yyyy'),
        'duration': ss.pomodoros ? ss.pomodoros.length * 25 / 60 : 0
      } as Data;
    });
    setChartData(_data);
  }, []);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis 
          dataKey="duration"
          tickMargin={10}
          tickLine={false}
          axisLine={false} 
          tickFormatter={(value) => value + " hrs"}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="duration" fill="var(--color-primary)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
