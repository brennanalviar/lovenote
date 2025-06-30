import React, { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import './DailyLoveNote.css';

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

const returnDate = new Date("2025-07-28");

const DailyLoveNote = () => {
  const [song, setSong] = useState(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const today = new Date();
  const daysUntilReturn = differenceInDays(returnDate, today);

  useEffect(() => {
    const index = today.getDate() % messages.length;
    setMessage(messages[index]);
    setImage(images[index]);

    // Temporary fake song data
    setSong({
      name: "Test Song",
      artists: [{ name: "Test Artist" }],
      external_urls: {
        spotify: "https://open.spotify.com/"
      }
    });
  }, []);

  return (
    <div className="love-note-container">
      <h1>Hi Love ❤️</h1>
      <p className="date">{format(today, "EEEE, MMMM d, yyyy")}</p>

      <img src={image} alt="Us" className="love-note-image" />

      <p className="love-note-message">{message}</p>

      {song && (
        <div className="spotify-song">
          <h2>Today’s Song:</h2>
          <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            {song.name} – {song.artists.map(a => a.name).join(", ")}
          </a>
        </div>
      )}

      <p className="countdown">{daysUntilReturn} days until you're home! 🏠</p>
    </div>
  );
};

export default DailyLoveNote;