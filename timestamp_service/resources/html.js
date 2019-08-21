/**
 * @component ccm-timestamp_service
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = {
    main: {
        class: "card",
        inner: [
            {
                class: "card-header",
                inner: "Notary"
            },
            {
                class: "card-body text-center",
                inner: {
                    class: "dropzone"
                }
            },
            {
                class: "card-body",
                inner: [
                    {
                        tag: "h5",
                        class: "card-title",
                        inner: "Details"
                    },
                    {
                        tag: "p",
                        class: "card-text",
                        inner: [
                            {
                                tag: "strong",
                                inner: "Owner"
                            },
                            {
                                tag: "code",
                                class: "d-block",
                                id: "owner",
                                inner: ""
                            }
                        ]
                    },
                    {
                        tag: "p",
                        class: "card-text",
                        inner: [
                            {
                                tag: "strong",
                                inner: "SHA256"
                            },
                            {
                                tag: "code",
                                class: "d-block",
                                id: "sha256",
                                inner: "No document dropped yet"
                            }
                        ]
                    },
                    {
                        "tag": "button",
                        "class": "btn btn-primary float-right",
                        "onclick": "%upload%",
                        "inner": [
                            {
                                "tag": "span",
                                "inner": "Claim ownership"
                            },
                            {
                                "class": "spinner-border spinner-border-sm d-none",
                                "role": "status"
                            }
                        ]
                    }
                ]
            },
            {
                tag: "ul",
                class: "list-group list-group-flush",
                inner: [
                    {
                        tag: "li",
                        class: "list-group-item list-group-item-danger d-none",
                        id: "error",
                        inner: ""
                    },
                    {
                        tag: "li",
                        class: "list-group-item list-group-item-success d-none",
                        id: "success",
                        inner: ""
                    }
                ]
            },
            {
                class: "card-footer",
                inner: "Contract: <code>%contract%</code>"
            }
        ]
    },
    success: {
        "tag": "span",
        "inner": "Ownership for file <code>%file%</code> successfully claimed at <code>%date%</code>."
    },
    error: {
        "tag": "span",
        "inner": "Ownership already claimed by <code>%owner%</code> at <code>%date%</code>!"
    }
};
