import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import React from "react";
import axios from "../services/backendApi.js";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';

//https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
const ContactDetails = (props) => {
    const [note, setNote] = useState("");
	const [image, setImage] = useState("");
	const [file, setFile] = useState("");
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
	const grabImage = () => {
			axios.get(url).then(res => {const name = res.data;
			axios.post("/contacts/fetch", {"filename": name.photo}, {responseType: "arraybuffer"}).then(response => {
			const theImage = new Buffer(response.data).toString('base64');
			setImage(theImage);
			});
			});
	}
	const grabFile = () => {
	axios.get(url).then(res => {const name = res.data;
			axios.post("/contacts/fetch", {"filename": name.file}, {responseType: "arraybuffer"}).then(response => {
			const theFile = new Buffer(response.data).toString('base64');
			const byteCharacters = atob(theFile);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			console.log(name.contact_type);
			const blob = new Blob([byteArray], {type: name.contact_type});
			const url = URL.createObjectURL(blob);
			setFile(url);
	
			});
			});
	}
	useEffect(() => {
		setItem(props.match.params.contactID);
		GetComments();
		grabImage();
		grabFile();
		axios.get(url).then(res => {setItem(res.data); console.log(res.data);})
    }, [props.match.params.contactID, url])

	const onChangeNote = (e) => {
        const note = e.target.value;
        setNote(note);
    }

	const handleUpdateDel = (e) => {
        console.log(e)
        const data = {};
        //e.preventDefault();
        axios.post(`/contacts/${e}/delete`, data);
        window. location. reload()
    }

    const handleUpdate = (e) => {
        console.log(e)
        e.preventDefault();
        axios.post("/comments/add", 
                {contact_id: props.match.params.contactID, comment_body: note}).then(res => console.log(res));
		window. location. reload()
    }

	return (
		<><div class="header">
                <nav>
                    <h1 className = "logo"><a href="/">Event Tracker</a></h1>
                    <ul class="nav-links">
                        <li><a href="/">Home</a></li>
                    </ul>
                </nav>
            </div>
		<body className = "App-header">
			<div className = "contact_details">
				<img className = "contact_photo" src ={`data:image/jpeg;base64,${image}`}/>
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
			<div className = "add-comments">
			<form className = 'form' onSubmit = {handleUpdate}>
			<label htmlFor="Comments"></label>
				<input
					type="text"
					className="input"
					placeholder="Add comment:"
					name="comment-add"
					onChange={onChangeNote}
					autoComplete="on"
					required/><br />
				<input
                        type="submit"
                        className="btn comment"
                        name="Add-Comment"
                        value="Add Comment"
                        autoComplete="on"
					 />

			</form>		
			</div>	
			{item.contact_type && (<Button size="large" variant="contained" href = {file} className='btn'> DownLoad File</Button>)}
			<Link to={`/updateContact/${item._id}`} className='btn'>Update Contact</Link>
			<button onClick={()=>handleUpdateDel(item._id)} className='btn'>Delete Contact</button>

		</body>
		<footer>
			<p>Turing Machines&#8482;</p>
		</footer></>
	);
}
export default ContactDetails;

    