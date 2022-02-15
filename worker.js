self.importScripts('wasm_exec.js', 'ransom-letter.js');

const go = new Go();
WebAssembly.instantiateStreaming(fetch("goWASM.wasm"), go.importObject).then((result) => {
    go.run(result.instance);
    self.postMessage({
        html: 'ready',
        time: 0,
    });
});

self.onmessage = function(event) {
    let inputText = {
        /** @type {String} */
        mode: event.data['mode'],
        /** @type {String} */
        text: event.data['text'],
    };
    /** @type {String} */
    let html = '';
    /** @type {Number}} */
    let t0 = 0;
    /** @type {Number}} */
    let t1 = 0;
    if (inputText.mode == '0') {
        t0 = performance.now();
        html = ransomLetter(inputText.text);
        t1 = performance.now();
    } else {
        t0 = performance.now();
        html = ransomLetterJS(inputText.text);
        t1 = performance.now();
    }
    self.postMessage({
        html: html,
        time: t1 - t0,
    });
};