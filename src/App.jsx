import React from "react";
import AppRouter from "./router/AppRouter";
import AppProvider from "./context/AppProvider";
import CategoryProvider from "./context/CategoryProvider";

const App = () => {
  return (
    <AppProvider>
      <CategoryProvider>
        <AppRouter />
      </CategoryProvider>
    </AppProvider>
  );
};

export default App;
