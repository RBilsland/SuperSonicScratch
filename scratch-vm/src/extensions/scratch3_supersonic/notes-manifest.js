/**
 * Named notes (C3, F#4, …) for menus and note [NOTE] reporter blocks.
 */

const NOTE_LETTERS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/** Pitch class 0–11 for each letter name (incl. flats as aliases). */
const PITCH_CLASS = {
    C: 0,
    'C#': 1,
    DB: 1,
    D: 2,
    'D#': 3,
    EB: 3,
    E: 4,
    F: 5,
    'F#': 6,
    GB: 6,
    G: 7,
    'G#': 8,
    AB: 8,
    A: 9,
    'A#': 10,
    BB: 10,
    B: 11
};

const MIN_OCTAVE = 2;
const MAX_OCTAVE = 6;
const DEFAULT_NOTE = 'C4';

const NOTE_MENU_ITEMS = [];
for (let octave = MIN_OCTAVE; octave <= MAX_OCTAVE; octave++) {
    for (const letter of NOTE_LETTERS) {
        const name = `${letter}${octave}`;
        NOTE_MENU_ITEMS.push({text: name, value: name});
    }
}

/**
 * Convert a note name (e.g. C4, F#3) or MIDI number to a MIDI note number.
 * @param {*} noteArg - note name string or numeric MIDI value.
 * @returns {number} MIDI note 0–127, or NaN if invalid.
 */
function noteArgToMidi (noteArg) {
    if (noteArg === null || typeof noteArg === 'undefined') {
        return NaN;
    }
    if (typeof noteArg === 'number' && !Number.isNaN(noteArg)) {
        return Math.round(noteArg);
    }
    const raw = String(noteArg).trim();
    if (!raw) {
        return NaN;
    }
    const asNumber = Number(raw);
    if (!Number.isNaN(asNumber) && raw.match(/^-?\d+(\.\d+)?$/)) {
        return Math.round(asNumber);
    }
    const match = raw.trim().match(/^([A-Ga-g])([#b])?(\d+)$/);
    if (!match) {
        return NaN;
    }
    const letter = match[1].toUpperCase();
    const accidental = match[2];
    let key = letter;
    if (accidental === '#') {
        key = `${letter}#`;
    } else if (accidental === 'b') {
        key = `${letter}B`;
    }
    const octave = parseInt(match[3], 10);
    const pitch = PITCH_CLASS[key];
    if (typeof pitch === 'undefined') {
        return NaN;
    }
    return (octave + 1) * 12 + pitch;
}

const DEFAULT_NOTE_MIDI = noteArgToMidi(DEFAULT_NOTE);

module.exports = {
    DEFAULT_NOTE,
    DEFAULT_NOTE_MIDI,
    NOTE_MENU_ITEMS,
    noteArgToMidi,
    MIN_OCTAVE,
    MAX_OCTAVE
};
