import React, { createContext, useState } from 'react';

export const DietPlanContext = createContext();

export const DietPlanProvider = ({ children }) => {
  const [dietPlans, setDietPlans] = useState([]);

  const addDietPlan = (dietPlan) => {
    setDietPlans([...dietPlans, dietPlan]);
  };

  const removeDietPlan = (id) => {
    setDietPlans(dietPlans.filter((dietPlan) => dietPlan.id !== id));
  };

  return (
    <DietPlanContext.Provider value={{ dietPlans, addDietPlan, removeDietPlan }}>
      {children}
    </DietPlanContext.Provider>
  );
};
