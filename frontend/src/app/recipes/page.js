"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch('http://localhost:5001/api/recipes');
        if (!res.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  if (loading) return <p className="text-center py-8">Loading recipes...</p>;
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">All Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found. Add some to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link href={`/recipes/${recipe._id}`} key={recipe._id}>
              <div className="border rounded-lg p-4 hover:shadow-lg cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-2"><strong>Category:</strong> {recipe.category}</p>
                {recipe.image && <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover mb-2 rounded" />}
                <p className="text-sm text-gray-500">Author: {recipe.author?.username || 'Unknown'}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
