function keyDown(oKeyEvent) {
    let shape;

    if (oKeyEvent.key === 's') {
        shape = 'circle';
    } else if (oKeyEvent.key === 'd') {
        shape = 'square';
    } else if (oKeyEvent.key === 'p') {
        shape = 'diamond';
    } else if (oKeyEvent.key === 'o') {
        shape = 'triangle'
    }
    console.log(shape);
    const iframe = document.getElementById('gameBlockIframe').contentDocument;
    iframe.getElementsByClassName(`card-button--${shape}`)[0].click();
}
window.addEventListener("keydown", keyDown);