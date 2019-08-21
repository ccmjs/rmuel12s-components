/**
 * @component ccm-crowdfunding_init
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 2.0.0
 */

"use strict";

(() => {

    const component = {

        name: 'crowdfunding_init',
        version: [2, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            web3: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/web3/versions/ccm.web3-3.0.0.js'
            ],
            metamask: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/metamask/versions/ccm.metamask-1.0.0.js'
            ],
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/crowdfunding_init/resources/html.js'
            ],
            deploy: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/crowdfunding_init/resources/deploy.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
            ],
            store: [ "ccm.store", { "name": "rmuel12s_components" } ],
            toggle: false
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {
                !this.metamask.isMetaMask() && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.storeUrl              && console.error ('Store URL is missing!');

                this.store.url = this.storeUrl;

                this.web3.setProvider (this.metamask.getProvider(), {transactionConfirmationBlocks: 1});

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.contract = this.web3.eth.contract.new (this.deploy.abi);

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html.main, {
                    more: () =>
                        this.element.querySelector ('span')
                            .appendChild (this.ccm.helper.html (this.html.requirement, {})),

                    send: () => this.createComponent()
                }));
            };


            /* Functions */

            this.accountChanged = accounts => {
                this.initiator = accounts [0];

                this.element.querySelector ('input[name=initiator]').value = this.initiator;
            };
            
            this.createComponent = () => {
                this.name          = this.element.querySelector ('input[name=name]');
                this.fund          = this.element.querySelector ('input[name=fund]');
                this.description   = this.element.querySelector ('textarea');
                this.requirements  = this.element.querySelector ('span').querySelectorAll ('input');

                if (this.isValidate ()) {

                    this.toggleSpinner ();

                    this.web3.eth.contract.deploy.send (this.contract, {
                        data: this.deploy.bytecode.object,
                        arguments: [
                            this.name.value,
                            JSON.stringify (Array.from (this.requirements).map (input => input.value)),
                            this.description.value || ""
                        ]
                    }, {
                        from:   this.initiator,
                        value:  this.web3.utils.toWei (this.fund.value, 'ether')
                    })
                        .then (this.handleResult)
                        .catch (console.error);

                }
            };

            this.isValidate = () => {

                this.name.value ?
                    this.name.classList.remove ('is-invalid') : this.name.classList.add ('is-invalid');

                this.fund.value ?
                    this.fund.classList.remove ('is-invalid') : this.fund.classList.add ('is-invalid');

                this.requirements.forEach (input => {
                    input.value ?
                        input.classList.remove ('is-invalid') : input.classList.add ('is-invalid');
                });

                return this.name.value && this.fund.value && this.web3.utils.isAddress (this.initiator);
            };

            this.handleResult = result => {

                this.ccm.helper.setContent (
                    this.element.querySelector ('.list-group'),
                    this.ccm.helper.html (this.html.done, {
                        component: this.name.value
                    }
                ));

                return this.store.set ({
                    key             : result.options.address,
                    name            : this.name.value,
                    initiator       : this.initiator,
                    fund            : this.fund.value,
                    description     : this.description.value,
                    requirements    : Array.from(this.requirements).map (input => input.value),
                    status          : 0
                });

            };

            this.toggleSpinner = () => {
                if (this.toggle) {
                    this.element.querySelector ('.btn-primary').removeAttribute ('disabled');
                    this.element.querySelector ('.spinner-border').classList.add ('d-none');
                } else {
                    this.element.querySelector ('.btn-primary')
                        .setAttribute ('disabled', 'disabled');
                    this.element.querySelector ('.spinner-border').classList.remove ('d-none');
                }

                this.toggle = !this.toggle;
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();