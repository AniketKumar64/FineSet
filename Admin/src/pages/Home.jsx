import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigation = useNavigate()
  return (
     <div className="min-h-screen flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl font-serif  font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-sm text-gray-500">Welcome to the Admin Dashboard</p>
      <button className='bg-black text-white mt-4 px-4 py-2 rounded' onClick={() => navigation('/dashboard')}>Go to Dashboard</button>

    </div>
  )
}

export default Home