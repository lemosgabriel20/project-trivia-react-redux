import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScore, updateAssertions } from '../redux/actions';

class Questions extends Component {
  state = {
    showAnswer: false,
    answersSorted: [],
    hasTime: true,
    timer: 30,
  };

  componentDidMount() {
    const { correctAnswer, incorrectAnswers } = this.props;
    const randomNumber = 0.5;
    const answersUnsorted = [...incorrectAnswers, correctAnswer];
    this.setState({
      answersSorted: answersUnsorted.sort(() => Math.random() - randomNumber),
    });
    const second = 1000;
    this.myTimer = setInterval(() => {
      this.setState(({ timer }) => ({
        timer: timer - 1,
      }), () => {
        const { timer } = this.state;
        if (timer === 0) {
          this.setState({ hasTime: false });
          clearInterval(this.myTimer);
        }
      });
    }, second);
  }

  handleClick = (evt) => {
    this.setState({ showAnswer: true });
    const { difficulty, dispatch, showNextButton, score } = this.props;
    const { timer } = this.state;
    const { id } = evt.target;
    if (id === 'correct-answer') {
      dispatch(updateAssertions());
      const factor = 10;
      const diffString = {
        hard: 3, medium: 2, easy: 1,
      };
      const tempScore = (factor + (timer * diffString[difficulty])) + score;
      dispatch(updateScore(tempScore));
    }
    showNextButton();
  };

  render() {
    const { category, question, correctAnswer } = this.props;
    const { showAnswer, answersSorted, hasTime, timer } = this.state;
    return (
      <div>
        <h1 data-testid="question-category">{ category }</h1>
        <h2 data-testid="timer">{ timer }</h2>
        <h3 data-testid="question-text">{ question }</h3>
        <div data-testid="answer-options">
          {
            answersSorted.map((answer, index) => {
              let testId = `wrong-answer-${index}`;
              let answerClass = 'incorrectAnswers';
              if (answer === correctAnswer) {
                testId = 'correct-answer';
                answerClass = 'correctAnswer';
              }
              return (
                <button
                  key={ index }
                  className={ (showAnswer) ? answerClass : '' }
                  id={ testId }
                  data-testid={ testId }
                  disabled={ !hasTime }
                  onClick={ this.handleClick }
                >
                  { answer }
                </button>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Questions.propTypes = {
  category: PropTypes.any,
  correctAnswer: PropTypes.any,
  incorrectAnswers: PropTypes.any,
  onClick: PropTypes.any,
  question: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps)(Questions);
