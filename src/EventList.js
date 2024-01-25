import React from "react";
import { Image } from "react-bootstrap";
import "./EventList.css";
import { Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import { useContext } from "react";

const EventList = (props) => {
  const { eventsList } = props;
  const {
    id,
    eventDate,
    eventTime,
    image,
    eventName,
    eventDescription,
    sellPrice,
  } = eventsList;
  const themeContext = useContext(ThemeContext);
  const textColor = themeContext.bgColor === 'white' ? 'black' : 'white';

  return (
    <div className="event-list m-3 ">
      <Link to={`event/${id}`} className="link-items">
        <Image src={image} className="w-100 event-image" />
        <div className="event-content p-1 text-start">
          <h5 className="text-danger">{eventName}</h5>
          <p style={{color:`${textColor}`}}>{eventDescription}</p>
          <div className="event-timing text-success">
            <p>{eventDate}</p>
            <p>{eventTime}</p>
          </div>
          <p style={{color:`${textColor}`}}>Price: {sellPrice}</p>
        </div>
      </Link>
    </div>
  );
};

export default EventList;
