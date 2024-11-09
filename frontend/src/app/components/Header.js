"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the token is stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/auth/login');
  };

  return (
    <header className="bg-primary text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-accent">
          Recipe Sharing App
        </Link>
        <div className="space-x-4">
          <Link href="/recipes" className="hover:text-accent">
            Recipes
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/add-recipe" className="hover:text-accent">
                Add Recipe
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-accent bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-accent">
                Login
              </Link>
              <Link href="/auth/register" className="hover:text-accent">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
