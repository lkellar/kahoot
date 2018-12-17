const defaults = {
    triangle: 'o',
    circle: 's',
    diamond: 'p',
    square: 'd'
};

async function keyDown(oKeyEvent) {
    let shape;

    shape = await fetchShape(oKeyEvent.key);
    if (shape) {
        const iframe = document.getElementById('gameBlockIframe').contentDocument;
        iframe.getElementsByClassName(`card-button--${shape}`)[0].click();
    }
}

async function fetchShape(key) {
    let storageItem = await browser.storage.sync.get();
    if (storageItem === {}) {
        storageItem = defaults;
    }
    return getKeyByValue(storageItem, key);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

window.addEventListener("keydown", keyDown);