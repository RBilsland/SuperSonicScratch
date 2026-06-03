/**
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

const FX_STYLE_MAP = {
    "autotuner": {
        "gentle": {
            "formant_ratio": 0.75
        },
        "normal": {
            "formant_ratio": 1
        },
        "strong": {
            "formant_ratio": 1.45
        },
        "wild": {
            "formant_ratio": 2
        }
    },
    "band_eq": {
        "gentle": {
            "low": 0,
            "mid": 0,
            "high": 0
        },
        "normal": {
            "low": 0.15,
            "mid": 0.1,
            "high": 0.1
        },
        "strong": {
            "low": 0.35,
            "mid": 0.25,
            "high": 0.2
        },
        "wild": {
            "low": 0.55,
            "mid": 0.4,
            "high": 0.35
        }
    },
    "bitcrusher": {
        "gentle": {
            "sample_rate": 22050,
            "bits": 12,
            "cutoff": 110
        },
        "normal": {
            "sample_rate": 10000,
            "bits": 8,
            "cutoff": 90
        },
        "strong": {
            "sample_rate": 4000,
            "bits": 6,
            "cutoff": 70
        },
        "wild": {
            "sample_rate": 2000,
            "bits": 4,
            "cutoff": 50
        }
    },
    "bpf": {
        "gentle": {
            "centre": 52,
            "res": 0.12
        },
        "normal": {
            "centre": 64,
            "res": 0.3
        },
        "strong": {
            "centre": 76,
            "res": 0.55
        },
        "wild": {
            "centre": 88,
            "res": 0.82
        }
    },
    "compressor": {
        "gentle": {
            "thresh": 0.85,
            "slope_above": 1.2,
            "slope_below": 1
        },
        "normal": {
            "thresh": 0.65,
            "slope_above": 2,
            "slope_below": 1
        },
        "strong": {
            "thresh": 0.4,
            "slope_above": 4,
            "slope_below": 1
        },
        "wild": {
            "thresh": 0.2,
            "slope_above": 8,
            "slope_below": 1
        }
    },
    "distortion": {
        "gentle": {
            "distort": 0.2
        },
        "normal": {
            "distort": 0.5
        },
        "strong": {
            "distort": 0.75
        },
        "wild": {
            "distort": 0.9
        }
    },
    "echo": {
        "gentle": {
            "phase": 0.5,
            "decay": 1,
            "max_phase": 2
        },
        "normal": {
            "phase": 0.25,
            "decay": 2,
            "max_phase": 2
        },
        "strong": {
            "phase": 0.125,
            "decay": 4,
            "max_phase": 4
        },
        "wild": {
            "phase": 0.0625,
            "decay": 8,
            "max_phase": 8
        }
    },
    "eq": {
        "gentle": {
            "low": 0,
            "mid": 0,
            "high": 0
        },
        "normal": {
            "low": 0.12,
            "mid": 0.08,
            "high": 0.08
        },
        "strong": {
            "low": 0.28,
            "mid": 0.18,
            "high": 0.15
        },
        "wild": {
            "low": 0.45,
            "mid": 0.3,
            "high": 0.25
        }
    },
    "flanger": {
        "gentle": {
            "phase": 2,
            "depth": 3,
            "feedback": 0.15
        },
        "normal": {
            "phase": 1,
            "depth": 5,
            "feedback": 0.35
        },
        "strong": {
            "phase": 0.5,
            "depth": 8,
            "feedback": 0.6
        },
        "wild": {
            "phase": 0.25,
            "depth": 12,
            "feedback": 0.85
        }
    },
    "gverb": {
        "gentle": {
            "roomsize": 0.35,
            "revtime": 1,
            "damp": 0.4
        },
        "normal": {
            "roomsize": 0.55,
            "revtime": 2.5,
            "damp": 0.35
        },
        "strong": {
            "roomsize": 0.78,
            "revtime": 5,
            "damp": 0.28
        },
        "wild": {
            "roomsize": 1,
            "revtime": 8,
            "damp": 0.2
        }
    },
    "hpf": {
        "gentle": {
            "cutoff": 45
        },
        "normal": {
            "cutoff": 65
        },
        "strong": {
            "cutoff": 88
        },
        "wild": {
            "cutoff": 108
        }
    },
    "ixi_techno": {
        "gentle": {
            "time_dis": 0.08,
            "phase_offset": 0
        },
        "normal": {
            "time_dis": 0.05,
            "phase_offset": 0.1
        },
        "strong": {
            "time_dis": 0.03,
            "phase_offset": 0.2
        },
        "wild": {
            "time_dis": 0.015,
            "phase_offset": 0.35
        }
    },
    "krush": {
        "gentle": {
            "gain": 0.15
        },
        "normal": {
            "gain": 0.35
        },
        "strong": {
            "gain": 0.6
        },
        "wild": {
            "gain": 0.85
        }
    },
    "level": {
        "gentle": {
            "amp": 0.6
        },
        "normal": {
            "amp": 1
        },
        "strong": {
            "amp": 1.4
        },
        "wild": {
            "amp": 2
        }
    },
    "lpf": {
        "gentle": {
            "cutoff": 88
        },
        "normal": {
            "cutoff": 72
        },
        "strong": {
            "cutoff": 52
        },
        "wild": {
            "cutoff": 36
        }
    },
    "mono": {
        "gentle": {
            "amp": 0.7
        },
        "normal": {
            "amp": 1
        },
        "strong": {
            "amp": 1.2
        },
        "wild": {
            "amp": 1.5
        }
    },
    "nbpf": {
        "gentle": {
            "centre": 52,
            "res": 0.12
        },
        "normal": {
            "centre": 64,
            "res": 0.3
        },
        "strong": {
            "centre": 76,
            "res": 0.55
        },
        "wild": {
            "centre": 88,
            "res": 0.82
        }
    },
    "nhpf": {
        "gentle": {
            "cutoff": 45
        },
        "normal": {
            "cutoff": 65
        },
        "strong": {
            "cutoff": 88
        },
        "wild": {
            "cutoff": 108
        }
    },
    "nlpf": {
        "gentle": {
            "cutoff": 88
        },
        "normal": {
            "cutoff": 72
        },
        "strong": {
            "cutoff": 52
        },
        "wild": {
            "cutoff": 36
        }
    },
    "normaliser": {
        "gentle": {
            "line": 0.55
        },
        "normal": {
            "line": 0.7
        },
        "strong": {
            "line": 0.85
        },
        "wild": {
            "line": 0.98
        }
    },
    "nrbpf": {
        "gentle": {
            "centre": 52,
            "res": 0.12
        },
        "normal": {
            "centre": 64,
            "res": 0.3
        },
        "strong": {
            "centre": 76,
            "res": 0.55
        },
        "wild": {
            "centre": 88,
            "res": 0.82
        }
    },
    "nrhpf": {
        "gentle": {
            "cutoff": 45,
            "res": 0.15
        },
        "normal": {
            "cutoff": 65,
            "res": 0.35
        },
        "strong": {
            "cutoff": 88,
            "res": 0.55
        },
        "wild": {
            "cutoff": 108,
            "res": 0.8
        }
    },
    "nrlpf": {
        "gentle": {
            "cutoff": 90,
            "res": 0.15
        },
        "normal": {
            "cutoff": 72,
            "res": 0.35
        },
        "strong": {
            "cutoff": 52,
            "res": 0.55
        },
        "wild": {
            "cutoff": 36,
            "res": 0.82
        }
    },
    "octaver": {
        "gentle": {
            "octave": 0,
            "mix": 0.25
        },
        "normal": {
            "octave": 0,
            "mix": 0.4
        },
        "strong": {
            "octave": 12,
            "mix": 0.5
        },
        "wild": {
            "octave": 12,
            "mix": 0.7
        }
    },
    "pan": {
        "gentle": {
            "pan": 0.2
        },
        "normal": {
            "pan": 0.45
        },
        "strong": {
            "pan": 0.75
        },
        "wild": {
            "pan": 1
        }
    },
    "panslicer": {
        "gentle": {
            "phase": 0.5,
            "wave": 1
        },
        "normal": {
            "phase": 0.25,
            "wave": 1
        },
        "strong": {
            "phase": 0.125,
            "wave": 1
        },
        "wild": {
            "phase": 0.0625,
            "wave": 0
        }
    },
    "ping_pong": {
        "gentle": {
            "phase": 0.5,
            "feedback": 0.2,
            "pan": 0.3
        },
        "normal": {
            "phase": 0.25,
            "feedback": 0.4,
            "pan": 0.5
        },
        "strong": {
            "phase": 0.125,
            "feedback": 0.65,
            "pan": 0.7
        },
        "wild": {
            "phase": 0.0625,
            "feedback": 0.85,
            "pan": 1
        }
    },
    "pitch_shift": {
        "gentle": {
            "pitch": 0
        },
        "normal": {
            "pitch": 3
        },
        "strong": {
            "pitch": 7
        },
        "wild": {
            "pitch": 12
        }
    },
    "rbpf": {
        "gentle": {
            "centre": 52,
            "res": 0.12
        },
        "normal": {
            "centre": 64,
            "res": 0.3
        },
        "strong": {
            "centre": 76,
            "res": 0.55
        },
        "wild": {
            "centre": 88,
            "res": 0.82
        }
    },
    "reverb": {
        "gentle": {
            "room": 0.35,
            "damp": 0.65
        },
        "normal": {
            "room": 0.6,
            "damp": 0.5
        },
        "strong": {
            "room": 0.85,
            "damp": 0.35
        },
        "wild": {
            "room": 1,
            "damp": 0.25
        }
    },
    "rhpf": {
        "gentle": {
            "cutoff": 45,
            "res": 0.15
        },
        "normal": {
            "cutoff": 65,
            "res": 0.35
        },
        "strong": {
            "cutoff": 88,
            "res": 0.55
        },
        "wild": {
            "cutoff": 108,
            "res": 0.8
        }
    },
    "ring_mod": {
        "gentle": {
            "freq": 25
        },
        "normal": {
            "freq": 45
        },
        "strong": {
            "freq": 90
        },
        "wild": {
            "freq": 180
        }
    },
    "rlpf": {
        "gentle": {
            "cutoff": 90,
            "res": 0.15
        },
        "normal": {
            "cutoff": 72,
            "res": 0.35
        },
        "strong": {
            "cutoff": 52,
            "res": 0.55
        },
        "wild": {
            "cutoff": 36,
            "res": 0.82
        }
    },
    "slicer": {
        "gentle": {
            "phase": 0.5,
            "wave": 1,
            "pulse_width": 0.5
        },
        "normal": {
            "phase": 0.25,
            "wave": 1,
            "pulse_width": 0.5
        },
        "strong": {
            "phase": 0.125,
            "wave": 1,
            "pulse_width": 0.35
        },
        "wild": {
            "phase": 0.0625,
            "wave": 0,
            "pulse_width": 0.2
        }
    },
    "tanh": {
        "gentle": {
            "preamp": 1,
            "postamp": 0.8
        },
        "normal": {
            "preamp": 2,
            "postamp": 1
        },
        "strong": {
            "preamp": 4,
            "postamp": 1.2
        },
        "wild": {
            "preamp": 8,
            "postamp": 1.5
        }
    },
    "tremolo": {
        "gentle": {
            "phase": 4,
            "depth": 0.35
        },
        "normal": {
            "phase": 2.5,
            "depth": 0.5
        },
        "strong": {
            "phase": 1,
            "depth": 0.72
        },
        "wild": {
            "phase": 0.5,
            "depth": 0.92
        }
    },
    "vowel": {
        "gentle": {
            "voice": 0,
            "vowel": 1
        },
        "normal": {
            "voice": 0,
            "vowel": 2
        },
        "strong": {
            "voice": 0,
            "vowel": 4
        },
        "wild": {
            "voice": 0,
            "vowel": 6
        }
    },
    "whammy": {
        "gentle": {
            "disp": 0.08
        },
        "normal": {
            "disp": 0.2
        },
        "strong": {
            "disp": 0.45
        },
        "wild": {
            "disp": 0.9
        }
    },
    "wobble": {
        "gentle": {
            "phase": 1,
            "cutoff_min": 70,
            "cutoff_max": 100,
            "res": 0.5
        },
        "normal": {
            "phase": 0.5,
            "cutoff_min": 55,
            "cutoff_max": 110,
            "res": 0.65
        },
        "strong": {
            "phase": 0.25,
            "cutoff_min": 40,
            "cutoff_max": 115,
            "res": 0.78
        },
        "wild": {
            "phase": 0.125,
            "cutoff_min": 30,
            "cutoff_max": 120,
            "res": 0.9
        }
    }
};

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
