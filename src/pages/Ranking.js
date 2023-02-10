import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearState } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: JSON.parse(localStorage.getItem('ranking')),
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(clearState());
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking.map((player, index) => (
            <div key={ index }>
              <p
                data-testid={ `player-name-${index}` }
              >
                { player.name }
              </p>
              <p
                data-testid={ `player-score-${index}` }
              >
                { player.score }
              </p>
              <img
                src={ player.picture }
                alt="Gravatar profile"
              />
            </div>
          ))
        }
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
