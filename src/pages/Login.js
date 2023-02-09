import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

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
        >
          Play
        </button>
      </div>
    );
  }
}
