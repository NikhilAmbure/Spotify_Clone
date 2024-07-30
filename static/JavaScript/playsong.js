// First : UpdateProgressBar, FormatTime (0:00)
let isPlaying = false; // Flag to track if the song is currently playing
let songDuration = 300; // Duration of the song in seconds
let currentTime = 0; // Current time of the song in seconds
let intervalId; // Interval ID for song progress updates

let likedsongsId = false;

// Function to update the progress bar and song play time
function updateProgressBar() {
    let progress = (currentTime / songDuration) * 100; // Calculate progress percentage
    document.querySelector('.song-progress').style.width = progress + '%'; // Update width of progress bar

    let currentMinutes = Math.floor(currentTime / 60); // Calculate current minutes
    let currentSeconds = currentTime % 60; // Calculate current seconds
    let durationMinutes = Math.floor(songDuration / 60); // Calculate duration minutes
    let durationSeconds = songDuration % 60; // Calculate duration seconds
    document.querySelector('.song-time').textContent = formatTime(currentMinutes, currentSeconds); // Update song play time display
}

// Function to format time as mm:ss
function formatTime(minutes, seconds) {
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds; // Add leading zero if seconds < 10
}



// Second : togglePlayPause, adjustvolume of music
// Function to toggle between play and pause
function togglePlayPause() {
    var playPauseButton = document.querySelector('.play-pause-button');
    var playPauseImg = playPauseButton.querySelector('.play-img');

    if (isPlaying) {
        clearInterval(intervalId); // Stop the interval for song progress updates
        isPlaying = false; // Update flag to indicate song is paused
        playPauseImg.src = static +  'Icons/new-play.png'; // Change src to play icon
        // music.pause();
    } else {
        intervalId = setInterval(function () {
            currentTime += 1; // Increment current time by 1 second
            updateProgressBar(); // Update progress bar
        }, 1000); // Update every second
        isPlaying = true; // Update flag to indicate song is playing
        playPauseImg.src = static + 'Icons/pause.png'; // Change src to pause icon
        // music.play();
    }
}

// Adjusts the music-volume
function adjustVolume(volume) {
    music.volume = volume / 100;
}


// Third : toggleMute, volume Slider
// Volume Slider
function toggleMute() {
    var volumeSlider = document.getElementById('volumeSlider'); // Fixed selector
    var muteButton = document.querySelector('.mute-button');
    var muteButtonImg = muteButton.querySelector(".mute-img");
    // var tooltipBlock = document.querySelector('.tooltip');
    // var tooltipValue = tooltipBlock.querySelector("js-tooltip");

    if (volumeSlider.value > 0) {
        volumeSlider.value = 0;
        muteButtonImg.src = static + "Icons/mute.png"; // Change image source to mute icon
        document.querySelector(".volume-value").innerHTML = '0';
        document.querySelector('.js-tooltip').innerHTML = 'Unmute';
        music.volume = 0;
    } else {
        document.querySelector(".volume-value").innerHTML = '50';
        volumeSlider.value = 50;
        muteButtonImg.src = static + 'Icons/volume.png'; // Change image source to volume icon
        document.querySelector('.js-tooltip').innerHTML = 'Mute';
        music.volume = 0.2;
    }
}

document.getElementById("volumeSlider").addEventListener("input", function () {
    var volume = this.value;
    this.style.background = 'linear-gradient(to right, #FFFFFF 0%, #FFFFFF ' + volume + '%, #d3d3d3 ' + volume + '%, #d3d3d3 100%)';
    adjustVolume(volume);
});



// Forth : renders the object elements into the spotify-body
// For Audio
const music = new Audio(static + 'Audio Files/1.mp3');
// music.play();
const songs = [
    {
        id: '1',
        songName: `<p class="song-name">Red Right Hand</p>
        <p class="singer-name">Nick Cave & The Bad Seeds, Flood</p>`,
        template: static + 'Songs-Template/1.png',
        songTime: '6:21',
    },
    {
        id: '2',
        songName: `<p class="song-name">Arcade</p>
        <p class="singer-name">Duncan Laurence</p>`,
        template: static + 'Songs-Template/2.png',
        songTime: '3:04',
    },
    {
        id: '3',
        songName: `<p class="song-name">At My Worst (feat. Kehlani)</p>
        <p class="singer-name">Pink Sweat$, Kehlani</p>`,
        template: static + 'Songs-Template/3.png',
        songTime: '2:49',
    },
    {
        id: '4',
        songName: `<p class="song-name">Happier</p>
        <p class="singer-name">Marshmello, Bastille</p>`,
        template: static + 'Songs-Template/4.png',
        songTime: '3:34',
    },
    {
        id: '5',
        songName: `<p class="song-name">I Don't Care (with Justin Beiber)</p>
        <p class="singer-name">Ed Sheeran & Justin Bieber</p>`,
        template: static + 'Songs-Template/5.png',
        songTime: '3:40',
    },
    {
        id: '6',
        songName: `<p class="song-name">I'm an Albatraoz</p>
        <p class="singer-name">AronChupa, Little Sis Nora</p>`,
        template: static + 'Songs-Template/6.png',
        songTime: '2:47',
    },
    {
        id: '7',
        songName: `<p class="song-name">MONTERO (Call me by your name)</p>
        <p class="singer-name">Lil Nas X</p>`,
        template: static + 'Songs-Template/7.png',
        songTime: '2:18',
    },
    {
        id: '8',
        songName: `<p class="song-name">Old Town Road</p>
        <p class="singer-name">Lil Nas X</p>`,
        template: static + 'Songs-Template/8.png',
        songTime: '1:53',
    },
    {
        id: '9',
        songName: `<p class="song-name">This Is what You Came For</p>
        <p class="singer-name">Calvin Harris, Rihanna</p>`,
        template: static + 'Songs-Template/9.png',
        songTime: '3:42',
    },
    {
        id: '10',
        songName: `<p class="song-name">Treat You Better</p>
        <p class="singer-name">Shawn Mendes</p>`,
        template: static + 'Songs-Template/10.png',
        songTime: '3:08',
    }
];

