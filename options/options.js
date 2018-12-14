function saveOptions(e) {
    browser.storage.sync.set({
        triangle: document.querySelector("#triangle").value,
        diamond: document.querySelector("#diamond").value,
        circle: document.querySelector("#circle").value,
        square: document.querySelector("#square").value
    });
    console.log('saved');
    e.preventDefault();
}

async function restoreOptions() {
    const shapes = ['triangle', 'diamond', 'circle', 'square'];
    for (const i of shapes) {
        const storageItem = await browser.storage.sync.get(i);
        document.getElementById(i).value = storageItem[i];
    }
}
document.addEventListener('DOMContentLoaded', async () => {await restoreOptions()});
document.querySelector("form").addEventListener("submit", saveOptions);