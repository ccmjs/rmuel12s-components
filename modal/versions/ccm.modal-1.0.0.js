/**
 * @component ccm-modal
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

(() => {

    const component = {

        name: 'modal',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/modal/resources/html.js'
            ],
            css: [
                'ccm.load', [
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
                ]
            ],
            js: [
                'ccm.load', [
                    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
                ]
            ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {
                this.renderModal();

                this.autorun && this.show();
            };


            /* Functions */

            this.renderModal = () => {
                this.ccm.helper.setContent (
                    this.element,
                    this.ccm.helper.html (this.html.modal, {
                        id      : this.mid,
                        title   : this.title,
                        body    : this.body,
                        footer  : this.footer
                    })
                );

                this.modal = $ (this.element.querySelector (`#${this.mid}`));
            };

            this.toggle = () =>
                this.modal.modal ('toggle');

            this.show = () =>
                this.modal.modal ('show');

            this.hide = () =>
                this.modal.modal ('hide');

            this.setOptions = options => {
                if (this.modal)
                    this.modal.modal (options);
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();