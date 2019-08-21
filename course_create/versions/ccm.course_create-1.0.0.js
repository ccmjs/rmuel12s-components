/**
 * @component ccm-course_create
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

(() => {

    const component = {

        name: 'course_create',
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
            deploy: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/course_create/resources/deploy.js'
            ],
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/course_create/resources/html.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
            ],
            store: ["ccm.store", {'name': 'rmuel12s_courses'}]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask() && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.storeUrl              && console.error ('Store URL is missing!');

                this.store.url = this.storeUrl;

                this.web3.setProvider (this.metamask.getProvider(), {transactionConfirmationBlocks: 1});

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.contractCourse = this.web3.eth.contract.new (this.deploy.abi);

                this.renderHTML();
            };


            /* Functions */

            this.accountChanged = accounts => {

                this.university = accounts [0];

                this.element.querySelector ('input[name=university]').value = this.university;
            };

            this.renderHTML = () => {

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html, {
                    click: this.createCourse
                }));

                this.name       = this.element.querySelector ('input[name=name]');
                this.spinner    = this.element.querySelector ('.spinner-border');
            };

            this.toggleSpinner = () => {

                if (this.spinner.classList.contains ('d-none')) {

                    this.spinner.parentElement.setAttribute ('disabled', 'disabled');
                    this.spinner.classList.remove ('d-none');

                } else {

                    this.spinner.parentElement.removeAttribute ('disabled');
                    this.spinner.classList.add ('d-none');

                }
            };

            this.isValidate = () => {

                this.name.value ?
                    this.name.classList.remove ('is-invalid') : this.name.classList.add ('is-invalid');

                return this.name.value && this.web3.utils.isAddress (this.university);
            };

            this.createCourse = () => {

                if (!this.isValidate ()) { return false; }

                this.toggleSpinner ();

                this.web3.eth.contract.deploy.send (
                    this.contractCourse,
                    {
                        data: this.deploy.bytecode.object,
                        arguments: [ this.name.value ]
                    },
                    {
                        from: this.university
                    })
                    .then       (this.storeCourse)
                    .then       (data => alert ('Course successful created!'))
                    .catch      (console.error)
                    .finally    (this.toggleSpinner);
            };

            this.storeCourse = receipt => {
                return this.store.set ({
                    key         : receipt.options.address,
                    name        : this.name.value,
                    students    :  {}
                });
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();