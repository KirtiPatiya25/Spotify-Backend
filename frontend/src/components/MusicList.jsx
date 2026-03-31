import { useEffect, useState } from "react";
import MusicCard from "./MusicCard";

import { getAllMusic } from "../api";



const MusicList = () => {
  const [songs, setSongs] = useState([]);


useEffect(() => {
  fetch("http://localhost:5000/api/music")
    .then(res => res.json())
    .then(data => {
      console.log("API DATA:", data);

      if (Array.isArray(data)) {
        setSongs(data);
      } else {
        setSongs(data.musics || []);
      }
    })
    .catch(err => console.log("FETCH ERROR:", err));
}, []);


  return (
    <div className="grid grid-cols-5 gap-5">
      {songs.map(song => (
        <MusicCard key={song._id} song={song} />
      ))}
    </div>
  );
};

export default MusicList;