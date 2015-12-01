/*global app, app.ac */
var Sound;
Sound = function (file) {
    'use strict';
    var self = this;

    self.buffer = null;
    self.path = '';
    self.mute = false;
    self.gain = 0.7;
    self.pan = 0;
    self.filter = false;
    self.filterQ = 1;
    self.filterFreq = 8000;

    /**
     * Set one of the properties values
     *
     * @param {string} key   Name of th eproperty to set
     * @param {any} value The value
     */
    function set(key, value) {
        if (key[0] === '_') {
            return false;
        }
        self[key] = value;
    }

    /**
     * Get the value of the given key
     *
     * @param  {string} key The name of the value
     *
     * @return {any} 
     */
    function get(key) {
        if (key[0] === '_') {
            return false;
        }
        return self[key];
    }

    /**
     * Create the audioContextBuffer, set the gain and other values.
     * Connect all the parts together and play the sound.
     */
    function play() {
        /**
         * Create the buffersource and fill it with our buffer
         */
        var acSound = app.ac.createBufferSource(),
            acGain = app.ac.createGain(),
            acPanner = false,
            acFilter = app.ac.createBiquadFilter();

        acSound.buffer = self.buffer;

        if (app.ac.createStereoPanner !== undefined) {
            acPanner = app.ac.createStereoPanner();
            acPanner.pan.value = self.pan;
        }
        /**
         * Set the Gain, Panner, and Filter
         */
        if (self.mute) {
            acGain.gain.value = 0;
        } else {
            acGain.gain.value = self.gain;
        }
        acFilter.Q.value = self.filterQ;
        acFilter.frequency.value = self.filterFreq;

        /**
         * Connect everything together
         */
        if (self.filter) {
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

    function getFile() {
        var drumkit = document.querySelector('[name=drumset]').value,
            httpRequest = new XMLHttpRequest();
        httpRequest.onload = function () {
            app.ac.decodeAudioData(httpRequest.response, function (buffer) {
                self.buffer = null;
                self.buffer = buffer;
            });
        };
        httpRequest.open('GET', 'sounds/' + drumkit + '/' + self.path, true);
        httpRequest.responseType = 'arraybuffer';
        httpRequest.send(null);
    }

    function _init(file) {
        self.path = file;
        getFile();
    }

    _init(file);

    return {
        play: play,
        setSound: getFile,
        set: set,
        get: get
    };
};
