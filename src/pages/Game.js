import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

export default class Game extends Component {
  state = {
    allQuestions: [],
    index: 0,
  };

  componentDidMount() {
    const token = (localStorage.getItem('token'));
    this.fetchApi(token);
  }

  fetchApi = async (token) => {
    const { history } = this.props;
    await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code !== 0) {
          localStorage.setItem('token', '');
          history.push('/');
        }
        this.setState({ allQuestions: data.results });
      });
  };

  /* changeQuestion = () => {
    this.setState((prevState) => {
      const i = 1;
      return {
        index: prevState + i,
      };
    });
  }; */

  render() {
    const { allQuestions, index } = this.state;
    let questionComponent = null;
    if (allQuestions[index] !== undefined) {
      console.log(allQuestions[index]);
      questionComponent = (<Questions
        category={ allQuestions[index].category }
        question={ allQuestions[index].question }
        difficulty={ allQuestions[index].difficulty }
        correctAnswer={ allQuestions[index].correct_answer }
        incorrectAnswers={ allQuestions[index].incorrect_answers }
        // onClick={ this.changeQuestion }
      />);
    }

    return (
      <div>
        <Header />
        { questionComponent }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.func,
}.isRequired;
