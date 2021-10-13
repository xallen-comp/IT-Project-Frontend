import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';
import '../App.css';
import { Link } from 'react-router-dom';

const EventDetails = (props) => {
	const [event, setEvent] = useState("");
    const url = `/events/${props.match.params.eventID}`;
	useEffect(() => {
		setEvent(props.match.params.eventID);
		axios.get(url).then(res => {setEvent(res.data)})
    }, [props.match.params.eventID, url])
	return (
            <div>
                <h1>{event.title}</h1>
                <p> {event.start_time + " to " + event.end_time} </p>
                <p>{event.importance}</p>
                <p>Reminder set for {event.reminder}</p> &nbsp;
                <p>{event.description}</p>
                <Link to={`/updateEvent/${event._id}`} className='btn'>Update Event</Link>
            </div>
	);
}

export default EventDetails;