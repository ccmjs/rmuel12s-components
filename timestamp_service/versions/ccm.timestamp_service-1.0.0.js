/**
 * @component ccm-timestamp_service
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

(() => {

    const component = {

        name: 'timestamp_service',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            web3: [
                'ccm.instance',
                '../web3/versions/ccm.web3-3.2.0.js'
            ],
            metamask: [
                'ccm.instance',
                '../metamask/versions/ccm.metamask-1.0.0.js'
            ],
            html: [
                'ccm.load',
                '../timestamp_service/resources/html.js'
            ],
            abi: [
                'ccm.load',
                '../timestamp_service/resources/abi.js'
            ],
            css: [
                'ccm.load', [
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
                    'https://cdn.jsdelivr.net/npm/dropzone@5.5.1/dist/min/dropzone.min.css',
                    '../timestamp_service/resources/style.css'
                ]
            ],
            js: [
                'ccm.load', [
                    'https://cdn.jsdelivr.net/npm/crypto-js@3.1.9-1/crypto-js.js',
                    'https://cdn.jsdelivr.net/npm/dropzone@5.5.1/dist/min/dropzone.min.js'
                ]
            ],
            store: [ "ccm.store", { "name": "rmuel12s_timestamps" } ],
            toggle: false
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask() && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.storeUrl              && console.error ('Store URL is missing!');
                !this.contractAddress       && console.error ('Contract address missing!');

                this.store.url = this.storeUrl;

                this.web3.setProvider (this.metamask.getProvider(), { transactionConfirmationBlocks: 1 });

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.contract = this.web3.eth.contract.new (this.abi, this.contractAddress);

                this.ccm.helper.setContent (this.element, this.ccm.helper.html (this.html.main, {

                    contract: this.contractAddress,

                    upload: this.uploadFile
                }));

                this.dropzone = new Dropzone (this.element.querySelector ('.dropzone'), {

                        url: "#",
                        parallelUploads: 1,
                        maxFilesize: 512,
                        maxFiles: 1,
                        //acceptedFiles: 'image/*,application/pdf,.psd',
                        autoProcessQueue: false,
                        autoQueue: true,
                        addRemoveLinks: true,
                        dictDefaultMessage: 'Drop the file here for which you want to claim ownership.',
                        dictRemoveFile: 'Remove file.'
                    })
                    .on ('addedfile', file => {

                        this.cleanMessages();

                        const reader = new FileReader();

                        reader.onload = event =>
                            this.fileChanged (event.target.result);

                        reader.readAsBinaryString (file);

                    })
                    .on ('removedfile', file => {

                        this.hash = undefined;
                        this.element.querySelector ('#sha256').innerHTML = 'No document dropped yet.';
                    });
            };


            /* Functions */

            this.accountChanged = accounts => {

                this.owner = this.web3.utils.toChecksumAddress (accounts [0]);

                this.element.querySelector ('#owner').innerHTML = this.owner;
            };

            this.uploadFile = () => {

                if (typeof this.owner === 'undefined' || typeof this.hash === 'undefined') {

                    this.showError ('Please drop a file first!');

                    return;
                }

                this.web3.eth.contract.send (
                    this.contract,
                    'addFile(bytes32,bytes32)',
                    [ this.hash, this.hash ],
                    { from:   this.owner }
                )
                    .then (this.handleResult)
                    .catch (console.error)
                    .finally (this.toggleSpinner);

                this.toggleSpinner();
            };

            this.handleResult = result => {

                this.dropzone.removeAllFiles();

                if (result.events.eFileAdded.returnValues.isAdded) {

                    this.element.querySelector ('#success')
                        .classList
                        .remove ('d-none');

                    this.ccm.helper.setContent (this.element.querySelector ('#success'), this.ccm.helper.html (this.html.success, {

                        file: result.events.eFileAdded.returnValues.file_hash,

                        date: new Date(parseInt(result.events.eFileAdded.returnValues.timestamp) * 1000).toLocaleString()
                    }));

                } else {

                    this.element.querySelector ('#error')
                        .classList
                        .remove ('d-none');

                    this.ccm.helper.setContent (this.element.querySelector ('#error'), this.ccm.helper.html (this.html.error, {

                        owner: result.events.eFileAdded.returnValues.owner,

                        date: new Date(parseInt(result.events.eFileAdded.returnValues.timestamp) * 1000).toLocaleString()
                    }));
                }
            };

            this.fileChanged = fileContent => {

                this.hash = `0x${CryptoJS.SHA256 (fileContent).toString()}`;

                this.element.querySelector ('#sha256').innerHTML = this.hash;
            };

            this.cleanMessages = () => {

                this.element.querySelector ('#error')
                    .classList
                    .add ('d-none');

                this.element.querySelector ('#success')
                    .classList
                    .add ('d-none');
            };

            this.showError = message => {

                this.element.querySelector ('#error')
                    .classList
                    .remove ('d-none');

                this.element.querySelector ('#error').innerHTML = message;
            };

            this.toggleSpinner = () => {

                if (this.toggle) {

                    this.element.querySelector ('.btn-primary').removeAttribute ('disabled');
                    this.element.querySelector ('.spinner-border').classList.add ('d-none');

                } else {

                    this.element.querySelector ('.btn-primary')
                        .setAttribute ('disabled', 'disabled');

                    this.element.querySelector ('.spinner-border').classList.remove ('d-none');

                }

                this.toggle = !this.toggle;
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();
