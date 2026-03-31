import { useRef, useState } from "react";
import MusicList from "./components/MusicList";

function App() {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);

  const playSong = (song) => {
    if (audioRef.current) {
      audioRef.current.src = song.uri;
      audioRef.current.play();
      setCurrentSong(song);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">

      {/* Sidebar */}
      <div className="w-60 bg-zinc-900 p-5">
        <h1 className="text-2xl font-bold text-green-500 mb-6">
          Spotify 🎧
        </h1>

        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-green-400">🏠 Home</li>
          <li className="cursor-pointer hover:text-green-400">🔍 Search</li>
          <li className="cursor-pointer hover:text-green-400">📚 Library</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">

        <h2 className="text-xl font-semibold mb-4">
          Trending Songs
        </h2>

        <MusicList playSong={playSong} />
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 w-full bg-zinc-900 p-4 flex justify-between items-center">
        
        <div>
          {currentSong ? (
            <>
              <p className="font-semibold">{currentSong.title}</p>
              <p className="text-sm text-gray-400">
                {currentSong.artist?.username}
              </p>
            </>
          ) : (
            <p>No song playing</p>
          )}
        </div>

        <audio ref={audioRef} controls />
      </div>
    </div>
  );
}

export default App;