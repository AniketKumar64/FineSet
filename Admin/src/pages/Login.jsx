import axios from 'axios';
import React, { useState } from 'react'
import { backendUrl } from '../App';

const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {

        try{
            e.preventDefault();
            const response = await axios.post(backendUrl+ '/api/v1/admin',{email, password});
            if (response.data.success) {
              setToken(response.data.token);
             
            } else {
                alert(response.data.message || 'Login failed');
            }


            
        }
        catch (error) {
            console.error("Login failed:", error);
        }
    }

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100 px-4">
     <div className="flex flex-col items-center justify-center">
       <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
       <p className="mt-2 text-sm text-gray-500">Welcome to the Admin Dashboard</p>
     </div>
      <div className="bg-white   border border-gray-100 shadow-lg p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Login to your account
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-4">
         
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 cursor-pointer bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
           Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">

          
        </p>
      </div>
    </div>
  )
}

export default Login