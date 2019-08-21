/**
 * @component ccm-student_enroll
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

'use strict';

(() => {

    const component = {

        name: 'student_enroll',
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
            abi: [
                'ccm.load',
                '../student_enroll/resources/abi.js'
            ],
            html: [
                'ccm.load',
                '../student_enroll/resources/html.js'
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

                !this.metamask.isMetaMask() && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.data.storeUrl         && console.error ('Store URL is missing!');
                !this.data.contractAddress  && console.error ('Student contract address missing!');

                this.store.url = this.data.storeUrl;

                this.web3.setProvider (this.metamask.getProvider(), { transactionConfirmationBlocks: 1 });

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.data.contract = this.web3.eth.contract (this.abi, this.data.contractAddress);

                this.render.main();
            };


            /* Functions */

            this.render = {
                main: () => {

                    this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html.main, {
                        keyup   : this.getStudent
                    }));

                    this.elements = {
                        slot                : this.element.querySelector ('#slot'),
                        universityAddress   : this.element.querySelector ('input[name=university-address]'),
                        studentAddress      : this.element.querySelector ('input[name=student-address]')
                    };

                    this.render.enroll();

                },
                enroll: () => {

                    this.ccm.helper.setContent (this.elements.slot, this.ccm.helper.html (this.html.enroll, {
                        enroll : this.enrollStudent
                    }));

                    this.elements.studentNumber = this.element.querySelector ('input[name=student-number]');
                    this.elements.studentName   = this.element.querySelector ('input[name=student-name]');
                    this.elements.spinner       = this.element.querySelector ('.spinner-border');
                    this.elements.button        = this.element.querySelector ('button');
                },
                student: result => {

                    this.data.studentNumber = result._studentNumber;
                    this.data.studentName   = result._studentName;

                    if (this.data.studentNumber && this.data.studentName) {

                        this.ccm.helper.setContent (this.elements.slot, this.ccm.helper.html (this.html.student, {
                            studentNumber   : this.data.studentNumber,
                            studentName     : this.data.studentName
                        }));
                    }
                }
            };

            this.accountChanged = accounts => {

                this.data.universityAddress            = this.web3.utils.toChecksumAddress (accounts [0]);
                this.elements.universityAddress.value  = this.data.universityAddress;
            };

            this.getStudent = event => {

                if (!this.web3.utils.isAddress (this.elements.studentAddress.value)) {

                    this.render.enroll();
                    return;
                }

                this.data.contract.method ('getStudent(address)', [ this.elements.studentAddress.value ]).call()
                    .then   (this.render.student)
                    .catch  (console.error);
            };

            this.enrollStudent = () => {

                if (!this.isValidate ()) {
                    return;
                }

                this.data.arguments = [
                    this.elements.studentAddress.value,
                    this.elements.studentNumber.value,
                    this.elements.studentName.value
                ];

                this.elements.spinner.classList.remove ('d-none');
                this.elements.button.setAttribute ('disabled', 'disabled');

                this.data.contract.method ('enrollStudent(address,uint256,string)', this.data.arguments).send ({
                    from: this.data.universityAddress
                })
                    .then       (this.storeStudent)
                    .catch      (console.error)
                    .finally    (this.getStudent);
            };

            this.isValidate = () => {

                const studentNumber = parseInt (this.elements.studentNumber.value);

                const isAddress = this.web3.utils.isAddress (this.elements.studentAddress.value);
                const isStudentNumber = studentNumber >= 1000 && studentNumber <= 9999;

                isAddress ?
                    this.elements.studentAddress.classList.remove ('is-invalid') :
                    this.elements.studentAddress.classList.add ('is-invalid');

                isStudentNumber ?
                    this.elements.studentNumber.classList.remove ('is-invalid') :
                    this.elements.studentNumber.classList.add ('is-invalid');

                return (isAddress && isStudentNumber);
            };

            this.storeStudent = result => {
                
                return this.store.set ({
                    key             : this.data.arguments [0],
                    studentNumber   : this.data.arguments [1],
                    studentName     : this.data.arguments [2],
                });
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
