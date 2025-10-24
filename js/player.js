// Lecteur audio personnalisé pour Infinirecord
class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentTrack = null;
    }

    init(selector) {
        document.querySelectorAll(selector).forEach(player => {
            const audioSrc = player.dataset.src;
            const playBtn = player.querySelector('.play-btn');
            const progress = player.querySelector('.progress');
            const currentTime = player.querySelector('.current-time');
            
            playBtn.addEventListener('click', () => {
                if (this.currentTrack !== audioSrc) {
                    this.audio.src = audioSrc;
                    this.currentTrack = audioSrc;
                }
                
                if (this.isPlaying) {
                    this.pause();
                    playBtn.textContent = '▶';
                } else {
                    this.play();
                    playBtn.textContent = '⏸';
                }
            });

            // Mise à jour de la progression
            this.audio.addEventListener('timeupdate', () => {
                if (this.currentTrack === audioSrc) {
                    const percent = (this.audio.currentTime / this.audio.duration) * 100;
                    progress.style.width = `${percent}%`;
                    currentTime.textContent = this.formatTime(this.audio.currentTime);
                }
            });
        });
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const player = new AudioPlayer();
    player.init('.audio-player');
});