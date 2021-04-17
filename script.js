const audioContainer = document.getElementById("audio-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Audio titles
const audios = [
  "If you ask me",
  `Al-Mu'allim`,
  "Allahu Allah",
  "Forgotten Promises",
  "Give Thanks",
];

// Keep track of audio
let audioIndex = 0;

// Initially load audiu details into DOM
loadAudio(audios[audioIndex]);

// Update audio details
function loadAudio(audiosItem) {
  title.innerText = audiosItem;
  audio.src = `src/music/${audiosItem}.mp3`;
  cover.src = `src/images/${audiosItem}.jpg`;
  console.log(audiosItem);
}

//Play song
function playSong() {
  audioContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

//Pause song
function pauseSong() {
  audioContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

// Prev song
function prevSong() {
  audioIndex--;

  if (audioIndex < 0) {
    audioIndex = audios.length - 1;
  }

  loadAudio(audios[audioIndex]);

  playSong();
}

// Next song
function nextSong() {
  audioIndex++;

  if (audioIndex === audios.length) {
    audioIndex = 0;
  }

  loadAudio(audios[audioIndex]);

  playSong();
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = audioContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
