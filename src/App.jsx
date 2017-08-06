import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import registerServiceWorker from './registerServiceWorker';
import UsersList from './components/User/UsersList';
import About from './components/Common/About';
import NavBar from './components/Common/NavBar';
import Form from './components/Form/Form';
import Logout from './components/Common/Logout';
import UserStatus from './components/User/UserStatus';
import Article from './components/Articles/Article';
import Oauth from './components/Common/Oauth';
import './components/Common/typo.css'
import './components/Common/Main.css'

class App extends Component {
    // eslint-disable-next-line
    constructor() {
        super()
        this.state = {
            users: [],
            title: 'shirting.me',
            isAuthenticated: false
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        let that = this;
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
            .then((res) => {
                that.setState({
                    users: res.data.data.users
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    logoutUser() {
        window.localStorage.clear();
        this.setState({ isAuthenticated: false });
    }

    loginUser(token) {
        window.localStorage.setItem('authToken', token);
        this.setState({ isAuthenticated: true });
        this.getUsers();
    }

    render() {
        return (
            <MuiThemeProvider>
                <main className=''>
                    <NavBar
                        title={this.state.title}
                        isAuthenticated={this.state.isAuthenticated}
                    />
                    <br />
                    <Switch>
                        <Route exact path='/' render={() => (
                            <UsersList users={this.state.users} />
                        )} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/register' render={() => (
                            <Form
                                formType={'register'}
                                isAuthenticated={this.state.isAuthenticated}
                                loginUser={this.loginUser.bind(this)}
                            />
                        )} />
                        <Route exact path='/login' render={() => (
                            <Form
                                formType={'login'}
                                isAuthenticated={this.state.isAuthenticated}
                                loginUser={this.loginUser.bind(this)}
                            />
                        )} />
                        <Route exact path='/logout' render={() => (
                            <Logout
                                logoutUser={this.logoutUser.bind(this)}
                                isAuthenticated={this.state.isAuthenticated}
                            />
                        )} />
                        <Route exact path='/status' render={() => (
                            <UserStatus
                                isAuthenticated={this.state.isAuthenticated}
                            />
                        )} />
                        <Route exact path='/articles' render={() => (
                            <Article
                                isAuthenticated={this.state.isAuthenticated}
                            />
                        )}
                        />
                    </Switch>
                </main>
            </MuiThemeProvider>
        )
    }
}

export default App;
