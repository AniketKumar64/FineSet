import React, { useContext } from 'react';
import { ShopContext } from "../../context/ShopContext";
import { FaSearch } from "react-icons/fa";
import { HiX } from "react-icons/hi";

const SearchBar = () => {
  const { search, setsearch, showSearch, setshowSearch } = useContext(ShopContext);

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center flex items-center justify-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-lg flex-1 max-w-2xl">
        <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          type="text"
          className="flex-1 outline-none bg-inherit text-sm"
          placeholder="Search for Products, Brands and More"
        />
        <span><FaSearch /></span>
      </div>
      <span onClick={() => setshowSearch(false)} className="h-5 w-5 cursor-pointer">
        <HiX />
      </span>
    </div>
  ) : null;
};

export default SearchBar;
