import {
  Container,
  Col,
  Row,
  Image,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useState } from "react";
import EventSection from "./EventSection";
import "./HomePage.css";
import ThemeContext from "./ThemeContext";
import { useContext } from "react";

const HomePage = () => {
  const [cityValues, setCityValues] = useState([]);
  const [selectedValue, SetSelectedValue] = useState("");
  const themeContext = useContext(ThemeContext);
  const textColor = themeContext.bgColor === 'white' ? 'black' : 'white';

  const getSelectedValue = (value) => {
    SetSelectedValue(value);
  };

  const getCityDetails = async () => {
    const response = await fetch("http://localhost:5005/details");

    const data = await response.json();

    const updatedData = data.map((eachValue) => ({
      city: eachValue.city,
    }));

    var distinctValues = [];
    for (var i = 0; i < updatedData.length; i++) {
      if (!distinctValues.includes(updatedData[i].city)) {
        distinctValues.push(updatedData[i].city);
      }
    }

    setCityValues(distinctValues);
  };

  return (
    <div style={{ backgroundColor: `${themeContext.bgColor}` }}>
      <Container className="text-center">
        <Row className="container">
          <Col className="image-size">
            <Image
              src="https://cdn.evbstatic.com/s3-build/fe/build/images/d496904ef6b1264a0a7f769d33acad73-4_tablet_1067x470.webp"
              fluid
            />
          </Col>
          <Col className="event-selection mt-3">
            <h5 className="m-2" style={{backgroundColor:"transparent",color:`${textColor}`}}>Browsing events in </h5>
            <DropdownButton
              id="dropdown-basic-button"
              title="Select City"
              onClick={getCityDetails}
            >
              <Dropdown.Item
                as="button"
                onClick={() => getSelectedValue("All")}
              >
                All
              </Dropdown.Item>
              {cityValues.map((eachValue) => (
                <Dropdown.Item
                  as="button"
                  onClick={() => getSelectedValue(eachValue)}
                >
                  {eachValue}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col>
            <EventSection selectedValue={selectedValue} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
