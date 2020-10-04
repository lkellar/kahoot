const defaults = {
    triangle: 'o',
    circle: 's',
    diamond: 'p',
    square: 'd'
};

// Kahoot answers now have classes like answer-0, or answer-1
// So I order them, and use index in array to identify
const shapes = ['triangle', 'diamond', 'circle', 'square']

async function keyDown(oKeyEvent) {
    let shape;

    shape = await fetchShape(oKeyEvent.key);
    if (shape) {
        document.querySelector(`[data-functional-selector="answer answer-${shapes.indexOf(shape)}"]`).click();
    }
}

async function fetchShape(key) {
    let storageItem = await browser.storage.sync.get();
    if (storageItem === {}) {
        storageItem = defaults;
        browser.storage.sync.set(defaults);
    }
    return getKeyByValue(storageItem, key);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

window.addEventListener("keydown", keyDown);
