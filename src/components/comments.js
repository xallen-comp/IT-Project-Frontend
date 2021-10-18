import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';
import '../App.css';
import { Link } from 'react-router-dom';

const Comments = (props) => {
/*
    const [comments, setComments] = useState([]);
    const GetComments = () =>{
        axios.get(`/comments/${props.match.params.contactID}`).then(res => {
        let cComments = [];
        setComments(res.data);
        console.log(comments)
        for (let index in res.data){
            let obj = {contactID: res.data[index].contact_id, comment_body: res.data[index].comment_body}
            cComments.push(obj);
        }
        });
    }
    useEffect(() => {
        setComments();
    }, [])*/


    const [comments, setComments] = useState([]);
	const url = `/comments/${props.match.params.contactID}`;
	useEffect(() => {
		setComments(props.match.params.contactID);
		axios.get(url).then(res => {setComments(res.data)})
    }, [props.match.params.contactID, url])
	return (
            <div>
                <h1>{props.match.params.contactID} {comments.contactID} Comments</h1>
                <p>{comments.comment_body}</p>
            </div>
	);
}


export default Comments;