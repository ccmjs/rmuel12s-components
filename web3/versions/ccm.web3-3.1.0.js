/**
 * @component ccm-web3
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 3.1.0
 */

"use strict";

(() => {

    const component = {

        name: 'web3',
        version: [3, 1, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            Web3: ['ccm.load', 'https://ccmjs.github.io/rmueller-components/web3/resources/web3-1.0.0-beta.55.min.js'],
            units: {
                wei:        'wei',
                gwei:       'Gwei',
                kwei:       'Kwei',
                mwei:       'Mwei',
                nanoether:  'nanoether',
                microether: 'microether',
                milliether: 'milliether',
                ether:      'ether'
            },
            block: {
                earliest:   'earliest',
                pending:    'pending',
                latest:     'latest'
            }
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () =>
                this.setProvider();


            /* Functions */

            this.setProvider = (provider = '', options = {}) =>
                this.web3 = new Web3 (provider, null, options);

            this.givenProvider = () =>
                this.web3.givenProvider;

            this.currentProvider = () =>
                this.web3.currentProvider;

            this.version = () =>
                this.web3.version;

            // BatchRequest

            this.eth = {

                defaultBlock: () =>
                    this.web3.eth.defaultBlock,

                defaultAccount: () =>
                    this.web3.eth.defaultAccount,

                defaultGasPrice: () =>
                    this.web3.eth.defaultGasPrice,

                defaultGas: () =>
                    this.web3.eth.defaultGas,

                transactionBlockTimeout: () =>
                    this.web3.eth.transactionBlockTimeout,

                transactionConfirmationBlocks: () =>
                    this.web3.eth.transactionConfirmationBlocks,

                transactionPollingTimeout: () =>
                    this.web3.eth.transactionPollingTimeout,

                getProtocolVersion: () =>
                    this.web3.eth.getProtocolVersion(),

                isSyncing: () =>
                    this.web3.eth.isSyncing(),

                getCoinbase: () =>
                    this.web3.eth.getCoinbase(),

                isMining: () =>
                    this.web3.eth.isMining(),

                getHashrate: () =>
                    this.web3.eth.getHashrate(),

                getGasPrice: () =>
                    this.web3.eth.getGasPrice(),

                getAccounts: () =>
                    this.web3.eth.getAccounts(),

                getBlockNumber: () =>
                    this.web3.eth.getBlockNumber(),

                getBalance: (address, block = this.block.latest) =>
                    this.web3.eth.getBalance (address, block),

                getBlock: (blockHashOrBlockNumber, returnTransactionObjects) =>
                    this.web3.eth.getBlock (blockHashOrBlockNumber, returnTransactionObjects),

                getBlockTransactionCount: (blockHashOrBlockNumber) =>
                    this.web3.eth.getBlockTransactionCount (blockHashOrBlockNumber),

                getTransaction: (transactionHash) =>
                    this.web3.eth.getTransaction (transactionHash),

                getTransactionFromBlock: (hashStringOrNumber, indexNumber) =>
                    this.web3.eth.getTransactionFromBlock (hashStringOrNumber, indexNumber),

                getTransactionReceipt: (hash) =>
                    this.web3.eth.getTransactionReceipt(hash),

                getTransactionCount: (address, block = "latest") =>
                    this.web3.eth.getTransactionCount (address, block),

                sendTransaction: transactionObject =>
                    this.web3.eth.sendTransaction (transactionObject),

                sendSignedTransaction: signedTransactionData =>
                    this.web3.eth.sendSignedTransaction (signedTransactionData),

                estimateGas: callObject =>
                    this.web3.eth.estimateGas (callObject),

                /*requestAccounts: () =>
                    this.web3.eth.requestAccounts(),*/

                // web3.eth.getStorageAt
                // web3.eth.getCode
                // web3.eth.getUncle
                // web3.eth.sign
                // web3.eth.signTransaction
                // web3.eth.call
                // web3.eth.getPastLogs
                // web3.eth.getWork
                // web3.eth.submitWork
                // web3.eth.subscribe
                // web3.eth.clearSubscriptions

                contract: {

                    new: (jsonInterface, address = '', options = {}) =>
                        new this.web3.eth.Contract (jsonInterface, address, options),

                    call: (contract, method, args = [], options = {}) =>
                        contract.methods [method] (...args).call (options),

                    send: (contract, method, args = [], options = {}) =>
                        contract.methods [method] (...args).send (options),

                    events: (contract, event, options = {}) =>
                        contract.events [event] (options),

                    once: (contract, event, options = {}, callback) =>
                        contract.once (event, options, callback),

                    deploy: {

                        send: (contract, options, options_send) =>
                            contract.deploy (options).send (options_send),

                        encodeABI: (contract, options) =>
                            contract.deploy (options).encodeABI(),

                        estimateGas: (contract, options, c) =>
                            contract.deploy (options).estimateGas (c)
                    }

                    // web3.eth.contract.allEvents
                    // web3.eth.contract.getPastEvents
                },

                accounts: {

                    privateKeyToAccount: privateKey =>
                        this.web3.eth.accounts.privateKeyToAccount (privateKey),

                    signTransaction: (tx, privateKey) =>
                        this.web3.eth.accounts.signTransaction (tx, privateKey)

                    // web3.eth.accounts.create
                    // web3.eth.accounts.recoverTransaction
                    // web3.eth.accounts.hashMessage
                    // web3.eth.accounts.sign
                    // web3.eth.accounts.recover
                    // web3.eth.accounts.encrypt
                    // web3.eth.accounts.decrypt
                    // web3.eth.accounts.wallet
                },

                net: {

                    getId: () =>
                        this.web3.eth.net.getId(),

                    isListening: () =>
                        this.web3.eth.net.isListening(),

                    getPeerCount: () =>
                        this.web3.eth.net.getPeerCount(),

                    getNetworkType: () =>
                        this.web3.net.getNetworkType()
                }

                // web3.eth.personal
                // web3.eth.ens
                // web3.eth.iban
                // web3.eth.net
                // web3.eth.abi
            };

            // web3.bzz
            // web3.shh

            this.utils = {

                randomHex: size =>
                    this.web3.utils.randomHex (size),

                BN: mixed =>
                    new this.web3.utils.BN (mixed),

                isBN: bn =>
                    this.web3.utils.isBN (bn),

                keccak256: string =>
                    this.web3.utils.keccak256 (string),

                isHex: hex =>
                    this.web3.utils.isHex (hex),

                isHexStrict: hex =>
                    this.web3.utils.isHexStrict (hex),

                isAddress: address =>
                    this.web3.utils.isAddress (address),

                toChecksumAddress: address =>
                    this.web3.utils.toChecksumAddress (address),

                toHex: mixed =>
                    this.web3.utils.toHex (mixed),

                hexToNumberString: hex =>
                    this.web3.utils.hexToNumberString (hex),

                toWei: (number, unit = this.units.ether) =>
                    this.web3.utils.toWei (number, unit),

                fromWei: (number, unit) =>
                    this.web3.utils.fromWei (number, unit),

                unitMap: () =>
                    this.web3.utils.unitMap

                // web3.utils.isBigNumber
                // web3.utils.soliditySha3
                // web3.utils.checkAddressChecksum
                // web3.utils.toBN
                // web3.utils.hexToNumber
                // web3.utils.numberToHex
                // web3.utils.hexToUtf8
                // web3.utils.hexToAscii
                // web3.utils.utf8ToHex
                // web3.utils.asciiToHex
                // web3.utils.hexToBytes
                // web3.utils.bytesToHex
                // web3.utils.padLeft
                // web3.utils.padRight
                // web3.utils.toTwosComplement
                // web3.utils.getSignatureParameters
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();