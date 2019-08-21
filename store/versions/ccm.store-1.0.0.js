/**
 * @component ccm-store
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

( () => {

    const component = {

        name: 'store',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            web3: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/web3/versions/ccm.web3-2.0.0.js'
            ],
            abi: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/store/resources/abi_store.js'
            ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};

            this.start  = async () => {
                this.web3.setProvider('https://admin:un21n77w@vm-2d05.inf.h-brs.de/geth1');

                this.contract = this.web3.eth.contract.new (this.abi, this.contract_address);
            };


            /* Functions */

            this.setStore = async value => {

                return this.web3.eth.contract.send (
                    this.contract,
                    'setStore(string)',
                    [value],
                    {
                        from:   "0x6c20d41bd843f7d6b9025639453cb2970e0253f0",
                        value:  0
                    }
                );
            };

            this.getStore = () =>
                this.web3.eth.contract.call(this.contract, 'getStore');
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();