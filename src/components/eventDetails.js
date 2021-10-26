import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';
import '../App.css';
import moment from 'moment';
import {Link, useHistory} from 'react-router-dom';


const EventDetails = (props) => {
	const [event, setEvent] = useState("");
    const url = `/events/${props.match.params.eventID}`;
    const history = useHistory();

    const handleUpdate = (e) => {
        console.log(e)
        const data = {};
        //e.preventDefault();
        axios.post(`/events/${e}/delete`, data);
        history.push("/");
    }

    //adapted from css tricks
    const formatDate = (dateString) => {
        const v = moment(dateString);
        return v.format("LLL")
    }
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
            <div className = "event-details">
                <h1>{event.title}</h1>
                <div className = "splash-of-colour" style={{height: "20px", width: "100%", background: `${event.colour}`}}></div> 

                    <p> {formatDate(event.start_time) + " to " + formatDate(event.end_time)} </p>
                    <p>Importance: {event.importance}</p>
                    <p>Reminder set for: {event.reminder}</p>
                    <p>{event.description}</p>
                    <Link to={`/updateEvent/${event._id}`} className='btn'>Update Event</Link>
                    <button onClick={()=>handleUpdate(event._id)} className='btn'>Delete Event</button>
            </div>
        </body>
        <footer>
                <p>Turing Machines&#8482;</p>
        </footer></>
	);
}

export default EventDetails;