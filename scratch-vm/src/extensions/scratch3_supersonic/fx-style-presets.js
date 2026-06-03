/**
 * Per-FX style → SuperCollider control maps (gentle / normal / strong / wild).
 * Used by build-fx-manifest.js to generate fx-style-manifest.js.
 */

const G = 'gentle';
const N = 'normal';
const S = 'strong';
const W = 'wild';

/** @param {object} gentle @param {object} normal @param {object} strong @param {object} wild */
const four = (gentle, normal, strong, wild) => ({[G]: gentle, [N]: normal, [S]: strong, [W]: wild});

const phaseEcho = four(
    {phase: 0.5, decay: 1, max_phase: 2},
    {phase: 0.25, decay: 2, max_phase: 2},
    {phase: 0.125, decay: 4, max_phase: 4},
    {phase: 0.0625, decay: 8, max_phase: 8}
);

const lowpass = four(
    {cutoff: 90, res: 0.15},
    {cutoff: 72, res: 0.35},
    {cutoff: 52, res: 0.55},
    {cutoff: 36, res: 0.82}
);

const highpass = four(
    {cutoff: 45},
    {cutoff: 65},
    {cutoff: 88},
    {cutoff: 108}
);

const highpassRes = four(
    {cutoff: 45, res: 0.15},
    {cutoff: 65, res: 0.35},
    {cutoff: 88, res: 0.55},
    {cutoff: 108, res: 0.8}
);

const bandpass = four(
    {centre: 52, res: 0.12},
    {centre: 64, res: 0.3},
    {centre: 76, res: 0.55},
    {centre: 88, res: 0.82}
);

const phaseMod = (fast, slow) => four(
    {phase: slow, depth: 0.35},
    {phase: (slow + fast) / 2, depth: 0.5},
    {phase: fast, depth: 0.72},
    {phase: fast / 2, depth: 0.92}
);

/**
 * Style maps keyed by FX id (sonic-pi-fx_* suffix).
 * @type {Object.<string, object>}
 */
