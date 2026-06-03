/**
 * English strings for SuperSonic extension blocks (format-message / scratch-l10n).
 * Keep in sync with getInfo() defaults in index.js and SAMPLE_BLOCK_DEFS.
 */
const {SAMPLE_BLOCK_DEFS} = require('./samples-manifest');

const messages = {
    'supersonic.categoryName': 'SuperSonic',
    'supersonic.setBPM': 'set tempo to [BPM] bpm',
    'supersonic.useSynth': 'use instrument [INSTRUMENT] style [STYLE] amp [AMP] %',
    'supersonic.noteValue': 'note [NOTE_NAME]',
    'supersonic.beatValue': 'beats [DURATION]',
    'supersonic.chordValue': 'chord [ROOT] type [TYPE]',
    'supersonic.playNote': 'play note [NOTE] for [BEATS] beats',
    'supersonic.restForBeats': 'rest for [BEATS] beats',
    'supersonic.withFX': 'with fx [FX] style [STYLE] mix [MIX] %'
};

for (const def of SAMPLE_BLOCK_DEFS) {
    messages[`supersonic.${def.opcode}`] = `play ${def.blockLabel} sample [${def.arg}]`;
}

module.exports = messages;
