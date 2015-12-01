'use strict';

class Channel {

	constructor (name, dom, file, key, settings) {
        file = file || false;
		this.channelName = name || '';
		this.settings = settings || {};
		this.knobs = [];
		this.key   = key || 0;
		this.mixer = document.querySelector(dom);
		this.strip = null;
		this.steps = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

        if (file) {
            this.sound = new Sound(file);        
        } else {
            this.bass = true;
            this.sound = new BassSynth();
        }

        this._createChannel();
        this._setEventBindings();
	}

	_createChannel () {
		this._addStrip()
        this._addSettings();
        if (this.settings.type !== 'bass') {
            this._addTrigger();        
        }
    }

    _setEventBindings () {
        if (this.key !== 0) {
            document.addEventListener('keypress', function (e) {
                if (e.keyCode === this.key) {
                    this.sound.play();
                }
            })
        }
    }



    _addStrip () {
        this.strip = document.createElement('article');
        this.strip.setAttribute('id', this.channelName);
        this.strip.setAttribute('class', 'channel-strip');

        this.mixer.appendChild(this.strip);
    }

    _addSettings () {
        let setting,
        	theSetting;

        for (setting in this.settings) {
            if (this.settings.hasOwnProperty(setting)) {
            	theSetting = this.settings[setting]; 
                if (theSetting.type === 'knob') {
                    this._addTitle(theSetting.name);
                    this._addKnob(theSetting.values, setting);
                }
                if (theSetting.type === 'switch') {
                    this._addTitle(theSetting.name);
                    this._addSwitch(theSetting, setting);
                }
                if (theSetting.type === 'separator') {
                    this._addSeparator();
                }
                if (theSetting.type === 'radio') {
                    this._addRadio();
                }
                if (theSetting.type === 'radiogroup') {
                    this._addTitle(theSetting.name);
                    this._addRadioGroup(theSetting, setting);
                }
            }
        }
    }

    _addTitle (name) {
        let title   = document.createElement('h4');
        title.textContent = uFirst(name);
        this.strip.appendChild(title);
    }

    _addKnob (settings, index) {
        let knob = document.createElement('span'),
            id = this.channelName + '-' + index;

        knob.id = id;
        knob.classList.add('knob');

        this.strip.appendChild(knob);

        this.knobs[id] = new NpKnob(id, settings);
        this.knobs[id].obj.addEventListener('knob-rotate', (evt) => {
            this.sound[index] = evt.detail.value;
        });
    }

    /**
     * Adding a switch. It's just a checkbox
     *
     * @param {Object} settings Switch settings
     * @param {Number} index    The Id
     */
    _addSwitch (settings, index) {
        let theSwitch,
        	theLabel,
        	id = this.channelName + '-' + index,
            switchWrapper = document.createElement('span');
        switchWrapper.classList.add('switch-wrapper');

        theSwitch = document.createElement('input');
        theSwitch.setAttribute('type', 'checkbox');
        theSwitch.classList.add('switch');
        theSwitch.id = id;

        theLabel = document.createElement('label');
        theLabel.setAttribute('for', id);

        if (settings.value) {
            theSwitch.checked = true;
        }

        switchWrapper.appendChild(theSwitch);
        switchWrapper.appendChild(theLabel);

        this.strip.appendChild(switchWrapper);

        theSwitch.addEventListener('change', () => {
            this.sound[index] = theSwitch.checked;
        });
    }

    /**
     * Add a radiogroup.
     *
     * @param {Array} settings  An array containg the radioa buttons
     * @param {Number} index    index of the channel
     */
    _addRadioGroup (settings, index) {
        let id = self.channelName + '-' + index,
            radio = [],
            label,
            i = 0,
            groupWrapper = document.createElement('span');

        groupWrapper.classList.add('multi-select');

        for (i; i < settings.values.length; i += 1) {
            radio[i] = document.createElement('input');
            radio[i].setAttribute('type', 'radio');
            radio[i].setAttribute('name', index)
            radio[i].classList.add(settings.values[i]);
            radio[i].id = settings.values[i];  

            label = document.createElement('label');
            label.setAttribute('for', settings.values[i]); 

            groupWrapper.appendChild(radio[i]);
            groupWrapper.appendChild(label);         
        }
        this.strip.appendChild(groupWrapper);

        for (i = 0; i < radio.length; i += 1 ) {
            radio[i].addEventListener('click', () => {
                if (this.checked) {
                    this.sound[index] = this.getAttribute('class');                
                }
            });
        }
    }

 	/**
 	 * The radio will function as an idicator if the channel is triggered
 	 */
    _addRadio () {
        let led = document.createElement('input'),
        	label = document.createElement('label');

        label.setAttribute('for', 'led-' + this.channelName);

        led.setAttribute('type', 'radio');
        led.id = 'led-' + this.channelName;

        this.strip.appendChild(led);
        this.strip.appendChild(label);
    }

    /**
     * Add a seperatir in your channelstrip
     */
    _addSeparator () {
        let separator = document.createElement('hr');
        this.strip.appendChild(separator);
    }

    /**
     * Add a button to trigger the sound of the channelstrip
     */
    _addTrigger () {
        let id = self.channelName + '-trigger',
            trigger = document.createElement('button');

        this.strip.appendChild(trigger);

        trigger.id = id;
        trigger.classList.add('trigger', 'button');
        trigger.textContent = uFirst(this.channelName);
        trigger.addEventListener('click', () => {
            this.sound.play();
        });
    }

    setStep (id, value) {
    	this.steps[id] = value;
    }

    getStep (id) {
        return this.steps[id];
    }

    getSteps() {
        return this.steps;
    }

    setSound () {
        this.sound.getFile();
    }

    trigger (position) {
        if (this.steps[position]) {
            this.sound.play(this.steps[position]);
            document.getElementById('led-' + this.channelName).checked = true;
        } else {
            document.getElementById('led-' + this.channelName).checked = false;

        }
    }
}