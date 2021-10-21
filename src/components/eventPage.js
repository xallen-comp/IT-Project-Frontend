import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';

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


    const handleUpdate = (e) => {
        console.log(e)
        e.preventDefault();
        axios.post("/events/add", 
                {description: description, title: title, start_time:start, end_time:end}).then(res => console.log(res));
        history.push("/");
    }

    return (
    <header className = "App-header">
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
                        required/><br />
                <label htmlFor="Start">Start:</label>
                    <Datetime onChange={onChangeStart}/>
                <label htmlFor="End">End:</label>
                    <Datetime onChange={onChangeEnd}/>

                   
                <label htmlFor="Select Contact">Select Contact:</label>
                    <Select isMulti options = {options2} />
                <div className = "add contact button">
                    <Link to='/addContact' className='btn'>Add Contact</Link>                 
                </div> 

               
                    <input
                        type="submit"
                        className="btn"
                        name="Add Event"
                        value="Add Event"
                        autoComplete="on"
                    /> 
            </form>
               
        </div>
   </header>
   );
}

export default EventPage;