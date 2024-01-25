import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import Event from "./Event";
import NotFound from "./NotFound";
import ThemeContext from "./ThemeContext";
import { useState } from "react";
import Header from "./Header";

function App() {
  const [theme, setTheme] = useState({
    bgColor: "white",
  });

  const changeTheme = () => {
    setTheme((prevTheme) => ({
      bgColor: prevTheme.bgColor === "white" ? "black" : "white",
    }));
  };
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ ...theme, changeTheme }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/event/:id" element={<Event />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
