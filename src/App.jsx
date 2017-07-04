import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
//import './index.css';
import UsersList from './components/User/UsersList';
// import AddUser from './components/User/AddUser';
import About from './components/About';
import NavBar from './components/NavBar';
import Form from './components/Form';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';

class App extends Component {
    // eslint-disable-next-line
    constructor() {
        super()
        this.state = {
            users: [],
            username: '',
            email: '',
            password: '',
            title: 'shirting.me',
            formData: {
                username: '',
                email: '',
                password: ''
            },
            isAuthenticated: false
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

    handleFormUserChange(event) {
        const obj = this.state.formData;
        obj[event.target.name] = event.target.value; //input name
        this.setState(obj);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const formType = window.location.href.split('/').reverse()[0];
        let data;
        if (formType === 'login') {
            data = {
                email: this.state.formData.email,
                password: this.state.formData.password
            }
        }
        if (formType === 'register') {
            data = {
                username: this.state.formData.username,
                email: this.state.formData.email,
                password: this.state.formData.password
            }
        }

        const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/${formType}`;
        axios.post(url, data)
            .then((res) => {
                console.log(res.data);
                window.localStorage.setItem('authToken', res.data.auth_token)
                this.setState({
                    formData: {
                        username: '',
                        email: '',
                        password: ''
                    },
                    username: '',
                    email: '',
                    isAuthenticated: true
                });
                this.getUsers();
        })
            .catch((err) => {
                console.log(err);
        })
    }

    logoutUser() {
        window.localStorage.clear();
        this.setState({ isAuthenticated: false });
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
            <div>
                <NavBar
                    title={this.state.title}
                    isAuthenticated={this.state.isAuthenticated}
                />
                <div className="contaienr">
                    <div className="row">
                        <div className="col-md-4">
                            <br />
                            <Switch>
                                <Route exact path='/' render={() => (
                                    <div>
                                        <h1>All Users</h1>
                                        <hr /><br />
                                        <UsersList users={this.state.users} />
                                    </div>
                                )} />
                                <Route exact path='/about' component={About} />
                                <Route exact path='/register' render={() => (
                                    <Form
                                        formType={'Register'}
                                        formData={this.state.formData}
                                        handleUserFromSubmit={this.handleFormSubmit.bind(this)}
                                        handleFormChange={this.handleFormUserChange.bind(this)}
                                        isAuthenticated={this.state.isAuthenticated}
                                    />
                                )} />
                                <Route exact path='/login' render={() => (
                                    <Form
                                        formType={'Login'}
                                        formData={this.state.formData}
                                        handleUserFromSubmit={this.handleFormSubmit.bind(this)}
                                        handleFormChange={this.handleFormUserChange.bind(this)}
                                        isAuthenticated={this.state.isAuthenticated}
                                    />
                                )}/>
                                <Route exact path='/logout' render={() => (
                                    <Logout
                                        logoutUser={this.logoutUser.bind(this)}
                                        isAuthenticated={this.state.isAuthenticated}
                                    />
                                )} />
                                <Route exact path='/status' component={UserStatus} />
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default App

//registerServiceWorker();
