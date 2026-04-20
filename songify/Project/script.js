const songsList = [
  { 
    title: "Sunny Day", 
    artist: "SoundHelix", 
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    image: "https://picsum.photos/id/100/300/300"
  },
  { 
    title: "Evening Walk", 
    artist: "SoundHelix", 
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    image: "https://picsum.photos/id/104/300/300"
  },
  { 
    title: "Ocean Waves", 
    artist: "SoundHelix", 
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    image: "https://picsum.photos/id/96/300/300"
  }
];

const audio = new Audio();
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitleEl = document.getElementById('currentSongTitle');
const songArtistEl = document.getElementById('currentSongArtist');
const errorMsgDiv = document.getElementById('errorMsg');
const albumImage = document.getElementById('albumImage');

let currentIndex = 0;
let isPlaying = false;

function showError(msg) {
  errorMsgDiv.textContent = msg;
  errorMsgDiv.style.display = 'block';
  setTimeout(() => errorMsgDiv.style.display = 'none', 2500);
}

function updatePlayPauseIcon() {
  const icon = playPauseBtn.querySelector('i');
  if (isPlaying) {
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
  } else {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  }
}

function loadSong(index, autoPlay = true) {
  if (index < 0) index = 0;
  if (index >= songsList.length) index = songsList.length - 1;
  currentIndex = index;
  const song = songsList[currentIndex];
  
  songTitleEl.textContent = song.title;
  songArtistEl.textContent = song.artist;
  albumImage.src = song.image;
  
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    updatePlayPauseIcon();
  }

  audio.src = song.src;
  audio.load();

  if (autoPlay) {
    audio.play().then(() => {
      isPlaying = true;
      updatePlayPauseIcon();
    }).catch(() => showError("⚠️ Click play to start (browser policy)"));
  } else {
    isPlaying = false;
    updatePlayPauseIcon();
  }
}

function playCurrent() {
  if (!audio.src) loadSong(currentIndex, true);
  else audio.play().then(() => {
    isPlaying = true;
    updatePlayPauseIcon();
  }).catch(() => showError("Cannot play audio"));
}

function pauseCurrent() {
  audio.pause();
  isPlaying = false;
  updatePlayPauseIcon();
}

function togglePlayPause() {
  isPlaying ? pauseCurrent() : playCurrent();
}

function nextSong() {
  loadSong((currentIndex + 1) % songsList.length, true);
}

function prevSong() {
  loadSong((currentIndex - 1 + songsList.length) % songsList.length, true);
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);

// Initialize first song (without autoplay)
loadSong(0, false);