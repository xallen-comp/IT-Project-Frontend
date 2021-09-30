import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "../services/backendApi.js";
import HorizontalScroll from "react-scroll-horizontal";
import '../App.css';

const HomePage = () => {
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
            <div className= "horizon">
                <HorizontalScroll>
                    <div className = "main bg">
                        <Link to='/addContact' className='btn'>Add Contact</Link>
                    </div>
                        {items.map((item, key) => (
                        <div className = "main bg1">
                        <Link to={`/contactDetails/${item._id}`}>
                            <img src = {item.photo} alt="Contact photos"/>
                            <p>{item.first_name} {item.last_name} </p>
                        </Link>
                        </div>
                        ))}
                </HorizontalScroll>
            </div> 

            
        <div>             
            <h1> Events </h1>
            {events.map((event, key) => (
                <Link to={`/eventDetails/${event._id}`}>
                    <div>
                        <p>{event.title} </p>
                        <p>{event.start} {event.end}</p>
                    </div>
                </Link>
            ))}
            <Link to='/addEvent' className='btn'>Add Event</Link>
        
        </div>
   </header>
            );
}

export default HomePage;
