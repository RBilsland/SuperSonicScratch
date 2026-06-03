#!/usr/bin/env node
/**
 * Regenerate fx-manifest.js and fx-style-manifest.js from supersonic-scsynth-synthdefs.
 * Usage: node src/extensions/scratch3_supersonic/build-fx-manifest.js [version]
 */
const fs = require('fs');
const https = require('https');
const path = require('path');

const {FX_STYLE_PRESETS, FX_STYLE_FALLBACK} = require('./fx-style-presets');

const version = process.argv[2] || '0.67.2';
const dir = __dirname;

/** Not useful as nested with_fx in Scratch. */
const FX_EXCLUDE = new Set([
    'record',
    'sound_out',
    'sound_out_stereo',
    'scope_out'
]);

const url = `https://data.jsdelivr.com/v1/package/npm/supersonic-scsynth-synthdefs@${version}/flat`;

https.get(url, res => {
    let body = '';
    res.on('data', chunk => { body += chunk; });
    res.on('end', () => {
        const data = JSON.parse(body);
        const fxIds = data.files
            .map(f => f.name.replace(/^\/synthdefs\//, '').replace(/\.scsyndef$/, ''))
            .filter(name => name.startsWith('sonic-pi-fx_'))
            .map(name => name.replace(/^sonic-pi-fx_/, ''))
            .filter(id => !FX_EXCLUDE.has(id))
            .sort();

        const missing = fxIds.filter(id => !FX_STYLE_PRESETS[id]);
        if (missing.length > 0) {
            // eslint-disable-next-line no-console
            console.warn('FX without style presets (using fallback):', missing.join(', '));
        }

        const FX_MENU_ITEMS = fxIds.map(id => ({
            text: id.replace(/_/g, ' '),
            value: id
        }));

        const FX_SYNTHDEFS = {};
        for (const id of fxIds) {
            FX_SYNTHDEFS[id] = `sonic-pi-fx_${id}`;
        }

        const FX_STYLE_MAP = {};
        for (const id of fxIds) {
            FX_STYLE_MAP[id] = FX_STYLE_PRESETS[id] || FX_STYLE_FALLBACK;
        }

        const manifestSource = `/**
 * Playable Sonic Pi FX synthdefs (supersonic-scsynth-synthdefs@${version}).
 * Auto-generated — run build-fx-manifest.js to refresh.
 */

const FX_MENU_ITEMS = ${JSON.stringify(FX_MENU_ITEMS, null, 4)};

const FX_SYNTHDEFS = ${JSON.stringify(FX_SYNTHDEFS, null, 4)};

module.exports = {
    FX_MENU_ITEMS,
    FX_SYNTHDEFS
};
`;

        const styleSource = `/**
 * Child-friendly FX "style" levels mapped to Sonic Pi FX synthdef controls.
 * Auto-generated from fx-style-presets.js — run build-fx-manifest.js to refresh.
 */

const FX_STYLE_MENU_ITEMS = [
    {text: 'gentle', value: 'gentle'},
    {text: 'normal', value: 'normal'},
    {text: 'strong', value: 'strong'},
    {text: 'wild', value: 'wild'}
];

const STYLE_LEVELS = FX_STYLE_MENU_ITEMS.map(item => item.value);

const DEFAULT_FX_STYLE = 'normal';

const FX_STYLE_MAP = ${JSON.stringify(FX_STYLE_MAP, null, 4)};

function fxStyleLevelFromArg (styleArg) {
    if (styleArg === null || typeof styleArg === 'undefined') {
        return DEFAULT_FX_STYLE;
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
    return DEFAULT_FX_STYLE;
}

function fxStyleToControls (fxKey, styleArg) {
    const level = fxStyleLevelFromArg(styleArg);
    const fxMap = FX_STYLE_MAP[fxKey] || FX_STYLE_MAP.reverb;
    const params = fxMap[level] || fxMap[DEFAULT_FX_STYLE];
    const controls = [];
    for (const key of Object.keys(params)) {
        controls.push(key, params[key]);
    }
    return controls;
}

module.exports = {
    DEFAULT_FX_STYLE,
    FX_STYLE_MENU_ITEMS,
    fxStyleLevelFromArg,
    fxStyleToControls
};
`;

        fs.writeFileSync(path.join(dir, 'fx-manifest.js'), manifestSource);
        fs.writeFileSync(path.join(dir, 'fx-style-manifest.js'), styleSource);
        // eslint-disable-next-line no-console
        console.log(`Wrote fx-manifest.js (${fxIds.length} FX)`);
        // eslint-disable-next-line no-console
        console.log(`Wrote fx-style-manifest.js (${Object.keys(FX_STYLE_MAP).length} style maps)`);
    });
}).on('error', err => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
});
