/**
 * @component ccm-faucet
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 2.0.0
 */

( () => {

    const component = {

        name: 'faucet',
        version: [2, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            counter: 0,
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
                'https://ccmjs.github.io/rmueller-components/faucet/resources/html.js'
            ],
            abi: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/faucet/resources/abi.js'
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
                !this.contractAddress       && console.error ('Contract address not given!');
                !this.mainAccount           && console.error ('Main account not given!');

                this.web3.setProvider ('https://admin:un21n77w@vm-2d05.inf.h-brs.de/geth1');

                this.metamask.enable            (this.setAddress);
                this.metamask.onAccountsChanged (this.setAddress);

                this.contract = this.web3.eth.contract.new (this.abi, this.contractAddress);

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html, {
                    request: () => {

                        if (!this.web3.utils.isAddress (this.account)) {
                            console.error ('Please set an accounts first!');
                        }

                        this.toggleSpinner (true);

                        this.web3.eth.contract.send (
                            this.contract,
                            'requestEther(address)',
                            [this.account],
                            {
                                from: this.mainAccount
                            }
                        )
                        .on('receipt', receipt => {
                            
                            this.counter++;

                            this.web3.eth.contract.call (this.contract, 'getBalance(address)', [this.account])
                                .then (this.setBalance);

                            this.toggleSpinner (false);
                        });
                    }
                }));
            };


            /* Functions */

            this.setAddress = accounts => {

                this.account = accounts[0];
                this.counter = 0;

                this.web3.eth.contract.call (this.contract, 'getBalance(address)', [this.account])
                    .then(this.setBalance);

                this.element.querySelector('#account').innerHTML =
                    this.account;
            };

            this.setBalance = balance =>
                this.element.querySelector ('#balance').innerHTML =
                    `${this.web3.utils.fromWei (balance, this.web3.units.ether)} ether (+${this.counter})`;

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
} )();