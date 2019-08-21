/**
 * @component ccm-toast
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

( () => {

    const component = {

        name: 'toast',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/toast/resources/html.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
                'https://ccmjs.github.io/rmueller-components/toast/resources/style.css'
            ],
            js: [
                'ccm.load', [
                    'https://code.jquery.com/jquery-3.3.1.min.js',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js'
                ]
            ],

            autostart:      false,
            autohide:       false,
            delay:          5000,
            title:          'Title',
            body:           '',
            position:       'top-right',
            blurSelector:   undefined
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html, {
                    'title':    this.title,
                    'body':     this.body,
                    'position': this.position,
                    'autohide': this.autohide,
                    'delay':    this.delay,
                    'close':    this.close
                }));

                this.toast =
                    $(this.element.querySelector('.toast'));

                if (this.autostart)
                    this.changeState('show');

                if (this.blurSelector)
                    this.toggleBlur(true);
            };


            /* Functions */

            this.setTitle = title =>
                this.element.querySelector('strong').innerText = title;

            this.setBody = body =>
                this.element.querySelector('.toast-body').innerHTML = body;

            this.closeCallback = callback =>
                this.element.querySelector('button').onclick = callback;

            this.changeState = state =>
                this.toast.toast(state);

            this.setPosition = position => {
                this.element.querySelector('.toast').classList.remove(this.position);
                this.position = position;
                this.element.querySelector('.toast').classList.add(this.position);
            };

            this.toggleBlur = toggle => {
                if (toggle) {
                    document.querySelector(this.blurSelector).style = 'opacity: 0.1;';
                } else {
                    document.querySelector(this.blurSelector).style = 'opacity: 1;';
                }
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();