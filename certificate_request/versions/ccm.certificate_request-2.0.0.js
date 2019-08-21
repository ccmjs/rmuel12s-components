/**
 * @component ccm-certificate_request
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 2.0.0
 */

"use strict";

(() => {

    const component = {

        name: 'certificate_request',
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
                '../certificate_request/resources/abi.js'
            ],
            html: [
                'ccm.load',
                '../certificate_request/resources/html.js'
            ],
            css: [
                'ccm.load', [
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
                    'https://ccmjs.github.io/rmueller-components/certificate_request/resources/style.css'
                ]
            ],
            js: [
                'ccm.load', [
                    'https://code.jquery.com/jquery-3.3.1.min.js',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js'
                ]
            ],
            store: ["ccm.store", {'name': 'rmuel12s_courses'}]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask() && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.storeUrl              && console.error ('Store uri missing!');

                this.store.url = this.storeUrl;

                this.web3.setProvider (this.metamask.getProvider(), { transactionConfirmationBlocks: 1 });

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                document.body.appendChild (this.root);

                this.store
                    .get    ()
                    .then   (this.setOptions)
                    .then   (this.renderModal)
                    .then   (this.toggleOuterView)
                    .catch  (console.error);
            };


            /* Functions */

            this.accountChanged = accounts =>
                this.student = accounts [0];

            this.setOptions = data => {

                data.forEach (certificate => {
                    this.html.inner [1].inner [1].inner [0].inner [1].inner.push ({
                        tag: "option",
                        value: certificate.key,
                        inner: certificate.name
                    });
                });
            };

            this.renderModal = () => {

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html, {

                    check: this.toggleDialog,
                    close: this.toggleOuterView,

                    save: event => {

                        const address = this.select.options[this.select.selectedIndex].value;

                        this.contractCourse = this.web3.eth.contract.new (this.abi, address);

                        this.toggleOuterView();

                    }
                }));

                this.blurElement    = document.querySelector (this.blurSelector);
                this.toast          = this.element.querySelector ('.toast');
                this.select         = this.element.querySelector('select');
                this.checkbox       = this.element.querySelector ('input[type=checkbox]');
                this.fieldset       = this.element.querySelector ('fieldset');
            };

            this.toggleOuterView = () => {

                if (this.toast.classList.contains ('show')) {

                    if (this.blurElement)
                    { this.blurElement.style = 'opacity: 1 !important;'; }

                    $ (this.toast).toast('dispose');

                } else {

                    if (this.blurElement)
                    { this.blurElement.style = 'opacity: 0.1 !important;'; }

                    $ (this.toast).toast ('show');

                }
            };

            this.toggleDialog = () => {

                if (this.checkbox.checked) {

                    this.fieldset.removeAttribute ('disabled');
                    this.fieldset.classList.add ('blur-off');

                } else {

                    this.fieldset.setAttribute ('disabled', 'disabled');
                    this.fieldset.classList.remove ('blur-off');

                }
            };

            this.requestCertificate = request => {

                if (!this.contractCourse || !request)  { return; }

                this.web3.eth.contract.send (
                    this.contractCourse,
                    'certificateRequest(string)',
                    [request],
                    {
                        from: this.student
                    }
                )
                    .then   (this.getCertificate)
                    .then   (this.storeCertificate)
                    .then   (data => alert ('Certificate successful requested!'))
                    .catch  (console.error);
            };

            this.getCertificate = result =>
                this.web3.eth.contract.call (this.contractCourse, 'getCertificate(address)', [ this.student ]);

            this.storeCertificate = async result => {

                const course = await this.store.get (this.contractCourse.options.address);

                course.students [this.student] = {
                    submission  : result._submission,
                    requested   : result_requested.toString(),
                    issued      : result_issued.toString(),
                    status      : result._status
                };

                return this.store.set (course);
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();