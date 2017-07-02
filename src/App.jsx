import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
//import './index.css';
import UsersList from './components/User/UsersList';
import AddUser from './components/User/AddUser';
import About from './components/About';

class App extends Component {
    // eslint-disable-next-line
    constructor() {
        super()
        this.state = {
            users: [],
            username: '',
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    addUser(event) {
        event.preventDefault();
        const data = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };

        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
            .then((res) => {
                this.getUsers();
                this.setState({
                    username: '',
                    email: '',
                    password: ''
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value; //input name
        this.setState(obj);
    }

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
            .then((res) => {
                this.setState({
                    users: res.data.data.users
                })
            })
            .catch((err) => { console.log(err); })
    }

    render() {
        return (
            <div className="contaienr">
                <div className="row">
                    <div className="col-md-4">
                        <br />
                        <Switch>
                            <Route exact path='/' render={() => (
                                <div>
                                    <h1>All Users</h1>
                                    <hr /><br />
                                    <AddUser
                                        addUser={this.addUser.bind(this)}
                                        email={this.state.email}
                                        username={this.state.username}
                                        password={this.state.password}
                                        handleChange={this.handleChange.bind(this)}
                                    />
                                    <br />
                                    <UsersList users={this.state.users} />
                                </div>
                            )} />
                            <Route exact path='/about' component={About} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }

}

export default App

//registerServiceWorker();
