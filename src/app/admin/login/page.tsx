'use client';

import { useState } from 'react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        window.location.href = '/admin';
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0EB] flex flex-col justify-center items-center p-4 font-sans text-gray-900">
      
      {/* Brand Header Above Card */}
      <div className="mb-10 flex flex-col items-center text-center">
        <img 
          src="/logo.png" 
          alt="King Chinese Bowl Logo" 
          className="h-20 md:h-24 w-auto object-contain drop-shadow-sm mb-5"
        />
        <h1 className="text-3xl md:text-4xl font-serif text-[#C41E2A] tracking-[0.2em] mb-2">
          KING CHINESE BOWL
        </h1>
        <h2 className="text-sm md:text-base font-serif text-[#1A1A1A] tracking-[0.3em] uppercase opacity-80">
          Admin Control Centre
        </h2>
      </div>

      {/* Replicating the box size, padding and border perfectly */}
      <div className="w-full max-w-[500px] bg-white border border-[#E5E5E5] rounded-[24px] p-8 md:p-12 shadow-xl shadow-black/5">
        
        <div className="mb-10 text-center">
          <h3 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight mb-2 font-sans">
            Welcome back
          </h3>
          <p className="text-[#8B8B8B] text-[16px] font-sans">
            Please sign in to continue
          </p>
        </div>

        {error && (
          <div className="w-full mb-6 p-4 bg-red-50 text-[#DF3B4D] border border-red-100 text-sm rounded-xl font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username Input */}
          <div className="space-y-2.5">
            <label className="block text-[#333333] text-[15px] font-semibold font-sans" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white border border-[#E2E2E2] text-[#1A1A1A] px-5 py-4 focus:outline-none focus:border-[#DF3B4D] focus:ring-1 focus:ring-[#DF3B4D] transition-shadow rounded-xl text-[16px] placeholder-[#B3B3B3] font-sans"
              placeholder="admin"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2.5">
            <label className="block text-[#333333] text-[15px] font-semibold font-sans" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-[#E2E2E2] text-[#1A1A1A] px-5 py-4 focus:outline-none focus:border-[#DF3B4D] focus:ring-1 focus:ring-[#DF3B4D] transition-shadow rounded-xl text-[16px] placeholder-[#B3B3B3] font-sans"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#DF3B4D] hover:bg-[#C93545] text-white text-[17px] font-medium py-4 transition-colors disabled:opacity-50 flex justify-center items-center rounded-xl font-sans"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
