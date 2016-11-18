import React from 'react';
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
      if (!isAuthenticated) {
        browserHistory.push('/login');
      }
    }
  }

  Authenticate.propTypes =  {
    auth: React.PropTypes.object,
  };
  return Authenticate;
};
