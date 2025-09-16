function Header() {
  return (
    <div className="flex justify-between items-center bg-[#F5F5F7] p-4 rounded shadow h-[80px]">
      <h1 className="text-2xl font-bold">Hello Boss!</h1>

      
      <div className="flex items-center space-x-4">
        <input type="search" placeholder="Search..." className="border rounded px-2 py-1 w-[300px]" />
        <button className="relative">
            🔔
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </button>
        <img src="https://i.pravatar.cc/40" alt="avatar" className="w-[40px] h-[40px] rounded-full" />
      </div>
    </div>
  );
}

export default Header;
