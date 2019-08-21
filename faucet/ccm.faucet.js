/**
 * @component ccm-faucet
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

'use strict';

(() => {

    const component = {

        name: 'faucet',
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
                '../faucet/resources/html.js'
            ],
            abi: [
                'ccm.load',
                '../faucet/resources/abi.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
            ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init = async () => {};
            this.ready = async () => {};
            this.start = async () => {

                !this.metamask.isMetaMask() && console.error ('This component requires MetaMask', 'https://metamask.io/');
                !this.data.contractAddress  && console.error ('Contract address not given!');
                !this.data.mainAccount      && console.error ('Main account not given!');

                this.web3.setProvider ('https://admin:un21n77w@vm-2d05.inf.h-brs.de/geth1');

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.data.contract = this.web3.eth.contract (this.abi, this.data.contractAddress);

                this.data.counter = 0;

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html, {

                    request: () => {

                        if (!this.web3.utils.isAddress (this.data.account))
                            console.error ('Please set an accounts first!');

                        this.toggleSpinner (true);

                        this.data.contract.method ('requestEther(address)', [ this.data.account ]).send ({
                            from: this.data.mainAccount
                        })
                            .then (this.requested)
                            .catch  (console.error);
                    }
                }));
            };


            /* Functions */

            this.accountChanged = accounts => {

                this.data.account = accounts [0];
                this.data.counter = 0;

                this.data.contract.method ('getBalance(address)', [ this.data.account ]).call ({
                    from: this.data.mainAccount
                })
                    .then   (this.setBalance)
                    .catch  (console.error);

                this.element.querySelector ('#account').innerHTML = this.data.account;
            };

            this.requested = result => {

                this.data.counter++;

                this.data.contract.method ('getBalance(address)', [ this.data.account ]).call ({
                    from: this.data.mainAccount
                })
                    .then   (this.setBalance)
                    .catch  (console.error);

                this.toggleSpinner (false);
            };

            this.setBalance = balance =>
                this.element.querySelector ('#balance').innerHTML =
                    `${this.web3.utils.fromWei (balance, this.web3.units.ether)} ether (+${this.data.counter})`;

            this.toggleSpinner = toggle => {

                if (toggle) {

                    this.element.querySelector ('.btn-primary')
                        .setAttribute ('disabled', 'disabled');

                    this.element.querySelector ('.spinner-border')
                        .classList.remove ('d-none');

                } else {

                    this.element.querySelector ('.btn-primary')
                        .removeAttribute ('disabled');

                    this.element.querySelector ('.spinner-border')
                        .classList.add ('d-none');
                }
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();
