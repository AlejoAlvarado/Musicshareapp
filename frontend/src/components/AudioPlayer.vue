<template>
	<main class="audioPlayer" id="app">
		<div class="audioPlayerUI d-flex justify-center" :class="{'isDisabled': isPlaylistActive}">

		<div class="albumDetails d-flex align-center justify-center">
			<div class="albumImage ml-5">
				<transition name="ballmove" enter-active-class="animated zoomIn" leave-active-class="animated fadeOutDown" mode="out-in">
					<img @load="onImageLoaded()" :src="musicPlaylist[currentSong].image" :key="currentSong" ondragstart="return false;" id="playerAlbumArt">
				</transition>
				<div class="loader" :key="currentSong">Loading...</div>
			</div>
			<div class="d-flex flex-column ml-10">
				<transition name="slide-fade" mode="out-in">
					<p class="title" :key="currentSong">{{ musicPlaylist[currentSong].title }}</p>
				</transition>
				<transition name="slide-fade" mode="out-in">
						<p class="artist mt-n1" :key="currentSong">{{ musicPlaylist[currentSong].artist }}</p>
				</transition>
			</div>
		</div>

		<div class="d-flex flex-column ml-9">
			<div class="playerButtons d-flex align-center">
				<a class="button" :class="{'isDisabled':(currentSong==0)}" v-on:click="prevSong()" title="Previous Song"><i class="zmdi zmdi-skip-previous"></i></a>
				<a class="button play" v-on:click="playAudio()" title="Play/Pause Song">
					<transition name="slide-fade" mode="out-in">
								<i class="zmdi" :class="[currentlyStopped ? 'zmdi-stop' : (currentlyPlaying ? 'zmdi-pause-circle' : 'zmdi-play-circle')]" :key="1"></i>
					</transition>   
				</a>
				<a class="button" :class="{'isDisabled':(currentSong==musicPlaylist.length-1)}" v-on:click="nextSong()" title="Next Song"><i class="zmdi zmdi-skip-next"></i></a>
			</div>
			<div class="currentTimeContainer mt-n6" style="text-align:center">
					<span class="currentTime">{{ currentTime | fancyTimeFormat }}</span>
					<span class="totalTime"> {{ trackDuration | fancyTimeFormat }}</span>
					<!--<span style="color:black">({{ currentSong+1 }}/{{ musicPlaylist.length }})</span>-->
			</div>
			<div class="currentProgressBar mt-n1">
					<div class="currentProgress" :style="{ width: currentProgressBar + '%' }"></div>
			</div>
		</div>
		</div>
	</main>
</template>

<script>

