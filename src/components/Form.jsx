import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//turn props to self state
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                username: '',
                email: '',
                password: ''
            }
        }

        this.handleUserFromSubmit = this.handleUserFromSubmit.bind(this);
    }

    clearForm() {
        this.setState({
            formData: {
                username: '',
                email: '',
                password: ''
            }
        })
    }

    handleFormChange(event) {
        const obj = this.state.formData;
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    handleUserFromSubmit(event) {
        event.preventDefault();
        const formType = this.props.formType;
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
                this.clearForm();
                this.props.loginUser(res.data.auth_token);
        })
            .catch((err) => {
                console.log(err);
        })

    }

    componentDidMount() {
        this.clearForm();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.formType !== nextProps.formType) {
            this.clearForm();
        }
    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h1>{this.props.formType}</h1>
                <hr /><br />
                <form onSubmit={(event) => this.handleUserFromSubmit(event)}>
                    {/*//这是什么鬼？*/}
                    {this.props.formType === 'Register' &&
                        <div>
                            <input
                                name='username'
                                type='text'
                                placeholder='Enter a username'
                                required
                                value={this.state.formData.username}
                                onChange={this.handleFormChange.bind(this)}
                            />
                        </div>
                    }
                    <div>
                        <input
                            name='email'
                            type="email"
                            placeholder='Enter your email'
                            required
                            value={this.state.formData.email}
                            onChange={this.handleFormChange.bind(this)}
                        />
                    </div>
                    <div>
                        <input
                            name='password'
                            type="password"
                            placeholder='Enter your password'
                            required
                            value={this.state.formData.password}
                            onChange={this.handleFormChange.bind(this)}
                        />
                    </div>
                    <input
                        type="submit"
                        value='Submit'
                    />
                </form>
            </div>
        )
    }
}

export default Form