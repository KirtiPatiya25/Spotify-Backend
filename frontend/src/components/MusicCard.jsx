const MusicCard = ({ song }) => {
  const playSong = () => {
    const audio = new Audio(song.uri);
    audio.play();
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700">
      <img
        src="https://via.placeholder.com/150"
        className="rounded mb-3"
      />

      <h3 className="font-semibold">{song.title}</h3>

      <p className="text-sm text-gray-400">
        {song.artist?.username}
      </p>

      <button
        onClick={playSong}
        className="mt-3 bg-green-500 px-3 py-1 rounded-full text-black"
      >
        ▶ Play
      </button>
    </div>
  );
};

export default MusicCard;




