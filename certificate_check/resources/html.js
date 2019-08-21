/**
 * @component ccm-certificate_check
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = {
    "class": "card text-center",
    "style": "width: 16rem; margin: 0 auto;",
    "inner": [
        {
            "class": "card-header",
            "inner": "Certificate check"
        },
        {
            "tag": "img",
            "src": "resources/%src%",
            "style": "width: 8rem; height: 8rem; margin: 1rem auto;"
        },
        {
            "class": "card-body text-danger",
            "inner": "%message%"
        },
        {
            "tag": "ul",
            "class": "list-group list-group-flush",
            "inner": [
                {
                    "tag": "style",
                    "inner": "#graduate:hover span {display: none;} #graduate:hover:before {content: '%graduate_address%'} #certificate:hover span {display: none;} #certificate:hover:before {content: '%contract%'}"
                },
                {
                    "tag": "li",
                    "class": "list-group-item",
                    "inner": [
                        {
                            "tag": "strong",
                            "class": "d-block",
                            "inner": "Graduate"
                        },
                        {
                            "tag": "code",
                            "id": "graduate",
                            "inner": {
                                "tag": "span",
                                "inner": "%graduate%"
                            }
                        }
                    ]
                },
                {
                    "tag": "li",
                    "class": "list-group-item",
                    "inner": [
                        {
                            "tag": "strong",
                            "class": "d-block",
                            "inner": "Contract"
                        },
                        {
                            "tag": "code",
                            "id": "certificate",
                            "inner": {
                                "tag": "span",
                                "inner": "%certificate%"
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
