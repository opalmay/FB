'use strict'
// JS to be injected while in messenger

export { fixNewMessegeInput }

//Input keeps going into focus with every click around the chat. Makes sense on desktop but hella annoying on mobile
function fixNewMessegeInput() {
    var input = document.querySelector('._5rpu');
    var blur = () => input.blur();
    function forceFocus() {
        input.removeEventListener('focus', blur);
        input.focus();
        input.addEventListener('focus', blur);
    }
    input.addEventListener('touchend', () => forceFocus());
    input.addEventListener('focus', blur)
}