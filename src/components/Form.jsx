import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Form extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h1>{this.props.formType}</h1>
                <hr /><br />
                <form onSubmit={(event) => this.props.handleUserFromSubmit(event)}>
                    {/*//这是什么鬼？*/}
                    {this.props.formType === 'Register' &&
                        <div>
                            <input
                                name='username'
                                type='text'
                                placeholder='Enter a username'
                                required
                                value={this.props.formData.username}
                                onChange={this.props.handleFormChange}
                            />
                        </div>
                    }
                    <div>
                        <input
                            name='email'
                            type="email"
                            placeholder='Enter your email'
                            required
                            value={this.props.formData.email}
                            onChange={this.props.handleFormChange}
                        />
                    </div>
                    <div>
                        <input
                            name='password'
                            type="password"
                            placeholder='Enter your password'
                            required
                            value={this.props.formData.password}
                            onChange={this.props.handleFormChange}
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