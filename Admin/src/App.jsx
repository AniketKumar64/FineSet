import { useEffect, useState } from "react";
import Sidebar from "./components/common/Sidebar";
import Add from "./pages/Add";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { Route, Routes } from "react-router-dom";
import Dashbord1 from "./pages/Dashbord1";
import Login from "./pages/Login";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {token === "" ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <div className="h-screen mx-auto flex">
              <div className="flex w-full ">
                <div className="">
                  <Sidebar setToken={setToken} />
                </div>

                <div className="h-screen overflow-auto w-[100%] mx-auto   text-base ">
                  <Routes>
                    <Route path="/" element={<Dashbord1 token={token} />} />
                    <Route path="/dashboard" element={<Dashbord1 token={token} />} />
                    <Route path="/orders" element={<Orders token={token} />} />
                    <Route path="/add" element={<Add token={token} />} />
                    <Route path="/products" element={<Products token={token} />} />
                    <Route path="/analytics" element={<Analytics token={token} />} />
                    <Route path="/settings" element={<Settings token={token} />} />
                    {/* <Route path="/profile" element={<div>Profile Page</div>} /> */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                  </Routes>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;


// add logic to the orders page make it make to smae as analaytic page 