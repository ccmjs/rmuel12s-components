/**
 * @component ccm-crowdfunding_init
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['config.js'] = {
    "live": {
        "storeUrl": "wss://ccm2.inf.h-brs.de"
    },
    "develop": {
        "storeUrl": "http://localhost:8080"
    }
};
