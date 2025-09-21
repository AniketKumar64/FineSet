import React, { useState } from 'react'
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "January", desktop: 16, mobile: 8 },
  { month: "February", desktop: 30, mobile: 20 },
  { month: "March", desktop: 23, mobile: 12 },
  { month: "April", desktop: 7, mobile: 19 },
  { month: "May", desktop: 29, mobile: 10 },
  { month: "June", desktop: 21, mobile: 24 },
];

const Chart = () => {

  return (
   <div className="min-w-full mx-auto bg-[#0A0A0A] rounded-lg shadow  text-white">

      <div className="bg-[#171717]  rounded-lg">
       <ResponsiveContainer width="100%" height={500}>
  <AreaChart
    data={chartData}
    margin={{ left: 12, right: 12 }}
  >
    <CartesianGrid stroke="#444" vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
    <Area
      type="natural"
      dataKey="mobile"
      stroke="#F59E0B"
      fill="#F59E0B"
      fillOpacity={0.4}
      stackId="a"
    />
    <Area
      type="natural"
      dataKey="desktop"
      stroke="#3B82F6"
      fill="#3B82F6"
      fillOpacity={0.4}
      stackId="a"
    />
  </AreaChart>
</ResponsiveContainer>

      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-300">
        <div className="flex items-center gap-2 font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-400" />
        </div>
        <div>January - June 2024</div>
      </div>
    </div>
  )
}

export default Chart