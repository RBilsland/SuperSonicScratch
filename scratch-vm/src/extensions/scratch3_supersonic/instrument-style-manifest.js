/**
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

const INSTRUMENT_STYLE_MAP = {
    "bass_foundation": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.12,
            "sustain": 0.45,
            "cutoff": 70,
            "res": 0.2
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.08,
            "sustain": 0.6,
            "cutoff": 55,
            "res": 0.4
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.04,
            "sustain": 0.72,
            "cutoff": 42,
            "res": 0.65
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.82,
            "cutoff": 32,
            "res": 0.88
        }
    },
    "bass_highend": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.12,
            "sustain": 0.45,
            "cutoff": 70,
            "res": 0.2
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.08,
            "sustain": 0.6,
            "cutoff": 55,
            "res": 0.4
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.04,
            "sustain": 0.72,
            "cutoff": 42,
            "res": 0.65
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.82,
            "cutoff": 32,
            "res": 0.88
        }
    },
    "beep": {
        "gentle": {
            "attack": 0.04,
            "decay": 0.12,
            "sustain": 0.35,
            "pan": 0
        },
        "normal": {
            "attack": 0.02,
            "decay": 0.08,
            "sustain": 0.5,
            "pan": 0
        },
        "strong": {
            "attack": 0.01,
            "decay": 0.04,
            "sustain": 0.65,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.8,
            "pan": 0
        }
    },
    "blade": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 90,
            "vibrato_rate": 4,
            "vibrato_depth": 0.15
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 75,
            "vibrato_rate": 6,
            "vibrato_depth": 0.3
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "vibrato_rate": 9,
            "vibrato_depth": 0.55
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 40,
            "vibrato_rate": 14,
            "vibrato_depth": 0.85
        }
    },
    "bnoise": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.15,
            "sustain": 0.2,
            "cutoff": 90,
            "res": 0.1
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 0.35,
            "cutoff": 75,
            "res": 0.28
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.05,
            "sustain": 0.5,
            "cutoff": 55,
            "res": 0.55
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.65,
            "cutoff": 35,
            "res": 0.82
        }
    },
    "chipbass": {
        "gentle": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.35,
            "note_resolution": 0.1
        },
        "normal": {
            "attack": 0.005,
            "decay": 0.04,
            "sustain": 0.5,
            "note_resolution": 0.05
        },
        "strong": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.65,
            "note_resolution": 0.02
        },
        "wild": {
            "attack": 0,
            "decay": 0.01,
            "sustain": 0.78,
            "note_resolution": 0.01
        }
    },
    "chiplead": {
        "gentle": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.35,
            "width": 0.2,
            "note_resolution": 0.1
        },
        "normal": {
            "attack": 0.005,
            "decay": 0.04,
            "sustain": 0.5,
            "width": 0.35,
            "note_resolution": 0.05
        },
        "strong": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.65,
            "width": 0.55,
            "note_resolution": 0.02
        },
        "wild": {
            "attack": 0,
            "decay": 0.01,
            "sustain": 0.78,
            "width": 0.75,
            "note_resolution": 0.01
        }
    },
    "chipnoise": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.15,
            "sustain": 0.2,
            "cutoff": 90,
            "res": 0.1
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 0.35,
            "cutoff": 75,
            "res": 0.28
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.05,
            "sustain": 0.5,
            "cutoff": 55,
            "res": 0.55
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.65,
            "cutoff": 35,
            "res": 0.82
        }
    },
    "cnoise": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.15,
            "sustain": 0.2,
            "cutoff": 90,
            "res": 0.1
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 0.35,
            "cutoff": 75,
            "res": 0.28
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.05,
            "sustain": 0.5,
            "cutoff": 55,
            "res": 0.55
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.65,
            "cutoff": 35,
            "res": 0.82
        }
    },
    "dark_ambience": {
        "gentle": {
            "attack": 0.2,
            "decay": 0.4,
            "sustain": 0.6,
            "cutoff": 70,
            "res": 0.2,
            "room": 0.4,
            "reverb_time": 2
        },
        "normal": {
            "attack": 0.15,
            "decay": 0.3,
            "sustain": 0.65,
            "cutoff": 60,
            "res": 0.35,
            "room": 0.6,
            "reverb_time": 4
        },
        "strong": {
            "attack": 0.1,
            "decay": 0.2,
            "sustain": 0.72,
            "cutoff": 48,
            "res": 0.55,
            "room": 0.8,
            "reverb_time": 6
        },
        "wild": {
            "attack": 0.05,
            "decay": 0.12,
            "sustain": 0.8,
            "cutoff": 35,
            "res": 0.78,
            "room": 1,
            "reverb_time": 10
        }
    },
    "dpulse": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "dsaw": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "dtri": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "dull_bell": {
        "gentle": {
            "attack": 0.04,
            "decay": 0.12,
            "sustain": 0.35,
            "pan": 0
        },
        "normal": {
            "attack": 0.02,
            "decay": 0.08,
            "sustain": 0.5,
            "pan": 0
        },
        "strong": {
            "attack": 0.01,
            "decay": 0.04,
            "sustain": 0.65,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.8,
            "pan": 0
        }
    },
    "fm": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "divisor": 1.5,
            "depth": 0.6
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "divisor": 2,
            "depth": 1
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 60,
            "divisor": 3,
            "depth": 1.8
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 42,
            "divisor": 5,
            "depth": 3
        }
    },
    "gabberkick": {
        "gentle": {
            "attack": 0,
            "decay": 0.08,
            "sustain": 0.2,
            "cutoff": 80,
            "res": 0.3,
            "boost": 0.2
        },
        "normal": {
            "attack": 0,
            "decay": 0.05,
            "sustain": 0.3,
            "cutoff": 65,
            "res": 0.5,
            "boost": 0.45
        },
        "strong": {
            "attack": 0,
            "decay": 0.03,
            "sustain": 0.4,
            "cutoff": 50,
            "res": 0.72,
            "boost": 0.75
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.5,
            "cutoff": 38,
            "res": 0.9,
            "boost": 1
        }
    },
    "gnoise": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.15,
            "sustain": 0.2,
            "cutoff": 90,
            "res": 0.1
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 0.35,
            "cutoff": 75,
            "res": 0.28
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.05,
            "sustain": 0.5,
            "cutoff": 55,
            "res": 0.55
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.65,
            "cutoff": 35,
            "res": 0.82
        }
    },
    "growl": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "hollow": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "hoover": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "kalimba": {
        "gentle": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0.15,
            "clickiness": 0.15
        },
        "normal": {
            "attack": 0.001,
            "decay": 0.14,
            "sustain": 0.25,
            "clickiness": 0.3
        },
        "strong": {
            "attack": 0,
            "decay": 0.1,
            "sustain": 0.35,
            "clickiness": 0.5
        },
        "wild": {
            "attack": 0,
            "decay": 0.06,
            "sustain": 0.45,
            "clickiness": 0.75
        }
    },
    "mod_dsaw": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "mod_phase": 1,
            "mod_range": 6
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "mod_phase": 0.5,
            "mod_range": 12
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "mod_phase": 0.25,
            "mod_range": 18
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "mod_phase": 0.125,
            "mod_range": 24
        }
    },
    "mod_fm": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "divisor": 1.5,
            "depth": 0.6,
            "mod_phase": 1,
            "mod_range": 6
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "divisor": 2,
            "depth": 1,
            "mod_phase": 0.5,
            "mod_range": 12
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 60,
            "divisor": 3,
            "depth": 1.8,
            "mod_phase": 0.25,
            "mod_range": 18
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 42,
            "divisor": 5,
            "depth": 3,
            "mod_phase": 0.125,
            "mod_range": 24
        }
    },
    "mod_pulse": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "mod_phase": 1,
            "mod_range": 6
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "mod_phase": 0.5,
            "mod_range": 12
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "mod_phase": 0.25,
            "mod_range": 18
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "mod_phase": 0.125,
            "mod_range": 24
        }
    },
    "mod_saw": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "mod_phase": 1,
            "mod_range": 6
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "mod_phase": 0.5,
            "mod_range": 12
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "mod_phase": 0.25,
            "mod_range": 18
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "mod_phase": 0.125,
            "mod_range": 24
        }
    },
    "mod_sine": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "mod_phase": 1,
            "mod_range": 6
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "mod_phase": 0.5,
            "mod_range": 12
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "mod_phase": 0.25,
            "mod_range": 18
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "mod_phase": 0.125,
            "mod_range": 24
        }
    },
    "mod_tri": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "mod_phase": 1,
            "mod_range": 6
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "mod_phase": 0.5,
            "mod_range": 12
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "mod_phase": 0.25,
            "mod_range": 18
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "mod_phase": 0.125,
            "mod_range": 24
        }
    },
    "mono_player": {
        "gentle": {},
        "normal": {},
        "strong": {},
        "wild": {}
    },
    "noise": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.15,
            "sustain": 0.2,
            "cutoff": 90,
            "res": 0.1
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 0.35,
            "cutoff": 75,
            "res": 0.28
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.05,
            "sustain": 0.5,
            "cutoff": 55,
            "res": 0.55
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.65,
            "cutoff": 35,
            "res": 0.82
        }
    },
    "organ_tonewheel": {
        "gentle": {
            "attack": 0.03,
            "decay": 0.15,
            "sustain": 0.5,
            "bass": 0.6,
            "fundamental": 0.7
        },
        "normal": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.6,
            "bass": 0.75,
            "fundamental": 0.85
        },
        "strong": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.72,
            "bass": 0.9,
            "fundamental": 1
        },
        "wild": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.82,
            "bass": 1,
            "fundamental": 1.1
        }
    },
    "piano": {
        "gentle": {
            "attack": 0.002,
            "decay": 0.3,
            "sustain": 0.45,
            "vel": 0.65,
            "mod_index": 0.35,
            "mix": 0.65,
            "lfo_rate": 0.3,
            "sustain_level": 0.85
        },
        "normal": {
            "attack": 0.001,
            "decay": 0.25,
            "sustain": 0.55,
            "vel": 0.8,
            "mod_index": 0.45,
            "mix": 0.72,
            "lfo_rate": 0.4,
            "sustain_level": 0.9
        },
        "strong": {
            "attack": 0.001,
            "decay": 0.18,
            "sustain": 0.65,
            "vel": 0.95,
            "mod_index": 0.55,
            "mix": 0.78,
            "lfo_rate": 0.5,
            "sustain_level": 0.95
        },
        "wild": {
            "attack": 0,
            "decay": 0.12,
            "sustain": 0.75,
            "vel": 1,
            "mod_index": 0.65,
            "mix": 0.85,
            "lfo_rate": 0.55,
            "sustain_level": 1
        }
    },
    "pluck": {
        "gentle": {
            "attack": 0.001,
            "decay": 0.25,
            "sustain": 0.1,
            "pluck_decay": 6,
            "noise_amp": 0.15
        },
        "normal": {
            "attack": 0.001,
            "decay": 0.18,
            "sustain": 0.2,
            "pluck_decay": 10,
            "noise_amp": 0.25
        },
        "strong": {
            "attack": 0,
            "decay": 0.12,
            "sustain": 0.3,
            "pluck_decay": 16,
            "noise_amp": 0.4
        },
        "wild": {
            "attack": 0,
            "decay": 0.08,
            "sustain": 0.4,
            "pluck_decay": 24,
            "noise_amp": 0.6
        }
    },
    "pnoise": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.15,
            "sustain": 0.2,
            "cutoff": 90,
            "res": 0.1
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 0.35,
            "cutoff": 75,
            "res": 0.28
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.05,
            "sustain": 0.5,
            "cutoff": 55,
            "res": 0.55
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.65,
            "cutoff": 35,
            "res": 0.82
        }
    },
    "pretty_bell": {
        "gentle": {
            "attack": 0.04,
            "decay": 0.12,
            "sustain": 0.35,
            "pan": 0
        },
        "normal": {
            "attack": 0.02,
            "decay": 0.08,
            "sustain": 0.5,
            "pan": 0
        },
        "strong": {
            "attack": 0.01,
            "decay": 0.04,
            "sustain": 0.65,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.8,
            "pan": 0
        }
    },
    "prophet": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "pulse": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "rhodey": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.12,
            "sustain": 0.4,
            "vel": 0.6,
            "mod_index": 0.4,
            "mix": 0.35,
            "lfo_rate": 2
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.08,
            "sustain": 0.55,
            "vel": 0.85,
            "mod_index": 0.65,
            "mix": 0.5,
            "lfo_rate": 4
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.04,
            "sustain": 0.68,
            "vel": 1,
            "mod_index": 0.9,
            "mix": 0.65,
            "lfo_rate": 6
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.78,
            "vel": 1,
            "mod_index": 1.2,
            "mix": 0.8,
            "lfo_rate": 10
        }
    },
    "rodeo": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "saw": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "sc808_bassdrum": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "sc808_clap": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "sc808_claves": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "sc808_closed_hihat": {
        "gentle": {
            "decay": 0.42,
            "hpf": 121,
            "lpf": 121
        },
        "normal": {
            "decay": 0.35,
            "hpf": 120,
            "lpf": 120
        },
        "strong": {
            "decay": 0.25,
            "hpf": 119,
            "lpf": 115
        },
        "wild": {
            "decay": 0.15,
            "hpf": 118,
            "lpf": 107
        }
    },
    "sc808_congahi": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "sc808_congalo": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "sc808_congamid": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "sc808_cowbell": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "sc808_cymbal": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "sc808_maracas": {
        "gentle": {
            "decay": 0.08,
            "hpf": 113,
            "click": 0.8
        },
        "normal": {
            "decay": 0.1,
            "hpf": 113,
            "click": 1
        },
        "strong": {
            "decay": 0.14,
            "hpf": 112,
            "click": 1
        },
        "wild": {
            "decay": 0.2,
            "hpf": 110,
            "click": 1
        }
    },
    "sc808_open_hihat": {
        "gentle": {
            "decay": 0.42,
            "hpf": 121,
            "lpf": 121
        },
        "normal": {
            "decay": 0.35,
            "hpf": 120,
            "lpf": 120
        },
        "strong": {
            "decay": 0.25,
            "hpf": 119,
            "lpf": 115
        },
        "wild": {
            "decay": 0.15,
            "hpf": 118,
            "lpf": 107
        }
    },
    "sc808_rimshot": {
        "gentle": {
            "decay": 0.2,
            "mix": 0.35,
            "click": 0.2
        },
        "normal": {
            "decay": 0.14,
            "mix": 0.5,
            "click": 0.35
        },
        "strong": {
            "decay": 0.09,
            "mix": 0.65,
            "click": 0.55
        },
        "wild": {
            "decay": 0.05,
            "mix": 0.85,
            "click": 0.8
        }
    },
    "sc808_snare": {
        "gentle": {
            "decay": 0.2,
            "mix": 0.35,
            "click": 0.2
        },
        "normal": {
            "decay": 0.14,
            "mix": 0.5,
            "click": 0.35
        },
        "strong": {
            "decay": 0.09,
            "mix": 0.65,
            "click": 0.55
        },
        "wild": {
            "decay": 0.05,
            "mix": 0.85,
            "click": 0.8
        }
    },
    "sc808_tomhi": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "sc808_tomlo": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "sc808_tommid": {
        "gentle": {
            "decay": 0.25
        },
        "normal": {
            "decay": 0.18
        },
        "strong": {
            "decay": 0.12
        },
        "wild": {
            "decay": 0.06
        }
    },
    "square": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "stereo_player": {
        "gentle": {},
        "normal": {},
        "strong": {},
        "wild": {}
    },
    "subpulse": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "supersaw": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "tb303": {
        "gentle": {
            "attack": 0.01,
            "decay": 0.08,
            "sustain": 0.35,
            "cutoff": 100,
            "cutoff_min": 50,
            "res": 0.5
        },
        "normal": {
            "attack": 0.005,
            "decay": 0.05,
            "sustain": 0.5,
            "cutoff": 85,
            "cutoff_min": 40,
            "res": 0.75
        },
        "strong": {
            "attack": 0,
            "decay": 0.03,
            "sustain": 0.65,
            "cutoff": 70,
            "cutoff_min": 30,
            "res": 0.9
        },
        "wild": {
            "attack": 0,
            "decay": 0.02,
            "sustain": 0.75,
            "cutoff": 55,
            "cutoff_min": 25,
            "res": 0.98
        }
    },
    "tech_saws": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "tri": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 95,
            "res": 0.12,
            "pan": 0
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 80,
            "res": 0.32,
            "pan": 0
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.58,
            "pan": 0
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 38,
            "res": 0.85,
            "pan": 0
        }
    },
    "zawa": {
        "gentle": {
            "attack": 0.02,
            "decay": 0.1,
            "sustain": 0.4,
            "cutoff": 90,
            "res": 0.2,
            "phase": 1,
            "range": 8
        },
        "normal": {
            "attack": 0.01,
            "decay": 0.06,
            "sustain": 0.55,
            "cutoff": 75,
            "res": 0.4,
            "phase": 0.5,
            "range": 14
        },
        "strong": {
            "attack": 0.005,
            "decay": 0.03,
            "sustain": 0.68,
            "cutoff": 58,
            "res": 0.62,
            "phase": 0.25,
            "range": 20
        },
        "wild": {
            "attack": 0,
            "decay": 0.015,
            "sustain": 0.78,
            "cutoff": 40,
            "res": 0.85,
            "phase": 0.125,
            "range": 28
        }
    }
};

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
