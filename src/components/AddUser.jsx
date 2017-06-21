import React from 'react';

const AddUser = (props) => {
    return (
        <form>
            <div className="form-group">
                <input
                    name="username"
                    className="form-control input-lg"
                    type="text"
                    placeholder="Enter a user name"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    name="email"
                    className="form-control input-lg"
                    placeholder="Enter an email address"
                    required
                />
            </div>
            <input 
                 type="submit"
                 className="btn btn-primary btn-lg btn-block"
                 value="Submit"
            />
        </form>
    )
}

export default AddUser;
