import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
//import PropTypes from 'prop-types';
import '../App.css';

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
                <p>{event.start} {event.end} </p>
                <p>{event.importance}</p>
                <p>Reminder set for {event.reminder}</p> &nbsp;
                <p>{event.description}</p>
                <p>{event.phone}</p>
            </div>
	);
}

export default EventDetails;