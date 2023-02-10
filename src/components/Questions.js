import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Questions extends Component {
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

  handleClick = () => {
    this.setState({ showAnswer: true });
  };

  render() {
    const { category, question, correctAnswer /* oClc */ } = this.props;
    const { showAnswer, answersSorted, hasTime, timer } = this.state;
    return (
      <div>
        <h1 data-testid="question-category">{ category }</h1>
        <h2>{ timer }</h2>
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

Questions.propTypes = {
  category: PropTypes.any,
  correctAnswer: PropTypes.any,
  incorrectAnswers: PropTypes.any,
  onClick: PropTypes.any,
  question: PropTypes.any,
}.isRequired;
