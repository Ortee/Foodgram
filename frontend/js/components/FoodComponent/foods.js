import React, { Component } from 'react';
import { Col } from 'reactstrap';
import Food from './food';
import './food.scss';

class Foods extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.params.uuid === undefined ?
    this.props.showFoods() :
    this.props.getSingleFood(this.props.params.uuid);
    setInterval(() => {
      this.props.updateLikes();
    }, 20000);
  }

  render() {
    return (
      <section>
      <Col xs={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 6, offset: 3}}>
        {this.props.foods.map((food, i) =>
          <Food {...this.props}
            key={i}
            i={i}
            food={food}
          />)}
        </Col>
      </section>
    );
  }
}

Foods.propTypes =  {
  showFoods: React.PropTypes.func,
  foods: React.PropTypes.array,
  params: React.PropTypes.object,
  getSingleFood: React.PropTypes.func,
  updateLikes: React.PropTypes.func,
};

export default Foods;
