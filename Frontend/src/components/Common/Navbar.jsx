import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  LogOut, 
  Package, 
  Settings, 
  Headphones, 
  MoreVertical 
} from "lucide-react";

import MobileMenu from "./MobileMenu";
import { ShopContext } from "../../context/ShopContext.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileview, setmobileview] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    showSearch,
    setshowSearch,
    getCartCount,
    navigate,
    token,
    settoken,
    setCartItems,
  } = useContext(ShopContext);

  // Effect to handle glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    settoken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <nav 
      className={`fixed top-0 left-0 h-16 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black backdrop-blur-xl border-b border-white/5 py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          
          {/* LEFT: MOBILE TOGGLE & NAVIGATION LINKS */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setmobileview(!mobileview)}
              className="lg:hidden text-white/70 hover:text-[#D4AF37] transition-colors"
            >
              {mobileview ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
            </button>

            {/* Desktop Navigation Links (Traditional for Shopping Sites) */}
            <div className="hidden lg:flex items-center gap-8">
              {['Collection', 'New Arrivals', 'About'].map((item) => (
                <NavLink 
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-[10px] tracking-[0.3em] uppercase text-white/60 hover:text-[#D4AF37] transition-all duration-300"
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </div>

          {/* CENTER: LOGO (The Hero of the Navbar) */}
          <NavLink to="/" className="absolute left-1/2 -translate-x-1/2 group">
            <h1 className="text-xl md:text-2xl font-heading font-bold tracking-[0.4em] text-white">
              F<span className="text-[#D4AF37]">I</span>NESET
            </h1>
            <div className="w-0 h-[1px] bg-[#D4AF37] mx-auto transition-all duration-500 group-hover:w-full opacity-50"></div>
          </NavLink>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-4 md:gap-7">
            
            {/* Search Toggle */}
            <button 
              onClick={() => setshowSearch(!showSearch)}
              className="text-white/70 hover:text-[#D4AF37] transition-all duration-300"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="flex items-center gap-2 text-white/70 hover:text-[#D4AF37] transition-all duration-300 outline-none"
                  onClick={() => !token && navigate("/login")}
                >
                  <User size={20} strokeWidth={1.5} />
                  <span className="hidden md:block text-[10px] tracking-widest uppercase font-medium">
                    {token ? "Account" : "Login"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              
              {token && (
                <DropdownMenuContent align="end" className="w-52 mt-4 bg-zinc-950/95 backdrop-blur-2xl text-white  border-white/10 rounded-none p-2">
                  <DropdownMenuLabel className="font-light text-[10px] tracking-widest text-zinc-500 uppercase pb-2">
                    Member Access
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="py-3 text-xs tracking-wider cursor-pointer ">
                    <User className="mr-3 h-4 w-4 text-[#D4AF37]" /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/user-orders")} className="py-3 text-xs tracking-wider cursor-pointer ">
                    <Package className="mr-3 h-4 w-4 text-[#D4AF37]" /> Order History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem onClick={logoutHandler} className="py-3 text-xs tracking-wider hover:text-red-400 cursor-pointer ">
                    <LogOut className="mr-3 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>

            {/* Cart Icon */}
            <NavLink to="/cart" className="relative text-white/70 hover:text-[#D4AF37] transition-all duration-300">
              <ShoppingCart size={20} strokeWidth={1.5} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[8px] font-bold text-black">
                  {getCartCount()}
                </span>
              )}
            </NavLink>

            {/* Support / Secondary Options */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white/40 hover:text-white transition-all outline-none">
                  <MoreVertical size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-zinc-950 text-white border-white/5 rounded-none">
                  <DropdownMenuItem className="text-[10px] tracking-widest uppercase cursor-pointer">
                    <Settings className="mr-2 h-3 w-3" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[10px] tracking-widest uppercase cursor-pointer">
                    <Headphones className="mr-2 h-3 w-3" /> Concierge
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          </div>
        </div>
      </div>

      
      <MobileMenu mobileview={mobileview} setmobileview={setmobileview} />
    </nav>
  );
};

export default Navbar;