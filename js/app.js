var App, app;
App = function () {
    'use strict';

    var self = this,
        inpDdpHost = document.getElementById('ddp-host'),
        inpDdpPort = document.getElementById('ddp-port'),
        clsContext = document.querySelectorAll('.context-close'),
        opnContext = document.querySelectorAll('.context-open');

    self.sequencer = null;
    self.settings = {};
    self.ac = null;
    self.ddp = null;
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
        inpDdpHost.value = localStorage.getItem('host') || self.settings.ddp.host;
        inpDdpPort.value = localStorage.getItem('port') || self.settings.ddp.port;
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
        var context = null;
        try {
            context = window.AudioContext || window.webkitAudioContext || false;
            if (context) {
                self.ac = new context(); 
            }
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
                self.sounds[i] = new Channel(self.settings.sounds[i].name, '#channels', self.settings.sounds[i].file, self.settings.sounds[i].key, self.settings.channelsettings);
            }
        }
    }

    function _setDrumkit(init) {
        var sound;
        init = init || false;

        self.drumkit = document.querySelector('[name=drumset]').value;

        if (init) {
            for (sound in self.sounds) {
                if (self.sounds.hasOwnProperty(sound)) {
                    self.sounds[sound].setSound();
                }
            }
        }
    }

    function _setSettingsField() {
        localStorage.setItem(this.dataset.id, this.value);
    }

    function _closeContext() {
        document.getElementById(this.dataset.context).style.display = 'none';
        if (this.dataset.type === 'ddp') {
            self.ddp.ddpclient.host = localStorage.getItem('host');
            self.ddp.ddpclient.hort = localStorage.getItem('port');

            self.sequencer.ddpReconnect();
        }
    }

    function _openContext() {
        document.getElementById(this.dataset.context).style.display = 'block';
    }

    function _setEventBindings() {
        var drumset = document.querySelector('[name=drumset]'),
            i;
        drumset.addEventListener('change', _setDrumkit);
        inpDdpHost.addEventListener('change', _setSettingsField);
        inpDdpPort.addEventListener('change', _setSettingsField);
        for (i = 0; i < clsContext.length; i += 1) {
            clsContext[i].addEventListener('click', _closeContext);
        }
        for (i = 0; i < opnContext.length; i += 1) {
            opnContext[i].addEventListener('click', _openContext);
        }
    }

    function _init() {
        _setEventBindings();
        if (_checkAudioContext()) {
            _getSettings().then(function (data) {
                _setSettings(data);
                self.ddp = new DdpHandler();
                _setDrumkit();
                _createChannels();
                _createSequencer();
            });
        }
    }

    _init();

    return {
        get: get,
        ac: self.ac,
        ddp: self.ddp,
        sounds: self.sounds,
        drumkit: self.drumkit,
        settings: self.settings,
    }
};

app = new App();
