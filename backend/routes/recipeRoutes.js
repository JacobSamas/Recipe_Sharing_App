const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Add a new recipe
router.post('/add', async (req, res) => {
  try {
    const { title, ingredients, steps, image, category, author } = req.body;
    const recipe = new Recipe({ title, ingredients, steps, image, category, author });
    await recipe.save();
    res.status(201).json({ message: 'Recipe added successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error adding recipe' });
  }
});

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recipes' });
  }
});

// Get a specific recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching the recipe' });
  }
});

module.exports = router;
