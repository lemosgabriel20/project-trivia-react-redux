import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { clearState } from '../redux/actions';

class Feedback extends Component {
  handlePlayAgain = () => {
    // resetar redux se necessario aqui
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(clearState());
  };

  render() {
    const { assertions, score, history } = this.props;
    const questions = 3;
    const message = (assertions < questions) ? 'Could be better...' : 'Well Done!';
    return (
      <div>
        <Header />
        <h1
          data-testid="header-text"
        >
          Feedback
        </h1>
        <h2
          data-testid="feedback-text"
        >
          { message }
        </h2>
        <h2 data-testid="feedback-total-score">{ score }</h2>
        <h2 data-testid="feedback-total-question">{ assertions }</h2>
        <button
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgain }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
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
