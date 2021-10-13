//import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/homePage';
import EventPage from './components/eventPage';
import ContactPage from './components/contactPage';
import ContactDetails from './components/contactDetails';
import EventDetails from './components/eventDetails';
import UpdateContact from './components/updateContact';
import UpdateEvent from './components/updateEvent';


class App extends Component {
	render() {
		return (
		<Router>
			<Switch>
				<Route exact path="/" component = {HomePage} />
				<Route exact path="/addEvent" component = {EventPage} />
				<Route exact path="/addContact" component = {ContactPage} />
				<Route exact path ="/contactDetails/:contactID" render = {(props) => (
					<ContactDetails {...props}/>
				)}/>
				<Route exact path ="/eventDetails/:eventID" render = {(props) => (
					<EventDetails {...props}/>
				)}/>
				<Route exact path ="/updateContact/:contactID" render = {(props) => (
					<UpdateContact {...props}/>
				)}/>
				<Route exact path ="/updateEvent/:eventID" render = {(props) => (
					<UpdateEvent {...props}/>
				)}/>
				
			</Switch>
		</Router>
		
		);
	}
}

export default App;
