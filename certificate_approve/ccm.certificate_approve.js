/**
 * @component ccm-certificate_approve
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

'use strict';

(() => {

    const component = {

        name: 'certificate_approve',
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
                '../certificate_approve/resources/html.js'
            ],
            abi: [
                'ccm.load',
                '../certificate_approve/resources/abi.js'
            ],
            css: [
                'ccm.load', [
                    '../certificate_approve/resources/style.css',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
                    'https://ccmjs.github.io/rmueller-components/certificate_approve/resources/style.css'
                ]
            ],
            store: ['ccm.store', {'name': 'rmuel12s_courses'}],
            status: [ 'REQUESTED', 'APPROVED' ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask()         && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.data.storeUrl                 && console.error ('Store URL missing!');
                !this.data.studentContractAddress   && console.error ('Student contract address is missing!');

                this.store.url = this.data.storeUrl;

                this.web3.setProvider (this.metamask.getProvider(), { transactionConfirmationBlocks: 1 });

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.data.studentContract = this.web3.eth.contract (this.abi.student, this.data.studentContractAddress);

                this.store
                    .get    ()
                    .then   (this.setOptions)
                    .then   (this.renderHTML)
                    .catch  (console.error);
            };


            /* Functions */

            this.accountChanged = accounts =>
                this.data.universityAddress = this.web3.utils.toChecksumAddress (accounts [0]);

            this.setOptions = data => {

                data.forEach (course => {
                    this.html.inner [1].inner [0].inner.inner.push ({
                        tag     : 'option',
                        value   : course.key,
                        inner   : course.name
                    });
                });
            };

            this.renderHTML = () => {

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html, {

                    change: event => {

                        this.data.courseContractAddress =
                            this.elements.select.options [this.elements.select.selectedIndex].value;

                        this.data.courseContract = this.web3.eth.contract (
                            this.abi.course,
                            this.data.courseContractAddress
                        );

                        this.renderAll();
                    },

                    keyup: event => {

                        if (this.web3.utils.isAddress (event.path [0].value))
                            { this.data.studentAddress = this.web3.utils.toChecksumAddress (event.path [0].value); }
                        else
                            { this.data.studentAddress = ''; }

                        this.renderAll();
                    },

                    approve: event => {

                        if (!this.isValidate())
                            { return; }

                        this.toggleSpinner();

                        this.data.courseContract.method (
                            'certificateApprove(address)',
                            [ this.data.studentAddress ]
                        ).send ({
                            from : this.data.universityAddress
                        })
                            .then   (this.getCertificate)
                            .then   (this.updateCertificate)
                            .then   (result => window.location.reload())
                            .catch  (console.error);
                    }

                }));

                this.elements = {
                    select  : this.element.querySelector ('select'),
                    codeAll : this.element.querySelectorAll ('code'),
                    spinner : this.element.querySelector ('.spinner-border')
                };
            };

            this.getCertificate = () =>
                this.data.courseContract.method ('getCertificate', [this.data.studentAddress]).call();

            this.toggleSpinner = () => {

                if (this.elements.spinner.classList.contains ('d-none')) {

                    this.elements.spinner.parentElement.setAttribute ('disabled', 'disabled');
                    this.elements.spinner.classList.remove ('d-none');

                } else {

                    this.elements.spinner.parentElement.removeAttribute ('disabled');
                    this.elements.spinner.classList.add ('d-none');
                }
            };

            this.isValidate = () =>
                this.data.courseContract && this.web3.utils.isAddress (this.data.studentAddress);

            this.renderAll = () => {

                if (this.isValidate()) {

                    this.data.studentContract.method ('getStudent(address)', [ this.data.studentAddress ]).call ()
                        .then   (this.renderStudent)
                        .catch  (console.error);

                    this.data.courseContract.method ('getCertificate(address)', [ this.data.studentAddress ]).call ()
                        .then   (this.renderCertificate)
                        .catch  (console.error);

                } else {
                    this.elements.codeAll.forEach (code => code.innerText = '...');
                }
            };

            this.renderStudent = student => {

                this.elements.codeAll [0].innerText = `${student._studentName} [${student._studentNumber}]`;
            };

            this.renderCertificate = certificate => {

                this.elements.codeAll [1].innerText = certificate._submission;
                this.elements.codeAll [2].innerText = new Date (parseInt (certificate._requested) * 1000).toLocaleString();
                this.elements.codeAll [3].innerText = new Date (parseInt (certificate._issued) * 1000).toLocaleString();
                this.elements.codeAll [4].innerText = this.status [certificate._state];
            };

            this.updateCertificate = async certificate => {

                const course = await this.store.get (this.data.studentAddress);

                course.students [this.data.studentAddress] = {
                    submission  : certificate._submission,
                    requested   : certificate._requested.toString(),
                    issued      : certificate._issued.toString(),
                    state       : certificate._state
                };

                return this.store.set (course);
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();
