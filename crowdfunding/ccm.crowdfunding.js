/**
 * @component ccm-crowdfunding
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

'use strict';

(() => {

    const component = {

        name: 'crowdfunding',
        ccm: '../ccm/ccm-21.2.0.min.js',

        config: {
            web3: [
                'ccm.instance',
                '../web3/versions/ccm.web3-4.0.0.js'
            ],
            metamask: [
                'ccm.instance',
                '../metamask/versions/ccm.metamask-2.0.0.js'
            ],
            modal: [
                'ccm.component',
                '../modal/ccm.modal.js'
            ],
            html: [
                'ccm.load',
                '../crowdfunding/resources/html.js'
            ],
            abi: [
                'ccm.load',
                '../crowdfunding/resources/abi.js'
            ],
            css: [
                'ccm.load', [
                    '../ccm/bootstrap.min.css',
                    '../crowdfunding/resources/style.css'
                ]
            ],
            js: [
                'ccm.load', [
                    '../ccm/jquery-3.4.1.min.js',
                    '../ccm/bootstrap.min.js'
                ]
            ],
            store: [ 'ccm.store', { 'name': 'rmuel12s_crowdfunding' } ]
        },

        Instance: function () {

            /* Lifecycle */

            this.ready = async () => {

                !this.data.storeUrl         && console.error ('Store URL is missing!');
                !this.metamask.isMetaMask() && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.web3.utils.isAddress (this.data.contractAddress)  &&
                    console.error ('Contract address is missing!');

                this.store.url = this.data.storeUrl;

                this.web3.setProvider (this.metamask.getProvider(), { transactionConfirmationBlocks: 1 });

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.data.statusText = [
                    'CREATED',
                    'FUNDING',
                    'DEVELOPING',
                    'PENDING',
                    'APPROVED'
                ];

                this.data.statusColor = [
                    'secondary',
                    'warning',
                    'primary',
                    'danger',
                    'success'
                ];

                this.data.contract = this.web3.eth.contract (this.abi, this.data.contractAddress);
            };

            this.start = async () => {

                this.store.get (this.data.contractAddress)
                    .then   (result => this.data.mongo = result)
                    .then   (this.render)
                    .catch  (console.error);
            };


            /* Functions */

            this.accountChanged = accounts => {

                this.data.account = accounts [0];
            };

            this.render = () => {

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html.main, {
                    name            : this.data.mongo.name,
                    requirements    : this.buildRequirementButtons(this.data.mongo.requirements),
                    description     : this.buildDescriptionButton(this.data.mongo.description),
                    fund            : this.data.mongo.fund,
                    deposit         : this.data.mongo.deposit,
                    timeFrame       : `${parseInt (this.data.mongo.timeFrame) * 24}:00:00`,
                    badge_text      : this.data.statusText [this.data.mongo.status],
                    badge_color     : this.data.statusColor [this.data.mongo.status],

                    btnFund                 : this.data.mongo.status < 4   ? '' : 'd-none',
                    btnRegisterDeveloper    : (this.data.mongo.status === 0 || this.data.mongo.status === 1) ? '' : 'd-none',
                    btnDismissDeveloper     : this.data.mongo.status === 2 ? '' : 'd-none',
                    btnSubmitComponent      : this.data.mongo.status === 2 ? '' : 'd-none',
                    btnApproveComponent     : this.data.mongo.status === 3 ? '' : 'd-none',

                    addFund             : this.clickHandler.addFund,
                    registerDeveloper   : this.clickHandler.registerDeveloper,
                    dismissDeveloper    : this.clickHandler.dismissDeveloper,
                    submitComponent     : this.clickHandler.submitComponent,
                    approveComponent    : this.clickHandler.approveComponent
                }));

                if (this.data.mongo.status === 2) {

                    const timeFrame = this.element.querySelector ('.time-frame');

                    let delta =
                        this.data.mongo.workStarted +
                        (this.data.mongo.timeFrame * 60 * 60 * 24) - Math.floor (Date.now() / 1000);

                    this.data.interval = window.setInterval (() => {

                        const hh = delta / 60 / 60;
                        const mm = (delta / 60 % 60);
                        const ss = delta % 60 % 60;

                        timeFrame.innerText = `${hh | 0}:${mm | 0}:${ss}`;

                        delta--;

                        if (delta <= 0) {

                            timeFrame.classList.add ('text-danger');
                            timeFrame.innerText = 'Time is up!';

                            window.clearInterval (this.data.interval);
                        }

                    }, 1000);
                }
            };

            this.buildRequirementButtons = () => {

                return this.ccm.helper.html (this.html.btnRequirement, {

                    size: this.data.mongo.requirements.length,

                    click: () => {

                        this.modal.start ({
                            root: this.element.querySelector ('#modal-area'),
                            mid: "requirements",
                            autorun: true,
                            title: 'Requirements',
                            body: {
                                "tag": "ol",
                                "class": "text-left",
                                "inner": [
                                    this.data.mongo.requirements.reduce (
                                        (accumulator, value) => { return accumulator + `<li>${value}</li>`; }, ''
                                    )
                                ]
                            },
                            footer: {
                                "tag": "button",
                                "class": "btn btn-outline-primary btn-sm",
                                "onclick": () => { console.log ('todo'); },
                                "inner": "Check"
                            }
                        });

                    }
                });
            };

            this.buildDescriptionButton = () => {

                return this.ccm.helper.html (this.html.btnDescription, {

                    click: () => {

                        this.modal.start ({
                            root: this.element.querySelector ('#modal-area'),
                            mid: 'description',
                            autorun: true,
                            title: 'Description',
                            body: this.data.mongo.description,
                            footer: {
                                "tag": "button",
                                "class": "btn btn-outline-primary btn-sm",
                                "onclick": () => this.checkDescription(),
                                "inner": "Check"
                            }
                        });
                    }
                });
            };

            this.checkDescription = () => {

                this.data.contract.method ('getDescription').call()
                    .then   (this.checkDescriptionResult)
                    .catch  (console.error);
            };

            this.checkDescriptionResult = result => {
                this.data.mongo.description.localeCompare (result) === 0 ?
                    alert ('Check successful') :
                    alert ('Alert, data got altered!');
            };

            this.clickHandler = {

                addFund: event => {

                    this.data.amount = parseFloat (prompt ("How much ETH do you want to add?:", ''));

                    if (!this.data.amount || typeof this.data.amount !== 'number')
                        return;

                    this.toggleSpinner (this.element.querySelector ('.btn-add-fund'), true);

                    this.data.contract.method ('addFund').send ({
                        from    : this.data.account,
                        value   : this.web3.utils.toWei (
                            Math.abs (this.data.amount).toString(),
                            this.web3.units.ether
                        )
                    })
                        .then       (this.storeHandler.addFund)
                        .catch      (console.error)
                        .finally    (this.render);
                },

                registerDeveloper: event => {

                    this.toggleSpinner (this.element.querySelector ('.btn-register-developer'), true);

                    this.data.contract.method ('registerDeveloper').send ({
                        from    : this.data.account,
                        value   : this.web3.utils.toWei (this.data.mongo.deposit.toString(), this.web3.units.ether)
                    })
                        .then       (result => this.data.contract.method ('getWorkStarted').call())
                        .then       (this.storeHandler.registerDeveloper)
                        .catch      (console.error)
                        .finally    (this.render);
                },

                dismissDeveloper: event => {

                    this.toggleSpinner (this.element.querySelector ('.btn-dismiss-developer'), true);

                    this.data.contract.method ('dismissDeveloper').send ({
                        from    : this.data.account
                    })
                        .then       (this.storeHandler.dismissDeveloper)
                        .catch      (console.error)
                        .finally    (this.render);
                },

                submitComponent: event => {

                    this.data.submission = prompt ('Please submit your work here:', '');

                    if (!this.data.submission)
                        return;

                    this.toggleSpinner (this.element.querySelector ('.btn-submit-component'), true);

                    this.data.contract.method ('submitComponent(string)', [ this.data.submission ]).send ({
                        from: this.data.account
                    })
                        .then       (this.storeHandler.submitComponent)
                        .catch      (console.error)
                        .finally    (this.render);
                },

                approveComponent: event => {

                    this.data.sufficient  = confirm ('Approve component?');

                    this.toggleSpinner (this.element.querySelector ('.btn-approve-component'), true);

                    this.data.contract.method ('approveComponent(bool)', [ this.data.sufficient ]).send ({
                        from: this.data.account
                    })
                        .then       (result => this.data.contract.method ('getWorkStarted').call())
                        .then       (this.storeHandler.approveComponent)
                        .catch      (console.error)
                        .finally    (this.render);
                }
            };

            this.storeHandler = {

                addFund: result => {

                    this.data.mongo.fund += Math.abs (this.data.amount);

                    if (this.data.mongo.status === 0)
                        this.data.mongo.status = 1;

                    return this.store.set (this.data.mongo);
                },

                registerDeveloper: result => {

                    this.data.mongo.developer   = this.data.account;
                    this.data.mongo.workStarted = parseInt (result);
                    this.data.mongo.status      = 2;
                    this.data.mongo.fund        += this.data.mongo.deposit;

                    return this.store.set (this.data.mongo);
                },

                dismissDeveloper: result => {

                    this.data.mongo.developer   = '0x0';
                    this.data.mongo.status      = 1;

                    return this.store.set (this.data.mongo);
                },

                submitComponent: result => {

                    this.data.mongo.submission = this.data.submission;
                    this.data.mongo.status     = 3;

                    return this.store.set (this.data.mongo);
                },

                approveComponent: result => {

                    if (this.data.sufficient) {

                        this.data.mongo.status = 4;
                        this.data.mongo.fund = 0;

                    } else {

                        this.data.mongo.status      = 2;
                        this.data.mongo.workStarted = parseInt (result);
                    }

                    return this.store.set (this.data.mongo);
                }
            };

            this.toggleSpinner = (button, toggle) => {

                if (toggle) {
                    button.setAttribute ('disabled', 'disabled');
                    button.querySelector ('.spinner-border').classList.remove ('d-none');
                } else {
                    button.removeAttribute ('disabled');
                    button.querySelector ('.spinner-border').classList.add ('d-none');
                }
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();
