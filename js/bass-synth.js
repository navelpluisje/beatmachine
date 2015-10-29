var BassSynth;

BassSynth = function () {
    var self = this,
        gainNode,
        oscillator,
        waveArray
        notes = [
            {freq:"65.41", "name": "C", "id": "c"},
            {freq:"69.30", "name": "C#", "id": "cc"},
            {freq:"73.42", "name": "D", "id": "d"},
            {freq:"77.78", "name": "D#", "id": "dd"},
            {freq:"82.41", "name": "E", "id": "e"},
            {freq:"87.31", "name": "F", "id": "f"},
            {freq:"92.50", "name": "F#", "id": "ff"},
            {freq:"98.00", "name": "G", "id": "g"},
            {freq:"103.83", "name": "G#", "id": "gg"},
            {freq:"110.00", "name": "A", "id": "a"},
            {freq:"116.54", "name": "A#", "id": "aa"},
            {freq:"123.47", "name": "B", "id": "b"}
        ];

    self.gain = .7;
    self.attack;
    self.release;
    self.length;
    self.waveForm;

    function set(key, value) {
        self[key] = value;
        if (key === 'attack' || key === 'release' || key === 'gain' ) {
            _createADSR();
        }
        if (key === 'waveForm') {
            oscillator.type = value;
        }
    }

    function getNotes() {
        return notes;
    }

    function _createAttackValue(step, steps) {
        if (steps === 1 && step === 0) {
            return self.gain;
        } 
        if (step === 0) {
            return 0;
        } 
        return (self.gain / (steps - 1)) * step;
    }

    function _createReleaseValue(step, steps) {
        if (steps === 1 && step === 0) {
            return 0;
        } 
        if (step === 0) {
            return self.gain;
        } 
        return self.gain - (self.gain / (steps - 1)) * step;
    }

    function _createADSR() {
        var valAttack = +self.attack,
        valRelease = +self.release,
        length = valAttack + valRelease,
        i = 0, 
        newArray = new Float32Array(length);

        for (i; i < length; i += 1) {
            if (i < valAttack) {
                newArray[i] = _createAttackValue(i, valAttack); 
            } else {
                newArray[i] = _createReleaseValue(i - valAttack, valRelease);
            }
        }

        waveArray = newArray;
    }

    function playSound(freq) {
        oscillator.frequency.value = freq;
        gainNode.gain.setValueCurveAtTime(waveArray, app.ac.currentTime + 0.02, self.length + 1);
    }

    /**
     * Start the osscilator. This wil run continuous.
     *
     * @return {void}
     */
    function _startSynth() {
        gainNode = app.ac.createGain();
        oscillator = app.ac.createOscillator();

        oscillator.connect(gainNode);
        gainNode.connect(app.ac.destination);
        oscillator.start(0);
        gainNode.gain.value = 0;
    }

    function _setEventBindings() {
        attack.addEventListener('change', _createADSR);
        release.addEventListener('change', _createADSR);
        gain.addEventListener('change', function() {
            self.gain = this.value;
        })
    }

    function _setInitialValues() {
        // attack = document.getElementById('attack');
        // release = document.getElementById('release');
        // waveForm = document.getElementById('waveform');
        // gain = document.getElementById('gain');
        // length = document.getElementById('length');

        self.attack = 2;
        self.release = 20;
        self.length = 1;
    }

    function init() {
        _setInitialValues();
        _startSynth();
    }

    init();

    return {
        set: set,
        play: playSound,
        getNotes: getNotes,
    }
}
