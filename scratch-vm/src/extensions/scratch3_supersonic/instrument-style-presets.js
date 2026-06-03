/**
 * Per-instrument style → SuperCollider control maps (gentle / normal / strong / wild).
 * Used by build-instruments-manifest.js to generate instrument-style-manifest.js.
 */

const G = 'gentle';
const N = 'normal';
const S = 'strong';
const W = 'wild';

/** @param {object} gentle @param {object} normal @param {object} strong @param {object} wild */
const four = (gentle, normal, strong, wild) => ({[G]: gentle, [N]: normal, [S]: strong, [W]: wild});

const envelope = four(
    { attack: 0.04, decay: 0.12, sustain: 0.35, pan: 0},
    { attack: 0.02, decay: 0.08, sustain: 0.5, pan: 0},
    { attack: 0.01, decay: 0.04, sustain: 0.65, pan: 0},
    { attack: 0, decay: 0.02, sustain: 0.8, pan: 0}
);

const filtered = four(
    { attack: 0.02, decay: 0.1, sustain: 0.4, cutoff: 95, res: 0.12, pan: 0},
    { attack: 0.01, decay: 0.06, sustain: 0.55, cutoff: 80, res: 0.32, pan: 0},
    { attack: 0.005, decay: 0.03, sustain: 0.68, cutoff: 58, res: 0.58, pan: 0},
    { attack: 0, decay: 0.015, sustain: 0.78, cutoff: 38, res: 0.85, pan: 0}
);

const modFiltered = four(
    { attack: 0.02, decay: 0.1, sustain: 0.4, cutoff: 95, res: 0.12, mod_phase: 1, mod_range: 6},
    { attack: 0.01, decay: 0.06, sustain: 0.55, cutoff: 80, res: 0.32, mod_phase: 0.5, mod_range: 12},
    { attack: 0.005, decay: 0.03, sustain: 0.68, cutoff: 58, res: 0.58, mod_phase: 0.25, mod_range: 18},
    { attack: 0, decay: 0.015, sustain: 0.78, cutoff: 38, res: 0.85, mod_phase: 0.125, mod_range: 24}
);

const fm = four(
    { attack: 0.02, decay: 0.1, sustain: 0.4, cutoff: 95, divisor: 1.5, depth: 0.6},
    { attack: 0.01, decay: 0.06, sustain: 0.55, cutoff: 80, divisor: 2, depth: 1},
    { attack: 0.005, decay: 0.03, sustain: 0.68, cutoff: 60, divisor: 3, depth: 1.8},
    { attack: 0, decay: 0.015, sustain: 0.78, cutoff: 42, divisor: 5, depth: 3}
);

const modFm = four(
    { attack: 0.02, decay: 0.1, sustain: 0.4, cutoff: 95, divisor: 1.5, depth: 0.6, mod_phase: 1, mod_range: 6},
    { attack: 0.01, decay: 0.06, sustain: 0.55, cutoff: 80, divisor: 2, depth: 1, mod_phase: 0.5, mod_range: 12},
    { attack: 0.005, decay: 0.03, sustain: 0.68, cutoff: 60, divisor: 3, depth: 1.8, mod_phase: 0.25, mod_range: 18},
    { attack: 0, decay: 0.015, sustain: 0.78, cutoff: 42, divisor: 5, depth: 3, mod_phase: 0.125, mod_range: 24}
);

const tb303 = four(
    { attack: 0.01, decay: 0.08, sustain: 0.35, cutoff: 100, cutoff_min: 50, res: 0.5},
    { attack: 0.005, decay: 0.05, sustain: 0.5, cutoff: 85, cutoff_min: 40, res: 0.75},
    { attack: 0, decay: 0.03, sustain: 0.65, cutoff: 70, cutoff_min: 30, res: 0.9},
    { attack: 0, decay: 0.02, sustain: 0.75, cutoff: 55, cutoff_min: 25, res: 0.98}
);

