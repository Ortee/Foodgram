import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import req from 'superagent';
import { Col } from 'reactstrap';

class UserPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  shouldComponentUpdate() {
    req.get(this.props.link)
      .then((response)=>{
        if (response.status === 200) {
          this.setState({
            loaded: true,
          });
          return false;
        }
      });
    return true;
  }
  render = () => {
    if (this.state.loaded) {
      return (
        <Col xs={{ size: 4}} key={this.props.key} className="image" onClick={()=>{browserHistory.push(`/photo/${this.props.uuid}`);}}>
          <img  className="img-thumbnail"
                height="100%"
                width="100%"
                src={this.props.link} />
        </Col>
      );
    } else {
      return (
        <Col xs={{ size: 4}} key={this.props.key} className="image" onClick={()=>{browserHistory.push(`/photo/${this.props.uuid}`);}}>
          LOOOOOOADING
        </Col>
      );
    }
  }
}

UserPhoto.propTypes = {
  link: React.PropTypes.string,
  key: React.PropTypes.number,
  uuid: React.PropTypes.string,
};

export default UserPhoto;
