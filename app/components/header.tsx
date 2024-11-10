'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';


function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${isActive
          ? 'text-blue-600 font-medium dark:invert'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors'
        } transition-colors`}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors">
      <nav className="container mx-auto px-4 py-4 transition-colors">
        <div className="flex justify-between items-center transition-colors">
          <div className="font-bold text-xl text-gray-900 dark:text-white transition-colors">VectorNex</div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}