import React from 'react'

import Chart from '../components/Dashbord/Chart'
import BalanceCard from '../components/Dashbord/BalanceCard'

// "title": "Total Revenue",
//     "value": "$1,250.00",
//     "change": "+12.5%",
//     "changeColor": "green",
//     "description": "Trending up this month"

const Dashbord1 = () => {
  return (
    <div>  
       <div className="p-6 bg-[#0A0A0A] min-h-screen text-white/80">
      <h1 className="text-3xl border-b pb-3 border-b-gray-50/10 font-bold mb-6">Hello Sir...</h1>

     <div className="review section mt-4 mb-8">
     <div className="bg-[#171717] p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        </div>
        <BalanceCard />
     </div>

      {/* Chart Section */}
      <div className="bg-[#171717] p-4 mb-4 rounded-lg shadow-md">
        
        <h2 className="text-xl font-semibold">Area Chart - Stacked</h2>
        <p className="text-gray-400">Showing total visitors for the last 30 days</p>
      
        </div>
        <Chart />
    </div>
    </div>
  )
}

export default Dashbord1