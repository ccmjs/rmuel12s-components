/**
 * @component ccm-student_enroll
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 2.0.0
 */

'use strict';

(() => {

    const component = {

        name: 'student_enroll',
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
            abi: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/student_enroll/resources/abi.js'
            ],
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/student_enroll/resources/html.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
            ],
            store: ['ccm.store', { 'name': 'rmuel12s_students' }]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask()     && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.storeUrl                  && console.error ('Store URL is missing!');
                !this.studentContractAddress    && console.error ('Student contract address missing!');

                this.store.url = this.storeUrl;

                this.web3.setProvider (this.metamask.getProvider(), { transactionConfirmationBlocks: 1 });

                this.metamask.enable            (this.fetchStudent);
                this.metamask.onAccountsChanged (this.fetchStudent);

                this.contractStudent = this.web3.eth.contract.new (
                    this.abi,
                    this.studentContractAddress
                );
            };


            /* Functions */

            this.fetchStudent = accounts => {

                this.studentAddress = accounts [0];

                this.web3.eth.contract.call (this.contractStudent, 'getStudent(address)', [this.studentAddress])
                    .then   (this.getStudent)
                    .catch  (console.error);
            };

            this.getStudent = result => {

                this.firstName  = result._firstName;
                this.lastName   = result._lastName;

                if (this.firstName && this.lastName) {

                    this.renderHTML (1, {
                        address     : this.studentAddress,
                        firstName   : this.firstName,
                        lastName    : this.lastName
                    });

                } else {

                    this.renderHTML (0, {
                        address : this.studentAddress,
                        enroll  : this.enrollStudent
                    });

                }
            };

            this.renderHTML = (template, options) => {

                this.ccm.helper.setContent (
                    this.element,
                    this.ccm.helper.html (this.html [template], options)
                );
            };

            this.enrollStudent = () => {

                const inputs    = this.element.querySelectorAll ('input');

                this.firstName  = inputs [0].value;
                this.lastName   = inputs [1].value;

                this.element.querySelector ('.spinner-border').classList.remove ('d-none');
                this.element.querySelector ('button').setAttribute ('disabled', 'disabled');

                this.web3.eth.contract.send (
                    this.contractStudent,
                    'enroll(string,string)',
                    [this.firstName, this.lastName],
                    { from:   this.studentAddress }
                )
                    .then   (this.storeStudent)
                    .then   (result => this.fetchStudent ([this.studentAddress]))
                    .catch  (console.error);
            };

            this.storeStudent = receipt => {

                return this.store.set ({
                    key         : this.studentAddress,
                    firstName   : this.firstName,
                    lastName    : this.lastName
                });
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
