import React, { Component } from 'react';
import axios from 'axios';

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
        return (
            <div>
                <li><strong>{this.state.id}</strong></li>
                <li><strong>{this.state.username}</strong></li>
                <li><strong>{this.state.created_at}</strong></li>
                <li><strong>{this.state.email}</strong></li>
            </div>
        )
    }
}

export default UserStatus;