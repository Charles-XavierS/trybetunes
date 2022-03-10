import React from 'react';
import PropTypes from 'prop-types';

import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorites: [],
      songs: [],
      albuns: {
        artists: '',
        album: '',
      },
    };

    this.favoritesSongs = this.favoritesSongs.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.favoritesSongs();
    const results = await getMusics(id);
    this.setState({
      songs: [...results],
      albuns: {
        artists: results[0].artistName,
        album: results[0].collectionName,
      },
    });
  }

  favoritesSongs() {
    this.setState({
      loading: true,
    }, async () => {
      const resultsFavorites = await getFavoriteSongs();
      console.log(await resultsFavorites);
      this.setState({
        loading: false,
        favorites: [...resultsFavorites],
      });
    });
  }

  render() {
    const {
      songs,
      albuns: { artists, album },
      loading,
      favorites,
    } = this.state;

    return (
      loading ? <Loading /> : (

        <div data-testid="page-album">
          <Header />

          <section>

            <p data-testid="artist-name">{ artists }</p>
            <p data-testid="album-name">{ album }</p>

            <div>

              { songs.map((music) => {
                const { trackId } = music;
                if (music.previewUrl === undefined) {
                  return null;
                }

                return (

                  <MusicCard
                    key={ trackId }
                    checked={ favorites.some((song) => song.trackId === music.trackId) }
                    music={ music }
                  />

                );
              })}

            </div>

          </section>

        </div>
      )
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
