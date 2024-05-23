// RecipeContext.js
import React, { createContext, useState } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [drafts, setDrafts] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe));
  };

  const addDraft = (draft) => {
    setDrafts([...drafts, draft]);
  };

  const removeRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  const removeDraft = (id) => {
    setDrafts(drafts.filter(draft => draft.id !== id));
  };

  return (
    <RecipeContext.Provider value={{ recipes, drafts, addRecipe, updateRecipe, addDraft, removeRecipe, removeDraft }}>
      {children}
    </RecipeContext.Provider>
  );
};
