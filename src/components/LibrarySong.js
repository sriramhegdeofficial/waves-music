import React from "react";

const LibrarySong = ({
  song,
  setCurrentSong,

  audioRef,
  setIsPlaying,
  songs,
  setSongs,
}) => {
  const [hovered, setHovered] = React.useState(false);

  const hoverHandler = () => {
    if (song.active) {
      return;
    } else {
      setHovered(!hovered);
    }
  };

  const songSelectHandler = async () => {
    await setCurrentSong(song);
    setHovered(false);
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioRef.current.play();
        setIsPlaying(true);
      });
    }
    const newSongs = songs.map((listSong) => {
      if (listSong.id !== song.id) {
        return {
          ...listSong,
          active: false,
        };
      } else {
        return {
          ...listSong,
          active: true,
        };
      }
    });

    setSongs(newSongs);
  };

  // const playAudioCallback = React.useCallback(() => {
  //   if (initRender.current) {
  //     initRender.current = false;
  //   } else {
  //     console.log("uwe effect from libsong");

  //   }
  // }, [audioRef, currentSong]);

  // React.useEffect(() => {
  //   playAudioCallback();
  // }, [playAudioCallback]);

  return (
    <div
      className={`library-song  ${hovered ? "hovered" : ""} ${
        song.active ? "selected" : ""
      }`}
      onMouseEnter={hoverHandler}
      onMouseLeave={hoverHandler}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
