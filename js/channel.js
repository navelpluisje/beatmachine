var Channel = function (name, dom, file, settings) {
    var self = this;

    self.channelName = '';
    self.mixer = null;
    self.strip = null;
    self.sound = null;
    self.knobs = null;
    self.steps = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    self.settings = {};

    function _addTitle(name) {
        var title   = document.createElement('h4');
        title.textContent = uFirst(name);
        self.strip.appendChild(title);

    }

    function _addKnob(element, index) {
        var setting = document.createElement('span'),
            id = self.channelName + '-' + index;


        setting.setAttribute('id', id);
        setting.setAttribute('class', 'knob');

        self.strip.appendChild(setting);

        self.knobs[id] = new NpKnob(id, element);
        self.knobs[id].obj.addEventListener('knob-rotate', function (evt) {
            self.sound.set( index, evt.detail.value );
        });
    }

    function _addSwitch(element, index) {
        var id = self.channelName + '-' + index,
            switchWrapper = document.createElement('span');
        switchWrapper.setAttribute('class', 'switch-wrapper');

        var theSwitch = document.createElement('input');
        theSwitch.setAttribute('type', 'checkbox');
        theSwitch.setAttribute('class', 'switch');
        theSwitch.setAttribute('id', id);

        var theLabel = document.createElement('label');
        theLabel.setAttribute('for', id);

        if (element.value) {
            theSwitch.setAttribute('checked', 'checked');
        }

        switchWrapper.appendChild(theSwitch);
        switchWrapper.appendChild(theLabel);

        self.strip.appendChild(switchWrapper);

        theSwitch.addEventListener('change', function () {
            self.sound.set(index, theSwitch.checked);
        })
    }

    function _addRadio() {
        var label = document.createElement('label');
        label.setAttribute('for', 'led-' + self.channelName);

        var led = document.createElement('input');
        led.setAttribute('type', 'radio');
        led.setAttribute('id', 'led-' + self.channelName);

        self.strip.appendChild(led);
        self.strip.appendChild(label);
    }

    function _addSeparator() {
        var separator = document.createElement('hr');
        self.strip.appendChild(separator);
    }

    function _addTrigger() {
        var id = self.channelName + '-trigger',
            trigger = document.createElement('button');

        self.strip.appendChild(trigger);

        trigger.setAttribute('id', id);
        trigger.setAttribute('class', 'trigger button');
        trigger.textContent = uFirst(self.channelName);
        trigger.addEventListener('click', function(){
            self.sound.play();
        });
    }

    function _addSettings() {
        var setting;

        for (setting in self.settings) {
            if (self.settings.hasOwnProperty(setting)) {
                if (self.settings[setting].type === 'knob') {
                    _addTitle(self.settings[setting].name);
                    _addKnob(self.settings[setting].values, setting);
                }
                if (self.settings[setting].type === 'switch') {
                    _addTitle(self.settings[setting].name);
                    _addSwitch(self.settings[setting], setting);
                }
                if (self.settings[setting].type === 'separator') {
                    _addSeparator();
                }
                if (self.settings[setting].type === 'radio') {
                    _addRadio();
                }
            }
        }
    }

    function _addStrip(strip) {
        self.mixer.appendChild(strip);
    }

    function _createChannel() {
        self.strip = document.createElement('article');
        self.strip.setAttribute('id', self.channelName);
        self.strip.setAttribute('class', 'channel-strip');

        /**
         * Add the strip to the dom and add the settings
         */
        _addStrip(self.strip);
        _addSettings();
        _addTrigger();
    }

    function _init(name, dom, file, settings) {
        self.channelName = name;
        self.settings = settings;
        self.knobs = [];
        /**
         * Because we can only add to one dom element, we use querySelector
         */
        self.mixer = document.querySelector(dom);
        self.sound = new Sound(file);
        _createChannel();
    }

    function setSound() {
        self.sound.setSound();
    }

    function setStep(id, on) {
        self.steps[id] = on;
    }

    function trigger(position) {
        if (self.steps[position]) {
            self.sound.play();
            document.getElementById('led-' + self.channelName).checked = true;
        } else {
            document.getElementById('led-' + self.channelName).checked = false;

        }
    }

    _init(name, dom, file, settings);

    return {
        trigger: trigger,
        setStep: setStep,
        setSound: setSound
    };
};