Array.from(document.getElementsByClassName('new-songs-grid')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].template;
    // e.getElementsByClassName('song-info')[0].innerHTML = songs[i].songName;
});



// Fifth : Plays the song when i click on play button
// To play the song when click on the button
let masterPlay = document.getElementById('masterPlay');

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        music.volume = 0.2; // Default volume of the song
    } else {
        music.pause();
    }
});



// Sixth : Renders the audio to play, song-template on the play-song section
let index = 0;
let template_play = document.querySelector('.template-section img');
let title_play = document.querySelector('.name');
let songtime = document.querySelector('.player-section .last');
// let playsbutton = document.querySelector('');
// let background_change = document.querySelector('.songs-grid');

// when i click on template of song or song-img => that song will play.
Array.from(document.getElementsByClassName('song-img')).forEach((e) => {
    e.addEventListener('click', (el) => {
        resetProgressBar();
        index = el.target.id;
        music.src = static + `Audio Files/${index}.mp3`;
        template_play.src = static + `Songs-template/${index}.png`;

        togglePlayPause();
        music.volume = 0.2;
        music.play();

        let songTitles = songs.filter((ele) => {
            return ele.id == index;
        });

        // It takes the song-time and puts into the player-section
        songTitles.forEach(element => {
            let { songTime } = element;
            songtime.textContent = songTime;
        })

        // For the song-name and singer-name
        songTitles.forEach(elem => {
            let { songName } = elem;
            // gets the songName from the object songs and put it into the play-song's song-name
            title_play.innerHTML = songName;
            template_play.src = template;
        });
        

    })
});



// Seventh : play / pause by using spacebar
// control the song-play-pause by spacebar
document.addEventListener('keydown', (event) => {
    if (event.key == "Spacebar" && music.paused) {
        music.play();
    } else if (event.key == "Spacebar") {
        music.play();
    }
});



// Eight : to play the next-song when current song ends
// For next-song or when all song ends
let start_song_time = document.querySelector('.player-section .start');
// Function to play the next song
function playNextSong() {
    resetProgressBar();
    index++; // to play the next song
    if (index <= songs.length) {
        let nextSong = songs[index];
        music.src = static + `Audio Files/${nextSong.id}.mp3`;
        template_play.src = static + `Songs-template/${nextSong.id}.png`;
        title_play.innerHTML = nextSong.songName;

        songtime.textContent = nextSong.songTime;
        music.play(); // Play the next song
    }

    // When all songs ended
    else {
        index = 0;
        let nextSong = songs[index];
        music.src = static + `Audio Files/${nextSong.id}.mp3`;
        template_play.src = static + `Songs-template/${nextSong.id}.png`;
        title_play.innerHTML = nextSong.songName;
        songtime.textContent = nextSong.songTime;
        music.play(); // Play the first song
    }
}
// Listen for the 'ended' event on the Audio object
music.addEventListener('ended', function () {
    playNextSong(); // Call the function to play the next song
});


// Nine : next-song and prev-song
// For next-audio play when i click on next-button
let next_index = 1;

Array.from(document.getElementsByClassName('next-img')).forEach((n) => {
    n.addEventListener('click', (n) => {
        resetProgressBar();
        next_index += 1
        music.src = static + `Audio Files/${next_index}.mp3`;
        template_play.src = static + `Songs-template/${next_index}.png`;

        togglePlayPause();
        music.volume = 0.2;
        music.play();

        let songTitles = songs.filter((ele) => {
            return ele.id == next_index;
        });

        // It takes the song-time and puts into the player-section
        songTitles.forEach(element => {
            let { songTime } = element;
            songtime.textContent = songTime;
        })

        // For the song-name and singer-name
        songTitles.forEach(elem => {
            let { songName } = elem;
            // gets the songName from the object songs and put it into the play-song's song-name
            title_play.innerHTML = songName;
            template_play.src = template;
        });
    });
});

// For prev-song
Array.from(document.getElementsByClassName('prev-img')).forEach((b)=>{
    b.addEventListener('click', (b)=> {
        resetProgressBar();
        next_index -= 1;
        if (next_index <= 0) {
            next_index = 1;
        } else {
            music.src = static + `Audio Files/${next_index}.mp3`;
            template_play.src =  static + `Songs-template/${next_index}.png`;

            togglePlayPause();
            music.volume = 0.2;
            music.play();

            let songTitles = songs.filter((ele)=>{
                return ele.id == next_index;
            });

            songTitles.forEach(element=>{
                let { songTime } = element;
                songtime.textContent = songTime;
            })

            songTitles.forEach(element=>{
                let { songName } = element;
                title_play.innerHTML = songName;
                template_play.src = template;
            });
        }
    });
});


// Tenth
// Function to reset the progress bar
function resetProgressBar() {
    clearInterval(intervalId); // Clear the interval for song progress updates
    currentTime = 0; // Reset current time
    updateProgressBar(); // Update progress bar
}   