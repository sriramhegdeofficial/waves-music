import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  // const initRender = React.useRef(true);
  const [songInfo, setSongInfo] = React.useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const roundedPercentage = Math.round(
      (e.target.currentTime / e.target.duration) * 100
    );
    setSongInfo({
      currentTime: e.target.currentTime,
      duration: e.target.duration,
      animationPercentage: roundedPercentage,
    });
  };

  const getTime = (time) => {
    if (time) {
      return String(
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    } else {
      return "0:00";
    }
  };

  const sliderChangeHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    if (!isPlaying) {
      setIsPlaying(!isPlaying);
    }
    audioRef.current.play();
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    //skipForwardRef.current.style.pointerEvents = "none";
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      if (currentIndex === songs.length - 1) {
        await setCurrentSong(songs[0]);
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        await setCurrentSong(songs[currentIndex + 1]);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1]);
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        await setCurrentSong(songs[currentIndex - 1]);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    }

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioRef.current.play();
        setIsPlaying(true);
      });
    }
  };

  const songEndHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex === songs.length - 1) {
      const newSongs = songs.map((listSong) => {
        if (listSong.id !== songs[0].id) {
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
      await setCurrentSong(songs[0]);

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
          setIsPlaying(true);
        });
      }
    } else {
      const newSongs = songs.map((listSong) => {
        if (listSong.id !== songs[currentIndex + 1].id) {
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
      await setCurrentSong(songs[currentIndex + 1]);

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
          setIsPlaying(true);
        });
      }
    }
  };

  // const playAudioCallback = React.useCallback(() => {
  //   if (initRender.current) {
  //     initRender.current = false;
  //   } else {
  //     console.log("useEffect called");
  //     const playPromise = audioRef.current.play();
  //     if (playPromise !== undefined) {
  //       playPromise
  //         .then((audio) => {
  //           audioRef.current.play();
  //           setIsPlaying(true);
  //         })
  //         .catch((error) => {
  //           // Auto-play was prevented
  //           // Show paused UI.
  //           console.log("playback prevented");
  //         });
  //     }

  //     const newSongs = songs.map((listSong) => {
  //       if (listSong.id !== currentSong.id) {
  //         return {
  //           ...listSong,
  //           active: false,
  //         };
  //       } else {
  //         return {
  //           ...listSong,
  //           active: true,
  //         };
  //       }
  //     });

  //     setSongs(newSongs);
  //   }
  // }, [currentSong]);

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p className="start-time">{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.colors[0]}, ${currentSong.colors[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={sliderChangeHandler}
            type="range"
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>

        <p className="end-time">{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipTrackHandler("skip-back")}
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>

      {}
    </div>
  );
};

export default Player;
