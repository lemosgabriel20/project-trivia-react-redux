import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  state = {
    allQuestions: [],
    index: 0,
    showNext: false,
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

  changeQuestion = () => {
    const { index } = this.state;
    const { history, name, score, picture } = this.props;
    this.setState((prevState) => {
      const i = 1;
      return {
        index: prevState.index + i,
      };
    });
    this.setState({ showNext: false });
    const questions = 5;
    if (index === questions - 1) {
      const previousRanking = JSON.parse(localStorage.getItem('ranking'));
      const player = { name, score, picture };
      const newRanking = [
        ...previousRanking,
        player,
      ];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
      history.push('/feedback');
    }
  };

  showNextButton = () => {
    this.setState({ showNext: true });
  };

  render() {
    const { allQuestions, index, showNext } = this.state;
    const questionComponent = allQuestions.map((object, i) => {
      const question = object;
      return (
        <Questions
          key={ i }
          category={ question.category }
          question={ question.question }
          difficulty={ question.difficulty }
          correctAnswer={ question.correct_answer }
          incorrectAnswers={ question.incorrect_answers }
          showNextButton={ this.showNextButton }
        />
      );
    });

    return (
      <div>
        <Header />
        { questionComponent[index] }
        { showNext
          ? (<button data-testid="btn-next" onClick={ this.changeQuestion }>Next</button>)
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  picture: player.gravatarImage,
});

Game.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  image: PropTypes.string,
  history: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Game);
