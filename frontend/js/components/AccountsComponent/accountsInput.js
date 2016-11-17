import React, { Component } from 'react';
import { Col, Label } from 'reactstrap';
import './accountsInput.scss';

class AccountsInput extends Component {
  constructor(props) {
    super(props);
  }
  render = () =>{
    return (
      <section className="single-input">
        <Col xs={{ size: 12}} lg={{ size: 4}} className="input-text">
          <Label>{this.props.text}</Label>
        </Col>
        <Col xs={{ size: 12}} lg={{ size: 8}} className="edit-input">
          <input  type={this.props.type}
                  ref={this.props.refer}
                  placeholder={this.props.placeholder === undefined ? '' : this.props.placeholder}
                  accept={this.props.accept === undefined ? '' : this.props.accept}
                  className="form-control auth-input"
                  onChange={this.handleChange}
          />
        </Col>
      </section>
    );
  };
  handleChange = (evt) => {
    this.props.onChange(evt.target.value);
  }
}

AccountsInput.propTypes = {
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  refer: React.PropTypes.string,
  text: React.PropTypes.string,
  accept: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

export default AccountsInput;
