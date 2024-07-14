import React, { createContext, useState } from 'react';

export const DietPlanContext = createContext();

export const DietPlanProvider = ({ children }) => {
  const [dietPlans, setDietPlans] = useState([]);

  const addDietPlan = (dietPlan) => {
    setDietPlans([...dietPlans, dietPlan]);
  };

  const updateDietPlan = (updatedDietPlan) => {
    setDietPlans(dietPlans.map(dietPlan => dietPlan.id === updatedDietPlan.id ? updatedDietPlan : dietPlan));
  };

  const removeDietPlan = (id) => {
    setDietPlans(dietPlans.filter((dietPlan) => dietPlan.id !== id));
  };

  return (
    <DietPlanContext.Provider value={{ dietPlans, setDietPlans, addDietPlan, updateDietPlan, removeDietPlan }}>
      {children}
    </DietPlanContext.Provider>
  );
};
