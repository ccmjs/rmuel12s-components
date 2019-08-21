/**
 * @component ccm-certificate_view
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

'use strict';

(() => {

    const component = {

        name: 'certificate_view',
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
                '../certificate_view/resources/html.js'
            ],
            abi: [
                'ccm.load',
                '../certificate_view/resources/abi.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
                '../certificate_view/resources/style.css'
            ],
            qr: [
                'ccm.load',
                'https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs/qrcode.min.js'
            ],
            store: ['ccm.store', {'name': 'rmuel12s_courses'}]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask()         && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.data.storeUrl                 && console.error ('Store URL is missing!');
                !this.data.studentContractAddress   && console.error ('Student contract address is missing!');

                this.store.url = this.data.storeUrl;

                this.web3.setProvider (this.metamask.getProvider(), { transactionConfirmationBlocks: 1 });

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.data.studentContract = this.web3.eth.contract (this.abi.student, this.data.studentContractAddress);

                this.store
                    .get    ()
                    .then   (this.setOptions)
                    .then   (this.renderHTML);
            };


            /* Functions */

            this.accountChanged = accounts => {

                this.data.student = {
                    address: this.web3.utils.toChecksumAddress (accounts [0])
                };

                this.data.studentContract.method ('getStudent(address)', [ this.data.student.address ]).call ()
                    .then   (this.setStudent)
                    .catch  (console.error);
            };

            this.setStudent = student => {

                this.data.student.number = student._studentNumber;
                this.data.student.name   = student._studentName;
            };

            this.setOptions = data => {

                data.forEach (course => {

                    this.html [0].inner [1].inner [0].inner.inner.push ({
                        tag: "option",
                        value: course.key,
                        inner: course.name
                    });
                });
            };

            this.renderHTML = () => {

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html [0], {

                    change: event => {

                        this.data.courseContract = this.web3.eth.contract (
                            this.abi.course,
                            this.elements.select.options [this.elements.select.selectedIndex].value
                        );

                        this.data.courseContract.method ('getCertificate(address)', [ this.data.student.address ]).call ()
                            .then   (this.renderCertificate)
                            .catch  (console.error);
                    }
                }));

                this.elements = {
                    select: this.element.querySelector ('select'),
                    qrcode: new QRCode (document.createElement ('span')),
                    check:  this.element.querySelector ('input')
                };
            };

            this.renderCertificate = certificate => {

                if (certificate._state == 1) {

                    const checkValue = this.elements.check.value;

                    this.elements.qrcode.makeCode (
                        `${checkValue}c=${this.data.courseContract.address}&g=${this.data.studentContract.address}`
                    );

                    this.ccm.helper.setContent (
                        this.element.querySelector ('li:last-child'),
                        this.ccm.helper.html (this.html [1], {
                            student: `${this.data.student.number} ${this.data.student.name}`,
                            certificate: this.elements.select.options [this.elements.select.selectedIndex].innerText,
                            location: 'St. Augustin',
                            date: new Date().toDateString(),
                            qrcode: this.elements.qrcode._el
                    }));

                } else {

                    this.ccm.helper.setContent (
                        this.element.querySelector ('li:last-child'),
                        this.ccm.helper.html (this.html [2], {})
                    );
                }
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
