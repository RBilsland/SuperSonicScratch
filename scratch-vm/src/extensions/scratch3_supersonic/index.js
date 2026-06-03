const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');
const Runtime = require('../../engine/runtime');

const {INSTRUMENT_MENU_ITEMS} = require('./instruments-manifest');
const {
    DEFAULT_INSTRUMENT_STYLE,
    INSTRUMENT_STYLE_MENU_ITEMS,
    instrumentStyleToControls
} = require('./instrument-style-manifest');
const {
    BEAT_RANGE,
    DEFAULT_DURATION,
    DEFAULT_DURATION_BEATS,
    DURATION_MENU_ITEMS,
    beatArgToBeats
} = require('./beats-manifest');
const {FX_MENU_ITEMS, FX_SYNTHDEFS} = require('./fx-manifest');
const {
    DEFAULT_FX_STYLE,
    FX_STYLE_MENU_ITEMS,
    fxStyleToControls
} = require('./fx-style-manifest');
const {
    CHORD_TYPE_MENU_ITEMS,
    DEFAULT_CHORD_TYPE,
    chordValueFromArgs,
    parsePlayNoteArg,
    scaleAmpForVoices
} = require('./chords-manifest');
const {DEFAULT_INSTRUMENT_AMP_PERCENT, percentArgToUnit} = require('./percent');
const {ringSecondsForBeat} = require('./envelope');
const {
    SAMPLE_PLAYER_INSTRUMENTS,
    buildPlayNoteControls,
    instrumentIdFromSynthdef,
    resolvePlaybackSynth
} = require('./instrument-controls');

/** Default sample when mono/stereo player is used with play note (needs a buffer). */
const DEFAULT_PLAYER_SAMPLE = 'elec_blip.flac';

/** SuperCollider doneAction: free this synth node when the envelope finishes. */
const DONE_ACTION_FREE = 2;
const {
    DEFAULT_NOTE,
    DEFAULT_NOTE_MIDI,
    NOTE_MENU_ITEMS,
    noteArgToMidi
} = require('./notes-manifest');
const {SAMPLE_CATEGORIES, SAMPLE_BLOCK_DEFS} = require('./samples-manifest');
const supersonicL10nEn = require('./l10n-en');

// Register English strings so formatMessage does not warn before vm.setLocale runs
// (format-message defaults to locale "en" with an empty catalog).
(function registerSupersonicL10n () {
    const prev = formatMessage.setup();
    const locale = prev.locale || 'en';
    formatMessage.setup({
        locale: locale,
        translations: Object.assign({}, prev.translations, {
            [locale]: Object.assign({}, (prev.translations && prev.translations[locale]) || {}, supersonicL10nEn)
        })
    });
})();

// 0.66.0 workers return HTTP 400 on jsDelivr; 0.67.2 serves all dist assets correctly.
const SUPERSONIC_VERSION = '0.67.2';
const SUPERSONIC_CDN =
    `https://cdn.jsdelivr.net/npm/supersonic-scsynth@${SUPERSONIC_VERSION}/dist/supersonic.js`;

const CDN_BASE = `https://cdn.jsdelivr.net/npm/supersonic-scsynth@${SUPERSONIC_VERSION}/dist/`;
// WASM + AudioWorklet ship in the GPL core package, not in supersonic-scsynth/dist/.
const CORE_CDN = `https://cdn.jsdelivr.net/npm/supersonic-scsynth-core@${SUPERSONIC_VERSION}/`;
const SYNTHDEF_BASE =
    `https://cdn.jsdelivr.net/npm/supersonic-scsynth-synthdefs@${SUPERSONIC_VERSION}/synthdefs/`;
const SAMPLE_BASE =
    `https://cdn.jsdelivr.net/npm/supersonic-scsynth-samples@${SUPERSONIC_VERSION}/samples/`;

const DEFAULT_SYNTH = 'sonic-pi-beep';
/** Synthdef that plays audio from a buffer loaded via loadSample(). */
const SAMPLE_PLAYER_SYNTH = 'sonic-pi-basic_stereo_player';

const SYNTHS_GROUP_ID = 100;
const FX_GROUP_ID = 101;

// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSIjZmYyZjkyIi8+PHRleHQgeD0iNSIgeT0iMjIiIGZvbnQtZmFtaWx5PSJBcmlhbCBCbGFjayxIZWx2ZXRpY2Esc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iIzAwMDAwMCI+UzwvdGV4dD48dGV4dCB4PSIxNyIgeT0iMzQiIGZvbnQtZmFtaWx5PSJBcmlhbCBCbGFjayxIZWx2ZXRpY2Esc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iI0ZGRkZGRiI+UzwvdGV4dD48L3N2Zz4=';

/**
 * Built-in SuperSonic / Sonic Pi live-coding extension for Scratch 3.
 * @param {Runtime} runtime - the runtime instantiating this block package.
 */
class Scratch3SuperSonicBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this.supersonic = null;
        this.currentBPM = 60;
        this._engineReady = false;
        this._initPromise = null;
        this._warnedNotReady = false;
        /** @type {WeakMap<object, Array>} per-thread FX stacks */
        this._fxStacksByThread = new WeakMap();
        /** @type {Map<string, {synth: string, style: string, amp: *}>} per script (sprite + hat block) */
        this._instrumentByScript = new Map();
        this._nextBufNum = 0;
        /** @type {Map<string, {bufnum: number, duration: number}>} loaded sample cache */
        this._sampleCache = new Map();
        this._nextFxBus = 20;
        this._setupHandlerRegistered = false;

        for (const def of SAMPLE_BLOCK_DEFS) {
            this[def.opcode] = (args, util) => this._playSampleFile(
                Cast.toString(args[def.arg]),
                util
            );
        }

        this._onProjectRunStart = this._onProjectRunStart.bind(this);
        this._onProjectStopAll = this._onProjectStopAll.bind(this);
        this.runtime.on(Runtime.PROJECT_RUN_START, this._onProjectRunStart);
        this.runtime.on(Runtime.PROJECT_STOP_ALL, this._onProjectStopAll);
    }

    /**
     * Boot scsynth when the user starts the project (green flag / run).
     * The click satisfies the browser autoplay policy for AudioContext.
     */
    _onProjectRunStart () {
        this._bootEngine().then(() => {
            if (this.supersonic && this._engineReady) {
                this.supersonic.send('/g_freeAll', SYNTHS_GROUP_ID);
            }
        }).catch(() => {
            // Audio may still start on the first play block if green-flag boot failed.
        });
    }

    /**
     * Stop all SuperSonic audio when the red stop button is pressed.
     */
    _onProjectStopAll () {
        this._fxStacksByThread = new WeakMap();
        this._instrumentByScript = new Map();

        if (!this.supersonic || !this._engineReady) {
            return;
        }

        try {
            this.supersonic.cancelAll();
            this.supersonic.purge();
            this.supersonic.send('/g_freeAll', SYNTHS_GROUP_ID, FX_GROUP_ID);
            this.supersonic.send('/g_deepFree', SYNTHS_GROUP_ID, FX_GROUP_ID);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('[supersonic] stopAll failed:', e);
        }
    }

    /**
     * Build one Scratch block per sample category (drums, loops, ambient, etc.).
     * @returns {Array.<object>} block metadata objects.
     */
    _buildSampleBlocks () {
        return SAMPLE_BLOCK_DEFS.map(def => ({
            opcode: def.opcode,
            blockType: BlockType.COMMAND,
            text: formatMessage({
                id: `supersonic.${def.opcode}`,
                default: `play ${def.blockLabel} sample [${def.arg}]`,
                description: `Play a ${def.categoryLabel} sample and wait until it finishes`
            }),
            arguments: {
                [def.arg]: {
                    type: ArgumentType.STRING,
                    menu: def.menu,
                    defaultValue: def.defaultSample
                }
            }
        }));
    }

    /**
     * One dropdown menu per sample play block.
     * @returns {object} menu definitions for getInfo.
     */
    _buildSampleMenus () {
        const menus = {};
        for (const category of SAMPLE_CATEGORIES) {
            const def = SAMPLE_BLOCK_DEFS.find(d => d.categoryId === category.id);
            if (def) {
                menus[def.menu] = {
                    acceptReporters: false,
                    items: category.items
                };
            }
        }
        return menus;
    }

    getInfo () {
        return {
            id: 'supersonic',
            name: formatMessage({
                id: 'supersonic.categoryName',
                default: 'SuperSonic',
                description: 'Name of the SuperSonic extension category'
            }),
            blockIconURI: blockIconURI,
            menuIconURI: blockIconURI,
            color1: '#ff2f92',
            color2: '#e02882',
            color3: '#ff6aab',
            blocks: [
                {
                    opcode: 'setBPM',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'supersonic.setBPM',
                        default: 'set tempo to [BPM] bpm',
                        description: 'Set global BPM'
                    }),
                    arguments: {
                        BPM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 60
                        }
                    }
                },
                {
                    opcode: 'useSynth',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'supersonic.useSynth',
                        default: 'use instrument [INSTRUMENT] style [STYLE] amp [AMP] %',
                        description: 'Select synthdef, timbre style, and volume (0–100%)'
                    }),
                    arguments: {
                        INSTRUMENT: {
                            type: ArgumentType.STRING,
                            menu: 'INSTRUMENTS',
                            defaultValue: DEFAULT_SYNTH
                        },
                        STYLE: {
                            type: ArgumentType.STRING,
                            menu: 'INSTRUMENT_STYLES',
                            defaultValue: DEFAULT_INSTRUMENT_STYLE
                        },
                        AMP: {
                            type: ArgumentType.NUMBER,
                            defaultValue: DEFAULT_INSTRUMENT_AMP_PERCENT
                        }
                    }
                },
                {
                    opcode: 'noteValue',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'supersonic.noteValue',
                        default: 'note [NOTE_NAME]',
                        description: 'A note name (e.g. C4) to use with play note'
                    }),
                    arguments: {
                        NOTE_NAME: {
                            type: ArgumentType.STRING,
                            menu: 'NOTE_NAMES',
                            defaultValue: DEFAULT_NOTE
                        }
                    }
                },
                {
                    opcode: 'beatValue',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'supersonic.beatValue',
                        default: 'beats [DURATION]',
                        description: 'A note duration as a beat length (e.g. quaver)'
                    }),
                    arguments: {
                        DURATION: {
                            type: ArgumentType.STRING,
                            menu: 'DURATIONS',
                            defaultValue: DEFAULT_DURATION
                        }
                    }
                },
                {
                    opcode: 'chordValue',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'supersonic.chordValue',
                        default: 'chord [ROOT] type [TYPE]',
                        description: 'A chord from root note and type — use with play note'
                    }),
                    arguments: {
                        ROOT: {
                            type: ArgumentType.STRING,
                            menu: 'NOTE_NAMES',
                            defaultValue: DEFAULT_NOTE
                        },
                        TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'CHORD_TYPES',
                            defaultValue: DEFAULT_CHORD_TYPE
                        }
                    }
                },
                {
                    opcode: 'playNote',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'supersonic.playNote',
                        default: 'play note [NOTE] for [BEATS] beats',
                        description: 'Play pitched note'
                    }),
                    arguments: {
                        NOTE: {
                            type: ArgumentType.STRING,
                            defaultValue: String(DEFAULT_NOTE_MIDI)
                        },
                        BEATS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: DEFAULT_DURATION_BEATS
                        }
                    }
                },
                {
                    opcode: 'restForBeats',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'supersonic.restForBeats',
                        default: 'rest for [BEATS] beats',
                        description: 'Wait silently for a beat length (use beats reporter or a number)'
                    }),
                    arguments: {
                        BEATS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: DEFAULT_DURATION_BEATS
                        }
                    }
                },
                '---',
                ...this._buildSampleBlocks(),
                '---',
                {
                    opcode: 'withFX',
                    blockType: BlockType.CONDITIONAL,
                    branchCount: 1,
                    text: formatMessage({
                        id: 'supersonic.withFX',
                        default: 'with fx [FX] style [STYLE] mix [MIX] %',
                        description: 'Run blocks through an FX bus (mix 0–100 percent)'
                    }),
                    arguments: {
                        FX: {
                            type: ArgumentType.STRING,
                            menu: 'FX',
                            defaultValue: 'reverb'
                        },
                        STYLE: {
                            type: ArgumentType.STRING,
                            menu: 'FX_STYLES',
                            defaultValue: DEFAULT_FX_STYLE
                        },
                        MIX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    }
                }
            ],
            menus: {
                INSTRUMENTS: {
                    acceptReporters: false,
                    items: INSTRUMENT_MENU_ITEMS
                },
                INSTRUMENT_STYLES: {
                    acceptReporters: false,
                    items: INSTRUMENT_STYLE_MENU_ITEMS
                },
                NOTE_NAMES: {
                    acceptReporters: true,
                    items: NOTE_MENU_ITEMS
                },
                DURATIONS: {
                    acceptReporters: true,
                    items: DURATION_MENU_ITEMS
                },
                CHORD_TYPES: {
                    acceptReporters: false,
                    items: CHORD_TYPE_MENU_ITEMS
                },
                FX: {
                    acceptReporters: false,
                    items: FX_MENU_ITEMS
                },
                FX_STYLES: {
                    acceptReporters: false,
                    items: FX_STYLE_MENU_ITEMS
                },
                ...this._buildSampleMenus()
            }
        };
    }

    /**
     * Duration in seconds from beats at the current BPM.
     * @param {number} beats - note length in beats.
     * @returns {number} seconds
     */
    beatsToSeconds (beats) {
        const bpm = Math.max(this.currentBPM, 1);
        return (Cast.toNumber(beats) * 60) / bpm;
    }

    /**
     * Pause the current script thread for a beat duration (Sonic Pi-style sleep).
     * @param {number} beats - beats to wait.
     * @returns {Promise<void>}
     */
    sleepBeats (beats) {
        return this.sleepSeconds(this.beatsToSeconds(beats));
    }

    /**
     * Pause the current script thread for a wall-clock duration.
     * @param {number} seconds - seconds to wait.
     * @returns {Promise<void>}
     */
    sleepSeconds (seconds) {
        const s = Math.max(Cast.toNumber(seconds), 0);
        if (s <= 0) {
            return Promise.resolve();
        }
        return new Promise(resolve => {
            setTimeout(resolve, s * 1000);
        });
    }

    _warnNotReady () {
        if (!this._warnedNotReady) {
            this._warnedNotReady = true;
            // eslint-disable-next-line no-console
            console.warn('[supersonic] Engine not ready — click the green flag or run a sound block after interacting with the page.');
        }
    }

    /**
     * Ensure scsynth is booted (auto-init on green flag or lazy-init on first sound block).
     * @returns {Promise<boolean>} true if the engine is ready.
     */
    async _ensureEngineReady () {
        if (this._engineReady && this.supersonic) {
            return true;
        }
        try {
            await this._bootEngine();
            return true;
        } catch (e) {
            this._warnNotReady();
            return false;
        }
    }

    /**
     * Stable key for a script stack (sprite + top hat block). Survives thread restarts on broadcast.
     * @param {object} thread - Scratch thread.
     * @returns {string}
     */
    _instrumentKeyForThread (thread) {
        const targetId = thread && thread.target ? thread.target.id : '';
        const topBlock = thread ? thread.topBlock : '';
        return `${targetId}:${topBlock}`;
    }

    /**
     * Instrument + style for this script (parallel broadcasts / sprites each keep their own).
     * @param {object} thread - Scratch thread (capture before any await — blockUtility is shared).
     * @returns {{synth: string, style: string, amp: *}}
     */
    _instrumentForThread (thread) {
        const key = this._instrumentKeyForThread(thread);
        let inst = this._instrumentByScript.get(key);
        if (!inst) {
            inst = {
                synth: DEFAULT_SYNTH,
                style: DEFAULT_INSTRUMENT_STYLE,
                amp: DEFAULT_INSTRUMENT_AMP_PERCENT
            };
            this._instrumentByScript.set(key, inst);
        }
        return inst;
    }

    /**
     * @param {object} thread - Scratch thread.
     * @returns {Array} FX stack for this thread.
     */
    _fxStackForThread (thread) {
        let stack = this._fxStacksByThread.get(thread);
        if (!stack) {
            stack = [];
            this._fxStacksByThread.set(thread, stack);
        }
        return stack;
    }

    /**
     * Active FX context for the current thread (innermost nested withFX).
     * @param {object} util - block utility.
     * @returns {object|null}
     */
    _activeFx (thread) {
        const stack = this._fxStackForThread(thread);
        return stack.length > 0 ? stack[stack.length - 1] : null;
    }

    /**
     * Pop FX contexts when the thread stack shrinks past nested withFX blocks.
     * @param {object} thread - Scratch thread (capture before any await).
     */
    _cleanupFxStack (thread) {
        const fxStack = this._fxStackForThread(thread);
        const depth = thread.stack.length;
        while (fxStack.length > 0) {
            const top = fxStack[fxStack.length - 1];
            if (depth > top.threadDepth) {
                break;
            }
            if (this.supersonic && top.fxNodeId) {
                this.supersonic.send('/n_free', top.fxNodeId);
            }
            fxStack.pop();
        }
    }

    _registerSetupHandler () {
        if (this._setupHandlerRegistered || !this.supersonic) {
            return;
        }
        this._setupHandlerRegistered = true;
        this.supersonic.on('setup', async () => {
            this.supersonic.send('/g_new', SYNTHS_GROUP_ID, 0, 0);
            this.supersonic.send('/g_new', FX_GROUP_ID, 1, 0);
            await this.supersonic.sync();
        });
    }

    /**
     * Load SuperSonic from CDN and boot scsynth (called automatically).
     */
    async _bootEngine () {
        if (this._initPromise) {
            return this._initPromise;
        }

        this._initPromise = (async () => {
            await this.runtime.sharedDependencies.loadScript(SUPERSONIC_CDN);

            const SuperSonicClass =
                (typeof window !== 'undefined' && window.SuperSonic) ||
                (typeof globalThis !== 'undefined' && globalThis.SuperSonic);

            if (!SuperSonicClass) {
                throw new Error('SuperSonic class not found after loading CDN module');
            }

            // WASM defaults maxNodes to 8192; prebuilt core mirrors only 1024 nodes.
            this.supersonic = new SuperSonicClass({
                baseURL: CDN_BASE,
                coreBaseURL: CORE_CDN,
                synthdefBaseURL: SYNTHDEF_BASE,
                sampleBaseURL: SAMPLE_BASE,
                mode: 'postMessage',
                maxNodes: 1024
            });

            this._registerSetupHandler();
            await this.supersonic.init();
            await this.supersonic.loadSynthDef(DEFAULT_SYNTH);
            await this.supersonic.loadSynthDef(SAMPLE_PLAYER_SYNTH);
            await this.supersonic.sync();
            await Promise.all(
                Object.values(FX_SYNTHDEFS).map(name => this.supersonic.loadSynthDef(name))
            );
            this._engineReady = true;
            this._warnedNotReady = false;
        })();

        return this._initPromise.catch(err => {
            this._initPromise = null;
            // eslint-disable-next-line no-console
            console.error('[supersonic] engine boot failed:', err);
            throw err;
        });
    }

    setBPM (args) {
        const bpm = Cast.toNumber(args.BPM);
        this.currentBPM = Math.min(Math.max(bpm, 20), 300);
    }

    async useSynth (args, util) {
        const thread = util.thread;
        const name = Cast.toString(args.INSTRUMENT);
        const inst = this._instrumentForThread(thread);
        inst.synth = name;
        inst.style = args.STYLE;
        inst.amp = args.AMP;
        if (!(await this._ensureEngineReady())) {
            return;
        }
        await this.supersonic.loadSynthDef(resolvePlaybackSynth(name));
    }

    /**
     * Reporter: note name from the menu converted to a MIDI note number for play note.
     * @param {object} args - block arguments.
     * @returns {number}
     */
    noteValue (args) {
        let midi = noteArgToMidi(args.NOTE_NAME);
        if (Number.isNaN(midi)) {
            midi = DEFAULT_NOTE_MIDI;
        }
        return Math.min(Math.max(Math.round(midi), 0), 127);
    }

    /**
     * Reporter: duration name from the menu converted to a beat length for play note.
     * @param {object} args - block arguments.
     * @returns {number}
     */
    beatValue (args) {
        let beats = beatArgToBeats(args.DURATION);
        if (Number.isNaN(beats)) {
            beats = DEFAULT_DURATION_BEATS;
        }
        return Math.min(Math.max(beats, BEAT_RANGE.min), BEAT_RANGE.max);
    }

    /**
     * Reporter: root note + chord type encoded for play note (plays all tones together).
     * @param {object} args - block arguments.
     * @returns {string}
     */
    chordValue (args) {
        return chordValueFromArgs(args.ROOT, args.TYPE);
    }

    async playNote (args, util) {
        const thread = util.thread;
        this._cleanupFxStack(thread);
        const inst = this._instrumentForThread(thread);
        const fx = this._activeFx(thread);

        if (!(await this._ensureEngineReady())) {
            return;
        }

        const midiNotes = parsePlayNoteArg(args.NOTE);
        let beats = beatArgToBeats(args.BEATS);
        if (Number.isNaN(beats)) {
            beats = DEFAULT_DURATION_BEATS;
        }
        beats = Math.min(Math.max(beats, BEAT_RANGE.min), BEAT_RANGE.max);
        const beatSeconds = Math.max(this.beatsToSeconds(beats), 0.01);
        const ringSeconds = ringSecondsForBeat(beatSeconds, b => this.beatsToSeconds(b));
        const {synth, style, amp} = inst;
        const synthId = instrumentIdFromSynthdef(synth);
        const ampUnit = scaleAmpForVoices(
            percentArgToUnit(amp, DEFAULT_INSTRUMENT_AMP_PERCENT),
            midiNotes.length
        );
        const playbackSynth = resolvePlaybackSynth(synth);
        const styleControls = instrumentStyleToControls(synth, style);
        const voiceControls = buildPlayNoteControls(
            synth,
            styleControls,
            ampUnit,
            ringSeconds,
            this.currentBPM
        );

        let playerBufnum = null;
        if (SAMPLE_PLAYER_INSTRUMENTS.has(synthId)) {
            const sampleInfo = await this._getOrLoadSample(DEFAULT_PLAYER_SAMPLE);
            playerBufnum = sampleInfo.bufnum;
        }

        for (const midi of midiNotes) {
            const controls = [
                ...voiceControls,
                'doneAction', DONE_ACTION_FREE
            ];
            if (SAMPLE_PLAYER_INSTRUMENTS.has(synthId)) {
                controls.push('buf', playerBufnum, 'pitch', midi - 60);
            } else {
                controls.push('note', midi);
            }
            if (fx) {
                controls.push('out_bus', fx.inBus);
            }

            this._sendSynthNew(playbackSynth, controls);
        }

        return this.sleepBeats(beats);
    }

    /**
     * Start a one-shot synth; recover if the node tree is full from leaked synths.
     * @param {string} synthdef - synthdef name.
     * @param {Array.<string|number>} controls - flat OSC controls.
     */
    _sendSynthNew (synthdef, controls) {
        try {
            this.supersonic.send('/s_new', synthdef, -1, 0, SYNTHS_GROUP_ID, ...controls);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('[supersonic] /s_new failed, clearing synth group:', err);
            this.supersonic.send('/g_freeAll', SYNTHS_GROUP_ID);
            this.supersonic.send('/s_new', synthdef, -1, 0, SYNTHS_GROUP_ID, ...controls);
        }
    }

    /**
     * Wait for a beat length at the current BPM (no sound). Accepts the beats reporter or a number.
     * @param {object} args - block arguments.
     * @returns {Promise<void>}
     */
    async restForBeats (args) {
        let beats = beatArgToBeats(args.BEATS);
        if (Number.isNaN(beats)) {
            beats = DEFAULT_DURATION_BEATS;
        }
        beats = Math.min(Math.max(beats, BEAT_RANGE.min), BEAT_RANGE.max);
        return this.sleepBeats(beats);
    }

    /**
     * Derive duration in seconds from a loadSample() result.
     * @param {object} result - LoadSampleResult from SuperSonic.
     * @returns {number}
     */
    _sampleDurationSeconds (result) {
        if (result && typeof result.duration === 'number' && result.duration > 0) {
            return result.duration;
        }
        if (result && result.numFrames > 0 && result.sampleRate > 0) {
            return result.numFrames / result.sampleRate;
        }
        return 0.25;
    }

    /**
     * Load a sample into a stable buffer slot (reuses slots per filename).
     * @param {string} sampleFile - filename under sampleBaseURL.
     * @returns {Promise<{bufnum: number, duration: number}>}
     */
    async _getOrLoadSample (sampleFile) {
        if (this._sampleCache.has(sampleFile)) {
            return this._sampleCache.get(sampleFile);
        }
        const bufnum = this._nextBufNum;
        this._nextBufNum += 1;
        const result = await this.supersonic.loadSample(bufnum, sampleFile);
        const info = {
            bufnum: bufnum,
            duration: this._sampleDurationSeconds(result)
        };
        this._sampleCache.set(sampleFile, info);
        return info;
    }

    /**
     * Play a sample file (shared by all category-specific play blocks).
     * Waits until the sample's full duration has elapsed before the next block runs.
     * @param {string} sampleFile - filename under sampleBaseURL.
     * @param {object} util - block utility.
     * @returns {Promise<void>|undefined}
     */
    async _playSampleFile (sampleFile, util) {
        const thread = util.thread;
        this._cleanupFxStack(thread);
        const fx = this._activeFx(thread);

        if (!(await this._ensureEngineReady())) {
            return;
        }

        const {bufnum, duration} = await this._getOrLoadSample(sampleFile);

        const controls = ['buf', bufnum, 'amp', 1, 'doneAction', DONE_ACTION_FREE];
        if (fx) {
            controls.push('out_bus', fx.inBus);
        }

        this._sendSynthNew(SAMPLE_PLAYER_SYNTH, controls);

        return this.sleepSeconds(duration);
    }

    /**
     * Convert with-fx mix from 0–100 (percent) to 0–1 for the synthdef. Values in 0–1 are
     * still accepted for older projects that used the previous scale.
     * @param {*} mixArg - block input.
     * @returns {number}
     */
    _fxMixToSynth (mixArg) {
        return percentArgToUnit(mixArg, 50);
    }

    /**
     * Conditional C-block: route nested sounds through an FX synthdef.
     * Must stay synchronous — an async function always returns a Promise, and Scratch's
     * promise handler would pop the substack before nested blocks run.
     * @param {object} args - block arguments.
     * @param {object} util - Scratch block utility (sequencer + thread).
     */
    withFX (args, util) {
        this._cleanupFxStack(util.thread);

        if (!this._engineReady || !this.supersonic) {
            this._bootEngine().catch(() => {});
            return;
        }

        const fxKey = Cast.toString(args.FX);
        const fxDef = FX_SYNTHDEFS[fxKey];
        if (!fxDef) {
            return;
        }
        const mix = this._fxMixToSynth(args.MIX);
        const inBus = this._nextFxBus;
        this._nextFxBus += 2;
        const outBus = 0;
        const fxNodeId = this.supersonic.nextNodeId();
        const threadDepth = util.thread.stack.length;

        this.supersonic.send(
            '/s_new',
            fxDef,
            fxNodeId,
            0,
            FX_GROUP_ID,
            'in_bus', inBus,
            'out_bus', outBus,
            'mix', mix,
            ...fxStyleToControls(fxKey, args.STYLE)
        );

        this._fxStackForThread(util.thread).push({
            fxDef,
            fxNodeId,
            inBus,
            outBus,
            groupId: FX_GROUP_ID,
            threadDepth: threadDepth
        });

        // Scratch does not automatically run blocks inside a C-block. util.startBranch(1, false)
        // tells the runtime sequencer to execute substack SUBSTACK once: branchNum 1 is the first
        // (and only) child stack, and isLoop false means this is not a loop — after the substack
        // finishes, execution continues with the block below withFX instead of re-entering it.
        util.startBranch(1, false);
    }
}

module.exports = Scratch3SuperSonicBlocks;
