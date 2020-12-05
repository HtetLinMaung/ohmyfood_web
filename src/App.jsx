import React from "react";
import AppRouter from "./router/AppRouter";
import AppProvider from "./context/AppProvider";

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
