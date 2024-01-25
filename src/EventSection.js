import React, { useState } from "react";
import EventList from "./EventList";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import "./EventSection.css";
import ThemeContext from "./ThemeContext";
import { useContext } from "react";

const EventSection = (props) => {
  const { selectedValue } = props;

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const themeContext = useContext(ThemeContext);
  const textColor = themeContext.bgColor === 'white' ? 'black' : 'white';

  useEffect(() => {
    const getSelectedCityEvents = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:5005/details");

      const data = await response.json();

      let filteredData = data.filter(
        (eachValue) => eachValue.city === selectedValue
      );

      filteredData = filteredData.length !== 0 ? filteredData : data;

      const updatedData = filteredData.map((eachItem) => ({
        id: eachItem.id,
        eventDate: eachItem.payload.event_date,
        eventTime: eachItem.payload.event_time,
        image: eachItem.payload.image,
        eventName: eachItem.payload.items[0].event_name,
        eventDescription: eachItem.payload.items[0].event_description,
        sellPrice: eachItem.payload.items[0].sell_price,
      }));


      setSelectedEvents(updatedData);
      setIsLoading(false);
    };

    getSelectedCityEvents();
  }, [selectedValue]);
  return (
    <div>
      <hr />
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          {selectedValue ? (
            <h3 className="text-capitalize text-start" style={{color:`${textColor}`}}>
              Events in {selectedValue}
            </h3>
          ) : (
            <h3 className="text-capitalize text-start" style={{color:`${textColor}`}}>Events in All</h3>
          )}
          <div className="event-section">
            {selectedEvents.map((eachEvent) => (
              <EventList eventsList={eachEvent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSection;
