import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score, image } = this.props;
    return (
      <div>
        <p
          data-testid="header-score"
        >
          { score }
        </p>
        <p
          data-testid="header-player-name"
        >
          { name }
        </p>
        <img
          data-testid="header-profile-picture"
          src={ image }
          alt="gravatar"
        />
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  image: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  image: player.gravatarImage,
});

export default connect(mapStateToProps)(Header);
