/**
 * Convert Scratch number inputs in 0–100 (percent) to 0–1 for synthdefs.
 * Values in 0–1 are still accepted for older projects.
 */

const Cast = require('../../util/cast');

const DEFAULT_PERCENT = 50;

/** Default volume on use instrument when not set (matches old “normal” style). */
const DEFAULT_INSTRUMENT_AMP_PERCENT = 75;

/**
 * @param {*} arg - block input.
 * @param {number} [defaultPercent] - used when arg is missing or NaN.
 * @returns {number} value in 0–1.
 */
function percentArgToUnit (arg, defaultPercent = DEFAULT_PERCENT) {
    let n = Cast.toNumber(arg);
    if (Number.isNaN(n)) {
        n = defaultPercent;
    }
    if (n > 1) {
        n = n / 100;
    }
    return Math.min(Math.max(n, 0), 1);
}

module.exports = {
    DEFAULT_INSTRUMENT_AMP_PERCENT,
    DEFAULT_PERCENT,
    percentArgToUnit
};
