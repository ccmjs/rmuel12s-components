/**
 * @component ccm-crowdfunding_list
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

'use strict';

(() => {

    const component = {

        name: 'crowdfunding_list',
        ccm: '../ccm/ccm-21.2.0.min.js',

        config: {
            html: [
                'ccm.load',
                '../crowdfunding_list/resources/html.js'
            ],
            crowdfunding: [
                'ccm.component',
                '../crowdfunding/ccm.crowdfunding.js'
            ],
            css: [
                'ccm.load', [
                    '../ccm/bootstrap.min.css',
                    '../crowdfunding_list/resources/style.css'
                ]
            ],
            store: [ 'ccm.store', { 'name': 'rmuel12s_crowdfunding' } ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.data.storeUrl && console.error ('Store URL is missing!');

                this.store.url = this.data.storeUrl;

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html.main, {}));

                this.store
                    .get    ()
                    .then   (this.renderComponents);
            };


            /* Functions */

            this.renderComponents = data => {

                data.forEach (contract => {

                    this.crowdfunding.start ({
                        data: {
                            storeUrl        : this.data.storeUrl,
                            contractAddress : contract.key
                        }
                    })
                        .then (instance => this.element.querySelector ('.container-fluid').append (instance.root));
                });
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();
