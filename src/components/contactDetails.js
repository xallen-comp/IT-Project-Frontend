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
			<div className = "contact_details">
				<img className = "contact_photo" src = {item.photo} alt= {item.first_name + " " + item.last_name}/>
				<div className = "items">
					<p className= "name">{item.first_name} {item.last_name} </p>
					<p>{item.occupation}</p>
					<p>{item.email}</p>
					<p>{item.phone}</p>
					<div className = "comments">
						<p>Comments</p>
						<p1>{item.comments}</p1>
					</div>
				</div>
			</div>
		</body>
		<footer>
				<p>Turing Machines&#8482;</p>
			</footer></>
	);
}
export default ContactDetails;