const bass = four(
    { attack: 0.02, decay: 0.12, sustain: 0.45, cutoff: 70, res: 0.2},
    { attack: 0.01, decay: 0.08, sustain: 0.6, cutoff: 55, res: 0.4},
    { attack: 0.005, decay: 0.04, sustain: 0.72, cutoff: 42, res: 0.65},
    { attack: 0, decay: 0.02, sustain: 0.82, cutoff: 32, res: 0.88}
);

const chip = four(
    { attack: 0.01, decay: 0.06, sustain: 0.35, note_resolution: 0.1},
    { attack: 0.005, decay: 0.04, sustain: 0.5, note_resolution: 0.05},
    { attack: 0, decay: 0.02, sustain: 0.65, note_resolution: 0.02},
    { attack: 0, decay: 0.01, sustain: 0.78, note_resolution: 0.01}
);

const chiplead = four(
    { attack: 0.01, decay: 0.06, sustain: 0.35, width: 0.2, note_resolution: 0.1},
    { attack: 0.005, decay: 0.04, sustain: 0.5, width: 0.35, note_resolution: 0.05},
    { attack: 0, decay: 0.02, sustain: 0.65, width: 0.55, note_resolution: 0.02},
    { attack: 0, decay: 0.01, sustain: 0.78, width: 0.75, note_resolution: 0.01}
);

const noise = four(
    { attack: 0.02, decay: 0.15, sustain: 0.2, cutoff: 90, res: 0.1},
    { attack: 0.01, decay: 0.1, sustain: 0.35, cutoff: 75, res: 0.28},
    { attack: 0.005, decay: 0.05, sustain: 0.5, cutoff: 55, res: 0.55},
    { attack: 0, decay: 0.02, sustain: 0.65, cutoff: 35, res: 0.82}
);

const piano = four(
    { attack: 0.01, decay: 0.2, sustain: 0.3, vel: 0.6, hard: 0.25, stereo_width: 0.3},
    { attack: 0.005, decay: 0.15, sustain: 0.45, vel: 0.8, hard: 0.45, stereo_width: 0.5},
    { attack: 0.002, decay: 0.1, sustain: 0.58, vel: 1, hard: 0.7, stereo_width: 0.75},
    { attack: 0, decay: 0.06, sustain: 0.7, vel: 1, hard: 0.9, stereo_width: 1}
);

/** Rhodey backend for menu “piano” — sustained envelope, soft mix, slow LFO (not plucked/beep). */
const pianoPlayback = four(
    { attack: 0.002, decay: 0.3, sustain: 0.45, vel: 0.65, mod_index: 0.35, mix: 0.65, lfo_rate: 0.3, sustain_level: 0.85},
    { attack: 0.001, decay: 0.25, sustain: 0.55, vel: 0.8, mod_index: 0.45, mix: 0.72, lfo_rate: 0.4, sustain_level: 0.9},
    { attack: 0.001, decay: 0.18, sustain: 0.65, vel: 0.95, mod_index: 0.55, mix: 0.78, lfo_rate: 0.5, sustain_level: 0.95},
    { attack: 0, decay: 0.12, sustain: 0.75, vel: 1, mod_index: 0.65, mix: 0.85, lfo_rate: 0.55, sustain_level: 1}
);

const rhodey = four(
    { attack: 0.02, decay: 0.12, sustain: 0.4, vel: 0.6, mod_index: 0.4, mix: 0.35, lfo_rate: 2},
    { attack: 0.01, decay: 0.08, sustain: 0.55, vel: 0.85, mod_index: 0.65, mix: 0.5, lfo_rate: 4},
    { attack: 0.005, decay: 0.04, sustain: 0.68, vel: 1, mod_index: 0.9, mix: 0.65, lfo_rate: 6},
    { attack: 0, decay: 0.02, sustain: 0.78, vel: 1, mod_index: 1.2, mix: 0.8, lfo_rate: 10}
);

const pluck = four(
    { attack: 0.001, decay: 0.25, sustain: 0.1, pluck_decay: 6, noise_amp: 0.15},
    { attack: 0.001, decay: 0.18, sustain: 0.2, pluck_decay: 10, noise_amp: 0.25},
    { attack: 0, decay: 0.12, sustain: 0.3, pluck_decay: 16, noise_amp: 0.4},
    { attack: 0, decay: 0.08, sustain: 0.4, pluck_decay: 24, noise_amp: 0.6}
);

