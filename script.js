const songs = [
  {
    title: "odiyamma",
    artist: "Artist A",
    file: "odiyamma.mp3",
    img: "hn.jpg"
  },
  {
    title: "raghunandana",
    artist: "Artist B",
    file: "raghunandana.mp3",
    img: "hanuman.jpg"
  },
  {
    title: "samayama",
    artist: "Artist C",
    file: "samayama.mp3",
    img: "hn.jpg"
  },
  { title: "Kubera",
    artist: "Artist D",
    file: "Poyiraa Mama.mp3",
    img: "Kubera-2025.jpg"
  },
  {
    title: "animal",
    artist: "Artist e",
    file: "[iSongs.info] 13 - Nanna Nuv Naa Pranam (Childs Version).mp3",
    img: "animal1.jpg"
  },
  {
    title: "animal",
    artist: "Artist f",
    file: "[iSongs.info] 09 - Abrars Entry Jamal Kudu.mp3",
    img: "animal2.webp"
  },
  { title: "sardaar",
    artist: "Artist g",
    file: "Aadevadanna Eedevadanna - SenSongsMp3.Co.mp3",
    img: "sardhar.jpg"
  }
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const songList = document.getElementById("songList");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const playerImg = document.getElementById("player-img");
const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");

// Load song list
songs.forEach((song, index) => {
  const songDiv = document.createElement("div");
  songDiv.className = "song-item";
  songDiv.innerHTML = `
    <img src="${song.img}" />
    <div class="song-info">
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
    </div>
    <button onclick="playSelectedSong(${index})">▶️</button>
  `;
  songList.appendChild(songDiv);
});

// Load current song into player
function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  playerImg.src = song.img;
  playerTitle.textContent = song.title;
  playerArtist.textContent = song.artist;
}

// Play selected song
function playSelectedSong(index) {
  currentSongIndex = index;
  loadSong(index);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSelectedSong(currentSongIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSelectedSong(currentSongIndex);
});

// Update progress
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value;
});

// Load initial song
loadSong(currentSongIndex);
