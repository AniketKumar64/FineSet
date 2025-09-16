import React from 'react';
import { dashdetail } from '../../context/details';
function BalanceCard() {
  return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-2 mb-8">
        {dashdetail.map((item, index) => (
          <div
            key={index}
            className="bg-[#171717] p-4 rounded-lg shadow-md"
          >
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-2xl font-bold mb-2">{item.value}</p>
            <p className={`mb-2 ${item.changeColor === 'green' ? 'text-green-500' : 'text-red-500'}`}>
              {item.change}
            </p>  
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
  );
}

export default BalanceCard;
