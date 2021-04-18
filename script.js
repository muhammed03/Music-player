const audioContainer = document.getElementById("audio-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const modeBtn = document.getElementById("mode");
const volumeBtn = document.getElementById("volume");

const modeIcon = document.getElementById("mode-icon");
const volumeIcon = document.getElementById("volume-icon");

const timestamp = document.getElementById("current-time");
const durationTime = document.getElementById("duration-time");

const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const author = document.getElementById("author");
const cover = document.getElementById("cover");

// Audio titles
const audios = [
  { songName: "If you ask me", author: "Yusuf Islam", id: 1 },
  { songName: `Al-Mu'allim`, author: "Sami Yusuf", id: 2 },
  { songName: "Allahu Allah", author: "Sami Yusuf", id: 3 },
  { songName: "Forgotten Promises", author: "Yusuf Islam", id: 4 },
  { songName: "Give Thanks", author: "Michael Jackson", id: 5 },
];

// Modes
const modes = ["default", "repeat", "random"];

// Keep track of audio
let audioIndex = 0;

// Keep mode of audio play
let modeIndex = 0;
let modeStatus = modes[modeIndex];

//load playlist items

function loadPlaylistItems() {
  audios.map((item) => {
    let playlistItem = document.createElement("div");
    let audioName = document.createElement("span");
    let songAuthor = document.createElement("span");

    playlist.appendChild(playlistItem);

    audioName.innerText = `${item.songName}`;
    songAuthor.innerText = `${item.author}`;
    playlistItem.appendChild(audioName);
    playlistItem.appendChild(songAuthor);
    playlistItem.id = item.id;
  });
}

loadPlaylistItems();
//
document.addEventListener(
  "click",
  function (e) {
    e = e || window.event;
    let target = e.srcElement;

    if (
      target.parentNode.id === "playlist" ||
      target.parentNode.parentNode.id === "playlist"
    ) {
      if (target.parentNode.id === "playlist") {
        audioIndex = target.id - 1;

        loadAudio(audios[audioIndex]);

        playSong();
      } else {
        audioIndex = target.parentNode.id - 1;

        loadAudio(audios[audioIndex]);

        playSong();
      }
    }
  },
  false
);
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

// Set volume
let volumeMode = true;
function setVolume() {
  if (volumeMode) {
    audio.volume = 0;
    volumeMode = false;
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.add("fa-volume-mute");
  } else {
    audio.volume = 1;
    volumeMode = true;
    volumeIcon.classList.add("fa-volume-up");
    volumeIcon.classList.remove("fa-volume-mute");
  }
}
// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Get minutes
  let mins = Math.floor(audio.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // Get seconds
  let secs = Math.floor(audio.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  let durationMins = Math.floor(duration / 60);
  if (durationMins < 10) {
    durationMins = "0" + String(durationMins);
  }

  let durationSecs = Math.floor(duration / 60);
  if (durationSecs < 10) {
    durationSecs = "0" + String(durationSecs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;

  setTimeout(
    (durationTime.innerHTML = `${durationMins}:${durationSecs}`),
    10000
  );
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

// End audio
audio.addEventListener("ended", nextSongPlayMode);

// Volume
volumeBtn.addEventListener("click", setVolume);
