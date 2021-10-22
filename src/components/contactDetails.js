import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import React from "react";
import axios from "../services/backendApi.js";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


const ContactDetails = (props) => {
    const [note, setNote] = useState("");
    const history = useHistory();



	const [item, setItem] = useState("");
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");
	const GetComments = () =>{
        axios.get(`/comments/${props.match.params.contactID}`).then(res => {
        setComments(res.data);
        setComment(res.data[0]);
        });
    }
	const url = `/contacts/${props.match.params.contactID}`;
	useEffect(() => {
		setItem(props.match.params.contactID);
		GetComments();
		axios.get(url).then(res => {setItem(res.data)})
    }, [props.match.params.contactID, url])

	const onChangeNote = (e) => {
        const note = e.target.value;
        setNote(note);
    }

    const handleUpdate = (e) => {
        console.log(e)
        e.preventDefault();
        axios.post("/comments/add", 
                {contact_id: props.match.params.contactID, comment_body: note}).then(res => console.log(res));
        history.push("/");
    }

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
				</div>
			</div>

			<div className = "comments">
                <p>Comments:</p>
                {comments.map((note, key) => (
					<div className="comment-body">
						<p1>{note.comment_body}</p1>
						<Button size="small" variant="outlined" color="error" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) {axios.delete(`/comments/${note._id}/delete`) }} }>
									Remove
						</Button>
						
						<Link to={`/comments/${note._id}`}>
							<div>
								<p>{note.title} </p>
							</div>
						</Link>
					</div>
                ))}
            </div>
			<form className = 'form' onSubmit = {handleUpdate}>
			<label htmlFor="Comments"></label>
				<input
					type="text"
					className="input"
					placeholder="Add comment:"
					name="title"
					onChange={onChangeNote}
					autoComplete="on"
					required/><br />
				<input
                        type="submit"
                        className="btn"
                        name="Add Comment"
                        value="Add Comment"
                        autoComplete="on"
                    /> 

			</form>			
			{//<Button size="large" variant="contained" href = {`/updateContact/${item._id}`} className='btn'> Update Contact</Button>
			}<Link to={`/updateContact/${item._id}`} className='btn'>Update Contact</Link>
			{/*<Button size="medium" variant="outlined" color="error" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) {axios.delete(`/contacts/${item._id}/delete`) }} }>
				Remove Contact
		</Button>*/}
			

		</body>
		<footer>
			<p>Turing Machines&#8482;</p>
		</footer></>
	);
}
export default ContactDetails;

    