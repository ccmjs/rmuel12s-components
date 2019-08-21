/**
 * @component ccm-certificate_view
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 2.0.0
 */

"use strict";

( () => {

    const component = {

        name: 'certificate_view',
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
                '../certificate_view/resources/html.js'
            ],
            abi: [
                'ccm.load',
                '../certificate_view/resources/abi.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
                'https://ccmjs.github.io/rmueller-components/certificate_view/resources/style.css'
            ],
            qr: [
                'ccm.load',
                'https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs/qrcode.min.js'
            ],
            store: ["ccm.store", {'name': 'rmuel12s_certificates'}]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask() && console.error ('This component requires MetaMask', 'https://metamask.io/');
                !this.storeUrl              && console.error ('Store uri missing!');
                !this.studentContract       && console.error ('Student contract address missing!');

                this.store.url = this.storeUrl;

                this.web3.setProvider (this.metamask.getProvider());

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.student = this.web3.eth.contract.new (
                    this.abi.student,
                    this.studentContract
                );

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html[0], {
                    change: event => {

                        const select = this.element.querySelector('select');

                        this.certificate = this.web3.eth.contract.new (
                            this.abi.certificate,
                            select.options[select.selectedIndex].value
                        );

                        this.showCertificate();
                    }
                }));

                this.store
                    .get    ()
                    .then   (this.setOptions);

                document.createElement('div');

                this.qrcode = new QRCode(document.createElement('span'));
            };


            /* Functions */

            this.accountChanged = accounts => {

                this.graduate = {
                    address: accounts [0]
                };

                this.web3.eth.contract.call (this.student, 'getStudent', [this.graduate.address])
                    .catch (console.error)
                    .then (this.setGraduate);

            };

            this.setGraduate = result => {
                this.graduate.firstname = result.firstname;
                this.graduate.lastname  = result.lastname;
            };

            this.setOptions = data => {

                data.forEach (certificate => {

                    const option = document.createElement ('option');

                    option.value        = certificate.key;
                    option.innerText    = certificate.name;

                    this.element.querySelector ('select').appendChild (option);
                });
            };

            this.showCertificate = () => {

                this.web3.eth.contract.call (this.certificate, 'getCertificate', [], {from: this.graduate.address})
                    .catch (console.error)
                    .then (result => {

                        if (result.passed) {

                            const check = this.element.querySelector('input').value;

                            this.qrcode.makeCode (`${check}c=${this.certificate.address}&g=${this.graduate.address}`);

                            this.ccm.helper.setContent (this.element.querySelector('li:last-child'), this.ccm.helper.html(this.html[1], {
                                graduate: `${this.graduate.firstname} ${this.graduate.lastname}`,
                                certificate: this.certificate.name,
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