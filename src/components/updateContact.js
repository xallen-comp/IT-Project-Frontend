import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { useHistory } from 'react-router-dom';

const UpdateContact = (props) => {
	const [item, setItem] = useState("");
	const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [comment, setComment] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [emailCheck, setEmailCheck] = useState(false);
    const history = useHistory();
	const url = `/contacts/${props.match.params.contactID}`;
	useEffect(() => {
		setItem(props.match.params.contactID);
		axios.get(url).then(res => {setItem(res.data)})
    }, [props.match.params.contactID, url])
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
        setComment(comment);
    };
    const onChangePhone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
    };

    const validateUpdate = () => {
        return emailCheck;
    }
    const handleUpdate = (e) => {
        console.log(firstName);
        console.log(lastName);
        e.preventDefault();
         if (true){
             axios.post(`/contacts/${item._id}/update`, {first_name: firstName, last_name: lastName, email: email, comments: comment, phone: phone}).then(res => console.log(res));
             history.push("/");
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
		<div>
            <form className='form' onSubmit={handleUpdate}>
                <p>Enter the contact's details below</p>
                <label htmlFor="firstName">First Name: </label>
                    <input 
                        type="text" 
                        className="input"
						defaultValue={item.first_name}
                        name="firstName" 
                        onChange={onChangeFirstName}
                        autoComplete="on"
                        required/><br />
                <label htmlFor="lastName">Last Name: </label>
                    <input 
                        type="text" 
                        className="input"
                        defaultValue={item.last_name}
                        name="lastName" 
                        onChange={onChangeLastName}
                        autoComplete="on"
                        required/><br />
                <label htmlFor="email">Email: </label>
                    <input 
                        type="text" 
                        className="input"
                        defaultValue={item.email}
                        name="email" 
                        onChange={onChangeEmail}
                        autoComplete="on"
                        required/><br />
                <label htmlFor="phone">Phone: </label>
                    <input 
                        type="text" 
                        className="input"
                        defaultValue={item.phone}
                        name="phone" 
                        onChange={onChangePhone}
                        autoComplete="on"
                        required/><br />
                <label htmlFor="comments">Comments: </label>
                    <input 
                        type="text" 
                        className="input"
                        defaultValue={item.comments}
                        name="comment" 
                        onChange={onChangeComment}
                        autoComplete="on"
                        required/><br />
                    <input
                        type="submit"
                        className="btn"
                        name="Update Contact"
                        value="Update Contact"
                        autoComplete="on"/>
			</form> 		
		</div>
	);
}
export default UpdateContact;