export default {
    data(){
        return {
            audio: "",
            imgLoaded: false,
            currentlyPlaying: false,
            currentlyStopped: false,
            currentTime: 0,
            checkingCurrentPositionInTrack: "",
            trackDuration: 0,
            currentProgressBar: 0,
            isPlaylistActive: false,
			debug: false,
            audioFile: ""
        }
	},
	mounted(){
		this.changeSong();
		this.audio.loop = false;
	},
	filters: {
		fancyTimeFormat: function(s) {
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		}
	},
	computed:{
		musicPlaylist(){
			return this.$store.state.musicPlaylist;
		},
		currentSong:{
			get(){
				return this.$store.state.currentSong;
			},
			set(value){
				this.$store.commit("setCurrentSong",value);
			}
		}
	},
	methods: {
		togglePlaylist: function() {
			this.isPlaylistActive = !this.isPlaylistActive;
		},
		nextSong: function() {
			if (this.currentSong < this.musicPlaylist.length - 1)
				this.changeSong(this.currentSong + 1);
		},
		prevSong: function() {
			if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
		},
		changeSong: function(index) {
			var wasPlaying = this.currentlyPlaying;
			this.imageLoaded = false;
			if (index !== undefined) {
				this.stopAudio();
				this.currentSong = index;
			}
			this.audioFile = this.musicPlaylist[this.currentSong].url;
			this.audio = new Audio(this.audioFile);
			var localThis = this;
			this.audio.addEventListener("loadedmetadata", function() {
				localThis.trackDuration = Math.round(this.duration);
			});
			this.audio.addEventListener("ended", this.handleEnded);
			if (wasPlaying) {
				this.playAudio();
			}
		},
		isCurrentSong: function(index) {
			if (this.currentSong == index) {
				return true;
			}
			return false;
		},
		getCurrentSong: function(currentSong) {
			return this.musicPlaylist[currentSong].url;
		},
		playAudio: function() {
			if (
				this.currentlyStopped == true &&
				this.currentSong + 1 == this.musicPlaylist.length
			) {
				this.currentSong = 0;
				this.changeSong();
			}
			if (!this.currentlyPlaying) {
				this.getCurrentTimeEverySecond(true);
				this.currentlyPlaying = true;
				this.audio.play();
			} else {
				this.stopAudio();
			}
			this.currentlyStopped = false;
		},
		stopAudio: function() {
			this.audio.pause();
			this.currentlyPlaying = false;
			this.pausedMusic();
		},
		handleEnded: function() {
			if (this.currentSong + 1 == this.musicPlaylist.length) {
				this.stopAudio();
				this.currentlyPlaying = false;
				this.currentlyStopped = true;
			} else {
				this.currentlyPlaying = false;
				this.currentSong++;
				this.changeSong();
				this.playAudio();
			}
		},
		onImageLoaded: function() {
			this.imgLoaded = true;
		},
		getCurrentTimeEverySecond: function(startStop) {
            console.log(startStop)
			var localThis = this;
			this.checkingCurrentPositionInTrack = setTimeout(
				function() {
					localThis.currentTime = localThis.audio.currentTime;
					localThis.currentProgressBar =
						localThis.audio.currentTime / localThis.trackDuration * 100;
					localThis.getCurrentTimeEverySecond(true);
				}.bind(this),
				1000
			);
		},
		pausedMusic: function() {
			clearTimeout(this.checkingCurrentPositionInTrack);
		},
		toggleDebug: function(){
			this.debug=!this.debug;
			document.body.classList.toggle('debug');
		}
	},
	watch: {
		currentTime: function() {
			this.currentTime = Math.round(this.currentTime);
		}
	},
	beforeDestroy: function() {
		this.audio.removeEventListener("ended", this.handleEnded);
		this.audio.removeEventListener("loadedmetadata", this.handleEnded);

		clearTimeout(this.checkingCurrentPositionInTrack);
	}
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Inconsolata:400,700");
@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");

$primary_color: rgba(0, 0, 0, 0.75);
$player_width: 40rem;
$player_padding: 0.005rem;
$player_border_radius: 0.02rem;

$button_size: 1.7rem;

$anim_duration: 0.5s;

/* Debugging */
.debug{
	main * { outline: solid 0.25rem rgba(255,0,0,0.25); }
}

* {
	box-sizing: border-box;
}
.animated {
	animation-duration: $anim_duration;
}
.audioPlayer {
	position: relative;
	background-color: #0070a8;

	min-height: 3rem;
	width: $player_width;

	overflow: hidden;

	padding: $player_padding;
	margin: 0 auto;

	border-radius: $player_border_radius;
	box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);

	user-select: none;

	.nav-icon {
		width: 15px;
		height: 10px;

		position: absolute;
		top: ($player_padding)-($player_padding/4);
		left: $player_padding;

		transform: rotate(0deg);
		transition: 0.25s ease-in-out;
		cursor: pointer;

		span {
			display: block;
			position: absolute;
			height: 1px;
			width: 100%;
			background: $primary_color;
			border-radius: 6px;
			opacity: 1;
			left: 0;
			transform: rotate(0deg);
			transition: 0.5s ease-in-out;
		}
		span:nth-child(1) {
			top: 0px;
		}

		span:nth-child(2) {
			top: 5px;
		}

		span:nth-child(3) {
			top: 10px;
		}

		&.isActive span:nth-child(1) {
			top: 5px;
			transform: rotate(135deg);
		}

		&.isActive span:nth-child(2) {
			opacity: 0;
			left: -60px;
		}

		&.isActive span:nth-child(3) {
			top: 5px;
			transform: rotate(-135deg);
		}
	}
	.audioPlayerUI {
		margin-top: $player_padding;
		will-change: transform, filter;
		transition: $anim_duration;
		&.isDisabled {
			transform: scale(0.75) translateX(100%);
			filter: blur(5px) grayscale(100%);
		}
		.albumDetails {
			text-align: center;
			margin: 2rem 0;
			p {
				margin: 0px;
				&.title {
					font-size: 1rem;
					color: #FFFFFF
				}
				&.artist {
					margin-top: 0.5rem;
					font-size: 0.6rem;
					font-weight: none;
					color: #FFFFFF;
					transition-delay: 100ms;
				}
			}
		}
		.albumImage {
			width: 3rem;
			height: 3rem;
			overflow: hidden;
			margin: 0 auto;

			img {
				width: 100%;
				height: 100%;
				z-index: 10;
				object-fit: cover;
				object-position: 50% 50%;
				border-radius:$player_border_radius;
			}
		}
		.playerButtons {
			position: relative;
			margin: 0 auto;
			//margin-bottom: 1.5rem;
			text-align: center;
			
			.button {
				font-size: $button_size;
				display: inline-block;
				vertical-align: middle;
				padding: 0.5rem;
				margin: 0 0.25rem;
				color: #FFFFFF;
				border-radius: 50%;

				outline: 0;
				text-decoration: none;
				cursor: pointer;
				transition: $anim_duration;

				&.play {
					font-size: 2*$button_size;
					margin: 0 1.5rem;
				}
				&:active {
					opacity: 0.75;
					transform: scale(0.75);
				}
				&.isDisabled {
					color: #000000;
					cursor: initial;
				}
				&.isDisabled:active {
					transform: none;
				}
			}
		}
		.currentTimeContainer {
			width: 100%;
			height: 1rem;
			
			display: flex;
			justify-content: space-between;

			.currentTime,
			.totalTime {
				font-size: 0.5rem;
				font-family: monospace;
				color: #FFFFFF;
			}
		}

		.currentProgressBar {
			width: 100%;
			background-color: rgba(0, 0, 0, 0.1);
			margin:0.75rem 0;
			.currentProgress {
				background-color: $primary_color;
				width: 0px;
				height: 1px;
				transition: 100ms;
			}
		}
	}
}

.loader {
	margin: 60px auto;
	font-size: 10px;
	position: relative;
	text-indent: -9999em;
}

/* data change transitions */
.slide-fade-enter-active {
	transition: all 0.3s ease;
}
.slide-fade-leave-active {
	transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
	transform: translateY(10px);
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity $anim_duration;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>