const defaults = {
    triangle: 'o',
    circle: 's',
    diamond: 'p',
    square: 'd'
};

// Kahoot answers now have classes like answer-0, or answer-1
// So I order them, and use index in array to identify
const shapes = ['triangle', 'diamond', 'circle', 'square'];

async function keyDown(oKeyEvent) {
    const shape = await fetchShape(oKeyEvent.key);

    if (shape !== undefined) {
        document.querySelector(`[data-functional-selector*="answer-${shapes.indexOf(shape)}"]`)?.click();
    } else if (oKeyEvent.key.toLowerCase() === 'enter') {
        document.querySelector('[data-functional-selector="multi-select-submit-button"]')?.click();
    }
}

async function fetchShape(key) {
    let storageItem = await browser.storage.local.get();
    if (storageItem === {} || storageItem == undefined || Object.keys(storageItem).length === 0) {
        storageItem = defaults;
        await browser.storage.local.set(defaults);
    }
    return getKeyByValue(storageItem, key);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

window.addEventListener("keydown", keyDown);
