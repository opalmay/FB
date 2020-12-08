// import css from '../assets/styles/messenger.css'

export {loadCss,injectCss}

function injectCss(webView) {
    const jsStr = `
    var parent = document.getElementsByTagName('head').item(0);
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = \`${loadCss()}\`;
    parent.appendChild(style);
    // var meta = '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">';
    // parent.innerHTML += meta;

    var el = document.querySelector('._5rpu');
    var blur = () => el.blur();
    function forceFocus() {
        el.removeEventListener('focus',blur);
        el.focus();
        el.addEventListener('focus',blur);
    }
    el.addEventListener('touchend',()=>forceFocus());
    el.addEventListener('focus',blur)
`;
    webView.android.evaluateJavascript(
        jsStr,
        null
    );
}

function loadCss() {
    return ` 
    * {
      max-width: 100vw;
      -webkit-tap-highlight-color: transparent;
    }
    /* contacts */
    /*._1enh._7q1s{
    max-width:30px !important;
    }*/
    /*chat side*/
    ._4_j5{
    /*display: none;*/
    }
    /* new msg */
    ._1enh._7q1s{
    /*display: none;*/
    }
    /*chat content*/
    ._41ud{
    margin-left:15px;
    }
    /*feed videos*/
    ._3058._15gf._3duc{
    width: 100%;
    }
    /*mini pictures*/
    ._1t_q ._1t_r, ._1t_q ._4ldz, ._1t_q {
        width: 16px;
        height: 16px;
    }
    `
}