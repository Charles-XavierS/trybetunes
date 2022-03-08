import React from 'react';
import { Link } from 'react-router-dom';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      disabled: true,
      loading: false,
      albuns: [],
      searched: '',
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

  handleClick = async () => {
    this.setState({
      loading: true,
    });
    const { searchArtist } = this.state;
    const result = await searchAlbumsAPI(searchArtist);
    console.log(result);
    this.setState({
      searched: searchArtist,
      searchArtist: '',
      disabled: true,
      albuns: result,
      loading: false,
    });
  }

  render() {
    const { searchArtist, disabled, loading, searched, albuns } = this.state;
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
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        {loading && <Loading />}
        {!loading && albuns.length === 0 && (
          <h2>Nenhum álbum foi encontrado</h2>
        )}
        {!loading
          && albuns.length !== 0
            && (
              <section>
                <h3>
                  {`Resultado de álbuns de: ${searched}`}
                </h3>
                <div>
                  {albuns.map((album) => (
                    <div key={ album.collectionId }>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        <img
                          src={ album.artworkUrl100 }
                          alt={ `${album.collectionName} - ${album.artistName}` }
                        />
                        <p>{album.collectionName}</p>
                        <p>{album.artistName}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

      </div>
    );
  }
}

export default Search;
