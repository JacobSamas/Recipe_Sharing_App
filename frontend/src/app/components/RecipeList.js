"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
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
      }
    }

    fetchRecipes();
  }, []);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="border p-4 rounded shadow hover:shadow-lg">
              <Link href={`/recipes/${recipe._id}`}>
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              </Link>
              <p className="text-gray-600">{recipe.category}</p>
              <p className="text-sm text-gray-500">By: {recipe.author?.username || 'Unknown'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
