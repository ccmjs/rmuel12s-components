/**
 * @component ccm-certificate_request
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['config.js'] = {
    "live": {
        "data": {}
    },
    "develop": {
        "data": {
            "storeUrl": "http://localhost:8080",
            "blurSelector": "body div"
        }
    }
};
