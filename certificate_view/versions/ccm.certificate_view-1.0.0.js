/**
 * @component ccm-certificate_view
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

( () => {

    const component = {

        name: 'certificate_view',
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
            student: [
                'ccm.start',
                'https://ccmjs.github.io/rmueller-components/certificate_student/versions/ccm.certificate_student-1.0.0.js', {
                    'contract_address': '0x3B0Bf3F9700Bad447D944924731Ba357905F47AC'
                }
            ],
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/certificate_view/resources/html.js'
            ],
            abi: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/certificate_view/resources/abi.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
                'https://ccmjs.github.io/rmueller-components/certificate_view/resources/style.css'
            ],
            qr: [
                'ccm.load',
                'https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs/qrcode.min.js'
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

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html[0], {
                    change: event => {

                        const select = this.element.querySelector('select');

                        this.selectedCertificate = this.certificates[select.selectedIndex - 1];

                        this.showCertificate();
                    }
                }));

                this.certificates.map(certificate => {

                    const option = document.createElement('option');

                    option.value        = certificate.address;
                    option.innerText    = certificate.name;

                    this.element.querySelector('select').appendChild(option);
                });

                this.selectedCertificate = this.certificates[0];

                this.contract = this.web3.eth.contract.new (
                    this.abi,
                    this.selectedCertificate.address
                );

                document.createElement('div');

                this.qrcode = new QRCode(document.createElement('span'));
            };


            /* Functions */

            this.showCertificate = () => {

                this.contract.options.address = this.selectedCertificate.address;

                this.web3.eth.contract.call(this.contract, 'getCertificate', [], {from: this.graduate})
                    .catch(console.error)
                    .then(result => {

                        if (result.passed) {

                            const uri = this.element.querySelector('input').value;

                            this.qrcode.makeCode(`${uri}c=${this.selectedCertificate.address}&g=${this.graduate}`);

                            this.ccm.helper.setContent (this.element.querySelector('li:last-child'), this.ccm.helper.html(this.html[1], {
                                graduate: `${this.student.firstname} ${this.student.lastname}`,
                                certificate: this.selectedCertificate.name,
                                location: 'St. Augustin',
                                date: new Date().toDateString(),
                                qrcode: this.qrcode._el
                            }));
                        } else {
                            this.ccm.helper.setContent (this.element.querySelector('li:last-child'), this.ccm.helper.html(this.html[2], {}));
                        }
                    });
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();