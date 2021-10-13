import { useState, useEffect } from "react";

import axios from "../services/backendApi.js";

const EventPage = () => {
    const [items, setItems] = useState([]);
    const [events, setEvents] = useState([]);
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const GetContacts = () =>{
        axios.get("/contacts").then(res => {setItems(res.data);})
    }
    const GetEvents = () =>{
        axios.get("/events").then(res => {setEvents(res.data);})
    }

    const onChangeType = (e) => {
        const type = e.target.value;
        setType(type);
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

    useEffect(() => {
        GetContacts();
        GetEvents();
    }, [])

    const handleUpdate = (e) => {
        console.log(e)
        e.preventDefault();
        if (true) {
            axios.post("/events/add", 
                {description: description, title: type, start_time:start, end_time:end}).then(res => console.log(res));
        }
    }

    return (
    <header className = "App-header">
        <div>
            <form className = 'form' onSubmit = {handleUpdate}>
            <p>Enter the event's details blow</p>
            <label htmlFor="Type">Type:</label>
            <input
            type="text"
            className="input"
            placeholder="Enter Type"
            name="type"
            onChange={onChangeType}
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
            <input
            type="text"
            className="input"
            placeholder="Enter Start"
            name="Start"
            onChange={onChangeStart}
            autoComplete="on"
            required/><br />
            <label htmlFor="End">End:</label>
            <input
            type="text"
            className="input"
            placeholder="Enter End"
            name="End"
            onChange={onChangeEnd}
            autoComplete="on"
            required/><br />
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