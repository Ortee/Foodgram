import React from 'react';
import { browserHistory } from 'react-router';

export default (Component) => {
  class Authenticate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: true,
      };
    }
    componentWillMount = () => {
      this.checkAuth(this.state.isAuthenticated);
    }
    render = () => {
      return (
        <div>
          {this.state.isAuthenticated === true
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
  };
  return Authenticate;
};

// export default requireAuthentication;
