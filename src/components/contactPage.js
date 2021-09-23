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
        checkEmailFormat(email);
    };
    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };
    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };
    const onChangeComment = (e) => {
        const comment = e.target.value;
        setLastName(comment);
    };
    const onChangePhone = (e) => {
        const phone = e.target.value;
        setLastName(phone);
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
        console.log(firstName);
        console.log(lastName);
        e.preventDefault();
         if (true){
             axios.post("/contacts/add", {first_name: firstName, last_name: lastName, email: email, comments: comment, phone: phone}).then(res => console.log(res));
         }
    }
    //from webinfo 2021
    const checkEmailFormat = (emailToCheck)=>{
        const validateEmail = (emailToCheck) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailToCheck).toLowerCase());
        }
        setEmailCheck(validateEmail(emailToCheck))
    
    }
    return (
    <header className = "App-header">
        <div>
            <form className='form' onSubmit={handleUpdate}>
                <p>Enter the contact's details below</p>
                <label htmlFor="firstName">First Name: </label>
                <input 
                type="text" 
                className="input"
                placeholder="Enter FirstName" 
                name="firstName" 
                onChange={onChangeFirstName}
                autoComplete="on"
                required/><br />
                <label htmlFor="lastName">Last Name: </label>
                <input 
                type="text" 
                className="input"
                placeholder="Enter LastName" 
                name="lastName" 
                onChange={onChangeLastName}
                autoComplete="on"
                required/><br />
                <label htmlFor="email">Email: </label>
                <input 
                type="text" 
                className="input"
                placeholder="Enter Email" 
                name="email" 
                onChange={onChangeEmail}
                autoComplete="on"
                required/><br />
                <label htmlFor="phone">Phone: </label>
                <input 
                type="text" 
                className="input"
                placeholder="Enter Phone" 
                name="phone" 
                onChange={onChangePhone}
                autoComplete="on"
                required/><br />
                <label htmlFor="comments">Comments: </label>
                <input 
                type="text" 
                className="input"
                placeholder="Enter Comment" 
                name="comment" 
                onChange={onChangeComment}
                autoComplete="on"
                required/><br />
                <input
                type="submit"
                className="btn"
                name="Add Contact"
                value="Add Contact"
                autoComplete="on"
                /> 
            </form>
        </div>
   </header>
   );
}

export default ContactPage;