/**
 * @component ccm-certificate_view
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = [
    {
        "class": "card text-center",
        "inner": [
            {
                "class": "card-header",
                "inner": "Certificate viewer"
            },
            {
                "tag": "ul",
                "class": "list-group list-group-flush",
                "inner": [
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": {
                            "tag": "select",
                            "class": "form-control",
                            "onchange": "%change%",
                            "inner": [
                                {
                                    "tag": "option",
                                    "selected": "selected",
                                    "disabled": "disabled",
                                    "inner": "Select a certificate..."
                                }
                            ]
                        }
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": {
                            "tag": "input",
                            "class": "form-control",
                            "value": "https://ccmjs.github.io/rmueller-components/certificate_check/index.html?"
                        }
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": "Please select a <code>certificate</code> and a verification <code>URI</code> for the certificate."
                    }
                ]
            }
        ]
    },
    {
        "class": "certificate-outer",
        "inner": {
            "class": "certificate text-center position-relative",
            "inner": [
                {
                    "tag": "h1",
                    "inner": "Certificate"
                },
                {
                    "tag": "i",
                    "class": "h6 d-block",
                    "inner": "* * * * * * * *"
                },
                {
                    "tag": "h3",
                    "class": "student",
                    "inner": "%student%"
                },
                {
                    "tag": "i",
                    "class": "h6 d-block",
                    "inner": "received this certificate for passing"
                },
                {
                    "tag": "h3",
                    "class": "certificate-name",
                    "inner": "%certificate%"
                },
                {
                    "tag": "i",
                    "class": "h6 d-block location-date",
                    "inner": "%location%, %date%"
                },
                {
                    "tag": "img",
                    "class": "position-absolute logo",
                    "src": "../certificate_view/resources/hbrs.png"
                },
                {
                    "tag": "span",
                    "inner": "%qrcode%"
                }
            ]
        }
    },
    {
        "tag": "p",
        "class": "text-danger",
        "inner": "You don't own this certificate yet!"
    }
];