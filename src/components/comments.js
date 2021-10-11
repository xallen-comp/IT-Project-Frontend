import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';
import '../App.css';
import { Link } from 'react-router-dom';

const Comments = (props) => {

    const [comments, setComments] = useState([]);
    const GetComments = () =>{
        axios.get(`/comments/${props.match.params.contactID}`).then(res => {
        let cComments = [];
        setComments(res.data);
        for (let index in res.data){
            let obj = {contactID: res.data[index].contactID, comment_body: res.data[index].comment_body}
            cComments.push(obj);
        }
        });
    }
    useEffect(() => {
        setComments();
    }, [])
	return (
            <div>
                <h1>{comments.contactID} Comments</h1>
                <p> {comments.comment_body} </p>
            </div>
	);
}
/*
const Comments = (props) => {

    <div>
        <h1>Comments</h1>       
    </div>
} */


export default Comments;