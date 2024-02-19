import React, { useState, useEffect } from 'react';

const AudioPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);

  useEffect(() => {
    // Load last playing audio file and position from localStorage
    const lastTrackIndex = localStorage.getItem('lastTrackIndex');
    if (lastTrackIndex !== null) {
      setCurrentTrackIndex(parseInt(lastTrackIndex));
    }
  }, []);

  useEffect(() => {
    // Save current playing audio file and position to localStorage
    localStorage.setItem('lastTrackIndex', currentTrackIndex);
  }, [currentTrackIndex]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Store the audio file using built-in Browser APIs
      const audioURL = URL.createObjectURL(file);
      setPlaylist(prevPlaylist => [...prevPlaylist, { url: audioURL, name: file.name }]);
    }
  };

  const handleTrackClick = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleEnded = () => {
    setCurrentTrackIndex((prevIndex) => {
      if (prevIndex < playlist.length - 1) {
        return prevIndex + 1;
      } else {
        return -1; // Playlist finished
      }
    });
  };

  return (
    <div>
      <input type="file" accept=".mp3" onChange={handleFileUpload} multiple />
      <ul>
        {playlist.map((track, index) => (
          <li key={index} onClick={() => handleTrackClick(index)}>
            {track.name}
          </li>
        ))}
      </ul>
      {currentTrackIndex !== -1 && (
        <div>
          <h2>Now Playing: {playlist[currentTrackIndex].name}</h2>
          <audio src={playlist[currentTrackIndex].url} controls autoPlay onEnded={handleEnded} />
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Audio Player</h1>
      <AudioPlayer />
    </div>
  );
};

export default App;
