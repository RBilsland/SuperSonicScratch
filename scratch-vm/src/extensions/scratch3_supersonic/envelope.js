/**
 * Fit Sonic Pi-style envelope times to a wall-clock beat length (scsynth uses seconds).
 * Style preset attack/decay/sustain values are treated as relative weights, not fixed seconds.
 */

const ENVELOPE_TIME_KEYS = new Set(['attack', 'decay', 'sustain', 'release']);

/** Max share of the beat used for attack + decay + sustain (the fade “ring” uses the rest). */
const MAX_ADS_FRACTION = 0.22;

/** At least this fraction of the beat is reserved for the release (fade-out) phase. */
const MIN_RELEASE_FRACTION = 0.68;

const MIN_RELEASE_SECONDS = 0.01;

/**
 * How much longer the sound rings than the written beat (legato overlap into the next note).
 * Scratch still waits one beat before the next play note; only the fade extends past that.
 */
const LEGATO_TAIL_BEATS = 0.35;

/**
 * Total ring time for a note: beat length plus legato, capped so fast notes do not pile up synths.
 * @param {number} beatSeconds - written beat length in seconds.
 * @param {function(number): number} beatsToSeconds - convert beats to seconds at current BPM.
 * @returns {number}
 */
function ringSecondsForBeat (beatSeconds, beatsToSeconds) {
    const legato = beatsToSeconds(LEGATO_TAIL_BEATS);
    return beatSeconds + Math.min(legato, beatSeconds);
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
 * Map style attack/decay/sustain weights into seconds that fit inside beatSeconds.
 * @param {number} attackWeight
 * @param {number} decayWeight
 * @param {number} sustainWeight
 * @param {number} envelopeSeconds - total synth envelope length in seconds (may exceed beat grid).
 * @returns {{attack: number, decay: number, sustain: number, release: number}}
 */
function fitEnvelopeToBeat (attackWeight, decayWeight, sustainWeight, envelopeSeconds) {
    const total = Math.max(envelopeSeconds, MIN_RELEASE_SECONDS);
    const wA = Math.max(Number(attackWeight) || 0, 0);
    const wD = Math.max(Number(decayWeight) || 0, 0);
    const wS = Math.max(Number(sustainWeight) || 0, 0);
    const sum = wA + wD + wS;

    if (sum <= 0) {
        return {attack: 0, decay: 0, sustain: 0, release: total};
    }

    const minRelease = Math.max(total * MIN_RELEASE_FRACTION, MIN_RELEASE_SECONDS);
    const maxAds = total - minRelease;

    // Style weights shape the front of the note; cap ADS so release can ring through most of the beat.
    const adsShare = Math.min(
        total * MAX_ADS_FRACTION,
        maxAds,
        total * (sum / (sum + 3))
    );
    let attack = (wA / sum) * adsShare;
    let decay = (wD / sum) * adsShare;
    let sustain = (wS / sum) * adsShare;
    let release = total - attack - decay - sustain;

    if (release < minRelease) {
        const adsTotal = attack + decay + sustain;
        if (adsTotal > 0) {
            const scale = (total - minRelease) / adsTotal;
            attack *= scale;
            decay *= scale;
            sustain *= scale;
        }
        release = minRelease;
    }

    return {attack, decay, sustain, release};
}

/**
 * Replace envelope times in control pairs to match envelopeSeconds (often slightly longer than the beat).
 * Preserves amp, filter, and other style params; keeps attack/decay/sustain character via ratios.
 * @param {Array.<string|number>} controls - style + other flat controls.
 * @param {number} envelopeSeconds - how long the synth should ring (seconds).
 * @returns {Array.<string|number>}
 */
function applyBeatLengthEnvelope (controls, envelopeSeconds) {
    const params = controlsToObject(controls);
    const env = fitEnvelopeToBeat(params.attack, params.decay, params.sustain, envelopeSeconds);

    for (const key of ENVELOPE_TIME_KEYS) {
        delete params[key];
    }

    return [
        ...objectToControls(params),
        'attack', env.attack,
        'decay', env.decay,
        'sustain', env.sustain,
        'release', env.release
    ];
}

module.exports = {
    LEGATO_TAIL_BEATS,
    applyBeatLengthEnvelope,
    fitEnvelopeToBeat,
    ringSecondsForBeat
};
