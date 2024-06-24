import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function Feedpage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      try {
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const decodedUser = jwtDecode(storedToken);
        setUser(decodedUser);
      }
    }
  }, []);

  const handleLogout = () => {
    fetch('http://localhost:3000/api/logout', {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/Signup');
      } else {
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });
  };
  console.log(user)
  return (
    <div className="h-screen bg-blue-100">
      <nav className="flex justify-between p-2 bg-blue-200 items-center">
        <h1>IntelliFeed</h1>
        <input className="p-2" type="text" placeholder="Search for articles, topics,..." />
        <div className="flex items-center">
          {user && user.pp  ? (
              <img
                src={`data:image/jpeg;base64,${user.pp}`}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
              {user && user.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          <button onClick={handleLogout} className="ml-4 bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
