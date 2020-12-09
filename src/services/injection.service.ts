import { WebView } from '@nativescript/core';
import { fixNewMessegeInput } from './injection-assets/messenger.js';

export { loadCss, inject }

function inject(webView: WebView, isMessenger: boolean) {
    let cssStr = loadCss(isMessenger);
    // loadCss(isMessenger).then(res => cssStr = res)
    let jsStr = `
    var parent = document.getElementsByTagName('head').item(0);
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = \`${cssStr}\`;
    parent.appendChild(style);
    var meta = '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">';
    parent.innerHTML += meta;
`;
    if (isMessenger) {
        jsStr += stringifyFunction(fixNewMessegeInput);
    } else {
        //Main site scripts go here
    }
    webView.android.evaluateJavascript(
        jsStr,
        null
    );
    return cssStr
}

function loadCss(isMessenger: boolean) {
    //I don't know how to load this from a file, its been hours please send help ;_;
    if(isMessenger){
        return `
        * {
            max-width:332px;
            -webkit-tap-highlight-color: transparent;
        }
        /* contacts */
        /*._1enh._7q1s{
        max-width:30px !important;
        }*/
        /* new msg */
        /* ._1enh._7q1s{
        display: none;
        } */
        /*chat content*/
        ._41ud {
            margin-left:15px;
        }
            /*feed videos*/
        ._3058._15gf._3duc {
            width: 100%;
        }
            /*mini pictures*/
            /* ._1t_q ._1t_r, ._1t_q ._4ldz, ._1t_q {
                width: 16px;
                height: 16px;
            } */
        `
    }
        else{
            return `
            /* stories */
.v8c10jal.v8c10jal{
    display:none;
}
.bp9cbjyn.cwj9ozl2.j83agx80.cbu4d94t.ni8dbmo4.stjgntxs.l9j0dhe7.k4urcfbm > div{
    min-width:0 !important
  }
  /* feed */
  .rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.kbz25j0m.btwxx1t3.sv5sfqaa.o22cckgh.obtkqiv7.fop5sh7t{
    margin: 0;
  }
  /* comments in comment view */
  .rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t.pfnyh3mw.d2edcug0.hpfvmrgz.hybvsw6c.gitj76qy.dp1hu0rb.kelwmyms.dzul8kyi.e69mrdg2{
    max-height: 100%;
  }
  /* buttons on photo in comment view */
  .n7fi1qx3.ni8dbmo4.stjgntxs.pmk7jnqg.kr520xx4.tkr6xdv7{
    display:none;
  }
  /*bye wasted screen space*/
  .iqfcb0g7.l9j0dhe7.taijpn5t.datstx6m.buofh1pr.j83agx80.bp9cbjyn,
  .j83agx80.cbu4d94t.buofh1pr.datstx6m.p01isnhg.l9j0dhe7.iqfcb0g7.tqsryivl,
  .bp9cbjyn.j83agx80.l9j0dhe7.pw8zj2ei.bkyfam09,
  .bp9cbjyn.j83agx80.l9j0dhe7.nos9j3a5,
  .rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t.g5gj957u.d2edcug0.hpfvmrgz.rj1gh0hx.buofh1pr.q4kn84j7{
    flex-grow:0;
  height:unset;
}
            `
        }
    }
    // const fileName = isMessenger ? 'messenger' : 'facebook';
    // const response = await fetch(`/src/services/injection-assets/${fileName}.css`);
    // const text = await response.text();
    // return text;
function stringifyFunction(obj) {
    var placeholder = '____PLACEHOLDER____';
    var fns = [];
    var json = JSON.stringify(obj, function (key, value) {
        if (typeof value === 'function') {
            fns.push(value);
            return placeholder;
        }
        return value;
    }, 2);
    json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function (_) {
        return fns.shift();
    });
    return '(' + json + ')();';
};