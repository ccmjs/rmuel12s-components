/**
 * @component ccm-certificate_approve
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = {
    "class": "card text-center",
    "inner": [
        {
            "class": "card-header",
            "inner": "Certificate approve"
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
                                "inner": "Course..."
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
                        "placeholder": "Student address <0x...>",
                        "onkeyup": "%keyup%"
                    }
                },
                {
                    "tag": "li",
                    "class": "list-group-item",
                    "inner": {
                        "tag": "div",
                        "id": "certificate",
                        "inner": [
                            {
                                "tag": "i",
                                "inner": "Student:"
                            },
                            {
                                "tag": "code",
                                "inner": "..."
                            },
                            { "tag": "br" }, { "tag": "br" },
                            {
                                "tag": "i",
                                "inner": "Submission:"
                            },
                            {
                                "tag": "code",
                                "inner": "..."
                            },
                            { "tag": "br" }, { "tag": "br" },
                            {
                                "tag": "i",
                                "inner": "Requested:"
                            },
                            {
                                "tag": "code",
                                "inner": "..."
                            },
                            { "tag": "br" }, { "tag": "br" },
                            {
                                "tag": "i",
                                "inner": "Issued:"
                            },
                            {
                                "tag": "code",
                                "inner": "..."
                            },
                            { "tag": "br" }, { "tag": "br" },
                            {
                                "tag": "i",
                                "inner": "Status:"
                            },
                            {
                                "tag": "code",
                                "inner": "..."
                            }
                        ]
                    }
                },
                {
                    "tag": "li",
                    "class": "list-group-item",
                    "inner": {
                        "tag": "button",
                        "class": "btn btn-success",
                        "onclick": "%approve%",
                        "inner": [
                            {
                                "tag": "span",
                                "style": "margin-right: 0.4rem;",
                                "inner": "Approve now"
                            },
                            {
                                "class": "spinner-border spinner-border-sm d-none",
                                "role": "status"
                            }
                        ]
                    }
                }
            ]
        },
        {
            "class": "card-body d-none",
            "inner": {
                "class": "card-text alert alert-success",
                "role": "alert"
            }
        }
    ]
};
