/**
 * @component ccm-certificate_check
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 2.0.0
 */

"use strict";

( () => {

    const component = {

        name: 'certificate_check',
        version: [2, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            web3: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/web3/versions/ccm.web3-2.0.0.js'
            ],
            graduate: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/web3/versions/ccm.web3-2.0.0.js'
            ],
            abi: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/certificate_check/resources/abi.js'
            ],
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/certificate_check/resources/html.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
            ],
            imageSrc:   'fail.svg',
            message:    'Certificate not valid!'
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                this.uri = new URL (window.location.href);

                this.graduateAddress    = this.uri.searchParams.get('g');
                this.contractAddress    = this.uri.searchParams.get('c');

                if (!this.web3.utils.isAddress(this.graduateAddress) || !this.web3.utils.isAddress(this.contractAddress)) {
                    console.error ('Invalid address!');
                    return;
                }

                this.web3.setProvider('https://admin:un21n77w@vm-2d05.inf.h-brs.de/geth2');

                this.certificate = this.web3.eth.contract.new (
                    this.abi.certificate,
                    this.contractAddress
                );

                this.student = this.web3.eth.contract.new (
                    this.abi.student,
                    this.studentContract
                );

                this.certificateName =
                    await this.web3.eth.contract.call (this.certificate, 'getCertificateName', []);

                this.web3.eth.contract.call (this.certificate, 'getCertificate', [], {from: this.graduateAddress})
                    .catch (console.error)
                    .then (this.validation);
            };


            /* Functions */

            this.validation = result => {

                if (result.passed) {
                    this.imageSrc = 'check.svg';
                    this.message  = 'Certificate valid!';
                    this.html.inner[2].class = 'card-body text-success';
                }

                this.web3.eth.contract.call (this.student, 'getStudent', [this.graduateAddress])
                    .catch(console.error)
                    .then(this.renderCheckResult);

            };

            this.renderCheckResult = result => {

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html, {
                    graduate:           `${result.firstname} ${result.lastname}`,
                    graduate_address:   this.graduateAddress,
                    certificate:        this.certificateName,
                    contract:           this.contractAddress,
                    src:                this.imageSrc,
                    message:            this.message
                }));

            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();