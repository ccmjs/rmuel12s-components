/**
 * @component ccm-certificate_request
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

( () => {

    const component = {

        name: 'certificate_request',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            web3: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/web3/versions/ccm.web3-2.0.0.js'
            ],
            metamask: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/metamask/versions/ccm.metamask-1.0.0.js'
            ],
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/certificate_request/resources/html.js'
            ],
            abi: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/certificate_request/resources/abi.js'
            ],
            css: [
                'ccm.load', [
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
                    'https://ccmjs.github.io/rmueller-components/certificate_request/resources/style.css'
                ]
            ],
            js: [
                'ccm.load', [
                    'https://code.jquery.com/jquery-3.3.1.min.js',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js'
                ]
            ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                if (this.metamask.isMetaMask()) {

                    this.web3.setProvider(this.metamask.getProvider());

                    this.metamask.enable(
                        accounts =>
                            this.graduate = accounts[0]
                    );

                    this.metamask.onAccountsChanged(
                        accounts =>
                            this.graduate = accounts[0]
                    );

                } else {
                    console.error ('metamask not installed!');
                    return;
                }

                if (this.metamask.networkVersion() === "1")     this.certificates = this.mainnet.certificates;
                if (this.metamask.networkVersion() === "4")     this.certificates = this.rinkeby.certificates;
                if (this.metamask.networkVersion() === "32")    this.certificates = this.geth2.certificates;
                if (this.metamask.networkVersion() === "42")    this.certificates = this.kovan.certificates;

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html, {
                    check: event =>
                        this.toggleInnerView (
                            this.element.querySelector('input').checked
                        ),

                    close: event =>
                        this.toggleOuterView(false),

                    save: event => {

                        const select = this.element.querySelector('select');
                        const address = select.options[select.selectedIndex].value;

                        this.contract =
                            this.web3.eth.contract.new (this.abi, address);

                        this.web3.eth.contract.events(this.contract, 'eWorkSubmitted', { fromBlock: 'latest' })
                            .on('data', data => window.alert('Certificate successful requested'))
                            .on('error', console.error);

                        this.toggleOuterView(false);
                    }
                }));

                this.certificates.map (certificate => {

                    const option = document
                        .createElement('option');

                    option.value        = certificate.address;
                    option.innerText    = certificate.name;

                    this.element.querySelector('select')
                        .appendChild(option);
                });

                document.body
                    .appendChild(this.root);

                this.toggleOuterView(true);
            };


            /* Functions */

            this.toggleInnerView = toggle => {

                if (toggle) {
                    this.element.querySelector('fieldset').removeAttribute('disabled');
                    this.element.querySelector('fieldset').style = 'opacity: 1;';
                } else {
                    this.element.querySelector('fieldset').setAttribute('disabled', 'disabled');
                    this.element.querySelector('fieldset').style = 'opacity: 0.4;';
                }
            };

            this.toggleOuterView = toggle => {

                if (toggle) {
                    document.querySelector('body div').style = 'opacity: 0.1;';
                    $(this.element.querySelector('.toast')).toast('show');
                } else {
                    document.querySelector('body div').style = 'opacity: 1;';
                    $(this.element.querySelector('.toast')).toast('dispose');
                }
            };

            this.request = work => {

                if (this.contract)
                    this.web3.eth.contract.send (
                        this.contract,
                        'submitWork(string)',
                        [work],
                        {
                            from:   this.graduate,
                            value:  0
                        }
                    );
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();