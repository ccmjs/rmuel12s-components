/**
 * @component ccm-crowdfunding
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['config.js'] = {
    "live": {
        "data" : {}
    },
    "develop": {
        "data" : {
            "storeUrl": "http://localhost:8080",
            "contractAddress" : "0xACEa968d9C42B06D5C06fe561F184199a0653d7c",
            "name": "Test",
            "requirements": "r1",
            "description": "Des",
            "fund": 1,
            "deposit": 3,
            "timeFrame": 3,
            "requested": "2019-08-13T16:47:03+00:00",
            "status": 0
        }
    }
};
