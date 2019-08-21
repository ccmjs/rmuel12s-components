/**
 * @component ccm-store
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

"use strict";

(() => {

    const component = {

        name: 'store',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            web3: [
                'ccm.instance',
                '../web3/versions/ccm.web3-4.0.0.js'
            ],
            abi: [
                'ccm.load',
                '../store/resources/abi.js'
            ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};

            this.start  = async () => {

                this.web3.setProvider ('https://admin:un21n77w@vm-2d05.inf.h-brs.de/geth2');

                this.account    = this.web3.eth.accounts.privateKeyToAccount (this.privateKey);
                this.contract   = this.web3.eth.contract (this.abi, this.storeContractAddress);

            };


            /* Functions */

            this.setStore = async value => {

                const method = this.contract.method ('setStore', [value]);

                const gasLimit = await method.estimateGas();

                const nonce = await this.web3.eth.getTransactionCount (this.account.address);

                const transaction = {
                    from: this.account.address,
                    nonce: `0x${nonce.toString (16)}`,
                    gasPrice: '0x09184e72a000',
                    gasLimit: `0x${(gasLimit * 2).toString (16)}`,
                    to: this.storeContractAddress,
                    value: '0x0',
                    data: method.encodeABI()
                };

                const signedTransaction =
                    await this.web3.eth.accounts.signTransaction (transaction, this.account.privateKey);

                return this.web3.eth.sendSignedTransaction (signedTransaction.rawTransaction);
            };

            this.getStore = () =>
                this.contract.method ('getStore').call();
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();
