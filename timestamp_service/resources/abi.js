/**
 * @component ccm-timestamp_service
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['abi.js'] = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_file_hash",
                "type": "bytes32"
            },
            {
                "name": "_prev_version",
                "type": "bytes32"
            }
        ],
        "name": "addFile",
        "outputs": [
            {
                "name": "_success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "isAdded",
                "type": "bool"
            },
            {
                "indexed": false,
                "name": "file_hash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "prev_version",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "eFileAdded",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_file_hash",
                "type": "bytes32"
            }
        ],
        "name": "getFileOwner",
        "outputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];