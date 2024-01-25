import { Button } from "react-bootstrap";
import ThemeContext from "./ThemeContext";
import { useContext } from "react";

const Header = () => {
  const themeContext = useContext(ThemeContext);

  const changeTheme = () => {
    themeContext.changeTheme();
  };

  return (
    <div
      className="homebg-container"
      style={{ backgroundColor: `${themeContext.bgColor}` }}
    >
      <div className="head-section m-2">
        <h1 className="text-danger">eventBrite</h1>
        <div>
          <Button className="mt-2" onClick={changeTheme}>
            Change Theme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
