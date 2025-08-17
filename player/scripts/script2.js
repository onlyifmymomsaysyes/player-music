const fileInput = document.getElementById("folderInput");
const player = document.getElementById("myAudio");
const seekBar = document.getElementById("seekBar");

let songList = [];

fileInput.addEventListener('change', function() {
    const files = this.files;
    console.log(files[0])

    for (const e in files) {
        songList.push({
            name: files[e].name,
            path: files[e].webkitRelativePath
        })
    }
    if (files) {
        const url = URL.createObjectURL(file);
        player.src = url;
    }
});

player.addEventListener('loadedmetadata', function() {
    seekBar.max = Math.floor(player.duration);
    console.log(player.duration);
});

player.addEventListener('timeupdate', function() {
    seekBar.value = Math.floor(player.currentTime);
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
        output.textContent = `You chose: ${e.target.textContent}`;
    }
});