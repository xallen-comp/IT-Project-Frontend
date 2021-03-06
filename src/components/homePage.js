import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "../services/backendApi.js";
import HorizontalScroll from "react-scroll-horizontal";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Button from '@mui/material/Button';

import moment from 'moment';
import '../App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const HomePage = () => {
    const [items, setItems] = useState([]);
    const [newItems, setNewItems] = useState([]);
    const [events, setEvents] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [image, setImage] = useState("");
    const GetContacts = () =>{
            axios.get("/contacts").then(res => {
            for(let index in res.data){
                    axios.post("/contacts/fetch", {"filename": res.data[index].photo}, {responseType: "arraybuffer"}).then(response => {
			                const theImage = new Buffer(response.data).toString('base64');
                            res.data[index].photo = theImage;
                            setNewItems(newItems.concat(res.data[index]));
			                setImage(theImage);
			        });
                
            }
            setItems(res.data); 
            })
    }
    const GetEvents = () =>{
        axios.get("/events").then(res => {
        let cEvents = [];
        setEvents(res.data);
        for (let index in res.data){
            let obj = {title: res.data[index].title, colour: res.data[index].colour, start: res.data[index].start_time, end: res.data[index].end_time, url: `/eventDetails/${res.data[index]._id}`, backgroundColor: res.data[index].colour}
            cEvents.push(obj);
        }
        setCalendarEvents(cEvents);
        });
    }
	const GetReminders = () =>{
        const date = Date.now();
        axios.post(`/events/getreminders`, {date: date}).then(res => {
            console.log(res.data);
            let eventsR = []
            for(let index in res.data){
                let obj = {title: res.data[index].title, reminder: res.data[index].reminder, _id: res.data[index]._id}
                eventsR.push(obj)
            }
            setReminders(eventsR);
            console.log(typeof(res.data));   
        });
    }

    const DeleteReminder = (val) =>{
         axios.post(`/events/${val._id}/deleteReminder`, {"reminder": val.reminder}).then(res => {console.log(res)});
         window. location. reload()
    }
    useEffect(() => {
        GetReminders();
        GetContacts();
        GetEvents();

    }, [])

    return (
        
        <><div class="header">
                <nav>
                    <h1 className = "logo"><a href="/">Event Tracker</a></h1>
                    <ul class="nav-links">
                        <li><a href="/">Home</a></li>
  
                    </ul>
                </nav>
            </div>
            <body className = "App-header">
                    <div className= "horizon">
                        <HorizontalScroll>
                            <div className = "main bg">
                                <Link to='/addContact' className='btn contact'>Add Contact</Link>
                            </div>
                                {items.map((item, key) => (
                                <div className = "main bg1">
                                <Link to={`/contactDetails/${item._id}`}>
                                    <img src = {`data:image/jpeg;base64,${item.photo}`} alt="Contact photos"/>
                                    <p className = "contact-link">{item.first_name} {item.last_name} </p>
                                </Link>
                                </div>
                                ))}
                        </HorizontalScroll>
                    </div> 

                    
                <div>

                    <h1>Reminders: {
                    reminders.map((reminder, key) => (
                        <div className="reminder-button">
                            <p> {reminder.title}</p> 
                            <Button size="large" variant="outlined" color="error" className = "remindbutton" onClick={() => DeleteReminder(reminder) }>
                                Received
					        </Button>
                            </div>
                            ))}
                            </h1>
                            

                    <h1> Events </h1>
                    <FullCalendar
                        timeZone= 'local'
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                        center: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
                        events={calendarEvents}
                        //eventContent={renderEventContent}
                    />
                    {events.map((event, key) => (
                        <Link to={`/eventDetails/${event._id}`}>
                            <div>
                                <p>{event.title} </p>
                            </div>
                        </Link>
                    ))}
                    <Link to='/addEvent' className='btn event'>Add Event</Link>
                
                </div>
        </body>
        <footer>
            <p>Turing Machines&#8482;</p>
        </footer></>
    );
}


function renderEventContent(eventInfo) {
    return (
        <>
        <div className = "idek">
            <p style={{color: `${eventInfo.event.colour}`}}>{eventInfo.event.title}</p>
        </div>
      </>
    )
  }

export default HomePage;
