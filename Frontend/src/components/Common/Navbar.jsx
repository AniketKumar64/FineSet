import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import {
  HiDotsVertical,
  HiMenu,
  HiX,
} from "react-icons/hi";

import MobileMenu from "./MobileMenu";
import { LogOutIcon, Search, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShopContext } from "../../context/ShopContext.jsx";

const Navbar = () => {
  const [mobileview, setmobileview] = useState(false);

  const {
    showSearch,
    setshowSearch,
    getCartCount,
    navigate,
    search,
    setsearch,
    token,
    settoken,
    setCartItems,
  } = useContext(ShopContext);

  

  const logoutHandler = () => {
   
    localStorage.removeItem("token");
    settoken("");
    setCartItems({});
     navigate("/login");
  };

  

  return (
    <nav className=" fixed top-0 z-10 w-full  border-b border-border/40 bg-black/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto gap-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setmobileview(!mobileview)}
              className="text-white font-bold  flex focus:outline-none"
            >
              {mobileview ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
            <NavLink
              to="/"
              className="text-xl   md:text-2xl  font-[font4] text-white"
            >
              <h1>Fineset</h1>
            </NavLink>

            
          </div>

{/* todo search bar */}
          {/* <div className="hidden md:flex flex-1 ">
            <div className="flex flex-1 mx-4">
              <div className="relative w-full">
                <HiOutlineSearch
                  className="absolute top-3 left-3 "
                  size={20}
                />
                <input
                  type="text"
                  value={search}
          onChange={(e) => setsearch(e.target.value)}
                  placeholder="Search for Products, Brands and More"
                  className="w-full pl-10 pr-4 py-2 border rounded"
                />
              </div>
            </div>
          </div> */}


          <div className="flex items-center gap-4 space-x-0 md:space-x-4">
            <div className="flex cursor-pointer items-center gap-2">
              <Search onClick={() => setshowSearch(!showSearch)} size={20} />
              
            </div>
            
      



            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center ">
                <User onClick={()=>token ? null : navigate("/login")} size={20} />
                <p>{token ? "Profile" : "Login"}</p>
              </DropdownMenuTrigger>
             {
              token ? ( <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/user-orders") } >Orders</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>
                  Log Out <LogOutIcon className="ml-2 h-4 w-4" />
                </DropdownMenuItem>
              </DropdownMenuContent>) : null
             }
            </DropdownMenu>

                       <NavLink to="/cart" className=" hover:text-white/80 relative"><FaShoppingCart size={21} /> <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]  ">{getCartCount()}</p></NavLink>


            {/* Dropdown Menu */}

            <DropdownMenu>
              <DropdownMenuTrigger className="hidden md:flex items-center gap-2">
                <HiDotsVertical size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
                <DropdownMenuItem>24x7 Customer Care</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/login")}>Login</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* <div className="md:hidden flex gap-4 items-center">
            <span
              className="text-gray-600 hover:text-gray-900  cursor-pointer "
              onClick={() => setshowSearch(!showSearch)}
            >
              <FaSearch />
            </span>
            <NavLink
              to="/cart"
              className="text-gray-600 hover:text-gray-900 relative"
            >
              <FaShoppingCart size={21} />{" "}
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]  ">
                {getCartCount()}
              </p>
            </NavLink>{" "}
            <NavLink
              to="/profile"
              onClick={() => setmobileview(false)}
              className="block text-gray-600 hover:text-gray-900"
            >
              <FaUser />
            </NavLink>
          </div> */}
        </div>
      </div>

      <MobileMenu mobileview={mobileview} setmobileview={setmobileview} />
    </nav>
  );
};

export default Navbar;
