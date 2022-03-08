import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const min = 2;
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { searchArtist } = this.state;
      this.setState({
        disabled: true,
      });
      if (searchArtist.length >= min) {
        this.setState({
          disabled: false,
        });
      }
    });
  }

  render() {
    const { searchArtist, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="searchArtist"
            id="searchArtist"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ searchArtist }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchArtist: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
}.isRequired;

export default Search;
