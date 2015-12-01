'use strict';

class Sound {

	constructor (file) {
		this.file = file;
		this.audioBuffer = null;
	    this.audioMute = false;
	    this.audioGain = 0.7;
	    this.audioPan = 0;
	    this.audioFilter = false;
	    this.audioFilterQ = 1;
	    this.audioFilterFreq = 8000;

		this.getFile();
	}

    /**
     * Create the audioContextBuffer, set the gain and other values.
     * Connect all the parts together and play the sound.
     */
    play() {
        /**
         * Create the buffersource and fill it with our buffer
         */
        let acSound = app.ac.createBufferSource(),
            acGain = app.ac.createGain(),
            acPanner = false,
            acFilter = app.ac.createBiquadFilter();

        acSound.buffer = this.audioBuffer;

        if (app.ac.createStereoPanner !== undefined) {
            acPanner = app.ac.createStereoPanner();
            acPanner.pan.value = this.audioPan;
        }
        /**
         * Set the Gain, Panner, and Filter
         */
        if (this.audioMute) {
            acGain.gain.value = 0;
        } else {
            acGain.gain.value = this.audioGain;
        }
        acFilter.Q.value = this.audioFilterQ;
        acFilter.frequency.value = this.audioFilterFreq;

        /**
         * Connect everything together
         */
        if (this.audioFilter) {
            if (acPanner) {
                acSound.connect(acPanner);
                acPanner.connect(acFilter);                
            } else {
                acSound.connect(acFilter);
            }
            acFilter.connect(acGain);
        } else {
            if (acPanner) {
                acSound.connect(acPanner);
                acPanner.connect(acGain);                
            } else {
                acSound.connect(acGain);
            }
        }
        acGain.connect(app.ac.destination);

        /**
         * Play the sound
         */
        acSound.start(0);
    }


	getFile () {
        let drumkit = document.querySelector('[name=drumset]').value,
            httpRequest = new XMLHttpRequest();

        httpRequest.onload = function () {
            app.ac.decodeAudioData(httpRequest.response, (buffer) => {
                this.audioBuffer = null;
                this.audioBuffer = buffer;
            });
        }.bind(this);

        httpRequest.open('GET', 'sounds/' + drumkit + '/' + this.file, true);
        httpRequest.responseType = 'arraybuffer';
        httpRequest.send(null);		
	}

	set mute (bool) {
		this.audioMute = bool;
	}

	set gain (val) {
		this.audioGain = val;
	}

	set pan (val) {
		this.audioPan = val;
	}

	set filter (bool) {
		this.audioFilter = bool;
	}

	set filterQ (val) {
		this.audioFilterQ = val;
	}
	set filterFreq (val) {
		this.audioFilterFreq = val;
	}
}