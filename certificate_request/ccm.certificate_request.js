/**
 * @component ccm-certificate_request
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

'use strict';

(() => {

    const component = {

        name: 'certificate_request',
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
                !this.data.storeUrl         && console.error ('Store URL is missing!');

                this.store.url = this.data.storeUrl;

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
                this.data.studentAddress = this.web3.utils.toChecksumAddress (accounts [0]);

            this.setOptions = data => {

                data.forEach (course => {
                    this.html.inner [1].inner [1].inner [0].inner [1].inner.push ({
                        tag     : 'option',
                        value   : course.key,
                        inner   : course.name
                    });
                });
            };

            this.renderModal = () => {

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html, {

                    check: this.toggleDialog,

                    close: this.toggleOuterView,

                    save: event => {

                        this.data.courseAddress =
                            this.elements.select.options [this.elements.select.selectedIndex].value;

                        this.data.contract = this.web3.eth.contract (this.abi, this.data.courseAddress);

                        this.toggleOuterView();
                    }
                }));

                this.elements = {
                    blurElement:    document.querySelector (this.blurSelector),
                    toast:          this.element.querySelector ('.toast'),
                    select:         this.element.querySelector('select'),
                    checkbox:       this.element.querySelector ('input[type=checkbox]'),
                    fieldset:       this.element.querySelector ('fieldset')
                };
            };

            this.toggleOuterView = () => {

                if (this.elements.toast.classList.contains ('show')) {

                    if (this.elements.blurElement)
                        { this.elements.blurElement.style = 'opacity: 1 !important;'; }

                    $ (this.elements.toast).toast('dispose');

                } else {

                    if (this.elements.blurElement)
                        { this.elements.blurElement.style = 'opacity: 0.1 !important;'; }

                    $ (this.elements.toast).toast ('show');
                }
            };

            this.toggleDialog = () => {

                if (this.elements.checkbox.checked) {

                    this.elements.fieldset.removeAttribute ('disabled');
                    this.elements.fieldset.classList.add ('blur-off');

                } else {

                    this.elements.fieldset.setAttribute ('disabled', 'disabled');
                    this.elements.fieldset.classList.remove ('blur-off');

                }
            };

            this.requestCertificate = submission => {

                if (!this.data.contract || !submission)
                    { return; }

                this.data.contract.method ('certificateRequest(string)', [ submission ]).send ({
                    from: this.data.studentAddress
                })
                    .then   (this.getCertificate)
                    .then   (this.storeCertificate)
                    .then   (data => alert ('Certificate successful requested!'))
                    .catch  (console.error);
            };

            this.getCertificate = result =>
                this.data.contract.method ('getCertificate(address)', [ this.data.studentAddress ]).call ();

            this.storeCertificate = async certificate => {

                const course = await this.store.get (this.data.courseAddress);

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
} )();
