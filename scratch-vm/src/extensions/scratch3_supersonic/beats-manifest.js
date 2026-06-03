/**
 * Standard note durations as beat lengths (crotchet = 1 beat in 4/4).
 * British names with common US names in the menu labels.
 */

const DURATION_DEFS = [
    {slug: 'semibreve', text: 'semibreve (whole)', beats: 4},
    {slug: 'dotted_semibreve', text: 'dotted semibreve', beats: 6},
    {slug: 'minim', text: 'minim (half)', beats: 2},
    {slug: 'dotted_minim', text: 'dotted minim', beats: 3},
    {slug: 'crotchet', text: 'crotchet (quarter)', beats: 1},
    {slug: 'dotted_crotchet', text: 'dotted crotchet', beats: 1.5},
    {slug: 'quaver', text: 'quaver (eighth)', beats: 0.5},
    {slug: 'dotted_quaver', text: 'dotted quaver', beats: 0.75},
    {slug: 'semiquaver', text: 'semiquaver (16th)', beats: 0.25},
    {slug: 'dotted_semiquaver', text: 'dotted semiquaver', beats: 0.375},
    {slug: 'demisemiquaver', text: 'demisemiquaver (32nd)', beats: 0.125}
];

const BEATS_BY_SLUG = {};
const DURATION_MENU_ITEMS = DURATION_DEFS.map(def => {
    BEATS_BY_SLUG[def.slug] = def.beats;
    return {text: def.text, value: def.slug};
});

const DEFAULT_DURATION = 'crotchet';
const DEFAULT_DURATION_BEATS = BEATS_BY_SLUG[DEFAULT_DURATION];

/** Aliases (US names, shorthand) → slug */
const SLUG_ALIASES = {
    whole: 'semibreve',
    half: 'minim',
    quarter: 'crotchet',
    eighth: 'quaver',
    sixteenth: 'semiquaver',
    '16th': 'semiquaver',
    '32nd': 'demisemiquaver',
    thirtysecond: 'demisemiquaver'
};

/**
 * Convert a duration slug, name, or numeric beat count to beats.
 * @param {*} beatArg - slug string, duration label, or number of beats.
 * @returns {number}
 */
function beatArgToBeats (beatArg) {
    if (beatArg === null || typeof beatArg === 'undefined') {
        return NaN;
    }
    if (typeof beatArg === 'number' && !Number.isNaN(beatArg)) {
        return beatArg;
    }
    const raw = String(beatArg).trim();
    if (!raw) {
        return NaN;
    }
    const asNumber = Number(raw);
    if (!Number.isNaN(asNumber) && raw.match(/^-?\d+(\.\d+)?$/)) {
        return asNumber;
    }
    const slug = raw.toLowerCase().replace(/\s+/g, '_');
    if (Object.prototype.hasOwnProperty.call(BEATS_BY_SLUG, slug)) {
        return BEATS_BY_SLUG[slug];
    }
    if (Object.prototype.hasOwnProperty.call(SLUG_ALIASES, slug)) {
        return BEATS_BY_SLUG[SLUG_ALIASES[slug]];
    }
    return NaN;
}

module.exports = {
    BEAT_RANGE: {min: 0.125, max: 100},
    DEFAULT_DURATION,
    DEFAULT_DURATION_BEATS,
    DURATION_MENU_ITEMS,
    beatArgToBeats
};
