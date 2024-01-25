import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFound.css";
import ThemeContext from "./ThemeContext";
import { useContext } from "react";

const NotFound = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      className="not-found "
      style={{ backgroundColor: `${themeContext.bgColor}` }}
    >
      <Image
        className="event-image"
        src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found-1024x576.png"
      />
      <Link to="/">
        <Button className="m-2">Back to Home Page</Button>
      </Link>
    </div>
  );
};

export default NotFound;
