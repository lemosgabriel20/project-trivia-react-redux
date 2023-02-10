import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { clearState } from '../redux/actions';

class Feedback extends Component {
  handleClick = () => {
    // resetar redux se necessario aqui
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(clearState());
  };

  render() {
    const { assertions, score } = this.props;
    const questions = 3;
    console.log(assertions);
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <h2
          data-testid="feedback-text"
        >
          { assertions < questions ? 'Could be better...' : 'Well Done!' }
        </h2>
        <h2 data-testid="feedback-total-score">{ score }</h2>
        <h2 data-testid="feedback-total-question">{ assertions }</h2>
        <button
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.any,
  score: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
