/**
 * @component ccm-web3
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

//TODO documentation

"use strict";

( () => {

    const component = {

        name: 'web3',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.2.0.min.js',

        config: {
            Web3: ['ccm.load', 'https://cdn.jsdelivr.net/gh/ethereum/web3.js@v0.20.6/dist/web3.min.js'],
            units: ['wei', 'Gwei', 'Kwei', 'Mwei', 'nanoether', 'microether', 'milliether', 'ether']
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => this.web3 = new Web3();
            this.ready  = async () => {};
            this.start  = async () => {};


            /* Functions */

            this.version = {
                api: () => {
                    return this.web3.version.api;
                },
                node: async () => {
                    //return this.web3.version.node;
                    return new Promise((resolve, reject) => {
                        this.web3.version.getNode((error, result) => resolve(result));
                    });
                },
                network: () => {
                    //return this.web3.version.network;
                    return new Promise((resolve, reject) => {
                        this.web3.version.getNetwork((error, result) => resolve(result));
                    });
                },
                ethereum: () => {
                    //return this.web3.version.ethereum;
                    return new Promise((resolve, reject) => {
                        this.web3.version.getEthereum((error, result) => resolve(result));
                    });
                },
                whisper: () => {
                    //return this.web3.version.whisper;
                    return new Promise((resolve, reject) => {
                        this.web3.version.getWhisper((error, result) => resolve(result));
                    });
                }
            };

            this.net = {
                isListening: () => {
                    //return this.web3.net.listening;
                    return new Promise((resolve, reject) => {
                        this.web3.net.getListening((error, result) => resolve(result));
                    });
                },
                peerCount: () => {
                    //return this.web3.net.peerCount;
                    return new Promise((resolve, reject) => {
                        this.web3.net.getPeerCount((error, result) => resolve(result));
                    });
                }
            };

            this.eth = {
                defaultAccount: () => {
                    return this.web3.eth.defaultAccount;
                },
                coinbase: () => {
                    //return this.web3.eth.coinbase;
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getCoinbase((error, result) => resolve(result));
                    });
                },
                isMining: () => {
                    //return this.web3.eth.mining;
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getMining((error, result) => resolve(result));
                    });
                },
                hashrate: () => {
                    //return this.web3.eth.hashrate;
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getHashrate((error, result) => resolve(result));
                    });
                },
                gasPrice: () => {
                    //return this.web3.eth.gasPrice;
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getGasPrice((error, result) => resolve(result));
                    });
                },
                accounts: () => {
                    //return this.web3.eth.accounts;
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getAccounts((error, result) => resolve(result));
                    });
                },
                blockNumber: () => {
                    //return this.web3.eth.blockNumber;
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getBlockNumber((error, result) => resolve(result));
                    });
                },
                getBalance: (address) => {
                    //return this.web3.eth.getBalance(address);
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getBalance(address, (error, result) => resolve(result));
                    });
                },
                getBlock: (blockHashOrNumber, transactionObjects = false) => {
                    //return this.web3.eth.getBlock(blockHashOrNumber);
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getBlock(blockHashOrNumber, transactionObjects, (error, result) => resolve(result));
                    });
                },
                getBlockTransactionCount: (blockHashOrNumber) => {
                    //return this.web3.eth.getBlockTransactionCount(blockHashOrNumber);
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getBlockTransactionCount(blockHashOrNumber, (error, result) => resolve(result));
                    });
                },
                getTransaction: (transactionHash) => {
                    //return this.web3.eth.getTransaction(transactionHash);
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getTransaction(transactionHash, (error, result) => resolve(result));
                    });
                },
                getTransactionReceipt: (hashString) => {
                    //return this.web3.eth.getTransactionReceipt(hashString);
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getTransactionReceipt(hashString, (error, result) => resolve(result));
                    });
                },
                getTransactionCount: (addressHexString) => {
                    //return this.web3.eth.getTransactionCount(addressHexString);
                    return new Promise((resolve, reject) => {
                        this.web3.eth.getTransactionCount(addressHexString, (error, result) => resolve(result));
                    });
                },
                sendTransaction: (from, to, value, data = "") => {
                    //return this.web3.eth.sendTransaction();
                    return new Promise((resolve, reject) => {
                        this.web3.eth.sendTransaction({
                            from: from,
                            to: to,
                            value: value,
                            data: data
                        }, (error, result) => resolve(result));
                    });
                }

                // web3.eth.defaultBlock
                // web3.eth.syncing
                // web3.eth.isSyncing(callback)
                // web3.eth.getStorageAt
                // web3.eth.getCode
                // web3.eth.getUncle
                // web3.eth.getTransactionFromBlock
                // web3.eth.sendRawTransaction
                // web3.eth.sign
                // web3.eth.call
                // web3.eth.estimateGas
                // web3.eth.filter !!!
            };

            this.contract = {
                call: (abi, address, f, args = []) => {
                    return new Promise((resolve, reject) => {
                        this.web3
                            .eth
                            .contract(abi)
                            .at(address)
                            [f]
                            .call(
                                ...args,
                                (error, result) => resolve(result)
                            );
                    });
                },
                sendTransaction: (abi, address, f, args = [], sender = this.defaultAccount(), value = 0) => {
                    return new Promise((resolve, reject) => {
                        this.web3
                            .eth
                            .contract(abi)
                            .at(address)
                            [f]
                            .sendTransaction(
                                ...args,
                                {
                                    from: sender,
                                    value: value
                                },
                                (error, result) => resolve(result)
                            );
                    });
                },
                registerFilter: (abi, address, event, filter, callback) => {
                    return this.web3
                        .eth
                        .contract(abi)
                        .at(address)
                        [event](callback);
                },
                unregisterFilter: (filter) => {
                    filter.stopWatching();
                }

                // allEvents
            };

            this.provider = {
                setProvider: (provider) =>
                    this.web3.setProvider(provider),
                setByUri: (uri) =>
                    this.web3.setProvider(new this.web3.providers.HttpProvider(uri)),
                setWithAuthentication: (uri, user, password) =>
                    this.web3.setProvider(new this.web3.providers.HttpProvider(uri, 0, user, password, [])),
                current: () =>
                    this.web3.currentProvider
            };

            /**
             * Check if web3 is connected to a node.
             * @return {boolean} Is connected.
             */
            this.isConnected = () =>
                this.web3.isConnected();

            /**
             * Rest web3.
             * @param {string} keepIsSyncing
             */
            this.reset = (keepIsSyncing) =>
                this.web3.reset(keepIsSyncing);

            /**
             * Expects a value in Wei and returns a value in the given unit.
             * @param {string} value - An amount of Wei.
             * @param {object} options - A unit.
             * @return {number} The value in the given unit.
             */
            this.sha3 = (value, options) =>
                this.web3.sha3(value, options);

            /**
             * Expects a value in Wei and returns a value in the given unit.
             * @param {number} value - An amount of Wei.
             * @return {number} The value in the given unit.
             */
            this.toHex = (value) =>
                this.web3.toHex(value);

            /**
             * Expects a value in Wei and returns a value in the given unit.
             * @param {number} value - An amount of Wei.
             * @param {string} unit - A unit.
             * @return {number} The value in the given unit.
             */
            this.fromWei = (value, unit) =>
                this.web3.fromWei(value, unit);

            /**
             * Expects a value and a unit. Returns the value converted to Wei.
             * @param {number} value - An amount.
             * @param {string} unit - The unit.
             * @return {number} The value converted to Wei.
             */
            this.toWei = (value, unit) =>
                this.web3.toWei(value, unit);

            this.isAddress = (hexString) =>
                this.web3.isAddress(hexString);

            // web3.toAscii
            // web3.fromAscii
            // web3.toDecimal
            // web3.fromDecimal
            // web3.toBigNumber
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();