import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { useHistory } from 'react-router-dom';

const UpdateContact = (props) => {
	const [item, setItem] = useState("");
	const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [comment, setComment] = useState("");
    const [occupation, setOccupation] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [emailCheck, setEmailCheck] = useState(false);
    const [file, setFile] = useState({selectedFile: null});
    const [photo, setPhoto] = useState({selectedPhoto: null});
    const [photoName, setPhotoName] = useState("");
    const [fileName, setFileName] = useState("");
    const [photoPrev, setPhotoPrev] = useState("");
    const [filePrev, setFilePrev] = useState("");
    const [fileType, setFileType] = useState("");
    const history = useHistory();
	const url = `/contacts/${props.match.params.contactID}`;
	useEffect(() => {
		setItem(props.match.params.contactID);
		axios.get(url).then(res => {setItem(res.data); setPhotoPrev(res.data.photo); setPhotoName(res.data.photo); setFileName(res.data.file); setFilePrev(res.data.file);})
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
    const onChangeOccupation = (e) => {
        const occupation = e.target.value;
        setOccupation(occupation);
    };
    const onChangeFile = (e) => {
        setFile({selectedFile: e.target.files[0]});
        setFileType(e.target.files[0].type);
        setFileName(e.target.files[0].name);
    }

    const onChangePhoto = (e) => {
        setPhoto({selectedPhoto: e.target.files[0]});
        console.log(e.target.files[0].name);
        setPhotoName(e.target.files[0].name);
    }
    const validateUpdate = () => {
        return emailCheck;
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const photoData = new FormData();
        formData.append(
            "file",
            file.selectedFile
        );
        photoData.append(
            "file",
            photo.selectedPhoto
        );
         if (true){
             axios.post(`/contacts/${item._id}/update`, {first_name: firstName, last_name: lastName, email: email, occupation: occupation, comments: comment, phone: phone, photo: photoName, file: fileName, contact_type: fileType}).then(res => console.log(res));
             axios.post("/contacts/upload", formData).then(res => console.log(res));
             axios.post("/contacts/upload", photoData).then(res => console.log(res));
             if(photoPrev != photoName && photoName != ""){
                  axios.post('/contacts/delete', {"filename": photoPrev}).then(res => console.log(res));
             }
             if(filePrev != fileName && fileName != ""){
                axios.post('/contacts/delete', {"filename": filePrev}).then(res => console.log(res));
             }
             history.push(`/contactDetails/${item._id}`);
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
		<>

            <div class="header">
            <nav>
                <h1 className = "logo"><a href="/">Event Tracker</a></h1>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                </ul>
            </nav>
            </div>
            <body className = "App-header">
            <div>
            <form className='form' onSubmit={handleUpdate}>
            <p className = "title" >Update Contact</p>
                <div className = "contact-form">
                    <input 
                        type="text" 
                        className="input"
                        placeholder="Enter FirstName" 
                        name="firstName" 
                        onChange={onChangeFirstName}
                        autoComplete="on"
                        defaultValue={item.first_name}

                        required/><br />
                
                    <input 
                        type="text" 
                        className="input"
                        placeholder="Enter LastName" 
                        name="lastName" 
                        onChange={onChangeLastName}
                        autoComplete="on"
                        defaultValue={item.last_name}

                        required/><br />
                
                    <input 
                        type="text" 
                        className="input"
                        placeholder="Enter Email" 
                        name="email" 
                        onChange={onChangeEmail}
                        defaultValue={item.email}
                        autoComplete="on"/><br />
                
                    <input 
                        type="text" 
                        className="input"
                        placeholder="Enter Phone" 
                        name="phone" 
                        onChange={onChangePhone}
                        autoComplete="on"
                        defaultValue={item.phone}

                        /><br />
                
                    <input 
                        type="text"
                        className="input"
                        placeholder="Enter Occupation" 
                        name="occupation" 
                        onChange={onChangeOccupation}
                        autoComplete="on"
                        defaultValue={item.occupation}
                        /><br/> 
                </div>  
                      <label htmlFor="file">Select file: </label>
                        <input
                            type="file"
                            name="image"
                            className="input"
                            onChange={onChangeFile} /><br />
                      <label htmlFor="photo">Select cover photo: </label>
                        <input
                            type="file"
                            name="image"
                            className="input"
                            onChange={onChangePhoto}/> <br />
                    <input
                        type="submit"
                        className="btn contactform"
                        name="Update Contact"
                        value="Update Contact"
                        autoComplete="on"/>
                </form> 
            </div>
        </body> 
        <footer>
        <p>Turing Machines&#8482;</p>
        </footer></>

	);
}
export default UpdateContact;