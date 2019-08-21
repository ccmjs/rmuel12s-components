/**
 * @component ccm-certificate_approve
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 2.0.0
 */

"use strict";

(() => {

    const component = {

        name: 'certificate_approve',
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
                'https://ccmjs.github.io/rmueller-components/certificate_approve/resources/html.js'
            ],
            abi: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/certificate_approve/resources/abi.js'
            ],
            css: [
                'ccm.load', [
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
                    'https://ccmjs.github.io/rmueller-components/certificate_approve/resources/style.css'
                ]
            ],
            store: ["ccm.store", {'name': 'rmuel12s_courses'}]
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

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html, {

                    change: event => {

                        const select = this.element.querySelector('select');

                        this.certificate = this.web3.eth.contract.new (
                            this.abi.certificate,
                            select.options[select.selectedIndex].value
                        );

                        this.readCertificate();
                    },

                    keyup: event => {
                        this.graduate = event.path[0].value;
                        this.readCertificate();
                    },

                    approve: event => {

                        if (this.web3.utils.isAddress (this.graduate) && this.certificate) {

                            this.web3.eth.contract.send (
                                this.certificate,
                                'approveWork(address,uint256,bool)',
                                [this.graduate, 0, true],
                                {
                                    from:   this.approver,
                                    value:  0
                                }
                            )
                                .then (receipt => {
                                    this.element.querySelector('.spinner-border')
                                        .classList.add('d-none');

                                    this.element.querySelector('button')
                                        .removeAttribute('disabled');
                                });

                            this.element.querySelector('button').setAttribute('disabled', 'disabled');
                            this.element.querySelector('.spinner-border').classList.remove('d-none');
                        }
                    }

                }));

                this.store
                    .get    ()
                    .then   (this.setOptions);
            };


            /* Functions */

            this.accountChanged = accounts =>
                this.approver = accounts [0];

            this.setOptions = data => {

                data.forEach (certificate => {

                    const option = document.createElement ('option');

                    option.value        = certificate.key;
                    option.innerText    = certificate.name;

                    this.element.querySelector ('select').appendChild (option);
                });
            };

            this.readCertificate = () => {

                console.log (this.web3.utils.isAddress (this.graduate) && this.certificate);

                if (this.web3.utils.isAddress (this.graduate) && this.certificate) {

                    this.web3.eth.contract.call (this.certificate, 'getCertificate', [], {from: this.graduate})
                        .catch (console.error)
                        .then (result => {

                            this.web3.eth.contract.call (this.student, 'getStudent', [this.graduate])
                                .catch (console.error)
                                .then (result2 => {

                                    const code = this.element.querySelectorAll ('code');

                                    code[0].innerText = `${result2.firstname} ${result2.lastname}`;
                                    code[1].innerText = result.submission;
                                    code[2].innerText = new Date (parseInt (result.timestamp) * 1000).toLocaleString();
                                    code[3].innerText = result.passed;
                                });

                        });

                } else {

                    this.element.querySelectorAll('code')[0].innerText = '-';
                    this.element.querySelectorAll('code')[1].innerText = '-';
                    this.element.querySelectorAll('code')[2].innerText = '-';
                    this.element.querySelectorAll('code')[3].innerText = '-';
                }

            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();