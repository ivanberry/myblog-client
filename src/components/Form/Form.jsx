import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormErrors from './FormErrors';

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
            },
            formRules: [
                {
                    id: 1,
                    field: 'username',
                    name: 'Username must be greater than 5 characters.',
                    valid: false
                },
                {
                    id: 2,
                    field: 'email',
                    name: 'Email must be greater than 10 characters.',
                    valid: false
                }, {
                    id: 3,
                    field: 'email',
                    name: 'Email must be a valid address.',
                    valid: false
                }, {
                    id: 4,
                    field: 'pasword',
                    name: 'Password must be greater than 10 characters',
                    valid: false
                }
            ],
            valid: false
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

    //loops all rules to make user formData valid
    allTrue() {
        const rules = this.state.formRules;
        for (let rule of rules) {
            if (!rule.valid) return false;
        }
        return true;
    }

    initRules() {
        const rules = this.state.formRules;
        for (const rule of rules) {
            rule.valid = false;
        }
        this.setState({ formRules: rules })
    }

    validateEmail(email) {
        //eslint-disable-next-line
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    //validate the form info basically, and this include two type form different from this.state.formType
    validataForm() {
        const rules = this.state.formRules;
        const formData = this.state.formData;

        //test all form data valid: username(regiester) email password

        //reset first
        for (const rule of rules) {
            rule.valid = false;
        }

        debugger;

        //diff register username spec
        if (this.props.formType === 'register' && formData.username && formData.username.length > 5) {
            rules[0].valid = true;
        } else {

            //TODO: once in login router, we dont validate the username
            rules[0].valid = true;
        }

        if (formData.email.length > 10) rules[1].valid = true;
        if (this.validateEmail(formData.email)) rules[2].valid = true;
        if (formData.password.length > 10) rules[3].valid = true;

        //each rule have a spec to test
        this.setState({ formRules: rules });

        //all should be true
        if (this.allTrue()) this.setState({ valid: true })
    }

    handleFormChange(event) {
        const obj = this.state.formData;
        obj[event.target.name] = event.target.value;
        this.setState(obj);
        this.validataForm();
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
            this.initRules();
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
                <FormErrors
                    formType={this.props.formType}
                    formRules={this.state.formRules}
                />
                <form onSubmit={(event) => this.handleUserFromSubmit(event)}>
                    {/*//这是什么鬼？*/}
                    {this.props.formType === 'register' &&
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
                        disabled={!this.state.valid}
                        type="submit"
                        value='Submit'
                    />
                </form>
            </div>
        )
    }
}

export default Form