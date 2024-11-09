"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage() {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryRecipes() {
      try {
        const res = await fetch(`http://localhost:5001/api/recipes?category=${encodeURIComponent(category)}`);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    }

    if (category) {
      fetchCategoryRecipes();
    }
  }, [category]);

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Recipes in {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe._id} className="border p-4 rounded shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
              <p className="text-gray-600 mb-2"><strong>Category:</strong> {recipe.category}</p>
              <p className="text-gray-700">{recipe.steps.substring(0, 100)}...</p>
              <Link href={`/recipes/${recipe._id}`}>
                <button className="mt-2 bg-primary text-white p-2 rounded">View More</button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">No recipes found in this category.</p>
        )}
      </div>
    </div>
  );
}
