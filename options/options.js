function verifyDuplicates(values) {
    if (new Set(values).size < values.length) {
        document.getElementById('unique').hidden = false;
        restoreOptions();
        return false;
    }
    
    document.getElementById('unique').hidden = true;
    return true;
}

let activeSetter = null;
const setKeyText = '';

async function toggleSetter(id) {
    // if active setter is already the id, set it back to null. If the active setter is not the id, set it to the id
    activeSetter = activeSetter === id ? null : id;
    
    await restoreOptions();
}

async function setBinding(key, value) {
    let oldItems = await browser.storage.local.get();
    oldItems[key] = value;
    if (!verifyDuplicates(Object.values(oldItems))) {
        return false;
    }
    let storageItem = {};
    storageItem[activeSetter] = value;
    await browser.storage.local.set(storageItem);
    return true;
}


document.body.onkeydown = async (e) => {
    if (!activeSetter) {
        // if no buttons are active, no point in doing it.
        return;
    }
    if (!acceptableMappings.includes(e.key.toLowerCase())) {
        // If we get an unacceptable key (like someone out here using control), we don't do anything
        // in theory, it may be useful for an "anything goes" type deal, but its probably best for most users to only use standard letters
        return;
    }
    
    // if setting binding succeeds, reset the setter
    if (await setBinding(activeSetter, e.key)) {
        await toggleSetter(activeSetter);
    }
};

const shapes = ['triangle', 'diamond', 'circle', 'square'];

async function restoreOptions() {
    for (const shape of shapes) {
        if (activeSetter === shape) {
            document.getElementById(shape).querySelector('.binding').innerText = setKeyText;
        } else {
            const storageItem = await browser.storage.local.get(shape);
            let value = storageItem[shape];
            if (value === undefined) {
                value = defaults[shape];
                let miniStorageItem = {};
                miniStorageItem[shape] = defaults[shape];
                await browser.storage.local.set(miniStorageItem);
            }
            document.getElementById(shape).querySelector('.binding').innerText = value;
        }
    }
}

const acceptableMappings = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '`', '-', '=', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f20', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const defaults = {
    triangle: 'o',
    circle: 's',
    diamond: 'p',
    square: 'd'
};

document.addEventListener('DOMContentLoaded', async () => {
    await restoreOptions();
    for (const shape of shapes) {
        document.getElementById(shape).onclick = async (e) => {
            e.preventDefault();
            await toggleSetter(shape);
        };
    }
    
    document.getElementById('reset').onclick = async (e) => {
        e.preventDefault();
        await browser.storage.local.set(defaults);
        await toggleSetter(null);
    };
    
    document.getElementById('overlay').onclick = async (e) => {
        e.preventDefault();
        await toggleSetter(null);
    };
});
