"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`http://localhost:5001/api/recipes/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) return <div className="flex justify-center py-8"><div className="loader">Loading...</div></div>;
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>;
  if (!recipe) return <p className="text-center py-8">Recipe not found.</p>;

  return (
    <div className="container mx-auto py-8">
      <button onClick={() => router.back()} className="text-primary hover:underline mb-4">&larr; Back</button>
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-gray-600 mb-4"><strong>Category:</strong> {recipe.category}</p>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover mb-4 rounded" />
      )}
      <p className="mb-2"><strong>Ingredients:</strong></p>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p className="mb-2"><strong>Steps:</strong></p>
      <p>{recipe.steps}</p>
      <p className="text-sm text-gray-500 mt-4">
        <strong>Author:</strong> {recipe.author?.username || 'Unknown'}
      </p>
    </div>
  );
}
