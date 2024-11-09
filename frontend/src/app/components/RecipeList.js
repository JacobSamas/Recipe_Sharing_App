"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch('http://localhost:5001/api/recipes');
        const data = await res.json();
        setRecipes(data);
        setFilteredRecipes(data);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(recipe => recipe.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query) || recipe.category.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="bg-primary text-white p-8 rounded-lg mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Recipe Sharing App</h1>
        <p className="text-lg">Discover and share your favorite recipes from around the world!</p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full max-w-lg p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Top Categories */}
      <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category, index) => (
          <Link href={`/recipes?category=${encodeURIComponent(category)}`} key={index}>
            <div className="bg-accent text-white px-4 py-2 rounded hover:bg-secondary cursor-pointer">
              {category}
            </div>
          </Link>
        ))}
      </div>

      {/* Display Filtered Recipes */}
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
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
          <p className="text-center">No recipes found.</p>
        )}
      </div>
    </div>
  );
}
