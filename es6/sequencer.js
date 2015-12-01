'use strict';

class Sequencer {

    constructor() {
        this._setDefaults();
        this._setDomelements();
        this._createStatusbar();
        Object.keys(app.sounds).forEach(name => this._createSequence(name));
        this._setEventBindings();
        this.speedValue.value = this.speed;
        var self = this;
    }

    _setDefaults () {
        this.playing = false;
        this.steps = 32;
        this.position = this.steps -1;
        this.grid = 'drum';
        this.speed = 120;
        this.speedDail = new NpKnob('seq-speed');      
    }

    _setDomelements () {
        this.channels = document.querySelector('.channels'),
        this.sequencer = document.getElementById('sequencer'),
        this.bassline = document.getElementById('bassline'),
        this.startButton = document.getElementById('seq-start'),
        this.stopButton = document.getElementById('seq-stop'),
        this.gridButton = document.getElementById('toggle-grid'),
        this.bassButton = document.getElementById('toggle-bass'),
        this.connectToggle = document.getElementById('connect'),
        this.gridItems = document.getElementsByClassName('seq-step'),
        this.spinner = document.querySelector('.spinner');
        this.speedValue = document.getElementById('seq-speed-value');
    }


    start() {
        if (!this.playing) {
            this.startButton.classList.add('active');
            this.playing = true;
            this.sequence();
        }
    }

    stop() {
        this.startButton.classList.remove('active');
        this.playing = false;
    }

    ddpReconnect() {
        let ddp = app.get('ddp');
        /**
         * If we're not connected we don't need to reconnect
         */
        if (ddp.isConnected()) {
            this.spinner.classList.add('spinning');
            ddp.close();
            ddp.connect(
                this._ddpAdded,
                this._ddpChanged
            );
        }
    }

    sequence() {
        if (!this.playing) {
            return false;
        }

        this.position += 1;
        if (this.position === this.steps) {
            this.position = 0;
        }

        setTimeout(() => {
            let sound;
            document.getElementById('led-' + this.position).checked = true;
            for (sound in app.sounds) {
                if (app.sounds.hasOwnProperty(sound)) {
                    app.sounds[sound].trigger(this.position);
                }
            }
            this.sequence();
        }, 15000 / this.speed);
    }

    _createStatusbar() {
        let i = 0,
            row = document.createElement('div');

        row.classList.add('seq-step-leds');
        row.appendChild(this._createRowLabel(''));

        for (; i < this.steps; i +=1) {
            let label = document.createElement('label');
            label.setAttribute('for', 'led-' + i);

            let led = document.createElement('input');
            led.id = 'led-' + i;
            led.setAttribute('type', 'radio');
            led.setAttribute('name', 'step');
            led.classList.add('seq-led', 'led-' + i);

            row.appendChild(led);
            row.appendChild(label);
        }

        sequencer.appendChild(row);
    }

    _createSequence(name) {
        if (name === 'bass') { return false; }
        let i = 0,
            row = document.createElement('div');

        var triggers = app.sounds[name].getSteps();

        row.classList.add('seq-row');
        row.appendChild(this._createRowLabel(name));

        for (; i < this.steps; i += 1) {
            let label = document.createElement('label');
            label.setAttribute('for', name + '-' + i);

            row.appendChild(this._createStep(i, name, triggers[i]));
            row.appendChild(label);
        }

        sequencer.appendChild(row);
    }

    _createBassSequence() {
        let i = 0,
            triggers = app.sounds.bass.getSteps(),
            notes = app.sounds.bass.sound.getNotes();


        notes.forEach(note => {
            let row = document.createElement('div');
            row.classList.add('seq-row');
            row.appendChild(this._createRowLabel(note.name));

            for (; i < this.steps; i += 1) {
                var label = document.createElement('label');
                label.setAttribute('for', note.id + '-' + i);

                row.appendChild(this._createBassStep(i, triggers[i], note));
                row.appendChild(label);
            }

            sequencer.appendChild(row);
        });

    }

