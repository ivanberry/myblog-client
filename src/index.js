import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
//import './index.css';
//
class App extends Component {
  constructor() {
    super()
  }

  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then((res) => {console.log(res)})
    .catch((err) => {console.log(res)})
  }
    
  render() {
    return (
        <div className="contaienr">
          <div className="row">
            <div className="col-md-4">
              <br/>
              <h1>All Users</h1>
            </div>
          </div>
        </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