const kalimba = four(
    { attack: 0.001, decay: 0.2, sustain: 0.15, clickiness: 0.15},
    { attack: 0.001, decay: 0.14, sustain: 0.25, clickiness: 0.3},
    { attack: 0, decay: 0.1, sustain: 0.35, clickiness: 0.5},
    { attack: 0, decay: 0.06, sustain: 0.45, clickiness: 0.75}
);

const organ = four(
    { attack: 0.03, decay: 0.15, sustain: 0.5, bass: 0.6, fundamental: 0.7},
    { attack: 0.02, decay: 0.1, sustain: 0.6, bass: 0.75, fundamental: 0.85},
    { attack: 0.01, decay: 0.06, sustain: 0.72, bass: 0.9, fundamental: 1},
    { attack: 0.005, decay: 0.03, sustain: 0.82, bass: 1, fundamental: 1.1}
);

const darkAmbience = four(
    { attack: 0.2, decay: 0.4, sustain: 0.6, cutoff: 70, res: 0.2, room: 0.4, reverb_time: 2},
    { attack: 0.15, decay: 0.3, sustain: 0.65, cutoff: 60, res: 0.35, room: 0.6, reverb_time: 4},
    { attack: 0.1, decay: 0.2, sustain: 0.72, cutoff: 48, res: 0.55, room: 0.8, reverb_time: 6},
    { attack: 0.05, decay: 0.12, sustain: 0.8, cutoff: 35, res: 0.78, room: 1, reverb_time: 10}
);

const zawa = four(
    { attack: 0.02, decay: 0.1, sustain: 0.4, cutoff: 90, res: 0.2, phase: 1, range: 8},
    { attack: 0.01, decay: 0.06, sustain: 0.55, cutoff: 75, res: 0.4, phase: 0.5, range: 14},
    { attack: 0.005, decay: 0.03, sustain: 0.68, cutoff: 58, res: 0.62, phase: 0.25, range: 20},
    { attack: 0, decay: 0.015, sustain: 0.78, cutoff: 40, res: 0.85, phase: 0.125, range: 28}
);

const blade = four(
    { attack: 0.02, decay: 0.1, sustain: 0.4, cutoff: 90, vibrato_rate: 4, vibrato_depth: 0.15},
    { attack: 0.01, decay: 0.06, sustain: 0.55, cutoff: 75, vibrato_rate: 6, vibrato_depth: 0.3},
    { attack: 0.005, decay: 0.03, sustain: 0.68, cutoff: 58, vibrato_rate: 9, vibrato_depth: 0.55},
    { attack: 0, decay: 0.015, sustain: 0.78, cutoff: 40, vibrato_rate: 14, vibrato_depth: 0.85}
);

const gabberkick = four(
    { attack: 0, decay: 0.08, sustain: 0.2, cutoff: 80, res: 0.3, boost: 0.2},
    { attack: 0, decay: 0.05, sustain: 0.3, cutoff: 65, res: 0.5, boost: 0.45},
    { attack: 0, decay: 0.03, sustain: 0.4, cutoff: 50, res: 0.72, boost: 0.75},
    { attack: 0, decay: 0.02, sustain: 0.5, cutoff: 38, res: 0.9, boost: 1}
);

const sc808 = four(
    { decay: 0.25},
    { decay: 0.18},
    { decay: 0.12},
    { decay: 0.06}
);

// hpf/lpf are MIDI note cutoffs (0–130), not Hz — see Sonic Pi SC808ClosedHihat defaults.
const sc808Hat = four(
    { decay: 0.42, hpf: 121, lpf: 121},
    { decay: 0.35, hpf: 120, lpf: 120},
    { decay: 0.25, hpf: 119, lpf: 115},
    { decay: 0.15, hpf: 118, lpf: 107}
);

