import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveLogin } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  componentDidMount() {
    localStorage.setItem('token', JSON.stringify(''));
    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([]));
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
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    const triviaURL = 'https://opentdb.com/api_token.php?command=request';
    await fetch(triviaURL)
      .then((response) => response.json())
      .then((data) => {
        // Salva token no localStorage
        localStorage.setItem('token', data.token);
        history.push('/game');
      });
    const hash = md5(email).toString();
    const image = `https://www.gravatar.com/avatar/${hash}`;
    dispatch(saveLogin({ name, email, image }));
  };

  render() {
    const { isDisabled } = this.state;
    const { history } = this.props;
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
        <button
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
