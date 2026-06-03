/**
 * Loads shared browser dependencies (CDN scripts / ESM modules) once per URL.
 * Used by built-in extensions that must not bundle large WASM assets into scratch-vm.
 */
class SharedDependencies {
    constructor () {
        /**
         * @type {Map<string, Promise<void>>}
         */
        this._loads = new Map();
    }

    /**
     * Load a script or ESM module from a URL. Deduplicates concurrent requests.
     * For ESM bundles (e.g. supersonic-scsynth), uses dynamic import and exposes
     * SuperSonic on globalThis when present in the module namespace.
     * @param {string} url - Absolute URL to load.
     * @returns {Promise<void>} Resolves when the dependency is available.
     */
    loadScript (url) {
        if (this._loads.has(url)) {
            return this._loads.get(url);
        }

        const promise = this._loadOnce(url);
        this._loads.set(url, promise);
        return promise;
    }

    _loadOnce (url) {
        if (typeof document === 'undefined') {
            return Promise.reject(new Error('loadScript requires a browser environment'));
        }

        const isEsmModule = /\.m?js(\?|$)/i.test(url);

        if (isEsmModule) {
            return import(/* webpackIgnore: true */ url)
                .then(mod => {
                    if (mod && mod.SuperSonic) {
                        const g = typeof globalThis !== 'undefined' ? globalThis : window;
                        g.SuperSonic = mod.SuperSonic;
                    }
                });
        }

        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[data-shared-dep="${url}"]`);
            if (existing) {
                if (existing.dataset.loaded === 'true') {
                    resolve();
                    return;
                }
                existing.addEventListener('load', () => resolve());
                existing.addEventListener('error', reject);
                return;
            }

            const script = document.createElement('script');
            script.dataset.sharedDep = url;
            script.src = url;
            script.async = true;
            script.onload = () => {
                script.dataset.loaded = 'true';
                resolve();
            };
            script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
            document.head.appendChild(script);
        });
    }
}

module.exports = SharedDependencies;
