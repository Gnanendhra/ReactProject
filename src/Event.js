import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Image, Spinner, Button } from "react-bootstrap";
import "./Event.css";
import ThemeContext from "./ThemeContext";
import { useContext } from "react";


const Event = () => {
  const params = useParams();
  const { id } = params;

  const [eventDetails, setEventDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const themeContext = useContext(ThemeContext);
  const textColor = themeContext.bgColor === 'white' ? 'black' : 'white';

  useEffect(() => {
    const getEventDetails = async () => {
     const response = await axios.get(`http://localhost:5005/details/${id}`);

      const data = await response.data;

      const updatedData = {
        city: data.city,
        eventDate: data.payload.event_date,
        eventTime: data.payload.event_time,
        image: data.payload.image,
        eventId: data.payload.items[0].event_id,
        eventName: data.payload.items[0].event_name,
        eventTitle: data.payload.items[0].event_title,
        eventDescription: data.payload.items[0].event_description,
        companyName: data.payload.items[0].location.loc_address.company_name,
        countryName: data.payload.items[0].location.loc_address.country_name,
        stateShortName:
          data.payload.items[0].location.loc_address.state_short_name,
        sellPrice: data.payload.items[0].sell_price,
      };
      
      setEventDetails(updatedData);
      setIsLoading(false);
    };

    getEventDetails();
  }, [id]);

  return (
    <div
      className="event-details"
      style={{ backgroundColor: `${themeContext.bgColor}` }}
    >
      <hr />
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <Image src={eventDetails.image} className="event-image" />

          <div className="event-content ">
            <h4 className="text-danger">
            Event Title: {eventDetails.eventTitle}
            </h4>
            <p style={{color:`${textColor}`}}>{eventDetails.eventDescription}</p>
          </div>

          <div className="text-start event-timing">
            <div>
              <h5 className="text-success">When</h5>
              <p style={{color:`${textColor}`}}>Date: {eventDetails.eventDate}</p>
              <p style={{color:`${textColor}`}}>Time: {eventDetails.eventTime}</p>
            </div>
            <div>
              <h5 className="text-primary">Location</h5>
              <p style={{color:`${textColor}`}}>CompanyName: {eventDetails.companyName}</p>
              <p style={{color:`${textColor}`}}>CountryName: {eventDetails.countryName}</p>
            </div>
          </div>
          <h3 className="d-flex justify-content-start" style={{color:`${textColor}`}}>
            Price: {eventDetails.sellPrice}
          </h3>
          <Link to="/">
            <Button>Back</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Event;
