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
                console.log(res);
        }))
            .catch((err) => {
                console.log(err);
        })
    }

    render() {
        return (
            <p>Hye yo</p>
        )
    }
}

export default UserStatus;