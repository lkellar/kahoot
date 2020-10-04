function saveOptions(e) {
    const selectors = ['#triangle', '#diamond', '#circle', '#square'];
    const values = selectors.map((selector) => document.querySelector(selector).value);
    if (new Set(values).size < values.length) {
        document.getElementById('unique').hidden = false;
        restoreOptions();
        e.preventDefault();
        return;
    }
    
    document.getElementById('unique').hidden = true;
    
    browser.storage.sync.set({
        triangle: document.querySelector("#triangle").value,
        diamond: document.querySelector("#diamond").value,
        circle: document.querySelector("#circle").value,
        square: document.querySelector("#square").value
    });
    e.preventDefault();
}

async function restoreOptions() {
    const shapes = ['triangle', 'diamond', 'circle', 'square'];
    for (const i of shapes) {
        const storageItem = await browser.storage.sync.get(i);
        let value = storageItem[i];
        if (value === undefined) {
            value = defaults[i];
        }
        document.getElementById(i).value = value;
    }
}

const defaults = {
    triangle: 'o',
    circle: 's',
    diamond: 'p',
    square: 'd'
};

document.addEventListener('DOMContentLoaded', async () => {await restoreOptions()});
document.querySelector("form").addEventListener("submit", saveOptions);