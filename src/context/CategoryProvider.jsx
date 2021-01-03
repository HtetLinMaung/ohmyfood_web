import React, { createContext, useReducer } from "react";

export const CategoryContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_TYPES":
      return { ...state, categoryTypes: action.payload };
    case "CATEGORIES":
      return { ...state, categories: action.payload };
    case "CATEGORY_TYPE":
      return { ...state, categoryType: action.payload };
    case "TYPE_DIALOG":
      return { ...state, typeDialog: action.payload };
    case "NAME":
      return { ...state, name: action.payload };
    case "IMAGE":
      return { ...state, image: action.payload };
    case "IMAGE_SRC":
      return { ...state, imageSrc: action.payload };
    case "IS_UPDATE":
      return { ...state, isUpdate: action.payload };
    case "TYPE_CHANGE":
      return { ...state, categoryTypeChanged: action.payload };
    case "CATEGORY_DIALOG":
      return { ...state, categoryDialog: action.payload };
    case "OPEN_HOUR":
      return { ...state, openHour: action.payload };
    case "CLOSE_HOUR":
      return { ...state, closeHour: action.payload };
    case "TAGS":
      return { ...state, tags: action.payload };
    case "TYPES":
      return { ...state, types: action.payload };
    case "PRICE":
      return { ...state, price: parseFloat(action.payload || 0) };
    case "DISCOUNT_PERCENT":
      return { ...state, discountPercent: parseFloat(action.payload || 0) };
    case "CATEGORY_CHANGE":
      return { ...state, categoryChanged: action.payload };
    case "SET_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const CategoryProvider = ({ children }) => {
  const value = useReducer(reducer, {
    categoryTypes: [],
    categories: [],
    categoryType: null,
    typeDialog: false,
    name: "",
    image: null,
    imageSrc: "",
    isUpdate: false,
    categoryTypeChanged: "",
    categoryDialog: false,
    openHour: null,
    closeHour: null,
    tags: [],
    types: [],
    price: 0,
    discountPercent: 0,
    categoryChanged: "",
  });

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
