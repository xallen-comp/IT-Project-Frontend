import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from "../services/backendApi.js";
import FileBase64 from 'react-file-base64';
const ContactPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [comment, setComment] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState({photo: ''});
   // const [photo, setPhoto] = useState("");
    const [emailCheck, setEmailCheck] = useState(false);
    const history = useHistory();
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
    /*const onDonePhoto = (e) => {
        console.log(e.image);
        const photo = base64;
        setPhoto(photo);
    };*/

    const validateUpdate = () => {
        return emailCheck;
    }
    const handleUpdate = (e) => {
        console.log(firstName);
        console.log(lastName);
        e.preventDefault();
         if (true){
             axios.post("/contacts/add", {first_name: firstName, last_name: lastName, email: email, comments: comment, phone: phone, image}).then(res => console.log(res));
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
    <body className = "App-header">
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
                        autoComplete="on"/> 
                    <FileBase64 
                    type= "file" 
                    multiple={false} 
                    onDone={({ base64 }) => setImage({ ...image, photo: base64})} />
            </form>
        </div>



        <footer>
            <p>Turing Machines&#8482;</p>
        </footer>
   </body>
   );
    
}

export default ContactPage;