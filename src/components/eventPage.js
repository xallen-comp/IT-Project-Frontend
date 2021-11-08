import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';
import Button from '@mui/material/Button';


//modied to add addContact button
import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import Select from 'react-select'
//------------------------------------

const EventPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [colour, setColour] = useState("");
    const [importance, setImportance] = useState("Medium");
    const [reminder, setReminder] = useState("30 Minutes");
    const [contacts, setContacts] = useState("");
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
        const reminder = e.value;
        setReminder(reminder);
    }

   const onChangeContacts = (e) => {
        const contacts = e.value;
        setContacts(contacts);
    }
    


    //modified to add addContact button
    const [items, setItems] = useState([]);

    const GetContacts = () =>{
        axios.get("/contacts").then(res => {setItems(res.data);})
    }
    useEffect(() => {
            GetContacts();
        }, [])
    //console.log(items) 
    
    const options = [
        { value: 'Very High', label: 'Very High' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
        { value: 'Very Low', label: 'Very Low' }
      ]

    const options2 = items.map((item, key) => (
        { value: item._id, label: item.first_name+" "+item.last_name }
        
    ))

    const options3 = [
        { value: 15, label: '15 Minutes'},
        { value: 30, label: '30 Minutes'},
        { value: 60, label: '1 Hour'},
        { value: 10*60, label: '10 Hours'},
        { value: 24*60, label: '1 Day'},
        { value: 7*24*60, label: '1 Week'},
        { value: 0, label: 'None'}
    ]

    const handleUpdate = (e) => {
        console.log("contacts")
        console.log("this is" +importance)
        e.preventDefault();
        axios.post("/events/add", 
                {description: description, title: title, start_time:start, end_time:end, colour:colour, contacts: [contacts], importance:importance, reminder:reminder} ).then(res => console.log(res));
        history.push("/");
    }

    return (
        <><div class="header">
                <nav>
                    <h1 className = "logo"><a href="/">Event Tracker</a></h1>
                    <ul class="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Contacts</a></li>
                        <li><a href="/">Events</a></li>
                    </ul>
                </nav>
            </div>
            <body className = "App-header">
                <div>
                    <form className = 'form' onSubmit = {handleUpdate}>
                        <p>Enter the event's details below</p>

                            <input
                                type="text"
                                className="input"
                                placeholder="Enter Title"
                                name="title"
                                onChange={onChangeTitle}
                                autoComplete="on"
                                required/><br />
                        <label htmlFor="Importance">Importance</label>
                            <Select onChange={onChangeImportance} placeholder="Enter Importance" options={options}/>
                        <label htmlFor="Reminder">Reminder</label>
                            <Select onChange={onChangeReminder} placeholder="Enter Reminder" options={options3}/>

                            <input
                                type="text"
                                className="input"
                                placeholder="Enter Description"
                                name="Description"
                                onChange={onChangeDescription}
                                autoComplete="on"
                                /><br />
                
                            <input
                                type="datetime-local"
                                className="input"
                                name="Start"
                                onChange={onChangeStart}
                                /><br />
                    
                            <input
                                type="datetime-local"
                                className="input"
                                name="End"
                                onChange={onChangeEnd}
                                /><br />

                                <input
                                type="color"
                                className="input"
                                name="Colour"
                                onChange={onChangeColour}
                                /><br />
                        <label htmlFor="Select Contact">Select Contact:</label>
                            <Select onChange={onChangeContacts} options = {options2} />

                        <Button size="small" variant="outlined" href = {`/addContact`} className='btn'> Add New Contact</Button>

                            <input
                                type="submit"
                                className="btn"
                                name="Add Event"
                                value="Add Event"
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

export default EventPage;