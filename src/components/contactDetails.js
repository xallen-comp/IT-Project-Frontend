import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import PropTypes from 'prop-types';


const ContactDetails = (props) => {
	const [item, setItem] = useState("");
	const url = `/contacts/${props.match.params.contactID}`;
	useEffect(() => {
		setItem(props.match.params.contactID);
		axios.get(url).then(res => {setItem(res.data)})
    }, [props.match.params.contactID, url])
	return (
		<div>
			<img src = {item.photo} alt= {item.first_name + " " + item.last_name}/>
			<p>{item.first_name} {item.last_name} </p>
			<p>{item.comments}</p>
			<p>{item.email}</p>
<b>{item.phone}</b>
		</div>
	);
}
export default ContactDetails;