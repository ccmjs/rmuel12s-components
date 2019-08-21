/**
 * @component ccm-crowdfunding_init
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

(() => {

    const component = {

        name: 'crowdfunding_init',
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
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/crowdfunding_init/resources/html.js'
            ],
            deploy: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/crowdfunding_init/resources/deploy.js'
            ],
            css: [
                'ccm.load',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
            ],
            store: [ "ccm.store", { "name": "rmuel12s_components", url: "wss://ccm2.inf.h-brs.de" } ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask() && console.error ('This component requires MetaMask', 'https://metamask.io/');
                !this.storeUrl              && console.error ('Store uri missing!'); // todo

                this.web3.setProvider (this.metamask.getProvider());

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.contract = this.web3.eth.contract.new (this.deploy.abi);

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html [0], {
                    more: () =>
                        this.element.querySelector ('span')
                            .appendChild (this.ccm.helper.html (this.html[1], {})),
                    send: () => {

                        const name          = this.element.querySelector ('input[name=name]');
                        const fund          = this.element.querySelector ('input[name=fund]');
                        const description   = this.element.querySelector ('textarea');
                        const requirements  = this.element.querySelector ('span').querySelectorAll ('input');

                        if (this.isValidate (name, fund, requirements)) {

                            this.toggleSpinner (true);

                            this.web3.eth.contract.deploy.send (this.contract, {
                                data: this.deploy.bytecode,
                                arguments: [
                                    name.value,
                                    JSON.stringify (Array.from (requirements).map (input => input.value)),
                                    description.value || ""
                                ]
                            }, {
                                from:   this.account,
                                value:  this.web3.utils.toWei (fund.value, 'ether')
                            })
                            .then (deployedContract => {

                                this.ccm.helper.setContent (this.element.querySelector ('.list-group'), this.ccm.helper.html (this.html [2], {
                                    component: name.value
                                }));

                                return this.store.set ({
                                    key             : deployedContract.options.address,
                                    name            : name.value,
                                    funder          : this.account,
                                    fund            : fund.value,
                                    description     : description.value,
                                    requirements    : Array.from(requirements).map (input => input.value),
                                    status          : 0
                                });
                            })
                            .then (console.log)
                            .catch (console.error);
                            //.finally (this.toggleSpinner);

                        } else {
                            console.error ('Validation failed!');
                        }
                    }
                }));
            };


            /* Functions */

            this.accountChanged = accounts => {

                this.account = accounts [0];

                this.element.querySelector ('input[name=funder]').value = this.account;
            };

            this.isValidate = (name, fund, requirements) => {

                name.value ?
                    name.classList.remove ('is-invalid') : name.classList.add ('is-invalid');

                fund.value ?
                    fund.classList.remove ('is-invalid') : fund.classList.add ('is-invalid');

                requirements.forEach (input => {
                    input.value ?
                        input.classList.remove ('is-invalid') : input.classList.add ('is-invalid');
                });

                return name.value && fund.value && this.web3.utils.isAddress (this.account);
            };

            this.toggleSpinner = toggle => {

                if (toggle) {
                    this.element.querySelector ('.btn-primary')
                        .setAttribute ('disabled', 'disabled');

                    this.element.querySelector ('.spinner-border')
                        .classList.remove ('d-none');
                } else {
                    this.element.querySelector ('.btn-primary')
                        .removeAttribute ('disabled');

                    this.element.querySelector ('.spinner-border')
                        .classList.add ('d-none');
                }
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();