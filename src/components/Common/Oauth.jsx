import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class Oauth extends Component {

    oauth_grant_access() {
        let _this = this;
        const URL = 'http://github.com/login/oauth/authorize?client_id=0a0fa535f7244601689d&scope=read&redirect_uri=http://192.168.0.66:3000'
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