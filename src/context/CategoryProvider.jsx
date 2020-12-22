import React, { createContext, useReducer } from "react";

export const CategoryContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_TYPES":
      return { ...state, categoryTypes: action.payload };
    case "CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

const CategoryProvider = ({ children }) => {
  const value = useReducer(reducer, { categoryTypes: [], categories: [] });

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;