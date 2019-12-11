import React from 'react';
import axios from 'axios';

export default class GetAwesomeServiceResponse extends React.Component {
    state = {
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:3000/awesome`);
        const data = await response.text();
        this.setState({ response: data });
    }  
  
    render() {
      return (
        <div>
        <p style={{color: "green"}}>$ curl http://awesome-api</p>
        <p>{this.state.response}</p>
        </div>
      )
    }
  }