"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ShopContext } from "../context/ShopContext.jsx";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Login = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CurrState, setCurrState] = useState("login"); // "login" or "Sign Up"

  const { token, settoken, navigate, backendUrl } = useContext(ShopContext);
  const formRef = useRef(null);

  useGSAP(() => {
    gsap.from(formRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const endpoint = CurrState === "Sign Up" ? "/api/v1/register" : "/api/v1/login";
      const payload = CurrState === "Sign Up" 
        ? { username, email, password } 
        : { email, password };

      const response = await axios.post(backendUrl + endpoint, payload);
      
      if (response.data.success) {
        settoken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`Welcome ${CurrState === "Sign Up" ? "to the House" : "Back"}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Authentication failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050505] overflow-hidden">
      
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Back to Home Link */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-10 left-10 z-20 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-[#D4AF37] transition-colors duration-300"
      >
        <ArrowLeft size={14} /> Back to Boutique
      </button>

      {/* Auth Card */}
      <div ref={formRef} className="relative z-10 w-full max-w-md px-8 py-12 bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-none shadow-2xl">
        
        <div className="text-center mb-10">
          <span className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase block mb-4">
            {CurrState === "login" ? "Access Inquiry" : "Membership Request"}
          </span>
          <h1 className="text-4xl font-heading font-bold text-white tracking-tighter uppercase">
            {CurrState === "login" ? "Sign In" : "Join Us"}
          </h1>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-8">
          {CurrState === "Sign Up" && (
            <div className="relative group">
              <User className="absolute left-0 bottom-3 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
              <input
                onChange={(e) => setusername(e.target.value)}
                value={username}
                type="text"
                required
                className="w-full pl-8 py-2 bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-widest focus:border-[#D4AF37] transition-all"
                placeholder="USERNAME"
              />
            </div>
          )}

          <div className="relative group">
            <Mail className="absolute left-0 bottom-3 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              className="w-full pl-8 py-2 bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-widest focus:border-[#D4AF37] transition-all"
              placeholder="EMAIL ADDRESS"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-0 bottom-3 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              className="w-full pl-8 py-2 bg-transparent border-b border-white/10 outline-none text-white text-sm tracking-widest focus:border-[#D4AF37] transition-all"
              placeholder="SECRET KEY"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-white text-black text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-[#D4AF37] hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {CurrState}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button
            type="button"
            className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-colors"
            onClick={() => setCurrState(CurrState === "login" ? "Sign Up" : "login")}
          >
            {CurrState === "login" 
              ? "Create New Account — Join" 
              : "Already a Member? — Sign In"}
          </button>
        </div>
      </div>

      {/* Aesthetic Brand Text */}
      <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none select-none">
        <h2 className="text-[10vw] font-bold tracking-tighter text-white">FINESET</h2>
      </div>
    </div>
  );
};

export default Login;