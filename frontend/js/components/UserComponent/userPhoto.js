import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import req from 'superagent';
import { Col } from 'reactstrap';
import './loading.scss';

class UserPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentWillMount() {
    req.get(this.props.link)
      .then((response)=>{
        if (response.status === 200 ) {
          this.setState({
            loaded: true,
          });
          this.forceUpdate();
        } else {
          const loadingInverval = setInterval(() => {
            req.get(this.props.link)
              .then((response2)=>{
                if (response2.status === 200 ) {
                  this.setState({
                    loaded: true,
                  });
                  clearInterval(loadingInverval);
                  this.forceUpdate();
                }
              });
          }, 1000);
        }
      });
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
    }
    return (
      <Col xs={{ size: 4}} key={this.props.key} className="image">
        <div className="loading-container">
          <div className="loading" />
          <div id="loading-text">
            loading
          </div>
        </div>
      </Col>
    );
  }
}

UserPhoto.propTypes = {
  link: React.PropTypes.string,
  key: React.PropTypes.number,
  uuid: React.PropTypes.string,
};

export default UserPhoto;
