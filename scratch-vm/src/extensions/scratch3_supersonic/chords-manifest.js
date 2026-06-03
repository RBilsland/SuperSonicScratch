/**
 * Chord types, interval maps, and encoding for the chord reporter + play note.
 */

const {DEFAULT_NOTE_MIDI, noteArgToMidi} = require('./notes-manifest');

/** Prefix for chord values returned by the chord reporter (play note parses this). */
const CHORD_VALUE_PREFIX = 'ssc:';

const CHORD_TYPE_MENU_ITEMS = [
    {text: 'major', value: 'major'},
    {text: 'minor', value: 'minor'},
    {text: 'diminished', value: 'diminished'},
    {text: 'augmented', value: 'augmented'},
    {text: 'major 7', value: 'major7'},
    {text: 'minor 7', value: 'minor7'},
    {text: 'dominant 7', value: 'dominant7'},
    {text: 'sus2', value: 'sus2'},
    {text: 'sus4', value: 'sus4'},
    {text: 'power', value: 'power'},
    {text: 'half diminished', value: 'halfdim7'},
    {text: 'diminished 7', value: 'diminished7'}
];

const DEFAULT_CHORD_TYPE = 'major';

/** Semitone offsets from the root for each chord type. */
const CHORD_INTERVALS = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    diminished: [0, 3, 6],
    augmented: [0, 4, 8],
    major7: [0, 4, 7, 11],
    minor7: [0, 3, 7, 10],
    dominant7: [0, 4, 7, 10],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7],
    power: [0, 7],
    halfdim7: [0, 3, 6, 10],
    diminished7: [0, 3, 6, 9]
};

/**
 * @param {number} midi - MIDI note number.
 * @returns {number}
 */
function clampMidi (midi) {
    return Math.min(Math.max(Math.round(midi), 0), 127);
}

/**
 * @param {*} typeArg - chord type menu value.
 * @returns {number[]} semitone intervals from root.
 */
function chordTypeToIntervals (typeArg) {
    const key = String(typeArg || DEFAULT_CHORD_TYPE).trim().toLowerCase();
    return CHORD_INTERVALS[key] || CHORD_INTERVALS[DEFAULT_CHORD_TYPE];
}

/**
 * Build MIDI note numbers for a root and chord type.
 * @param {*} rootArg - note name or MIDI number.
 * @param {*} typeArg - chord type menu value.
 * @returns {number[]}
 */
function chordToMidiNotes (rootArg, typeArg) {
    let root = noteArgToMidi(rootArg);
    if (Number.isNaN(root)) {
        root = DEFAULT_NOTE_MIDI;
    }
    root = clampMidi(root);
    const intervals = chordTypeToIntervals(typeArg);
    const seen = new Set();
    const notes = [];
    for (const interval of intervals) {
        const midi = clampMidi(root + interval);
        if (!seen.has(midi)) {
            seen.add(midi);
            notes.push(midi);
        }
    }
    return notes.length > 0 ? notes : [root];
}

/**
 * Encode chord notes for the play note block (reporter return value).
 * @param {number[]} midiNotes - MIDI note numbers.
 * @returns {string}
 */
function encodeChordValue (midiNotes) {
    return CHORD_VALUE_PREFIX + midiNotes.join(',');
}

/**
 * Reporter value for chord [ROOT] type [TYPE].
 * @param {*} rootArg
 * @param {*} typeArg
 * @returns {string}
 */
function chordValueFromArgs (rootArg, typeArg) {
    return encodeChordValue(chordToMidiNotes(rootArg, typeArg));
}

/**
 * True if a play-note argument is an encoded chord from the chord reporter.
 * @param {*} noteArg
 * @returns {boolean}
 */
function isChordValue (noteArg) {
    return String(noteArg || '').trim().startsWith(CHORD_VALUE_PREFIX);
}

/**
 * Parse play note NOTE input: one MIDI note or a full chord.
 * @param {*} noteArg - MIDI number, note name, or encoded chord string.
 * @returns {number[]} MIDI notes to play (one or more).
 */
function parsePlayNoteArg (noteArg) {
    if (noteArg === null || typeof noteArg === 'undefined') {
        return [DEFAULT_NOTE_MIDI];
    }

    const raw = String(noteArg).trim();
    if (raw.startsWith(CHORD_VALUE_PREFIX)) {
        const body = raw.slice(CHORD_VALUE_PREFIX.length);
        if (!body) {
            return [DEFAULT_NOTE_MIDI];
        }
        const notes = body.split(',')
            .map(part => clampMidi(Number(part)))
            .filter(n => !Number.isNaN(n));
        return notes.length > 0 ? notes : [DEFAULT_NOTE_MIDI];
    }

    const midi = noteArgToMidi(noteArg);
    if (!Number.isNaN(midi)) {
        return [clampMidi(midi)];
    }
    return [DEFAULT_NOTE_MIDI];
}

/**
 * Scale amp so N simultaneous chord voices do not clip.
 * @param {number} amp - synth amp in 0–1.
 * @param {number} voiceCount - number of synths triggered at once.
 * @returns {number}
 */
function scaleAmpForVoices (amp, voiceCount) {
    if (voiceCount <= 1) {
        return amp;
    }
    return amp / voiceCount;
}

module.exports = {
    CHORD_TYPE_MENU_ITEMS,
    CHORD_VALUE_PREFIX,
    DEFAULT_CHORD_TYPE,
    chordToMidiNotes,
    chordTypeToIntervals,
    chordValueFromArgs,
    encodeChordValue,
    isChordValue,
    parsePlayNoteArg,
    scaleAmpForVoices
};
