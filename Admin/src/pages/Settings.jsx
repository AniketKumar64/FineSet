import React, { useState } from "react";

const Settings = () => {
  const [username, setUsername] = useState("AdminUser");
  const [email, setEmail] = useState("Fineset@example.com");
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-[#040404] text-white/90  p-6">
      <h1 className="text-3xl font-semibold py-8 mb-6">Settings...</h1>

      <div className="space-y-6 pt-8">

        {/* Profile Section */}
        <div className="bg-[#171717] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4 pt-6">
            <div>
              <label className="block text-gray-400 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2  bg-[#171717] border-b border-b-gray-600 text-white/70  focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2  bg-[#171717] border-b border-b-gray-600 text-white/70  focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-[#171717] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="flex items-center justify-between mb-2">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-5 h-5 accent-gray-500"
            />
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-[#171717] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="w-5 h-5 accent-gray-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>SMS Notifications</span>
              <input
                type="checkbox"
                checked={smsNotifications}
                onChange={() => setSmsNotifications(!smsNotifications)}
                className="w-5 h-5 accent-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold transition">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
