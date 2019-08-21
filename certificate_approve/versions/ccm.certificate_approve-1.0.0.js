/**
 * @component ccm-certificate_approve
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

( () => {

    const component = {

        name: 'certificate_approve',
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
                            this.approver = accounts[0]
                    );

                    this.metamask.onAccountsChanged(
                        accounts =>
                            this.approver = accounts[0]
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
                    change: event => {

                        const select = this.element.querySelector('select');

                        this.contract = this.web3.eth.contract.new (
                            this.abi,
                            select.options[select.selectedIndex].value
                        );

                        this.web3.eth.contract.events(this.contract, 'eWorkApproved', { fromBlock: 'latest' })
                            .on('error', console.error)
                            .on('data', data => {

                                this.element.querySelector('.spinner-border')
                                    .classList.add('d-none');

                                this.element.querySelector('button')
                                    .removeAttribute('disabled');

                                this.readCertificate();
                            });

                        this.readCertificate();
                    },
                    keyup: event => {
                        this.graduate = event.path[0].value;

                        this.readCertificate();
                    },
                    approve: event => {
                        if (this.web3.utils.isAddress(this.graduate) && this.contract) {

                            this.web3.eth.contract.send (
                                this.contract,
                                'approveWork(address,uint256,bool)',
                                [this.graduate, 0, true],
                                {
                                    from:   this.approver,
                                    value:  0
                                }
                            );

                            this.element.querySelector('button').setAttribute('disabled', 'disabled');
                            this.element.querySelector('.spinner-border').classList.remove('d-none');
                        }
                    }
                }));

                this.certificates.map(certificate => {

                    const option = document
                        .createElement('option');

                    option.value        = certificate.address;
                    option.innerText    = certificate.name;

                    this.element.querySelector('select')
                        .appendChild(option);
                });
            };


            /* Functions */

            this.readCertificate = () => {
                if (this.web3.utils.isAddress(this.graduate) && this.contract) {

                    this.web3.eth.contract.call(this.contract, 'getCertificate', [], {from: this.graduate})
                        .catch(console.error)
                        .then(result => {

                            const code = this.element.querySelectorAll('code');

                            code[0].innerText = `${this.student.firstname} ${this.student.lastname}`;
                            code[1].innerText = result.submission;
                            code[2].innerText = new Date(parseInt(result.timestamp) * 1000).toLocaleString();
                            code[3].innerText = result.passed;
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
} )();