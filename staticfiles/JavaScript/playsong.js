// Initialize state variables
let isPlaying = false;
let songDuration = 300; // Default duration, this will be updated dynamically
let currentTime = 0;
let intervalId;
let index = 0;

// Fetch song data from Django template (you need to render `songs` as JSON)
const songs = JSON.parse(document.getElementById('songs-data').textContent);

// Function to update the progress bar and song play time
function updateProgressBar() {
    let progress = (currentTime / songDuration) * 100;
    document.querySelector('.song-progress').style.width = progress + '%';

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = currentTime % 60;
    let durationMinutes = Math.floor(songDuration / 60);
    let durationSeconds = songDuration % 60;
    document.querySelector('.song-time').textContent = formatTime(currentMinutes, currentSeconds);
}

// Function to format time as mm:ss
function formatTime(minutes, seconds) {
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

// Toggle play/pause functionality
function togglePlayPause() {
    var playPauseButton = document.querySelector('.play-pause-button');
    var playPauseImg = playPauseButton.querySelector('.play-img');

    if (isPlaying) {
        clearInterval(intervalId);
        isPlaying = false;
        playPauseImg.src = '/static/Icons/new-play.png';
        music.pause();
    } else {
        intervalId = setInterval(function () {
            currentTime += 1;
            updateProgressBar();
        }, 1000);
        isPlaying = true;
        playPauseImg.src = '/static/Icons/pause.png';
        music.play();
    }
}

// Adjust the volume
function adjustVolume(volume) {
    music.volume = volume / 100;
}

// Toggle mute functionality
function toggleMute() {
    var volumeSlider = document.getElementById('volumeSlider');
    var muteButton = document.querySelector('.mute-button');
    var muteButtonImg = muteButton.querySelector(".mute-img");

    if (volumeSlider.value > 0) {
        volumeSlider.value = 0;
        muteButtonImg.src = '/static/Icons/mute.png';
        document.querySelector(".volume-value").textContent = '0';
        music.volume = 0;
    } else {
        document.querySelector(".volume-value").textContent = '50';
        volumeSlider.value = 50;
        muteButtonImg.src = '/static/Icons/volume.png';
        music.volume = 0.5; // Default volume
    }
}

// Volume slider change event
document.getElementById("volumeSlider").addEventListener("input", function () {
    var volume = this.value;
    this.style.background = 'linear-gradient(to right, #FFFFFF 0%, #FFFFFF ' + volume + '%, #d3d3d3 ' + volume + '%, #d3d3d3 100%)';
    adjustVolume(volume);
});

// Initialize the music player with the first song
const music = new Audio();
music.volume = 0.2;

// Render the song data into the UI
Array.from(document.getElementsByClassName('new-songs-grid')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].template;
});

// Play/Pause button event listener
document.getElementById('masterPlay').addEventListener('click', () => {
    togglePlayPause();
});

// Play the selected song
Array.from(document.getElementsByClassName('song-img')).forEach((e) => {
    e.addEventListener('click', (el) => {
        resetProgressBar();
        index = el.target.id;
        const song = songs.find(song => song.id == index);
        if (song) {
            music.src = song.song; // Update the source to the new song URL
            document.querySelector('.template-section img').src = song.template;
            document.querySelector('.name').innerHTML = song.songName;
            document.querySelector('.player-section .last').textContent = song.songTime;
            togglePlayPause();
            music.volume = 0.2;
        }
    });
});

// Play/Pause using spacebar
document.addEventListener('keydown', (event) => {
    if (event.key === " ") {
        event.preventDefault();
        togglePlayPause();
    }
});

// Play the next song when the current song ends
function playNextSong() {
    resetProgressBar();
    index = (index + 1) % songs.length; // Loop back to start if at the end
    const nextSong = songs[index];
    music.src = nextSong.song;
    document.querySelector('.template-section img').src = nextSong.template;
    document.querySelector('.name').innerHTML = nextSong.songName;
    document.querySelector('.player-section .last').textContent = nextSong.songTime;
    music.play();
}

// Next/Previous song functionality
document.querySelector('.next-img').addEventListener('click', () => {
    resetProgressBar();
    index = (index + 1) % songs.length;
    playNextSong();
});

document.querySelector('.prev-img').addEventListener('click', () => {
    resetProgressBar();
    index = (index - 1 + songs.length) % songs.length; // Loop back to end if at the start
    playNextSong();
});

// Update progress bar when the song ends
music.addEventListener('ended', playNextSong);

// Reset the progress bar
function resetProgressBar() {
    clearInterval(intervalId);
    currentTime = 0;
    updateProgressBar();
}
