var Sequencer;
Sequencer = function () {
    var playing = false,
        steps = 32,
        position = steps -1,
        channels = document.querySelector('.channels'),
        sequencer = document.getElementById('sequencer'),
        startButton = document.getElementById('seq-start'),
        stopButton = document.getElementById('seq-stop'),
        gridButton = document.getElementById('toggle-grid'),
        gridItems = document.getElementsByClassName('seq-step'),
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

    function _createStep(id, name) {
        var check = document.createElement('input');
        check.dataset.id = id;
        check.dataset.name = name;
        check.setAttribute('id', name + '-' + id );
        check.setAttribute('type', 'checkbox');
        check.setAttribute('class', 'seq-step step-' + id);

        return check;
    }

    function _createSequence(name) {
        var i = 0,
            row = document.createElement('div');
        row.setAttribute('class', 'seq-row');

        for (; i < steps; i += 1) {
            var label = document.createElement('label');
            label.setAttribute('for', name + '-' + i);

            row.appendChild(_createStep(i, name));
            row.appendChild(label);
        }

        sequencer.appendChild(row);
    }

    function _createStatusbar() {
        var i = 0,
            row = document.createElement('div');

        row.setAttribute('class', 'seq-step-leds');

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

    function _toggleGridItem() {
        app.sounds[this.dataset.name].setStep(this.dataset.id, this.checked);
    }

    function _setEventBindings() {
        var i = 0;
        startButton.addEventListener('click', start);
        stopButton.addEventListener('click', stop);
        speedDail.obj.addEventListener('knob-rotate', _setSpeed);
        gridButton.addEventListener('click', _toggleGrid);
        for (; i < gridItems.length; i += 1) {
            gridItems[i].addEventListener('change', _toggleGridItem);
        }
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
        stop: stop
    }
};
