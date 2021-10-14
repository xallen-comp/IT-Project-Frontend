import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';
import '../App.css';

const EventDetails = (props) => {
	const [event, setEvent] = useState("");
    const url = `/events/${props.match.params.eventID}`;
	useEffect(() => {
		setEvent(props.match.params.eventID);
		axios.get(url).then(res => {setEvent(res.data)})
    }, [props.match.params.eventID, url])
	return (
        <>
            <div class="header">
                <nav>
                    <h1 className = "logo"><a href="/">Event Tracker</a></h1>
                    <ul class="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Contacts</a></li>
                        <li><a href="/">Events</a></li>
                    </ul>
                </nav>
            </div>
        <body className="App-header">
            
            <h1>{event.title}</h1>
            <p> {event.start_time + " to " + event.end_time} </p>
            <p>{event.importance}</p>
            <p>Reminder set for {event.reminder}</p> &nbsp;
            <p>{event.description}</p>
            <footer>
                <p>Turing Machines&#8482;</p>
            </footer>
        </body></>
	);
}

export default EventDetails;