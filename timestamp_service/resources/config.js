/**
 * @component ccm-timestamp_service
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['config.js'] = {
    "live": {
        "storeUrl"          : "wss://ccm2.inf.h-brs.de",
        "contractAddress"   : "<todo>"
    },
    "develop": {
        "storeUrl"          : "http://localhost:8080",
        "contractAddress"   : "0xd964cfaae916a0e17909f81fc99762e2da3ec748"
    }
};
