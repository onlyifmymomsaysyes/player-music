const fileInput = document.getElementById("fileInput");
const player = document.getElementById("myAudio");
const seekBar = document.getElementById("seekBar");

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        player.src = url;
    }
});

player.addEventListener('loadedmetadata', function() {
    seekBar.max = Math.floor(player.duration);
    console.log(player.duration)
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