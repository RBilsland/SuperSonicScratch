/**
 * Map style presets to flat OSC controls for play note, per synth family.
 */

const {applyBeatLengthEnvelope} = require('./envelope');
const {instrumentIdFromSynthdef} = require('./instrument-style-manifest');

/**
 * Browser SuperSonic (WASM) is missing some Sonic Pi UGens. Map menu synthdefs to working alternatives.
 * sonic-pi-piano uses MdaPiano, which is not in the web build — rhodey is the closest playable substitute.
 */
const PLAYBACK_SYNTH_ALIASES = {
    'sonic-pi-piano': 'sonic-pi-rhodey'
};

const ENVELOPE_TIME_KEYS = new Set(['attack', 'decay', 'sustain', 'release']);

/** ADSR keys applied by applyBeatLengthEnvelope — not used as literal params on SC808. */
const ADSR_ENVELOPE_KEYS = new Set(['attack', 'sustain', 'release']);

/** SC808 drums: decay/hpf/lpf/mix/click are literal params, not ADSR weights. */
const SC808_INSTRUMENTS = new Set([
    'sc808_bassdrum',
    'sc808_clap',
    'sc808_claves',
    'sc808_closed_hihat',
    'sc808_congahi',
    'sc808_congalo',
    'sc808_congamid',
    'sc808_cowbell',
    'sc808_cymbal',
    'sc808_maracas',
    'sc808_open_hihat',
    'sc808_rimshot',
    'sc808_snare',
    'sc808_tomhi',
    'sc808_tomlo',
    'sc808_tommid'
]);

/** Envelope times in style presets are beats (Sonic Pi bpm_scale), not seconds. */
const BPM_ENVELOPE_INSTRUMENTS = new Set(['pluck', 'kalimba']);

const SAMPLE_PLAYER_INSTRUMENTS = new Set(['mono_player', 'stereo_player']);

/**
 * Synthdef actually sent to scsynth (after browser compatibility aliases).
 * @param {string} synthdefName - menu / use-instrument value.
 * @returns {string}
 */
function resolvePlaybackSynth (synthdefName) {
    return PLAYBACK_SYNTH_ALIASES[synthdefName] || synthdefName;
}

/**
 * @param {Array.<string|number>} controls - flat [key, value, ...] list.
 * @returns {Object.<string, *>}
 */
function controlsToObject (controls) {
    const out = {};
    if (!controls) {
        return out;
    }
    for (let i = 0; i < controls.length; i += 2) {
        out[controls[i]] = controls[i + 1];
    }
    return out;
}

/**
 * @param {Object.<string, *>} obj
 * @param {Set<string>} [omit]
 * @returns {Array.<string|number>}
 */
function objectToControls (obj, omit) {
    const out = [];
    for (const key of Object.keys(obj)) {
        if (omit && omit.has(key)) {
            continue;
        }
        out.push(key, obj[key]);
    }
    return out;
}

/**
 * Build flat OSC controls for play note from instrument style + amp.
 * @param {string} menuSynthdefName - selected instrument (before playback aliases).
 * @param {Array.<string|number>} styleControls - from instrumentStyleToControls().
 * @param {number} ampUnit - 0–1 amplitude.
 * @param {number} ringSeconds - synth ring time in seconds.
 * @param {number} bpm - current tempo.
 * @returns {Array.<string|number>}
 */
function buildPlayNoteControls (menuSynthdefName, styleControls, ampUnit, ringSeconds, bpm) {
    const menuId = instrumentIdFromSynthdef(menuSynthdefName);
    const params = controlsToObject(styleControls);

    if (menuId === 'piano') {
        return buildPianoPlaybackControls(params, ampUnit, ringSeconds, bpm);
    }

    const synthdefName = resolvePlaybackSynth(menuSynthdefName);
    const id = instrumentIdFromSynthdef(synthdefName);

    if (SAMPLE_PLAYER_INSTRUMENTS.has(id)) {
        return objectToControls({
            ...params,
            amp: ampUnit,
            sustain: -1,
            release: 0
        }, ENVELOPE_TIME_KEYS);
    }

    if (SC808_INSTRUMENTS.has(id)) {
        return objectToControls({...params, amp: ampUnit}, ADSR_ENVELOPE_KEYS);
    }

    if (BPM_ENVELOPE_INSTRUMENTS.has(id)) {
        const beatSeconds = 60 / Math.max(bpm, 1);
        const scaled = {...params, amp: ampUnit};
        if (typeof scaled.vel === 'number') {
            scaled.vel = Math.min(Math.max(scaled.vel, 0), 1);
        }
        for (const key of ENVELOPE_TIME_KEYS) {
            if (typeof scaled[key] === 'number') {
                scaled[key] *= beatSeconds;
            }
        }
        return objectToControls(scaled);
    }

    return applyBeatLengthEnvelope([...styleControls, 'amp', ampUnit], ringSeconds);
}

const MIN_RELEASE_SECONDS = 0.01;

/**
 * Piano menu item plays via rhodey; needs sustain_level and beat-scaled envelope, not plucked defaults.
 * @param {Object.<string, *>} params - style preset for the chosen level.
 * @param {number} ampUnit
 * @param {number} ringSeconds
 * @param {number} bpm
 * @returns {Array.<string|number>}
 */
function buildPianoPlaybackControls (params, ampUnit, ringSeconds, bpm) {
    const beatSeconds = 60 / Math.max(bpm, 1);
    const out = {
        amp: ampUnit,
        attack_level: 1,
        sustain_level: typeof params.sustain_level === 'number' ? params.sustain_level : 0.9,
        vel: Math.min(Math.max(params.vel ?? 0.8, 0), 1),
        mod_index: params.mod_index ?? 0.45,
        mix: params.mix ?? 0.7,
        lfo_rate: params.lfo_rate ?? 0.4
    };

    let adsTotal = 0;
    for (const key of ['attack', 'decay', 'sustain']) {
        if (typeof params[key] === 'number') {
            out[key] = params[key] * beatSeconds;
            adsTotal += out[key];
        }
    }

    out.release = Math.max(ringSeconds - adsTotal, MIN_RELEASE_SECONDS);
    return objectToControls(out);
}

module.exports = {
    BPM_ENVELOPE_INSTRUMENTS,
    PLAYBACK_SYNTH_ALIASES,
    SAMPLE_PLAYER_INSTRUMENTS,
    SC808_INSTRUMENTS,
    buildPlayNoteControls,
    instrumentIdFromSynthdef,
    resolvePlaybackSynth
};
