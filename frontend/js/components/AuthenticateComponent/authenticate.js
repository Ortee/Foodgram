import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export default (Component) => {
  class Authenticate extends Component {
    constructor(props) {
      super(props);
    }
    componentWillMount = () => {
      this.checkAuth(this.props.auth.isAuthenticated);
    }
    render = () => {
      return (
        <div>
          {this.props.auth.isAuthenticated === true
              ? <Component {...this.props}/>
              : null
          }
        </div>
      );
    }
    checkAuth = (isAuthenticated) => {
      if (cookie.load('token') !== undefined && !isAuthenticated) {
        this.props.loginUserSuccess(cookie.load('token'));
      }
      if (!isAuthenticated && cookie.load('token') === undefined) {
        browserHistory.push('/login');
      }
    }
  }

  Authenticate.propTypes =  {
    auth: React.PropTypes.object,
    loginUserSuccess: React.PropTypes.func,
  };
  return Authenticate;
};