    _createRowLabel(name) {
        let label = document.createElement('label');
        label.textContent = uFirst(name);
        label.classList.add('title');

        return label;
    }

    _createStep(id, name, on) {
        let check = document.createElement('input');
        check.dataset.id = id;
        check.dataset.name = name;
        check.id = name + '-' + id;
        check.setAttribute('type', 'checkbox');
        check.classList.add('seq-step', 'step-' + id);

        check.addEventListener('change', this._toggleGridItem);

        if (on) {
            check.checked = true;
        }
        return check;
    }

    _createBassStep(id, value, note) {
        let check = document.createElement('input');
        check.dataset.id = id;
        check.dataset.freq = note.freq;
        check.classList.add('seq-step', 'step-' + id);
        check.id = note.id + '-' + id;
        check.setAttribute('type', 'radio');
        check.setAttribute('name', 'bass-' + id);

        check.addEventListener('click', this._setBassItem);

        if (note.freq == value) {
            check.checked = true;
        }
        return check;
    }

    _setBassItem() {
        if (app.sounds.bass.getStep(+this.dataset.id) === this.dataset.freq) {
            app.sounds.bass.setStep(+this.dataset.id, false);
            this.checked = false;
        } else {
            app.sounds.bass.setStep(+this.dataset.id, this.dataset.freq);
        }
    }

    _setSpeed(evt) {
        this.speed = Math.floor(evt.detail.value);
        this.speedValue.value = this.speed;
    }

    _toggleGrid() {
        if (this.sequencer.classList.contains('collapse')) {
            this.sequencer.classList.remove('collapse');
            this.channels.classList.add('collapse');
        } else {
            this.sequencer.classList.add('collapse');
            this.channels.classList.remove('collapse');
        }
    }

    _toggleBass() {
        let rows = document.querySelectorAll('.seq-row'),
            i = 0;

        if (grid === 'drum') {
            this.textContent = 'Drum';
            grid = 'bass';

            for (; i < rows.length; i += 1) {
                rows[i].remove();            
            }

            this._createBassSequence();
        } else {
            this.textContent = 'Bass';
            grid = 'drum';

            for (i; i < rows.length; i += 1) {
                rows[i].remove();            
            }

            Object.keys(app.sounds).forEach(this._createSequence);
        }
    }

    _toggleGridItem() {
        app.sounds[this.dataset.name].setStep(this.dataset.id, this.checked);
        app.get('ddp').call('click', [this.id, this.checked]);
    }

    _ddpChanged(id, oldFields, clearedFields, newFields) {
        element = document.getElementById(id);
        if (element.checked !== newFields.value) {
            element.click();
        }
    }

    _ddpAdded(id, newFields) {
        element = document.getElementById(id);
        if (element.checked !== newFields.value) {
            element.click();
        }
    }

    _toggleDdpConnection() {
        if (this.checked && !app.get('ddp').isConnected()) {
            this.spinner.classList.add('spinning');
            app.get('ddp').connect(
                this._ddpAdded,
                this._ddpChanged
            );
        }
        if (!this.checked && app.get('ddp').isConnected()) {
            app.get('ddp').close();
        }
    }

    _handleConnectionEvent(evt) {
        if (evt.detail.connected) {
            this.spinner.classList.remove('spinning');
        } else {
            this.spinner.classList.remove('spinning');
            if (this.connectToggle.checked) {
                this.connectToggle.checked = false;
            }
        }
        console.log(evt)
    }

    _setEventBindings() {
        var i = 0;
        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.stop());
        this.speedDail.obj.addEventListener('knob-rotate', evt => this._setSpeed(evt));
        this.gridButton.addEventListener('click', () => this._toggleGrid());
        this.bassButton.addEventListener('click', () => this._toggleBass());

        for (; i < this.gridItems.length; i += 1) {
            this.gridItems[i].addEventListener('change', this._toggleGridItem);
        }
        this.connectToggle.addEventListener('change', this._toggleDdpConnection);

        document.querySelector('body').addEventListener('ddp-connected', this._handleConnectionEvent)
    }
};
