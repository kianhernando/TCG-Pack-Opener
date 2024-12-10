import lakeMusic from './lake.mp3';
import { useMusicController } from '../controllers/MusicController';

function MusicPlayer() {
  const { audioRef, isPlaying, toggleMusic } = useMusicController();

  return (
    <div>
      <button onClick={toggleMusic}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
      <audio ref={audioRef} src={lakeMusic} loop />
    </div>
  );
}

export default MusicPlayer; 