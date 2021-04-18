const audioContainer = document.getElementById("audio-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const modeBtn = document.getElementById("mode");

const modeIcon = document.getElementById("mode-icon");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const author = document.getElementById("author");
const cover = document.getElementById("cover");

// Audio titles
const audios = [
  { songName: "If you ask me", author: "Yusuf Islam" },
  { songName: `Al-Mu'allim`, author: "Sami Yusuf" },
  { songName: "Allahu Allah", author: "Sami Yusuf" },
  { songName: "Forgotten Promises", author: "Yusuf Islam" },
  { songName: "Give Thanks", author: "Michael Jackson" },
];

// Modes
const modes = ["default", "repeat", "random"];

// Keep track of audio
let audioIndex = 0;

// Keep mode of audio play
let modeIndex = 0;
let modeStatus = modes[modeIndex];

// Initially load audiu details into DOM
loadAudio(audios[audioIndex]);

// Update audio details
function loadAudio(audiosItem) {
  title.innerText = audiosItem.songName;
  author.innerText = audiosItem.author;
  audio.src = `src/music/${audiosItem.songName}.mp3`;
  cover.src = `src/images/${audiosItem.songName}.jpg`;
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

// Repeat song
function repeatSong() {
  loadAudio(audios[audioIndex]);

  playSong();
}

// Random song
function randomSong() {
  let currentAudioIndex = audioIndex;

  function generateRandom(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return [currentAudioIndex].includes(num) ? generateRandom(min, max) : num;
  }

  audioIndex = generateRandom(0, 4);

  loadAudio(audios[audioIndex]);

  playSong();
}

// Check mode play
function checkMode() {
  if (modeIndex == 0) {
    if (!modeIcon.classList.contains("fa-redo")) {
      modeIcon.classList.add("fa-redo");
    }

    modeIcon.style.color = "#47be3c";
    modeIndex++;
  } else if (modeIndex == 1) {
    modeIcon.classList.remove("fa-redo");
    modeIcon.classList.add("fa-random");
    modeIndex++;
  } else if (modeIndex == 2) {
    modeIcon.classList.remove("fa-random");
    modeIcon.classList.add("fa-redo");
    modeIcon.style.color = "#dfdbdf";
    modeIndex = 0;
  }
}

// Next song play mode
let playMode = nextSong;

function nextSongPlayMode() {
  if (modeIndex == 0) {
    playMode = nextSong();
  } else if (modeIndex == 1) {
    playMode = repeatSong();
  } else if (modeIndex == 2) {
    playMode = randomSong();
  }

  return playMode;
}
// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
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
modeBtn.addEventListener("click", checkMode);

//Time/song update
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSongPlayMode);
