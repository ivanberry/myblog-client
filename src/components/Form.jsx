import React from 'react';

const Form = (props) => {
    return (
        <div>
            <h1>{props.formType}</h1>
            <hr /><br />
            <form onSubmit={(event) => props.handleUserFromSubmit(event)}>
                {/*//这是什么鬼？*/}
                {props.formType === 'Register' &&
                    <div>
                        <input
                            name='username'
                            type='text'
                            placeholder='Enter a username'
                            required
                            value={props.formData.username}
                            onChange={props.handleFormChange}
                        />
                    </div>
                }
                <div>
                    <input
                        name='email'
                        type="email"
                        placeholder='Enter your email'
                        required
                        value={props.formData.email}
                        onChange={props.handleFormChange}
                    />
                </div>
                <div>
                    <input
                        name='password'
                        type="password"
                        placeholder='Enter your password'
                        required
                        value={props.formData.password}
                        onChange={props.handleFormChange}
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

export default Form