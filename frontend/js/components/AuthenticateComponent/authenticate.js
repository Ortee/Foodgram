import React from 'react';
import store from 'store';
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
      if (store.get('token') !== undefined && !isAuthenticated) {
        this.props.loginUserSuccess(store.get('token'));
      }
      if (!isAuthenticated && store.get('token') === undefined) {
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
