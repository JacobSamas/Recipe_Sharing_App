import Link from 'next/link';

export default function Header() {
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
          <Link href="/auth/login" className="hover:text-accent">
            Login
          </Link>
          <Link href="/auth/register" className="hover:text-accent">
            Register
          </Link>
          <Link href="/add-recipe" className="hover:text-accent">
            Add Recipe
          </Link>
        </div>
      </nav>
    </header>
  );
}
