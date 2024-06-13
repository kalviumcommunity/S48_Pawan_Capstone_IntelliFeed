import React, { useState, useEffect } from 'react';

export default function Feedpage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className=" h-screen bg-blue-100">
      <nav className='flex justify-between p-2 bg-blue-200 items-center'>
        <h1> IntelliFeed </h1>
        <input className='p-2' type="text" placeholder='Search for articles,topics,...' />
        {user && user.profilePicture ? (
          <img
            src={`data:image/jpeg;base64,${user.profilePicture}`}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
            {user && user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </nav>

    </div>
  );
}
