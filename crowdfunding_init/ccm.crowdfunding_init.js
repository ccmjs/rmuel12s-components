/**
 * @component ccm-crowdfunding_init
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */


'use strict';

(() => {

    const component = {

        name: 'crowdfunding_init',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            web3: [
                'ccm.instance',
                '../web3/versions/ccm.web3-4.0.0.js'
            ],
            metamask: [
                'ccm.instance',
                '../metamask/versions/ccm.metamask-2.0.0.js'
            ],
            html: [
                'ccm.load',
                '../crowdfunding_init/resources/html.js'
            ],
            deploy: [
                'ccm.load',
                '../crowdfunding_init/resources/deploy.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
            ],
            js: [
                'ccm.load', [
                    'https://code.jquery.com/jquery-3.4.1.slim.min.js',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
                ]
            ],
            store: [ 'ccm.store', { name: 'rmuel12s_crowdfunding' } ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask() && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.storeUrl              && console.error ('Store URL is missing!');

                this.store.url = this.storeUrl;

                this.web3.setProvider (this.web3.givenProvider());

                this.web3.setProvider (this.metamask.getProvider(), { transactionConfirmationBlocks: 1 });

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.data = {
                    contract: this.web3.eth.contract (this.deploy.abi)
                };

                this.render();

                this.elements = {
                    name        : this.element.querySelector ('input[name=name]'),
                    description : this.element.querySelector ('textarea'),
                    fund        : this.element.querySelector ('input[name=fund]'),
                    deposit     : this.element.querySelector ('input[name=deposit]'),
                    timeFrame   : this.element.querySelector ('input[name=time-frame]'),
                    initiator   : this.element.querySelector ('input[name=initiator]')
                };
            };


            /* Functions */

            this.accountChanged = accounts => {

                this.data.initiator = this.web3.utils.toChecksumAddress (accounts [0]);

                this.elements.initiator.value = this.data.initiator;
            };

            this.render = () => {

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html.main, {

                    more: () =>
                        this.element.querySelector ('#requirements')
                            .appendChild (this.ccm.helper.html (this.html.requirement, {})),

                    settings: () =>
                        $ (this.element.querySelector ('.collapse')).collapse ('toggle'),

                    send: () =>
                        this.createContract()
                }));
            };

            this.createContract = () => {

                this.elements.requirements = this.element.querySelectorAll ('#requirements input');

                this.data.arguments = [
                    this.elements.name.value,
                    JSON.stringify (Array.from (this.elements.requirements).map (input => input.value)),
                    this.elements.description.value,
                    this.web3.utils.toWei (this.elements.deposit.value, 'ether'),
                    this.elements.timeFrame.value
                ];

                if (this.isValidate ()) {

                    this.toggleSpinner ();

                    this.data.contract.deploy ({
                        data:       this.deploy.bytecode.object,
                        arguments:  this.data.arguments
                    }).send ({
                        from:   this.data.initiator,
                        value:  this.web3.utils.toWei (this.elements.fund.value, 'ether')
                    })
                        .then (this.handleReceipt)
                        .catch (console.error);
                }
            };

            this.isValidate = () => {

                this.elements.name.value ?
                    this.elements.name.classList.remove ('is-invalid') :
                    this.elements.name.classList.add ('is-invalid');

                this.elements.requirements [0].value ?
                    this.elements.requirements [0].classList.remove ('is-invalid') :
                    this.elements.requirements [0].classList.add ('is-invalid');

                return (
                    this.elements.name.value &&
                    this.elements.requirements [0].value &&
                    this.web3.utils.isAddress (this.data.initiator)
                );
            };

            this.handleReceipt = receipt => {

                this.ccm.helper.setContent (
                    this.element.querySelector ('.list-group'),
                    this.ccm.helper.html (this.html.done, {
                        component: this.elements.name.value
                    }
                ));

                return this.store.set ({
                    key             : receipt.options.address,
                    name            : this.elements.name.value,
                    requirements    : Array.from (this.elements.requirements).map (input => input.value),
                    description     : this.elements.description.value,
                    fund            : parseFloat (this.elements.fund.value),
                    deposit         : parseFloat (this.elements.deposit.value),
                    timeFrame       : parseFloat (this.elements.timeFrame.value),
                    initiator       : this.data.initiator,
                    status          : 0
                });
            };

            this.toggleSpinner = () => {

                this.element.querySelector ('.btn-primary')
                    .setAttribute ('disabled', 'disabled');

                this.element.querySelector ('.spinner-border').classList.remove ('d-none');
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();
