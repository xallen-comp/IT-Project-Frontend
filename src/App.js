import logo from './logo.svg';
import React, { Component } from 'react';
import { useState, useEffect } from "react";
import './App.css';
import axios from "../src/services/backendApi.js";

function App() {
  const [items, setItems] = useState([]);
  const GetContacts = () =>{
        axios.get("/contacts").then(res => {setItems(res.data);})
  }
  useEffect(() => {
    GetContacts();
  }, [])
  return (
  <header className = "App-header">
  <div>
   {items.map((item, key) => (
            <div>
            <p>{item.first_name} </p>
            <p>{item.last_name}</p>
            <b>{item.comments}</b>
            </div>
   ))}
   </div>
   </header>
   )
}

export default App;
