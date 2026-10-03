'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');

  useEffect(() => {
    // Skip auth check if we are on the login page
    if (pathname === '/admin/login') {
      setIsAuthenticated(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/admin/login');
        }
      } catch (err) {
        router.push('/admin/login');
      }
    };
    checkAuth();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
    }
  };

  // Render just the page content without sidebar for the login page
  if (pathname === '/admin/login') {
    return <div className="font-sans min-h-screen bg-[#F5F0EB]">{children}</div>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#DF3B4D] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Hero', href: '/admin/media?section=hero' },
    { name: 'Philosophy', href: '/admin/media?section=philosophy' },
    { name: 'Story', href: '/admin/media?section=story' },
    { name: 'Kitchen', href: '/admin/media?section=kitchen' },
    { name: 'Gallery', href: '/admin/media?section=gallery' },
    { name: 'Experience', href: '/admin/media?section=experience' },
    { name: 'Locations', href: '/admin/media?section=locations' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0EB] text-gray-900 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <h1 className="text-[#1A1A1A] font-bold text-lg tracking-tight">Control Centre</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col z-20`}>
        <div className="p-6 hidden md:flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <div>
            <h1 className="text-[#1A1A1A] font-bold text-sm tracking-tight leading-tight">KING CHINESE<br/>BOWL</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-2">Overview</div>
          <Link
            href="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl transition-colors font-medium text-[15px] ${
              pathname === '/admin'
                ? 'bg-red-50 text-[#DF3B4D]' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            Dashboard
          </Link>
          
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-6">Content Sections</div>
          {navLinks.slice(1).map((link) => {
            const linkSection = new URLSearchParams(link.href.split('?')[1]).get('section');
            
            // It's active if we are on /admin/media and the section query matches
            let isActive = false;
            if (pathname === '/admin/media' && linkSection === sectionParam) {
              isActive = true;
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl transition-colors font-medium text-[15px] ${
                  isActive
                    ? 'bg-red-50 text-[#DF3B4D]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 text-left text-gray-600 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-3 font-medium"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 border-b border-gray-200 flex items-center px-8 bg-white flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">Control Centre</h2>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F0EB]"></div>}>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Suspense>
  );
}
