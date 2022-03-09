import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { song } = this.props;
    return (
      <div>
        <p>{song.trackName}</p>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: propTypes.shape({
    trackName: propTypes.string,
    previewUrl: propTypes.string,
  }),
}.isRequired;

export default MusicCard;
