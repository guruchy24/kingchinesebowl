'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MediaItem {
  id: number;
  section: string;
  device: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    sections: 0,
    desktop: 0,
    mobile: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const sections = ['Hero', 'Philosophy', 'Story', 'Kitchen', 'Gallery', 'Experience', 'Locations'];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/media');
        if (!res.ok) throw new Error('Failed to fetch media');
        const data: MediaItem[] = await res.json();
        
        const uniqueSections = new Set(data.map(item => item.section.toLowerCase()));
        
        setStats({
          total: data.length,
          sections: uniqueSections.size,
          desktop: data.filter(item => item.device === 'desktop').length,
          mobile: data.filter(item => item.device === 'mobile').length,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-[32px] font-bold text-[#1A1A1A] mb-2 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 text-[16px]">Overview of your website content and media assets.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Media', value: stats.total },
          { label: 'Sections Configured', value: stats.sections },
          { label: 'Desktop Images', value: stats.desktop },
          { label: 'Mobile Images', value: stats.mobile },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-gray-500 text-[13px] font-semibold mb-2 uppercase tracking-wide">{stat.label}</h3>
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-100 animate-pulse rounded"></div>
            ) : (
              <p className="text-3xl font-bold text-[#DF3B4D]">{stat.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Manage Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map(section => (
            <Link 
              key={section} 
              href={`/admin/media?section=${section.toLowerCase()}`}
              className="group bg-white border border-gray-100 p-6 rounded-2xl hover:border-[#DF3B4D]/30 hover:shadow-md transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="text-[17px] font-bold text-gray-900 group-hover:text-[#DF3B4D] transition-colors">{section}</h3>
                <p className="text-[14px] text-gray-500 mt-1">Manage images & content</p>
              </div>
              <span className="text-[#DF3B4D] opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all font-medium">
                Manage &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
