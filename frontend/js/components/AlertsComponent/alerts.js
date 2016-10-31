import React, { Component } from 'react';
import { Col, Alert } from 'reactstrap';
import './alerts.scss';

class Alerts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.alerts.length > 0) {
      const _this = this;
      const { id } = this.props.alerts[0];
      setTimeout(() => {
        _this.props.removeAlert(id);
      }, 2500);
    }
    return (
      <Col xs={{ size: 6, offset: 3 }} className="post-alert-box">
        {this.props.alerts.map((alert, i) => {
          if (alert.style === 'danger') {
            return (<Alert key={i}
              className="post-alert"
              onClick={this.props.removeAlert.bind(null, alert.id)}>
              <i className="fa fa-times" aria-hidden="true"/> <span className="alert-text">{ alert.text }</span>
            </Alert>);
          }
          return (<Alert key={i}
            className="post-alert"
            onClick={this.props.removeAlert.bind(null, alert.id)}>
            <i className="fa fa-check" aria-hidden="true"/> <span className="alert-text">{ alert.text }</span>
          </Alert>);
        })}
      </Col>
    );
  }
}

Alerts.propTypes =  {
  alerts: React.PropTypes.array,
  removeAlert: React.PropTypes.func,
};

export default Alerts;
