import { useState, useEffect } from "react";

import axios from "../services/backendApi.js";

const ContactPage = () => {
    const [items, setItems] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [comment, setComment] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [events, setEvents] = useState([]);
    const [emailCheck, setEmailCheck] = useState(false);
    const GetContacts = () =>{
            axios.get("/contacts").then(res => {setItems(res.data);})
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        checkEmailFormat(email)
    };
    const GetEvents = () =>{
        axios.get("/events").then(res => {setEvents(res.data);})
    }
    useEffect(() => {
        GetContacts();
        GetEvents();
    }, []);

    const validateUpdate = () => {
        return emailCheck
    }
    const handleUpdate = (e) => {
    }
    //from webinfo 2021
    const checkEmailFormat = (emailToCheck)=>{
        console.log(emailToCheck)
        const validateEmail = (emailToCheck) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailToCheck).toLowerCase());
        }
        setEmailCheck(validateEmail(emailToCheck))
    
    }
    return (
    <header className = "App-header">
   </header>
   );
}

export default ContactPage;