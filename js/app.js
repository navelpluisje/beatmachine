var App, app;
App = function () {
    'use strict';

    var self = this;

    self.sequencer = null;
    self.settings = null;
    self.ac = null;
    self.drumkit = '909';
    self.sounds = {};

    function get(key) {
        if (key.substr(0,1) === '_') {
            return false;
        }
        return self[key];
    }

    function _setSettings(data) {
        self.settings = JSON.parse(data);
        return true;
    }

    function _getSettings() {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('GET', 'js/settings.json');
            request.onload = function () {
                if (request.status === 200) {
                    resolve(this.responseText);
                } else {
                    reject(this.responseText);
                }
            };
            request.send();
        });
    }

    function _checkAudioContext() {
        try {
            self.ac = new AudioContext() || WebkitAudioContext() || MozAudioContext();
            return true;
        } catch (e) {
            alert("This app doesn't seem to be available for your browser. Sorry about that. We recommend Firefox or Chrome")
        }
        return false;
    }

    function _createSequencer() {
        self.sequencer = new Sequencer();
    }

    function _createChannels() {
        var i;
        for (i in self.settings.sounds) {
            if (self.settings.sounds.hasOwnProperty(i)) {
                self.sounds[i] = new Channel(self.settings.sounds[i].name, '#channels', self.settings.sounds[i].file, self.settings.channelsettings);
            }
        }
    }

    function _setDrumkit(init) {
        var sound;
        init = init || false;

        self.drumkit = document.querySelector('[name=drumset]:checked').value;

        if (init) {
            for (sound in self.sounds) {
                if (self.sounds.hasOwnProperty(sound)) {
                    self.sounds[sound].setSound();
                }
            }
        }
    }

    function _setEventBindings() {
        var drumsets = document.querySelectorAll('[name=drumset]'),
            set;

        for (set in drumsets) {
            if (drumsets.hasOwnProperty(set)) {
                drumsets[set].addEventListener('click', _setDrumkit)
            }
        }
    }

    function _init() {
        _setEventBindings();
        if (_checkAudioContext()) {
            _getSettings().then(function (data) {
                _setDrumkit();
                _setSettings(data);
                _createChannels();
                _createSequencer();
            });
        }
    }

    _init();

    return {
        get: get,
        ac: self.ac,
        sounds: self.sounds,
        drumkit: self.drumkit
    }
};

app = new App();
