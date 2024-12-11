import React from 'react';
import { useMusicController } from '../../controllers/MusicController';
import './MuteButton.css';

const MuteButton = () => {
  const { isPlaying, toggleMusic } = useMusicController();

  return (
    <button className="mute-button" onClick={toggleMusic}>
      {isPlaying ? '🔊' : '🔇'}
    </button>
  );
};

export default MuteButton; 