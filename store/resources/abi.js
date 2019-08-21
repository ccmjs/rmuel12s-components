/**
 * @component ccm-store
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['abi.js'] = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_store",
                "type": "string"
            }
        ],
        "name": "setStore",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "store",
                "type": "string"
            }
        ],
        "name": "eStored",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getStore",
        "outputs": [
            {
                "name": "_store",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
