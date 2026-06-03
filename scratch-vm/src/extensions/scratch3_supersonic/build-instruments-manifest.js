#!/usr/bin/env node
/**
 * Regenerate instruments-manifest.js and instrument-style-manifest.js from
 * supersonic-scsynth-synthdefs on jsDelivr.
 * Usage: node src/extensions/scratch3_supersonic/build-instruments-manifest.js [version]
 */
const fs = require('fs');
const https = require('https');
const path = require('path');

const {INSTRUMENT_STYLE_PRESETS, INSTRUMENT_STYLE_FALLBACK} = require('./instrument-style-presets');

const version = process.argv[2] || '0.67.2';
const dir = __dirname;
const outPath = path.join(dir, 'instruments-manifest.js');

/** Synthdefs that are not pitched “use instrument” targets. */
const EXCLUDE = /-(fx_|basic_|level_|main_mixer|record|sound_in|sound_out|amp_stereo_monitor)|^(sonic-pi-mixer|sonic-pi-mixout|sonic-pi-scope|sonic-pi-server-info|sonic-pi-live_audio)/;

const url = `https://data.jsdelivr.com/v1/package/npm/supersonic-scsynth-synthdefs@${version}/flat`;

https.get(url, res => {
    let body = '';
    res.on('data', chunk => { body += chunk; });
    res.on('end', () => {
        const data = JSON.parse(body);
        const instrumentIds = data.files
            .map(f => f.name.replace(/^\/synthdefs\//, '').replace(/\.scsyndef$/, ''))
            .filter(name => name.startsWith('sonic-pi-') && !EXCLUDE.test(name))
            .map(name => name.replace(/^sonic-pi-/, ''))
            .sort();

        const items = instrumentIds.map(id => ({
            text: id.replace(/_/g, ' '),
            value: `sonic-pi-${id}`
        }));

        const missing = instrumentIds.filter(id => !INSTRUMENT_STYLE_PRESETS[id]);
        if (missing.length > 0) {
            // eslint-disable-next-line no-console
            console.warn('Instruments without style presets (using fallback):', missing.join(', '));
        }

        const INSTRUMENT_STYLE_MAP = {};
        for (const id of instrumentIds) {
            INSTRUMENT_STYLE_MAP[id] = INSTRUMENT_STYLE_PRESETS[id] || INSTRUMENT_STYLE_FALLBACK;
        }

        const manifestSource = `/**
 * Playable Sonic Pi synthdefs (supersonic-scsynth-synthdefs@${version}).
 * Auto-generated — run build-instruments-manifest.js to refresh.
 */

const INSTRUMENT_MENU_ITEMS = ${JSON.stringify(items, null, 4)};

module.exports = {
    INSTRUMENT_MENU_ITEMS
};
`;

        const styleSource = `/**
 * Child-friendly instrument "style" levels mapped to Sonic Pi synthdef controls.
 * Auto-generated from instrument-style-presets.js — run build-instruments-manifest.js to refresh.
 */

const INSTRUMENT_STYLE_MENU_ITEMS = [
    {text: 'gentle', value: 'gentle'},
    {text: 'normal', value: 'normal'},
    {text: 'strong', value: 'strong'},
    {text: 'wild', value: 'wild'}
];

const STYLE_LEVELS = INSTRUMENT_STYLE_MENU_ITEMS.map(item => item.value);

const DEFAULT_INSTRUMENT_STYLE = 'normal';

const INSTRUMENT_STYLE_MAP = ${JSON.stringify(INSTRUMENT_STYLE_MAP, null, 4)};

function instrumentIdFromSynthdef (synthdefName) {
    const name = String(synthdefName || '');
    return name.startsWith('sonic-pi-') ? name.slice('sonic-pi-'.length) : name;
}

function instrumentStyleLevelFromArg (styleArg) {
    if (styleArg === null || typeof styleArg === 'undefined') {
        return DEFAULT_INSTRUMENT_STYLE;
    }
    const raw = String(styleArg).trim().toLowerCase();
    if (STYLE_LEVELS.includes(raw)) {
        return raw;
    }
    const n = Number(styleArg);
    if (!Number.isNaN(n)) {
        const t = Math.min(Math.max(n > 1 ? n / 100 : n, 0), 1);
        const idx = Math.min(Math.floor(t * STYLE_LEVELS.length), STYLE_LEVELS.length - 1);
        return STYLE_LEVELS[idx];
    }
    return DEFAULT_INSTRUMENT_STYLE;
}

function instrumentStyleToControls (synthdefName, styleArg) {
    const id = instrumentIdFromSynthdef(synthdefName);
    const level = instrumentStyleLevelFromArg(styleArg);
    const instMap = INSTRUMENT_STYLE_MAP[id] || INSTRUMENT_STYLE_MAP.beep;
    const params = instMap[level] || instMap[DEFAULT_INSTRUMENT_STYLE];
    const controls = [];
    for (const key of Object.keys(params)) {
        controls.push(key, params[key]);
    }
    return controls;
}

module.exports = {
    DEFAULT_INSTRUMENT_STYLE,
    INSTRUMENT_STYLE_MENU_ITEMS,
    instrumentIdFromSynthdef,
    instrumentStyleLevelFromArg,
    instrumentStyleToControls
};
`;

        fs.writeFileSync(outPath, manifestSource);
        fs.writeFileSync(path.join(dir, 'instrument-style-manifest.js'), styleSource);
        // eslint-disable-next-line no-console
        console.log(`Wrote instruments-manifest.js (${items.length} instruments)`);
        // eslint-disable-next-line no-console
        console.log(`Wrote instrument-style-manifest.js (${Object.keys(INSTRUMENT_STYLE_MAP).length} style maps)`);
    });
}).on('error', err => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
});
