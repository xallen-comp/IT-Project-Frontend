import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
//import PropTypes from 'prop-types';
import '../App.css';

const EventDetails = (props) => {
    const subHeadingStyle = {
        fontWeight:100,fontSize:18
    }
	const [event, setEvent] = useState("");
    const url = `/events/${props.match.params.eventID}`;
	useEffect(() => {
		setEvent(props.match.params.eventID);
		axios.get(url).then(res => {setEvent(res.data)})
    }, [props.match.params.eventID, url])
	return (
            <div>
                <h2>Name of event: <span style = {subHeadingStyle}>{event.title}</span></h2>
                <h2>Starting date: <span style = {subHeadingStyle}>{event.start}</span></h2>
                <h2>Ending date: <span style = {subHeadingStyle}>{event.end}</span></h2>
                <h2>Importance: <span style = {subHeadingStyle}>{event.importance}</span></h2>
                <p>Reminder set for {event.reminder}</p> &nbsp;
                <h2>Event description:</h2>
                <p>{event.description}</p>
                <h2>Numbers:</h2>
                <p>{event.phone}</p>
            </div>
	);
}

export default EventDetails;