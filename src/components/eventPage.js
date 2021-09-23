import { useState, useEffect } from "react";

import axios from "../services/backendApi.js";

const EventPage = () => {
    const [items, setItems] = useState([]);
    const [events, setEvents] = useState([]);
    const GetContacts = () =>{
            axios.get("/contacts").then(res => {setItems(res.data);})
    }
    const GetEvents = () =>{
        axios.get("/events").then(res => {setEvents(res.data);})
    }
    useEffect(() => {
        GetContacts();
        GetEvents();
    }, [])
    return (
    <header className = "App-header">
        <div>
            {items.map((item, key) => (
                <div>
                <p>{item.first_name} </p>
                <p>{item.last_name}</p>
                <b>{item.comments}</b>
                </div>
            ))}
            {events.map((event, key) => (
                <div>
                <p>{event.description} </p>
                <p>{event.start}</p>
                <b>{event.end}</b>
                <b>{event.importance}</b>
                </div>
            ))}
        </div>
   </header>
   );
}

export default EventPage;