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
    const [reminder, setReminder] = useState([0]);
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

   const onChangeContacts = (e) => {
        const contact = []
        for(let index in e){
            contact.push(e[index].value);
        }
        setContacts(contact);
    }
    

    //modified to add addContact button
    const [items, setItems] = useState([]);

    const GetContacts = () =>{
        axios.get("/contacts").then(res => {setItems(res.data);})
    }
    useEffect(() => {
            GetContacts();
        }, [])
    
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
                {description: description, title: title, start_time:start, end_time:end, colour:colour, contacts: contacts, time:(new Date(start)), importance:importance, reminder:reminder} ).then(res => console.log(res));
        history.push("/");
    }

    return (
        <><div className="header">
                <nav>
                    <h1 className = "logo"><a href="/">Event Tracker</a></h1>
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                    </ul>
                </nav>
            </div>
            <body className = "App-header">
                <div>
                    <form className = 'form' onSubmit = {handleUpdate} name = "newEvent">
                        <p className = "title" >New Event</p>

                            <input
                                type="text"
                                className="input"
                                placeholder="Enter Title"
                                name="title"
                                onChange={onChangeTitle}
                                autoComplete="on"
                                required/><br />

                            <div className = "import">
                                <Select onChange={onChangeImportance} placeholder="Enter Importance..." options={options}/>
                            </div>


                            <textarea rows="3" cols="350" onChange={onChangeDescription} placeholder="Enter Description"/>
                
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

                                <div className = "colourSelect">
                                <input
                                type="color"
                                className="input"
                                name="Colour"
                                onChange={onChangeColour}
                                /><br />
                                </div>


                            <div className="adding-contacts">
                                <Select isMulti onChange={onChangeContacts} options = {options2} placeholder="Enter Contacts..."/>
                                <Button size="small" variant="outlined" href = {`/addContact`} className='btn'> Add New Contact</Button>
                            </div>

                            <div className="reminder">
                                <Select isMulti options= {options3} onChange={onChangeReminder} placeholder="Enter Reminder..."/>
                            </div>

                            <input
                                type="submit"
                                className="btn"
                                name="Add-Event"
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