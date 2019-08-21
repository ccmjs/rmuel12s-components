/**
 * @component ccm-metamask
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

/**
 * MetaMask attributes, functions and events
 *
 * @attribute: isMetaMask: bool
 * @attribute: networkVersion: string
 * @attribute: selectedAddress: string
 *
 * @function: isConnected: bool
 * @function: enable: Promise
 *
 * @event: accountsChanged
 *
 */

( () => {

    const component = {

        name: 'metamask',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {},

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {};


            /* Functions */

            this.getProvider = () =>
                this.isMetaMask() ? window['ethereum'] : false;

            this.enable = (callback) =>
                window['ethereum'].enable()
                    .catch(console.error)
                    .then(callback);

            this.networkVersion = () =>
                window['ethereum'].networkVersion;

            this.selectedAddress = () =>
                window['ethereum'].selectedAddress;

            this.isConnected = () =>
                window['ethereum'].isConnected();

            this.isMetaMask = () => {
                return (
                    typeof window['ethereum'] !== 'undefined' &&
                    typeof window['ethereum']['isMetaMask'] !== 'undefined' &&
                    window['ethereum'].isMetaMask
                );
            };

            this.onAccountsChanged = callback =>
                window['ethereum']
                    .on('accountsChanged', callback);

            this.removeAllListeners = () =>
                window['ethereum'].removeAllListeners();
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();