/**
 * @component ccm-certificate_check
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

'use strict';

(() => {

    const component = {

        name: 'certificate_check',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            web3: [
                'ccm.instance',
                '../web3/versions/ccm.web3-4.0.0.js'
            ],
            abi: [
                'ccm.load',
                '../certificate_check/resources/abi.js'
            ],
            html: [
                'ccm.load',
                '../certificate_check/resources/html.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
            ],
            imageSrc:   '../../certificate_check/resources/fail.svg',
            message:    'Certificate not valid!'
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                this.uri = new URL (window.location.href);

                this.data.studentAddress               = this.uri.searchParams.get ('g');
                this.data.certificateContractAddress    = this.uri.searchParams.get ('c');

                if (!this.web3.utils.isAddress (this.data.studentAddress) || !this.web3.utils.isAddress (this.data.certificateContractAddress)) {

                    console.error ('Invalid address!');
                    return;
                }

                this.web3.setProvider ('https://admin:un21n77w@vm-2d05.inf.h-brs.de/geth2');

                this.data.certificateContract    = this.web3.eth.contract (this.abi.course, this.data.certificateContractAddress);
                this.data.studentContract        = this.web3.eth.contract (this.abi.student, this.data.studentContractAddress);

                this.data.certificateContract.method ('getName').call ()
                    .then   (this.certificateName)
                    .catch  (console.error);

                this.data.certificateContract.method ('getCertificate(address)', [ this.data.studentAddress ]).call ()
                    .then   (this.validation)
                    .catch  (console.error);
            };


            /* Functions */

            this.validation = result => {console.log (result);

                if (result._state) {

                    this.imageSrc = '../../certificate_check/resources/check.svg';
                    this.message  = 'Certificate valid!';
                    this.html.inner[2].class = 'card-body text-success';
                }

                this.data.studentContract.method ('getStudent(address)', [ this.data.studentAddress ]).call ()
                    .then   (this.renderCheckResult)
                    .catch  (console.error);

            };

            this.renderCheckResult = student => { console.log (student);

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html, {

                    graduate:           `${student._name}`,
                    graduate_address:   this.studentAddress,
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
