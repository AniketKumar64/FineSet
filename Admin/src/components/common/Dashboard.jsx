import React from 'react';


import BalanceCard from '../Dashbord/BalanceCard';

function Dashboard() {
  return (
    <main className="flex-1 p-6">
     

      <div className="grid grid-cols-4 gap-4 mb-6">
        <BalanceCard title="Total Balance" amount="$15,700.00" />
        <BalanceCard title="Income" amount="$8,500.00" />
        <BalanceCard title="Expense" amount="$6,222.00" />
        <BalanceCard title="Total Savings" amount="$32,913.00" />
      </div>

      <div className="grid min-h-screen grid-cols-3 gap-6">
       <div className="bg-white p-4 rounded shadow">[Chart Placeholder]</div>
        <div className="bg-white p-4 rounded shadow">[Recent Transactions Table]</div>
        <div className="space-y-6 min-h-screen">
        
       <div className="bg-white p-4 rounded shadow">[Recent Transactions Table]</div>
       <div className="bg-white p-4 rounded shadow">[Recent Transactions Table]</div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
