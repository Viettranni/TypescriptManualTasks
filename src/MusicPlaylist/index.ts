/* Music Playlist / Queue Simulator

Create a playlist with songs (name, duration, artist).

Player can add/remove songs, skip, shuffle.

Track current song and play history.

Skills: arrays, objects, classes, methods for manipulation. */

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Songs goes into playlist
class Playlist {
    private songList: Song[];

    constructor (songList: Song[]) {
        this.songList = songList;
    }

    getSongList(): Song[] {
        return this.songList;
    }
}

// Individual songs
class Song {
    private name: string;
    private duration: number;
    private artist: string;

    constructor (name: string, duration: number, artist: string) {
        this.name = name;
        this.duration = duration;
        this.artist = artist;
    }

    play() {
        return "Playing current song " + this.name + " from artist " + this.artist + " and it last " + this.duration + " seconds.";
    }

    getDuration(): number {
        return this.duration;
    }

    getSong(): string {
        return this.name;
    }
}

// Tracking current and history musics, main class basically
// Player can add/remove, skip and shuffle songs
class MusicPlayer {
    private currentSong: Song;
    private songHistory: string[];
    private currentPlayList: Playlist;

    constructor (currentSong: Song, currentPlayList: Playlist) {
        this.currentSong = currentSong;
        this.songHistory = [];
        this.currentPlayList = currentPlayList;
    }

    addToSongHistory(song: string) {
        this.songHistory.push(song);
    }

    changePlaylist(playList: Playlist) {
        this.currentPlayList = playList;
    }

    async runCurrentPlayList() {
        for (const song of this.currentPlayList.getSongList()) {
            console.log(song.play());
            this.addToSongHistory(song.getSong());
            await sleep(song.getDuration() * 1000);
        }
    }

    // Bug, now it's printing 0, 1, 2, 3, 4
    showSongHistory() {
        for (const song in this.songHistory) {
            console.log(song);
        }
    }
}

// Starting the process
const song1 = new Song("Song1", 3, "Viet");
const song2 = new Song("Flowers", 2, "Shawn Mendes");
const song3 = new Song("White Iverson", 2, "Post Malone");
const song4 = new Song("Nguoi yeu", 2, "Erik");
const vietFavouritePlaylist1: Song[] = [song1, song2, song3, song4];

const song5 = new Song("Song2", 3, "Jenna");
const song6 = new Song("Trees", 2, "Justin Mendes");
const song7 = new Song("Best", 2, "Post Malone");
const song8 = new Song("Nguoi yeu", 2, "Duc Phuc");

const newPlaylist: Song[] = [song5, song6, song7, song8] 

const vietFavouritePlaylist = new Playlist(vietFavouritePlaylist1);
const jennaFavouritePlaylist = new Playlist(newPlaylist);

const musicPlayer = new MusicPlayer(song1, vietFavouritePlaylist);

await musicPlayer.runCurrentPlayList();

// Changing playlist
musicPlayer.changePlaylist(jennaFavouritePlaylist);

await musicPlayer.runCurrentPlayList();

console.log("View song history: ");
musicPlayer.showSongHistory();