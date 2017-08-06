import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class Oauth extends Component {

    oauth_grant_access() {
        let _this = this;
        const URL = 'http://github.com/login/oauth/authorize?client_id=fd0d4d3117f21c67a2e8&scope=read&redirect_uri=http://127.0.0.1:3000/login'
        axios.get(URL).then((res) => {
            console.log(res);
        });
    }

    render() {
        return (
            <RaisedButton
                onTouchTap={this.oauth_grant_access.bind(this)}
                label="Oauth"
            />
       )
   } 
}

export default Oauth;