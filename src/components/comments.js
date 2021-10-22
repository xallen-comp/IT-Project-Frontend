import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';
import '../App.css';
import { Link } from 'react-router-dom';

const Comments = (props) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const GetComments = () =>{
        axios.get(`/comments/${props.match.params.contactID}`).then(res => {
        setComments(res.data);
        setComment(res.data[0]);
        });
    }
    useEffect(() => {
        GetComments();
    }, [])
	return (
            
            <div>
                <h1>Comments</h1>
                {comments.map((item, key) => (
                    <p>{item.comment_body}</p>
                ))}
            </div>
	);
}


export default Comments;