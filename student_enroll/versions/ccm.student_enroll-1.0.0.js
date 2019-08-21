/**
 * @component ccm-certificate_student
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

'use strict';

( () => {

    const component = {

        name: 'certificate_student',
        version: [1, 0, 0],
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
                'https://ccmjs.github.io/rmueller-components/certificate_student/resources/abi.js'
            ],
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/certificate_student/resources/html.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
            ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask() && console.error ('This component requires MetaMask', 'https://metamask.io/');
                !this.studentContract       && console.error ('Student contract address missing!');

                this.web3.setProvider (this.metamask.getProvider());

                this.metamask.enable            (this.fetchStudent);
                this.metamask.onAccountsChanged (this.fetchStudent);

                this.contract = this.web3.eth.contract.new (
                    this.abi,
                    this.studentContract
                );
            };


            /* Functions */

            this.fetchStudent = accounts => {

                this.student = accounts[0];

                this.web3.eth.contract.call (this.contract, 'getStudent', [this.student], {from: this.student})
                    .catch (console.error)
                    .then (result => {

                        this.firstname  = result.firstname;
                        this.lastname   = result.lastname;

                        if (result.firstname && result.lastname) {

                            this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html [1], {
                                address: this.student,
                                firstname: this.firstname,
                                lastname: this.lastname
                            }));

                        } else {

                            this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html [0], {
                                address: this.student,
                                enroll: this.enrollStudent
                            }));

                        }
                    });
            };

            this.enrollStudent = () => {

                const inputs    = this.element.querySelectorAll ('input');

                this.firstname  = inputs[0].value;
                this.lastname   = inputs[1].value;

                this.element.querySelector ('.spinner-border').classList.remove ('d-none');
                this.element.querySelector ('button').setAttribute ('disabled', 'disabled');

                this.web3.eth.contract.send (
                    this.contract,
                    'enroll(string,string)',
                    [this.firstname, this.lastname],
                    {
                        from:   this.student,
                        value:  0
                    }
                )
                    .catch (console.error)
                    .then (receipt => this.fetchStudent ([receipt.from]));
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
