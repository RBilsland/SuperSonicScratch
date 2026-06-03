#!/usr/bin/env node
/**
 * Regenerate samples-manifest.js from supersonic-scsynth-samples on jsDelivr.
 * Usage: node src/extensions/scratch3_supersonic/build-samples-manifest.js [version]
 */
const fs = require('fs');
const https = require('https');
const path = require('path');

const version = process.argv[2] || '0.67.2';

const CATEGORIES = [
    {id: 'drums', label: 'Drums', prefix: 'drum_'},
    {id: 'hats', label: 'Hats & bass drum', prefixes: ['hat_', 'bd_']},
    {id: 'snares', label: 'Snares', prefixes: ['sn_']},
    {id: 'cymbals', label: 'Ride cymbals', prefixes: ['ride_']},
    {id: 'perc', label: 'Percussion', prefixes: ['perc_', 'tabla_']},
    {id: 'elec', label: 'Electronic', prefix: 'elec_'},
    {id: 'bass', label: 'Bass', prefix: 'bass_'},
    {id: 'loops', label: 'Loops', prefix: 'loop_'},
    {id: 'beats', label: 'Beat loops', prefixes: ['arovane_', 'tbd_']},
    {id: 'ambient', label: 'Ambient', prefix: 'ambi_'},
    {id: 'guitar', label: 'Guitar', prefix: 'guit_'},
    {id: 'glitch', label: 'Glitch', prefix: 'glitch_'},
    {id: 'vinyl', label: 'Vinyl', prefix: 'vinyl_'},
    {id: 'mehackit', label: 'Mehackit', prefix: 'mehackit_'},
    {id: 'misc', label: 'Misc', prefix: null}
];

/** Per-category Scratch block + menu metadata (one play block per type). */
const BLOCK_DEFS = {
    drums: {opcode: 'playDrumSample', menu: 'DRUM_SAMPLES', arg: 'DRUM', blockLabel: 'drum'},
    hats: {opcode: 'playHatSample', menu: 'HAT_SAMPLES', arg: 'HAT', blockLabel: 'hat'},
    snares: {opcode: 'playSnareSample', menu: 'SNARE_SAMPLES', arg: 'SNARE', blockLabel: 'snare'},
    cymbals: {opcode: 'playCymbalSample', menu: 'CYMBAL_SAMPLES', arg: 'CYMBAL', blockLabel: 'ride cymbal'},
    perc: {opcode: 'playPercussionSample', menu: 'PERC_SAMPLES', arg: 'PERC', blockLabel: 'percussion'},
    elec: {opcode: 'playElectronicSample', menu: 'ELEC_SAMPLES', arg: 'ELEC', blockLabel: 'electronic'},
    bass: {opcode: 'playBassSample', menu: 'BASS_SAMPLES', arg: 'BASS', blockLabel: 'bass'},
    loops: {opcode: 'playLoopSample', menu: 'LOOP_SAMPLES', arg: 'LOOP', blockLabel: 'loop'},
    beats: {opcode: 'playBeatLoopSample', menu: 'BEAT_LOOP_SAMPLES', arg: 'BEAT', blockLabel: 'beat loop'},
    ambient: {opcode: 'playAmbientSample', menu: 'AMBIENT_SAMPLES', arg: 'AMBIENT', blockLabel: 'ambient'},
    guitar: {opcode: 'playGuitarSample', menu: 'GUITAR_SAMPLES', arg: 'GUITAR', blockLabel: 'guitar'},
    glitch: {opcode: 'playGlitchSample', menu: 'GLITCH_SAMPLES', arg: 'GLITCH', blockLabel: 'glitch'},
    vinyl: {opcode: 'playVinylSample', menu: 'VINYL_SAMPLES', arg: 'VINYL', blockLabel: 'vinyl'},
    mehackit: {opcode: 'playMehackitSample', menu: 'MEHACKIT_SAMPLES', arg: 'MEHACKIT', blockLabel: 'mehackit'},
    misc: {opcode: 'playMiscSample', menu: 'MISC_SAMPLES', arg: 'MISC', blockLabel: 'misc'}
};

const matchCat = filename => {
    for (const cat of CATEGORIES) {
        if (cat.prefix && filename.startsWith(cat.prefix)) return cat;
        if (cat.prefixes && cat.prefixes.some(p => filename.startsWith(p))) return cat;
    }
    return CATEGORIES.find(c => c.id === 'misc');
};

const shortLabel = (filename, cat) => {
    let s = filename.replace(/\.flac$/i, '');
    if (cat.prefix && s.startsWith(cat.prefix)) s = s.slice(cat.prefix.length);
    else if (cat.prefixes) {
        for (const p of cat.prefixes) {
            if (s.startsWith(p)) {
                s = s.slice(p.length);
                break;
            }
        }
    }
    return s.replace(/_/g, ' ');
};

const url = `https://data.jsdelivr.com/v1/package/npm/supersonic-scsynth-samples@${version}/flat`;

https.get(url, res => {
    let body = '';
    res.on('data', c => {
        body += c;
    });
    res.on('end', () => {
        const json = JSON.parse(body);
        const files = json.files
            .filter(f => f.name.startsWith('/samples/') && /\.flac$/i.test(f.name))
            .map(f => f.name.replace('/samples/', ''))
            .sort();

        const byId = {};
        for (const f of files) {
            const cat = matchCat(f);
            if (!byId[cat.id]) byId[cat.id] = {id: cat.id, label: cat.label, items: []};
            byId[cat.id].items.push({text: shortLabel(f, cat), value: f});
        }
        const cats = CATEGORIES.filter(c => byId[c.id]).map(c => byId[c.id]);

        const blockDefs = cats.map(cat => {
            const meta = BLOCK_DEFS[cat.id];
            return {
                categoryId: cat.id,
                categoryLabel: cat.label,
                opcode: meta.opcode,
                menu: meta.menu,
                arg: meta.arg,
                blockLabel: meta.blockLabel,
                defaultSample: cat.items[0].value
            };
        });

        const out = `/**
 * All ${files.length} Sonic Pi / SuperSonic sample files (supersonic-scsynth-samples@${version}).
 * Auto-generated — run build-samples-manifest.js to refresh.
 */

const SAMPLE_CATEGORIES = ${JSON.stringify(cats, null, 4)};

const SAMPLE_BLOCK_DEFS = ${JSON.stringify(blockDefs, null, 4)};

const SAMPLE_BY_VALUE = {};
for (const category of SAMPLE_CATEGORIES) {
    for (const item of category.items) {
        SAMPLE_BY_VALUE[item.value] = {
            categoryId: category.id,
            categoryLabel: category.label,
            text: item.text
        };
    }
}

module.exports = {
    SAMPLE_CATEGORIES,
    SAMPLE_BLOCK_DEFS,
    SAMPLE_BY_VALUE
};
`;

        const target = path.join(__dirname, 'samples-manifest.js');
        fs.writeFileSync(target, out);
        // eslint-disable-next-line no-console
        console.log(`Wrote ${target} (${files.length} samples, ${blockDefs.length} play blocks)`);
    });
}).on('error', err => {
    console.error(err);
    process.exit(1);
});
