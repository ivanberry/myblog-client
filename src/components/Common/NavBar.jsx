import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <Link to="/login">
        <FlatButton {...this.props} label="登录" />
      </Link>
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
  </IconMenu>
);

Logged.muiName = 'IconMenu';

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
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
        />

        <Toggle
          label="Logged"
          defaultToggled={false}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{ margin: 20 }}
        />

        <Link to='/'>主页</Link>
        <Link to='/about'>关于</Link>
        {this.props.isAuthenticated &&
          <Link to="/status">Status</Link>
        }
        {!this.props.isAuthenticated &&
          <Link to="/register">注册</Link>
        }
        {!this.props.isAuthenticated &&
          <Link to="/login">登录</Link>
        }
        {this.props.isAuthenticated &&
          <Link to="/logout">退出</Link>
        }
        {
          this.props.isAuthenticated &&
          <Link to="/articles">文章</Link>
        }
      </div>
    );
  }
}

export default NavBar