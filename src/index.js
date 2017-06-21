import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
//import './index.css';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';

class App extends Component {
  // eslint-disable-next-line
  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then((res) => {
      this.setState({
        users: res.data.data.users
      })
    })
    .catch((err) => { console.log(err);} )
  }
    
  render() {
    return (
        <div className="contaienr">
          <div className="row">
            <div className="col-md-4">
              <br/>
              <h1>All Users</h1>
              <hr/><br/>
              <AddUser/>
              <hr/><br/>
              <UsersList users={ this.state.users } />
            </div>
          </div>
        </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
