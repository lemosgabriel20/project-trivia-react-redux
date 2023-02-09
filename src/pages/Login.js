import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  componentDidMount() {
    if (localStorage.getItem('token') === null) {
      localStorage.setItem('token', JSON.stringify(''));
    }
  }

  handleInput = (evt) => {
    const type = evt.target.id;
    const { value } = evt.target;
    this.setState({ [type]: value }, () => {
      const { email, name } = this.state;
      if (email.length && name.length) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  };

  handleClick = async () => {
    const { history } = this.props;
    const triviaURL = 'https://opentdb.com/api_token.php?command=request';
    await fetch(triviaURL)
      .then((response) => response.json())
      .then((data) => {
        // Salva token no localStorage
        localStorage.setItem('token', data.token);
        history.push('/game');
      });
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          id="name"
          data-testid="input-player-name"
          placeholder="Name"
          required
          onChange={ this.handleInput }
        />
        <input
          type="email"
          id="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          required
          onChange={ this.handleInput }
        />
        <button
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
