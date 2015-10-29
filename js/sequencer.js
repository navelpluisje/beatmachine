var Sequencer;
Sequencer = function () {
    var playing = false,
        steps = 32,
        position = steps -1,
        grid = 'drum',
        channels = document.querySelector('.channels'),
        sequencer = document.getElementById('sequencer'),
        bassline = document.getElementById('bassline'),
        startButton = document.getElementById('seq-start'),
        stopButton = document.getElementById('seq-stop'),
        gridButton = document.getElementById('toggle-grid'),
        bassButton = document.getElementById('toggle-bass'),
        connectToggle = document.getElementById('connect'),
        gridItems = document.getElementsByClassName('seq-step'),
        spinner = document.querySelector('.spinner');
        speed = 120,
        speedDail  = new NpKnob('seq-speed'),
        speedValue = document.getElementById('seq-speed-value');

    function start() {
        if (!playing) {
            startButton.classList.add('active');
            playing = true;
            sequence();
        }
    }

    function stop() {
        startButton.classList.remove('active');
        playing = false;
    }

    function ddpReconnect() {
        var ddp = app.get('ddp');
        /**
         * If we're not connected we don't need to reconnect
         */
        if (ddp.isConnected()) {
            spinner.classList.add('spinning');
            ddp.close();
            ddp.connect(
                _ddpAdded,
                _ddpChanged
            );
        }
    }

    function sequence() {
        if (!playing) {
            return false;
        }

        position += 1;
        if (position === steps) {
            position = 0;
        }

        setTimeout(function () {
            var sound;
            document.getElementById('led-' + position).checked = true;
            for (sound in app.sounds) {
                if (app.sounds.hasOwnProperty(sound)) {
                    app.sounds[sound].trigger(position);
                }
            }
            sequence();
        }, 15000 / speed);
    }

    function _createStep(id, name, on) {
        var check = document.createElement('input');
        check.dataset.id = id;
        check.dataset.name = name;
        check.setAttribute('id', name + '-' + id );
        check.setAttribute('type', 'checkbox');
        check.setAttribute('class', 'seq-step step-' + id);

        check.addEventListener('change', _toggleGridItem);

        if (on) {
            check.checked = true;
        }
        return check;
    }

    function _setBassItem() {
        if (app.sounds.bass.getStep(+this.dataset.id) === this.dataset.freq) {
            app.sounds.bass.setStep(+this.dataset.id, false);
            this.checked = false;
        } else {
            app.sounds.bass.setStep(+this.dataset.id, this.dataset.freq);
        }
    }

    function _createBassStep(id, value, note) {
        var check = document.createElement('input');
        check.dataset.id = id;
        check.dataset.freq = note.freq;
        check.classList.add('seq-step', 'step-' + id);
        check.id = note.id + '-' + id;
        check.setAttribute('type', 'radio');
        check.setAttribute('name', 'bass-' + id);

        check.addEventListener('click', _setBassItem);

        if (note.freq == value) {
            check.checked = true;
        }
        return check;
    }

    function _createRowLabel(name) {
        var label = document.createElement('label');
        label.textContent = uFirst(name);
        label.classList.add('title');

        return label;
    }

    function _createSequence(name) {
        if (name === 'bass') { return false; }
        var i = 0,
            row = document.createElement('div'),
            triggers = app.sounds[name].getSteps();

        row.setAttribute('class', 'seq-row');
        row.appendChild(_createRowLabel(name));

        for (; i < steps; i += 1) {
            var label = document.createElement('label');
            label.setAttribute('for', name + '-' + i);

            row.appendChild(_createStep(i, name, triggers[i]));
            row.appendChild(label);
        }

        sequencer.appendChild(row);
    }

    function _createBassSequence() {
        var i = 0,
            triggers = app.sounds.bass.getSteps(),
            notes = app.sounds.bass.sound.getNotes();


        notes.forEach(function (note) {
            var row = document.createElement('div');
            row.setAttribute('class', 'seq-row');
            row.appendChild(_createRowLabel(note.name));

            for (i = 0; i < steps; i += 1) {
                var label = document.createElement('label');
                label.setAttribute('for', note.id + '-' + i);

                row.appendChild(_createBassStep(i, triggers[i], note));
                row.appendChild(label);
            }

            sequencer.appendChild(row);
        });

    }

    function _createStatusbar() {
        var i = 0,
            row = document.createElement('div');

        row.setAttribute('class', 'seq-step-leds');
        row.appendChild(_createRowLabel(''));

        for (; i < steps; i +=1) {
            var label = document.createElement('label');
            label.setAttribute('for', 'led-' + i);

            var led = document.createElement('input');
            led.setAttribute('id', 'led-' + i);
            led.setAttribute('type', 'radio');
            led.setAttribute('name', 'step');
            led.setAttribute('class', 'seq-led led-' + i);

            row.appendChild(led);
            row.appendChild(label);
        }

        sequencer.appendChild(row);
    }

    function _setSpeed(evt) {
        speed = Math.floor(evt.detail.value);
        speedValue.value = speed;
    }

    function _toggleGrid() {
        if (sequencer.classList.contains('collapse')) {
            sequencer.classList.remove('collapse');
            channels.classList.add('collapse');
        } else {
            sequencer.classList.add('collapse');
            channels.classList.remove('collapse');
        }
    }

    function _toggleBass() {
        var rows = document.querySelectorAll('.seq-row'),
            i = 0;

        if (grid === 'drum') {
            this.textContent = 'Drum';
            grid = 'bass';

            for (i; i < rows.length; i += 1) {
                rows[i].remove();            
            }

            _createBassSequence();
        } else {
            this.textContent = 'Bass';
            grid = 'drum';

            for (i; i < rows.length; i += 1) {
                rows[i].remove();            
            }

            Object.keys(app.sounds).forEach(_createSequence);
        }
    }

    function _toggleGridItem() {
        app.sounds[this.dataset.name].setStep(this.dataset.id, this.checked);
        app.get('ddp').call('click', [this.id, this.checked]);
    }

    function _ddpChanged(id, oldFields, clearedFields, newFields) {
        element = document.getElementById(id);
        if (element.checked !== newFields.value) {
            element.click();
        }
    }

    function _ddpAdded(id, newFields) {
        element = document.getElementById(id);
        if (element.checked !== newFields.value) {
            element.click();
        }
    }

    function _toggleDdpConnection() {
        if (this.checked && !app.get('ddp').isConnected()) {
            spinner.classList.add('spinning');
            app.get('ddp').connect(
                _ddpAdded,
                _ddpChanged
            );
        }
        if (!this.checked && app.get('ddp').isConnected()) {
            app.get('ddp').close();
        }
    }

    function _handleConnectionEvent(evt) {
        if (evt.detail.connected) {
            spinner.classList.remove('spinning');
        } else {
            spinner.classList.remove('spinning');
            if (connectToggle.checked) {
                connectToggle.checked = false;
            }
        }
        console.log(evt)
    }

    function _setEventBindings() {
        var i = 0;
        startButton.addEventListener('click', start);
        stopButton.addEventListener('click', stop);
        speedDail.obj.addEventListener('knob-rotate', _setSpeed);
        gridButton.addEventListener('click', _toggleGrid);
        bassButton.addEventListener('click', _toggleBass);

        for (; i < gridItems.length; i += 1) {
            gridItems[i].addEventListener('change', _toggleGridItem);
        }
        connectToggle.addEventListener('change', _toggleDdpConnection);

        document.querySelector('body').addEventListener('ddp-connected', _handleConnectionEvent)
    }

    function _init() {
        _createStatusbar();
        Object.keys(app.sounds).forEach(_createSequence);
        _setEventBindings();
        speedValue.value = speed;
    }

    _init();

    return {
        start: start,
        stop: stop,
        ddpReconnect: ddpReconnect
    }
};
