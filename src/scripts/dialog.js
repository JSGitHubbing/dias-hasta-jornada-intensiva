var dialog;
var dialogDisplay = false;


function toggleDialog() {
    dialog = document.getElementById('dialog')
    dialogDisplay = !dialogDisplay
    dialog.style.setProperty('visibility', dialogDisplay ? 'visible' : 'hidden')
}