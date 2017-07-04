import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            created_at: '',
            email: '',
            id: '',
            username: ''
        }
    }
    componentDidMount() {
        this.getUserStatus();
        console.log(this.props);
    }

    getUserStatus(event) {
        const options = {
            url: `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/status`,
            method: 'get',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${window.localStorage.authToken}`
            }
        };
        return axios(options)
            .then((res => {
                this.setState({
                    username: res.data.data.username,
                    email: res.data.data.email,
                    id: res.data.data.id,
                    created_at: res.data.data.created_at
                });
            }))
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        if (!this.props.isAuthenticated) {
            return (
                <p>You must log in to view this. Clike <Link to='/login'>Login</Link> to log back!</p>
            )
        }
        return (
            <div>
                <li><strong><b>User ID:</b> {this.state.id}</strong></li>
                <li><strong><b>Username:</b> {this.state.username}</strong></li>
                <li><strong><b>Email:</b> {this.state.email}</strong></li>
                <li><strong><b>Created Date:</b> {this.state.created_at}</strong></li>
            </div>
        )
    }
}

export default UserStatus;