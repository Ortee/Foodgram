import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import AccountsInput from '../accountsInput';
import UserInformations from '../userInformations';
import './edit.scss';

class Edit extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render = () => {
    return (
      <article className="edit">
        <UserInformations {...this.props}/>
        <Col id="edit-section">
          <form ref="editForm" className="form-inline">
            <AccountsInput text="Restaurant Name" type="text" refer="username" placeholder="AwesomeBugers"/>
            <AccountsInput text="Description" type="text" refer="description" placeholder="Lorem ipsum"/>
            <AccountsInput text="Restaurant Smth" type="text" refer="smth" placeholder="Smth text from db"/>
            <Button type="submit" className="auth-button">Save</Button>
          </form>
        </Col>
      </article>
    );
  }
}



Edit.propTypes = {
};

export default Edit;