const FX_STYLE_PRESETS = {
    autotuner: four(
        {formant_ratio: 0.75},
        {formant_ratio: 1},
        {formant_ratio: 1.45},
        {formant_ratio: 2}
    ),
    band_eq: four(
        {low: 0, mid: 0, high: 0},
        {low: 0.15, mid: 0.1, high: 0.1},
        {low: 0.35, mid: 0.25, high: 0.2},
        {low: 0.55, mid: 0.4, high: 0.35}
    ),
    bitcrusher: four(
        {sample_rate: 22050, bits: 12, cutoff: 110},
        {sample_rate: 10000, bits: 8, cutoff: 90},
        {sample_rate: 4000, bits: 6, cutoff: 70},
        {sample_rate: 2000, bits: 4, cutoff: 50}
    ),
    bpf: bandpass,
    compressor: four(
        {thresh: 0.85, slope_above: 1.2, slope_below: 1},
        {thresh: 0.65, slope_above: 2, slope_below: 1},
        {thresh: 0.4, slope_above: 4, slope_below: 1},
        {thresh: 0.2, slope_above: 8, slope_below: 1}
    ),
    distortion: four(
        {distort: 0.2},
        {distort: 0.5},
        {distort: 0.75},
        {distort: 0.9}
    ),
    echo: phaseEcho,
    eq: four(
        {low: 0, mid: 0, high: 0},
        {low: 0.12, mid: 0.08, high: 0.08},
        {low: 0.28, mid: 0.18, high: 0.15},
        {low: 0.45, mid: 0.3, high: 0.25}
    ),
    flanger: four(
        {phase: 2, depth: 3, feedback: 0.15},
        {phase: 1, depth: 5, feedback: 0.35},
        {phase: 0.5, depth: 8, feedback: 0.6},
        {phase: 0.25, depth: 12, feedback: 0.85}
    ),
    gverb: four(
        {roomsize: 0.35, revtime: 1, damp: 0.4},
        {roomsize: 0.55, revtime: 2.5, damp: 0.35},
        {roomsize: 0.78, revtime: 5, damp: 0.28},
        {roomsize: 1, revtime: 8, damp: 0.2}
    ),
    hpf: highpass,
    ixi_techno: four(
        {time_dis: 0.08, phase_offset: 0},
        {time_dis: 0.05, phase_offset: 0.1},
        {time_dis: 0.03, phase_offset: 0.2},
        {time_dis: 0.015, phase_offset: 0.35}
    ),
    krush: four(
        {gain: 0.15},
        {gain: 0.35},
        {gain: 0.6},
        {gain: 0.85}
    ),
    level: four(
        {amp: 0.6},
        {amp: 1},
        {amp: 1.4},
        {amp: 2}
    ),
    lpf: four(
        {cutoff: 88},
        {cutoff: 72},
        {cutoff: 52},
        {cutoff: 36}
    ),
    mono: four(
        {amp: 0.7},
        {amp: 1},
        {amp: 1.2},
        {amp: 1.5}
    ),
    nbpf: bandpass,
    nhpf: highpass,
    nlpf: four(
        {cutoff: 88},
        {cutoff: 72},
        {cutoff: 52},
        {cutoff: 36}
    ),
    normaliser: four(
        {line: 0.55},
        {line: 0.7},
        {line: 0.85},
        {line: 0.98}
    ),
    nrbpf: bandpass,
    nrhpf: highpassRes,
    nrlpf: lowpass,
    octaver: four(
        {octave: 0, mix: 0.25},
        {octave: 0, mix: 0.4},
        {octave: 12, mix: 0.5},
        {octave: 12, mix: 0.7}
    ),
    pan: four(
        {pan: 0.2},
        {pan: 0.45},
        {pan: 0.75},
        {pan: 1}
    ),
    panslicer: four(
        {phase: 0.5, wave: 1},
        {phase: 0.25, wave: 1},
        {phase: 0.125, wave: 1},
        {phase: 0.0625, wave: 0}
    ),
    ping_pong: four(
        {phase: 0.5, feedback: 0.2, pan: 0.3},
        {phase: 0.25, feedback: 0.4, pan: 0.5},
        {phase: 0.125, feedback: 0.65, pan: 0.7},
        {phase: 0.0625, feedback: 0.85, pan: 1}
    ),
    pitch_shift: four(
        {pitch: 0},
        {pitch: 3},
        {pitch: 7},
        {pitch: 12}
    ),
    rbpf: bandpass,
    reverb: four(
        {room: 0.35, damp: 0.65},
        {room: 0.6, damp: 0.5},
        {room: 0.85, damp: 0.35},
        {room: 1, damp: 0.25}
    ),
    rhpf: highpassRes,
    ring_mod: four(
        {freq: 25},
        {freq: 45},
        {freq: 90},
        {freq: 180}
    ),
    rlpf: lowpass,
    slicer: four(
        {phase: 0.5, wave: 1, pulse_width: 0.5},
        {phase: 0.25, wave: 1, pulse_width: 0.5},
        {phase: 0.125, wave: 1, pulse_width: 0.35},
        {phase: 0.0625, wave: 0, pulse_width: 0.2}
    ),
    tanh: four(
        {preamp: 1, postamp: 0.8},
        {preamp: 2, postamp: 1},
        {preamp: 4, postamp: 1.2},
        {preamp: 8, postamp: 1.5}
    ),
    tremolo: phaseMod(1, 4),
    vowel: four(
        {voice: 0, vowel: 1},
        {voice: 0, vowel: 2},
        {voice: 0, vowel: 4},
        {voice: 0, vowel: 6}
    ),
    whammy: four(
        {disp: 0.08},
        {disp: 0.2},
        {disp: 0.45},
        {disp: 0.9}
    ),
    wobble: four(
        {phase: 1, cutoff_min: 70, cutoff_max: 100, res: 0.5},
        {phase: 0.5, cutoff_min: 55, cutoff_max: 110, res: 0.65},
        {phase: 0.25, cutoff_min: 40, cutoff_max: 115, res: 0.78},
        {phase: 0.125, cutoff_min: 30, cutoff_max: 120, res: 0.9}
    )
};

/** Fallback when a new FX appears in the package before presets are updated. */
const FX_STYLE_FALLBACK = phaseMod(0.5, 2);

module.exports = {
    FX_STYLE_PRESETS,
    FX_STYLE_FALLBACK
};
