import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './MainComponent/main';

function mapStateToProps(state) {
  return {
    alerts: state.alerts,
    foods: state.foods,
    auth: state.auth,
    user: state.user,
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
