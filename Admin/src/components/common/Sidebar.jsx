import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HomeIcon, BoxIcon, PlusCircleIcon, ShoppingCartIcon, BarChart2Icon, SettingsIcon, ActivityIcon, LogOutIcon } from "lucide-react";


function Sidebar({ setToken}) {
  return (
    <aside className="md:w-64 w-20 min-h-screen text-white/80  flex flex-col justify-around bg-black  border-r border-r-gray-50/50  items-center shadow-md p-5">
      <Link to="/" className="flex items-center space-x-2 text-3xl font-bold  ">
  <ActivityIcon className="w-9 h-9" />
  <span className='hidden font-[font2] md:inline'>FineSet.</span>
</Link>
      <nav className="space-y-4 ">
<NavLink to="/dashboard" className="flex items-center space-x-2 px-4 text-xl font-[font2] py-2 rounded-lg transition-shadow shadow-md">
  <HomeIcon className="w-7 h-7" /> <span className='hidden md:inline' >Dashboard</span>
</NavLink>

<NavLink to="/products" className="flex items-center space-x-2 px-4 text-xl font-[font2] py-2 rounded-lg transition-shadow shadow-md">
  <BoxIcon className="w-7 h-7" /> <span className='hidden md:inline' >All Products</span>
</NavLink>

<NavLink
  to="/add"
  className="flex items-center space-x-2 px-4 text-xl font-[font2] py-2 rounded-lg transition-shadow shadow-md"
>
  <PlusCircleIcon className="w-7 h-7" />
  <span className="font-medium hidden md:inline">Add Products</span>
</NavLink>

<NavLink to="/orders" className="flex items-center space-x-2 px-4 text-xl font-[font2] py-2 rounded-lg transition-shadow shadow-md">
  <ShoppingCartIcon className="w-7 h-7" /> <span className='hidden md:inline'>Orders</span>
</NavLink>

<NavLink to="/analytics" className="flex items-center space-x-2 px-4 text-xl font-[font2] py-2 rounded-lg transition-shadow shadow-md">
  <BarChart2Icon className="w-7 h-7" /> <span className='hidden md:inline'>Analytics</span>
</NavLink>

<NavLink to="/settings" className="flex items-center space-x-2 px-4 text-xl font-[font2] py-2 rounded-lg transition-shadow shadow-md">
  <SettingsIcon className="w-7 h-7" /> <span className='hidden md:inline'>Settings</span>
</NavLink>
        
      </nav>
<button onClick={() => setToken("")} className="w-full flex items-center justify-center  md:space-x-2 md:px-4 py-2 rounded-lg bg-black md:bg-red-500  font-medium hover:bg-red-600 transition-shadow shadow-md">
  <LogOutIcon className="w-7 h-7" />
  <span className="hidden sm:inline">Log Out</span>
</button>
  </aside>
  );
}

export default Sidebar;
