import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import './NavBar.css';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labelStyle: {
        color: '#fff'
      }
    }
  }

  componentDidMount() {
    console.log(this.props.isAuthenticated);
  }

  render() {
    return (
      <nav>
        {
          this.props.isAuthenticated &&
          <Link to='/logout'>
            <FlatButton className="vertical-nav" style={this.state.labelStyle} label="退出" />
          </Link>
        }
        {
          !this.props.isAuthenticated &&
          <Link to="/login">
            <FlatButton className="vertical-nav" style={this.state.labelStyle} label="登录" />
          </Link>
        }
        {
          !this.props.isAuthenticated &&
          <Link to='/register'>
            <FlatButton className="vertical-nav" style={this.state.labelStyle} label="注册" />
          </Link>
        }
        <Link to='/about'>
          <FlatButton className="vertical-nav" style={this.state.labelStyle} label="关于" />
        </Link>
        <Link to='/status'>
          <FlatButton className="vertical-nav" style={this.state.labelStyle} label="用户" />
        </Link>
        <Link to='/articles'>
          <FlatButton className="vertical-nav" style={this.state.labelStyle} label="文章" />
        </Link>
      </nav>
    );
  }
}

/**
 * render different components depending on the application state
 * @param {} props
 */
class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: false
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleChange = (event, logged) => {
    this.setState({
      logged: logged
    });
  };

  render() {
    return (
      <div>
        <AppBar
          title="Shirting.me"
          iconElementRight={
            <Login
              isAuthenticated={this.props.isAuthenticated}
            />
          }
        />
      </div>
    );
  }
}

export default NavBar