const sc808Maracas = four(
    { decay: 0.08, hpf: 113, click: 0.8},
    { decay: 0.1, hpf: 113, click: 1},
    { decay: 0.14, hpf: 112, click: 1},
    { decay: 0.2, hpf: 110, click: 1}
);

const sc808Snare = four(
    { decay: 0.2, mix: 0.35, click: 0.2},
    { decay: 0.14, mix: 0.5, click: 0.35},
    { decay: 0.09, mix: 0.65, click: 0.55},
    { decay: 0.05, mix: 0.85, click: 0.8}
);

const player = four(
    {},
    {},
    {},
    {}
);

const FAMILIES = {
    envelope,
    filtered,
    modFiltered,
    fm,
    modFm,
    tb303,
    bass,
    chip,
    chiplead,
    noise,
    piano,
    pianoPlayback,
    rhodey,
    pluck,
    kalimba,
    organ,
    darkAmbience,
    zawa,
    blade,
    gabberkick,
    sc808,
    sc808Hat,
    sc808Maracas,
    sc808Snare,
    player
};

/** Instrument id (without sonic-pi- prefix) → preset family name. */
const INSTRUMENT_FAMILY = {
    bass_foundation: 'bass',
    bass_highend: 'bass',
    beep: 'envelope',
    blade: 'blade',
    bnoise: 'noise',
    chipbass: 'chip',
    chiplead: 'chiplead',
    chipnoise: 'noise',
    cnoise: 'noise',
    dark_ambience: 'darkAmbience',
    dpulse: 'filtered',
    dsaw: 'filtered',
    dtri: 'filtered',
    dull_bell: 'envelope',
    fm: 'fm',
    gabberkick: 'gabberkick',
    gnoise: 'noise',
    growl: 'filtered',
    hollow: 'filtered',
    hoover: 'filtered',
    kalimba: 'kalimba',
    mod_dsaw: 'modFiltered',
    mod_fm: 'modFm',
    mod_pulse: 'modFiltered',
    mod_saw: 'modFiltered',
    mod_sine: 'modFiltered',
    mod_tri: 'modFiltered',
    mono_player: 'player',
    noise: 'noise',
    organ_tonewheel: 'organ',
    // piano synthdef needs MdaPiano (not in browser WASM); playback aliases to rhodey in instrument-controls.js
    piano: 'pianoPlayback',
    pluck: 'pluck',
    pnoise: 'noise',
    pretty_bell: 'envelope',
    prophet: 'filtered',
    pulse: 'filtered',
    rhodey: 'rhodey',
    rodeo: 'filtered',
    saw: 'filtered',
    sc808_bassdrum: 'sc808',
    sc808_clap: 'sc808',
    sc808_claves: 'sc808',
    sc808_closed_hihat: 'sc808Hat',
    sc808_congahi: 'sc808',
    sc808_congalo: 'sc808',
    sc808_congamid: 'sc808',
    sc808_cowbell: 'sc808',
    sc808_cymbal: 'sc808',
    sc808_maracas: 'sc808Maracas',
    sc808_open_hihat: 'sc808Hat',
    sc808_rimshot: 'sc808Snare',
    sc808_snare: 'sc808Snare',
    sc808_tomhi: 'sc808',
    sc808_tomlo: 'sc808',
    sc808_tommid: 'sc808',
    square: 'filtered',
    stereo_player: 'player',
    subpulse: 'filtered',
    supersaw: 'filtered',
    tb303: 'tb303',
    tech_saws: 'filtered',
    tri: 'filtered',
    zawa: 'zawa'
};

const INSTRUMENT_STYLE_PRESETS = {};
for (const [id, family] of Object.entries(INSTRUMENT_FAMILY)) {
    INSTRUMENT_STYLE_PRESETS[id] = FAMILIES[family];
}

/** Fallback when a new instrument appears in the package before presets are updated. */
const INSTRUMENT_STYLE_FALLBACK = filtered;

module.exports = {
    INSTRUMENT_FAMILY,
    INSTRUMENT_STYLE_PRESETS,
    INSTRUMENT_STYLE_FALLBACK
};
