import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";


const ContactDetails = (props) => {
	const [item, setItem] = useState("");
	const url = `/contacts/${props.match.params.contactID}`;
	useEffect(() => {
		setItem(props.match.params.contactID);
		axios.get(url).then(res => {setItem(res.data)})
    }, [props.match.params.contactID, url])
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
				<img src = {item.photo} alt= {item.first_name + " " + item.last_name}/>
				<p>{item.first_name} {item.last_name} </p>
				<p>{item.comments}</p>
				<p>{item.email}</p>
				<b>{item.phone}</b>
			</div>
			<footer>
				<p>Turing Machines&#8482;</p>
			</footer>
		</body></>
	);
}
export default ContactDetails;