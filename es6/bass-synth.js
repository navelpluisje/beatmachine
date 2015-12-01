'use strict';

class BassSynth {

	constructor () {
		this.gainNode;
        this.oscillator;
        this.distortion;
        this.waveArray;
        this.notes = [
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
	    this.bassGain = .7;
	    this.bassAttack = 10;
	    this.bassRelease = 10;
	    this.bassLength = 1;
	    this.bassDistortion = 0;
	    this.bassWaveForm = 'triangle';

	    this._startSynth();
	    this._createADSR()
	}

	/**
     * Start the osscilator. This wil run continuous.
     *
     * @return {void}
     */
    _startSynth () {
        this.gainNode = app.ac.createGain();
        this.oscillator = app.ac.createOscillator();
        this.distortion = app.ac.createWaveShaper();

        this.oscillator.connect(this.distortion);
        this.distortion.connect(this.gainNode);
        this.gainNode.connect(app.ac.destination);
        this.oscillator.start(0);
        this.gainNode.gain.value = 0;
        this._setDistortionCurve();
    }

    _createAttackValue (step) {
    	let steps = +this.bassAttack;

        if (steps === 1 && step === 0) {
            return this.bassGain;
        } 
        if (step === 0) {
            return 0;
        } 
        return (this.bassGain / (steps - 1)) * step;
    }

    _createReleaseValue (step) {
    	let steps = +this.bassRelease;
    	step -= +this.bassAttack;

        if (steps === 1 && step === 0) {
            return 0;
        } 
        if (step === 0) {
            return this.bassGain;
        } 
        return this.bassGain - (this.bassGain / (steps - 1)) * step;
    }

    _createADSR () {
        let length = +this.bassAttack + +this.bassRelease,
        	i = 0, 
        	newArray = new Float32Array(length);

        for (i; i < length; i += 1) {
            if (i < +this.bassAttack) {
                newArray[i] = this._createAttackValue(i); 
            } else {
                newArray[i] = this._createReleaseValue(i);
            }
        }

        this.waveArray = newArray;
    }

    _setDistortionCurve () {
    	let k = this.bassDistortion,
	    	n_samples = 44100,
    		curve = new Float32Array(n_samples),
    		deg = Math.PI / 180,
    		i = 0,
    		x;

    	for (i; i < n_samples; i += 1) {
    		x = i * 2 / n_samples - 1;
    		curve[i] = ( 3 + k ) * x * 10 * deg / ( Math.PI + k * Math.abs(x) );
    	}

    	this.distortion.curve = curve;
    	this.distortion.oversample = 'none';
    };

    playSound (freq) {
    	if (freq < 15) {
    		freq = +this.notes[freq].freq;
    	}
        this.oscillator.frequency.value = freq;
        this.gainNode.gain.setValueCurveAtTime(this.waveArray, app.ac.currentTime + 0.02, this.bassLength + 1);
    }

    set waveForm (wave) {
    	this.bassWaveForm = wave;
    	this.oscillator.type = wave;
    }

    set atttack (attack) {
    	this.bassAttack = attack;
    	this._createADSR();
    }

    set release (release) {
    	this.bassRelease = release;
    	this._createADSR();
    }

    set duration (length) {
    	this.bassLength = length;
    }

    set distortionAmount (amount) {
    	amount = amount || 0;
    	this.bassDistortion = amount;
    	this._setDistortionCurve();
    }
}