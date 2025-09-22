import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { toast } from "sonner";
import { ShopContext } from "../context/ShopContext.jsx";
const Login = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CurrState, setCurrState] = useState("login"); // "login" or "Sign Up"

  const { token, settoken, navigate, backendUrl } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (CurrState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/v1/register", {
          username,
          email,
          password,
        });
        if (response.data.success) {
          settoken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/v1/login", {
          email,
          password,
        });
        console.log(response);
        if (response.data.success) {
          settoken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen relative flex flex-col gap-4 items-center justify-center bg-black/50 px-4">
      <div className="flex  flex-col items-center justify-center">
              <div className="absolute top-4 right-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded font-bold bg-white text-black  flex focus:outline-none"
          >
            Back to Home
          </button>
        </div>
        <h1 className="text-4xl uppercase font-serif font-bold">{CurrState}</h1>
        <p className="mt-2 text-lg tracking-widest text-gray-500">
          Welcome to the Fineset
        </p>
      </div>
      <div className="bg-black/30   border border-gray-100/50 shadow-lg p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white/80 mb-6">
          {CurrState === "login"
            ? "Login to Your Account"
            : "Create a New Account"}
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {CurrState === "login" ? (
            ""
          ) : (
            <div>
              <label className="block text-lg font-medium text-white mb-1">
                UserName
              </label>
              <input
                onChange={(e) => setusername(e.target.value)}
                value={username}
                type="text"
                name="username"
                required
                className="w-full px-4 py-2 border-b outline-0  border-b-gray-300  "
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-lg font-medium outline-0 text-gray-300 mb-1">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border-b outline-0 border-b-gray-300  "
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border-b outline-0 border-b-gray-300  "
              placeholder="Enter your password"
            />
          </div>

          <div className="">
            <button
              type="submit"
              className="flex-1 w-full px-6 py-3 cursor-pointer bg-white/80 text-black font-semibold rounded-lg hover:bg-white transition"
            >
              {CurrState}
            </button>
          </div>
        </form>

        <p className="text-center text-lg text-gray-400 mt-6">
          {CurrState === "Sign Up" ? (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                className="text-white cursor-pointer font-semibold"
                onClick={() => setCurrState("login")}
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <button
                type="button"
                className="text-white cursor-pointer font-semibold"
                onClick={() => setCurrState("Sign Up")}
              >
                Sign Up
              </button>
            </span>
          )}
        </p>
  
      </div>
    </div>
  );
};

export default Login;
