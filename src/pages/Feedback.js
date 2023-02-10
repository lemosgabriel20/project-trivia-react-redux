import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
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
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
