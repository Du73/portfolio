'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  const linkClass = (path: string) => 
    `font-medium transition ${
      isActive(path)
        ? 'text-blue-600 dark:text-blue-400 font-semibold'
        : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
    }`;

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className={`font-bold text-xl text-blue-600 dark:text-blue-400 ${isActive('/') ? 'underline' : ''}`}>
            DevOps.Portfolio
          </Link>
          <div className="flex space-x-6">
            <Link href="/about" className={linkClass('/about')}>
              About
            </Link>
            <Link href="/projects" className={linkClass('/projects')}>
              Projects
            </Link>
            <Link href="/blog" className={linkClass('/blog')}>
              Blog
            </Link>
            <Link href="/contact" className={linkClass('/contact')}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
