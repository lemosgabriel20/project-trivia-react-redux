import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Questions extends Component {
  render() {
    const { category, question, correctAnswer, incorrectAnswers /* oClc */ } = this.props;
    const randomNumber = 0.5;
    const answersUnsorted = [...incorrectAnswers, correctAnswer];
    const answersSorted = answersUnsorted.sort(() => Math.random() - randomNumber);
    return (
      <div>
        <h1 data-testid="question-category">{ category }</h1>
        <h3 data-testid="question-text">{ question }</h3>
        <div data-testid="answer-options">
          {
            answersSorted.map((answer, index) => {
              let testId = `wrong-answer-${index}`;
              if (answer === correctAnswer) testId = 'correct-answer';
              return (
                <button
                  key={ index }
                  data-testid={ testId }
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
