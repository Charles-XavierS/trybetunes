import React from 'react';
import PropTypes from 'prop-types';

import getMusics from '../services/musicsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      listOfSongs: [],
      album: '',
      artist: '',
      image: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const results = await getMusics(id);
      this.setState({
        album: results[0].collectionName,
        artist: results[0].artistName,
        image: results[0].artworkUrl100,
        loading: false,
        listOfSongs: results,
      });
    });
  }

  render() {
    const { loading, listOfSongs, album, artist, image } = this.state;

    return (
      <div data-testid="page-album">

        <Header />

        <div>
          {loading ? <Loading />
            : (
              <div>
                <div>
                  <img src={ image } alt={ `${album} - ${artist}` } />
                </div>
                <div data-testid="album-name">
                  <h3>{ album }</h3>
                </div>
                <div data-testid="artist-name">
                  <p>{ artist }</p>
                </div>
                { listOfSongs.map((music, index) => {
                  if (index !== 0) {
                    return (
                      <MusicCard
                        song={ music }
                        key={ music.trackId }
                      />
                    );
                  } return '';
                })}
              </div>)}

        </div>

      </div>
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
