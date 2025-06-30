// DailyLoveNote.jsx
import React, { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';

const messages = [
  "I love you more today than yesterday 💕",
  "You're my favorite person. Always. 🌟",
  "Counting the days until you're back in my arms 🥰",
  "You're the best part of my day 💖",
  "Just thinking of you makes me smile 😊"
];

const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg"
];

const playlistId = "YOUR_SPOTIFY_PLAYLIST_ID";
const returnDate = new Date("2025-07-28");

const DailyLoveNote = () => {
  const [song, setSong] = useState(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const today = new Date();

  const daysUntilReturn = differenceInDays(returnDate, today);

  useEffect(() => {
    // Rotate message/image daily based on date index
    const index = today.getDate() % messages.length;
    setMessage(messages[index]);
    setImage(images[index]);

    // Call Spotify API for a random song
    async function fetchSong() {
      try {
        const res = await fetch(`/api/spotify?playlistId=${playlistId}`);
        const data = await res.json();
        setSong(data);
      } catch (err) {
        console.error("Failed to fetch Spotify song:", err);
      }
    }

    fetchSong();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Hi Love ❤️</h1>
      <p className="text-gray-700 mb-4">{format(today, "EEEE, MMMM d, yyyy")}</p>
      
      <img src={image} alt="Us" className="rounded-2xl shadow-md w-64 h-64 object-cover mb-4" />
      <p className="text-xl text-pink-700 font-medium mb-6">{message}</p>

      {song && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Today’s Song:</h2>
          <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {song.name} – {song.artists.map(a => a.name).join(", ")}
          </a>
        </div>
      )}

      <p className="text-lg font-semibold text-gray-800 mt-6">
        {daysUntilReturn} days until you're home! 🏠
      </p>
    </div>
  );
};

export default DailyLoveNote;