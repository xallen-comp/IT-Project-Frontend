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
    //modified to add addContact button
    const [items, setItems] = useState([]);

    const GetContacts = () =>{
        axios.get("/contacts").then(res => {setItems(res.data);})
    }
    useEffect(() => {
            GetContacts();
        }, [])
    //console.log(items) 
    
    /*
    const options = items.map((item, key) => (
        <option>{item.first_name} {item.last_name}</option>
    ))
    */
    const options2 = items.map((item, key) => (
        { value: key, label: item.first_name+" "+item.last_name}
        
    ))
    //console.log(options)  

    //----------------------------------


    const handleUpdate = (e) => {
        console.log(e)
        e.preventDefault();
        axios.post("/events/add", 
                {description: description, title: title, start_time:start, end_time:end, colour:colour}).then(res => console.log(res));
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
                        <label htmlFor="Title">Title:</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter Title:"
                                name="title"
                                onChange={onChangeTitle}
                                autoComplete="on"
                                required/><br />
                        <label htmlFor="Description">Description:</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter Description"
                                name="Description"
                                onChange={onChangeDescription}
                                autoComplete="on"
                                /><br />
                        <label htmlFor="Start">Start:</label>
                            <input
                                type="datetime-local"
                                className="input"
                                name="Start"
                                onChange={onChangeStart}
                                /><br />
                        <label htmlFor="End">End:</label>
                            <input
                                type="datetime-local"
                                className="input"
                                name="End"
                                onChange={onChangeEnd}
                                /><br />
                        <label htmlFor="Colour">Set Colour:</label>
                            <input
                                type="color"
                                className="input"
                                name="Colour"
                                onChange={onChangeColour}
                                /><br />
                        <label htmlFor="Select Contact">Select Contact:</label>
                            <Select isMulti options = {options2} />
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