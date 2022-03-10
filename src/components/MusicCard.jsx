import React from 'react';
import PropTypes from 'prop-types';

import { addSong } from '../services/favoriteSongsAPI';

import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(music) {
    this.setState({
      loading: true,
    }, (async () => {
      await addSong(music);
      this.setState({
        loading: false,
      });
    }
    ));
  }

  render() {
    const { music: { previewUrl, trackName, trackId }, song, checked } = this.props;
    const { loading } = this.state;
    return (

      <div className="music-list">

        <p>{ trackName }</p>

        { loading ? <Loading /> : (
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        )}

        <label htmlFor="favorite">
          Favorita

          <input
            id="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onClick={ () => this.handleClick(song) }
            defaultChecked={ checked }
            name="favorite"
          />

        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }),
  checked: PropTypes.bool,
}.isRequired;

export default MusicCard;
