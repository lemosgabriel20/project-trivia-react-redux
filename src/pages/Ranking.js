import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearState } from '../redux/actions';

class Ranking extends Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(clearState());
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.any,
}.isRequired;

export default connect()(Ranking);
