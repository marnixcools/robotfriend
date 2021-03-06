import React , { Component } from  'react';
import CardList from '../components/CardList.js';
//import { robots } from './robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';



class App extends Component {

	constructor(){
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users => this.setState({ robots : users}));
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value});

	}
	render() {
		const { robots, searchfield} = this.state;
		const filterdRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})

		return (robots.length === 0) ?
			<h1>Loading</h1> :
			(
			  	<div className='tc'>
			  	  <h1 className='f1'>RoboFriend</h1>  
			  	  <SearchBox searchChange={this.onSearchChange}/>
			  	  <Scroll>
				  	  <ErrorBoundry>
				      	<CardList robots={filterdRobots}/>
				      </ErrorBoundry>
			      </Scroll>
			    </div>
			);
			
    }
}

export default App;