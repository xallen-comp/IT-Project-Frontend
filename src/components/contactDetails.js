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
		<div>
			<img src = {item.photo} alt= {item.first_name + " " + item.last_name}/>
			<p>{item.first_name} {item.last_name} </p>
			<p>{item.comments}</p>
			<p>{item.email}</p>
			<p>test: {item._id}</p>
			<b>{item.phone}</b>

			<div>
                <h1>Comments</h1>
                {comments.map((note, key) => (
					<>
						<p>{note.comment_body}</p>
						<Button size="small" variant="outlined" color="error" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) {axios.delete(`/comments/${note._id}/delete`) }} }>
									Remove
						</Button>
						
						<Link to={`/comments/${note._id}`}>
							<div>
								<p>{note.title} </p>
							</div>
						</Link>
					</>
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

		</div>
	);
}
export default ContactDetails;

    