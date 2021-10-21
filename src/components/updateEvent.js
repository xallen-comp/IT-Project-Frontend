import { useState, useEffect } from "react";
//import React from "react";
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';
import '../App.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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
        const start = e._d;
        setStart(start);
    }

    const onChangeEnd = (e) => {
        const end = e._d;
        setEnd(end);
    }

    const handleUpdate = (e) => {
        console.log(e)
        e.preventDefault();
        axios.post(`/events/${event._id}/update`, 
                {description: description, title: title, start_time:start, end_time:end}).then(res => console.log(res));
        history.push("/");
    }

    const url = `/events/${props.match.params.eventID}`;
	useEffect(() => {
		setEvent(props.match.params.eventID);
		axios.get(url).then(res => {setEvent(res.data)})
    }, [props.match.params.eventID, url])

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
        { value: key, label: item.first_name+" "+item.la }
        
    ))
    //console.log(options)  

    //----------------------------------

    
	return (
            <div>
                <form className = 'form' onSubmit = {handleUpdate}>
                    <p>Enter the event's details below</p>
                    <label htmlFor="Title">Title:</label>
                        <input
                            type="text"
                            className="input"
                            defaultValue={event.title}
                            name="title"
                            onChange={onChangeTitle}
                            autoComplete="on"
                            required/><br />
                    <label htmlFor="Description">Description:</label>
                        <input
                            type="text"
                            className="input"
                            defaultValue={event.description}
                            name="Description"
                            onChange={onChangeDescription}
                            autoComplete="on"
                            required/><br />
                    <label htmlFor="Start">Start:</label>
                        <Datetime onChange={onChangeStart} defaultValue={event.start_time}/>
                    <label htmlFor="End">End:</label>
                        <Datetime onChange={onChangeEnd} defaultValue={event.end_time}/>


                    <label htmlFor="Select Contact">Select Contact:</label>
                        <Select isMulti options  = {options2} />
                    <div className = "add contact button">
                        <Link to='/addContact' className='btn'>Add Contact</Link>                 
                    </div>  


                        <input
                            type="submit"
                            className="btn"
                            name="Update Event"
                            value="Update Event"
                            autoComplete="on"
                        /> 
                </form>
            </div>
	);
}

export default EventDetails;