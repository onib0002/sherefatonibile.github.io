const CODE = {
    status: {
        0: "MEDIA_NONE",
        1: "MEDIA_STARTING",
        2: "MEDIA_RUNNING",
        3: "MEDIA_PAUSED",
        4: "MEDIA_STOPPED",
    },
    error: {
        1: "MEDIA_ERR_ABORTED",
        2: "MEDIA_ERR_NETWORK",
        3: "MEDIA_ERR_DECODE",
        4: "MEDIA_ERR_NONE_SUPPORTED",
    },
};

const app = {
    media: null,

    track: {
        src: "media/Just For Me By Donnie Mcclurkin lyrics.mp3",
        volume: 0.5,
        isMuted: false,
        isPlayed:false,
        
    },
    tracks: [
        {
            id: 412,
            artist: 'Donnie Mc Clurkin',
            album: 'Just for me',
            track: 'Live in London and more',
            length: 322,
            path: "media/Just For Me By Donnie Mcclurkin lyrics.mp3",
            //path: 'media/Just For Me By Donnie Mcclurkin lyrics.mp3',
        },
        {
            id: 222,
            artist: 'Keith Sweat',
            album: 'Twisted',
            track: 'Twisted',
            length: 272,
            path: 'media/Keith Sweat - Twisted (Official Music Video)-1.mp3',
        },
        {
            id: 141,
            artist: 'Kirk Franklin',
            album: 'Hero',
            track: 'Imagine me',
            length: 278,
            path: 'media/Kirk Franklin - Imagine Me (Official Video).mp3',
        },
        {
            id: 312,
            artist: 'Lamar Campbell',
            album: 'Motown Gospel: 20Years/20 Hits',
            track: 'More than anything',
            length: 350,
            path: 'media/Lamar Campbell - More Than Anything.mp3',
        },
        {
            id: 566,
            artist: 'Mairo Ese',
            album: 'Sprit and Life',
            track: 'Chukwu Ebuka',
            length: 793,
            path: 'media/Mairo Ese, PC and LCGC -- CHUKWU EBUKA MEDLEY.mp3',
        }
        
    ],
    currentSong:null,
    
    init() {
        app.addEventListeners();
    //    app.mountMedia();
        app.buildMusicList();
    },

    mountMedia() {
        // Check for platform and format file path accordingly
        let src = app.track.src;
       // if (device.platform === "Android") {
            src = `file:///android_asset/www/${app.track.src}`;
            console.log(src)
       // }
        // Mount the media object
        app.media = new Media(
            src,

            app.handleMediaSuccess,
            app.handleMediaError,
            app.handleMediaStatusChange
        );
    },
    mountSelectedMedia(ev) {
        // Check for platform and format file path accordingly
        //ev.target.parentElement.value
        let src = "";
        let selectedtrack = ev.target.parentElement.value;
        for(var i=0;i<app.tracks.length;i++)
        {
            if(app.tracks[i].id == selectedtrack)
            {
                src = app.tracks[i].path;
            }
        }
       app.currentSong=selectedtrack
        //let src = app.track.src;
        //if (device.platform === "Android") {
           // src = `file:///android_asset/www/${app.track.src}`;
            src = `file:///android_asset/www/`+src;
            console.log(src)
        //}
        // Mount the media object
        app.media = new Media(
            src,

            app.handleMediaSuccess,
            app.handleMediaError,
            app.handleMediaStatusChange
        );
        app.nowPlaying();

    },
    buildMusicList() {
        let numOfTracks =     app.tracks.length;
        var tracksection = document.getElementById("collection");
        
        for(var i=0;i<numOfTracks;i++)
        {
            var childElement = document.createElement('li');
            childElement.className = "collection-item avatar";
            childElement.setAttribute("value",app.tracks[i].id);//;
            
            var childElementI = document.createElement('i');
            childElementI.className = "material-icons circle red";
            childElementI.innerText="play_arrow";

            childElementI.addEventListener("click", this.mountSelectedMedia);
            childElement.appendChild(childElementI);
            var childElementDiv = document.createElement('div');
            childElementDiv.className="title";

            childElement.appendChild(childElementDiv);
            var childElementP =  document.createElement('p');
            childElementP.innerText= app.tracks[i].track;
            childElement.appendChild(childElementP);
            tracksection.appendChild(childElement);
        }

    },
    buildPlayingCard() {
        //let title = app.tracks[i]['artist']
       let i = app.tracks.findIndex(x => x.id == app.currentSong)
       console.log( `i is ${i}`)
        document.getElementById('card-title').innerHTML = app.tracks[i]['artist']
        document.getElementById('card-content').innerHTML = app.tracks[i]['track'] +" "+ "is" + " "+ "now" + " "+ "playing"
    },
    handleMediaSuccess() {
        // successfully created the media object AND playing, stopping, or recording
        console.log("Successfully completed the media task.");
    },

    // Destructure the error object => {code, message}
    handleMediaError({
        code,
        message
    }) {
        console.log("unsuccessful")
        console.log(CODE.error[code], message);
    },

    handleMediaStatusChange() {
        console.log('media status is now ' + CODE.status[status] );
    },

    addEventListeners() {
        document.getElementById("play").addEventListener("click", app.play);
        document.getElementById("pause").addEventListener("click", app.pause);
        document.getElementById("ff").addEventListener("click", app.fastForward);
        document.getElementById("rw").addEventListener("click", app.rewind);
        document.getElementById("up").addEventListener("click", app.increaseVolume);
        document
            .getElementById("down")
            .addEventListener("click", app.decreaseVolume);
        document.getElementById("mute").addEventListener("click", app.toggleMute);

        document.addEventListener("pause", () => app.media.release());
        document.addEventListener("resume", app.mountMedia);
    },

    play() {
        //app.media.play();
        app.nowPlaying();
        
        
    },
    playNext(){

    },
    nowPlaying(){
        app.media.play()
        app.buildPlayingCard()
        //app.showPauseButton()
        //app.showSongSlider()
        document.getElementById("playlist").style.display = "none";  //hide
	    document.getElementById("nowplaying").style.display = "block"; //show
        app.togglePlay()
        if (app.track.isPlayed== true ){
            app.showPauseButton()
        //}else{
          //  app.showPlayButton()
        }

        app.togglePause()
        if (document.getElementById('pause').clicked="true"){
           app.showPlayButton()
       }//else{
            //app.showPauseButton()
       // }

    },
    showSongTitle(){

    },

    stopCurrentPlaying(){
        app.media.stop
    },
    /*showSongSlider(){
        //const slider = document.querySelector('.range')
        //slider.value =0
        const tracks = {
            app
        }
        
        const convertTime = (time) => {
            const minutes= Math.floor(time / 60)
          const seconds = time % 60
          if (seconds >= 10){
              return `${minutes}:${seconds}`
          } else {
              return `${minutes}:0${seconds}`
          }
        }
        
        const maxTime = document.querySelector('.maxTime')
        maxTime.textContent = convertTime(tracks.length)
        
        
        let currentTime = 0;
        const current = document.querySelector('.currentTime')
        
        const range = document.querySelector('.range')
        
        let nowPlaying = true
        const playButton = document.querySelector('.play')
        playButton.addEventListener('click', ()=>{app.nowPlaying = true})
        const pauseButton = document.querySelector('.pause')
        pauseButton.addEventListener('click', ()=>{app.nowPlaying = false})
        setInterval(()=>{
        
            if((currentTime < tracks.length) && (isPlaying == true)){
              currentTime++
            current.textContent = convertTime(currentTime)
            let percent = (currentTime / tracks.length) * 100
            range.style.background = `linear-gradient(90deg, rgba(170,170,170,1) ${percent}%, rgba(0,0,0,1) ${percent}%)`
          }
        }, 1000)


    },*/
    showSongTime(){
        app.media.getDuration() 
    },

    pause() {
        app.media.pause();
    },
    showPauseButton(){
        document.getElementById("play").style.display = "none";  //hide
	    document.getElementById("pause").style.display = "inline"; //show
        
    },
    showPlayButton(){
        document.getElementById("pause").style.display = "none";  //hide
	    document.getElementById("play").style.display = "inline"; //show
        
    },
    togglePlay(){
        document.getElementById("play").addEventListener("click", app.showPauseButton);
    },
    togglePause(){
        document.getElementById("pause").addEventListener("click", app.showPlayButton);
    },

    fastForward() {
        app.media.getCurrentPosition((currentPosition) => {
            const maxPosition = app.media.getDuration();
            console.log({
                currentPosition,
                maxPosition
            });

            const newPosition = Math.min(maxPosition, currentPosition + 10);
            app.media.seekTo(newPosition * 1000); //milliseconds
            console.log({
                newPosition,
                maxPosition
            });
        });
    },

    rewind() {
        app.media.getCurrentPosition((currentPosition) => {
            const minPosition = 0;
            console.log({
                currentPosition,
                minPosition
            });

            const newPosition = Math.max(minPosition, currentPosition - 10);
            app.media.seekTo(newPosition * 1000); //milliseconds
            console.log({
                newPosition,
                minPosition
            });
        });
    },

    increaseVolume() {
        let vol = app.track.volume;
        console.log("Volume was ", vol);
        vol = Math.min(1, vol + 0.1);

        app.media.setVolume(vol);
        app.track.volume = vol;
        console.log(`Volume now set at ${vol}`);
    },

    decreaseVolume() {
        let vol = app.track.volume;
        console.log("Volume was ", vol);
        vol = Math.max(0, vol - 0.1);

        app.media.setVolume(vol);
        app.track.volume = vol;
        console.log(`Volume now set at ${vol}`);
    },

    toggleMute(event) {
        const buttonEl = event.target;
        if (app.track.isMuted) {
            app.media.setVolume(app.track.volume);
            app.track.isMuted = false;
            buttonEl.textContent = "Mute";
            console.log(`Volume now set to ${app.track.volume}`);
        } else {
            app.media.setVolume(0);
            app.track.isMuted = true;
            buttonEl.textContent = "Unmute";
            console.log(`Volume now set to 0`);
        }
    },
    bars() {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      },

    };


    



document.addEventListener("deviceready", app.init, false);