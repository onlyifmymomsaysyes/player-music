const fileInput = document.getElementById("folderInput");
const player = document.getElementById("myAudio");
const seekBar = document.getElementById("seekBar");
const musicPlaylistElement = document.getElementById("elementList");

fileInput.addEventListener('change', function() {
    let songList = [];
    let songNum = 0

    const files = Array.from(this.files).filter(file =>
        file.type.startsWith("audio/") ||
        file.name.toLowerCase().endsWith(".flac")
    );
    
    for (const e of files) {
        songList.push(e);
    }

    if (files) {
        const url = URL.createObjectURL(songList[0]);
        player.src = url;
    }

    while (musicPlaylistElement.firstChild) {
        musicPlaylistElement.removeChild(musicPlaylistElement.firstChild);
    };

    for (const i of songList) {
        console.log(i)
        const url = URL.createObjectURL(i);
        let songElement = document.createElement("li");
        songElement.textContent = i.name;
        songElement.dataset.path = url;
        musicPlaylistElement.appendChild(songElement);
        songNum++
    };
});

player.addEventListener('loadedmetadata', function() {
    seekBar.max = Math.floor(player.duration); 
});

player.addEventListener('timeupdate', function() {
    seekBar.value = Math.floor(player.currentTime);
});

player.addEventListener('ended', () => {
    console.log("Track finished!");
    songList[songNum]
});

seekBar.addEventListener('input', function() {
    player.currentTime = seekBar.value;
});


function playAudio() {
    player.play();
};;

function pauseAudio() {
    player.pause();
};


//list stuff
const list = document.getElementById('elementList');
const output = document.getElementById('output');

list.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
        // Clear old selection
        [...list.children].forEach(li => li.classList.remove('selected'));
        // Mark new selection
        e.target.classList.add('selected');
        // Show selected
        player.src = e.target.dataset.path
        playAudio()
    }
});