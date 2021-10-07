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
		<body className = "App-header">
			<header>
            	<h1 className = "header-title"> <a href="/">Event Tracker</a> </h1>
			</header>
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
		</body>
	);
}
export default ContactDetails;