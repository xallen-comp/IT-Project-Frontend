import { useState, useEffect } from "react";
//import React from "react";
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';
import '../App.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';


//modied to add addContact button
import React, { Component } from 'react'
import Select from 'react-select'
//------------------------------------

const EventDetails = (props) => {
	const [event, setEvent] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [colour, setColour] = useState("");
    const [importance, setImportance] = useState(null);
    const [reminder, setReminder] = useState(null);
    const [oldReminder, setOldReminder] = useState(null);
    const [contacts, setContacts] = useState([]);
    const history = useHistory();

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

    const onChangeStart = (e) => {
        const start = e.target.value;
        setStart(start);
    }

    const onChangeEnd = (e) => {
        const end = e.target.value;
        setEnd(end);
    }

    const onChangeColour = (e) => {
        const colour = e.target.value;
        setColour(colour);
    }
    const onChangeImportance = (e) => {
        const importance = e.value;
        setImportance(importance);
    }

    const onChangeReminder = (e) => {
        const reminders = []
        for(let index in e){
            reminders.push(e[index].value);
        }
        setReminder(reminders);
    }

    const handleUpdate = (e) => {
        console.log(e)
        e.preventDefault();
        axios.post(`/events/${event._id}/update`, 
                {description: description, title: title, start_time:start, end_time:end, colour: colour, importance: importance, reminder: reminder, time:start, contacts: contacts}).then(res => console.log(res));
        history.push(`/eventDetails/${event._id}`);
    }


    const url = `/events/${props.match.params.eventID}`;
	useEffect(() => {
		setEvent(props.match.params.eventID);
		axios.get(url).then(res => {
            setEvent(res.data)
            setOldReminder(res.data.reminder)
        })
    }, [props.match.params.eventID, url])

    //modified to add addContact button
    const [items, setItems] = useState([]);

    const GetContacts = () =>{
        axios.get("/contacts").then(res => {setItems(res.data);})
    }
    useEffect(() => {
            GetContacts();
        }, [])
   

        const options2 = items.map((item, key) => (
            { value: key, label: item.first_name+" "+item.last_name }
            
        ))

    const options = [
        { value: 'Very High', label: 'Very High' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
        { value: 'Very Low', label: 'Very Low' }
      ]


    const options3 = [
        { value: 15, label: '15 Minutes'},
        { value: 30, label: '30 Minutes'},
        { value: 60, label: '1 Hour'},
        { value: 10*60, label: '10 Hours'},
        { value: 24*60, label: '1 Day'},
        { value: 7*24*60, label: '1 Week'},
        { value: 0, label: 'None'}
    ]
    //console.log(options)  

    //----------------------------------

    
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
            <div>
                <form className = 'form' onSubmit = {handleUpdate} name="newEvent">
                    <p className = "title" >Update Event</p>

                        <input
                            type="text"
                            className="input"
                            defaultValue={event.title}
                            name="title"
                            onChange={onChangeTitle}
                            autoComplete="on"
                            required/><br />

                        <div className="import">

                            <Select onChange={onChangeImportance} placeholder="Enter Importance" options={options} placeholder={event.importance}/>
                        </div>

                        <textarea rows="3" cols="80" onChange={onChangeDescription} placeholder="Enter Description"/>
                   
                        <input
                            type="datetime-local"
                            className="input"
                            name="Start"
                            onChange={onChangeStart}
                            defaultValue={event.start_time}
                            /><br />
                    
                        <input
                            type="datetime-local"
                            className="input"
                            name="End"
                            onChange={onChangeEnd}
                            defaultValue={event.end_time}
                            /><br />


                    
                        <input
                            type="color"
                            className="input"
                            name="Colour"
                            onChange={onChangeColour}
                            defaultValue={event.colour}
                            /><br />

                        <div className="contacts">
                            <Select isMulti options  = {options2} placeholder="Enter Contacts..."/>
                            <Button size="small" variant="outlined" href = {`/addContact`} className='btn'> Add New Contact</Button>
                        </div>
                        <div className="reminder">
                            <Select isMulti options= {options3} onChange={onChangeReminder} placeholder={oldReminder}/>
                        </div>

                        <input
                            type="submit"
                            className="btn eventform"
                            name="Add-Event"
                            value="Update Event"
                            autoComplete="on"
                        /> 
                </form>
            </div>
        </body>
        <footer>
            <p>Turing Machines&#8482;</p>
        </footer></>

	);
}

export default EventDetails;