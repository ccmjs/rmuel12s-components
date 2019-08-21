/**
 * @component ccm-faucet
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = {
    class: "card",
    style: "width: 16rem; margin: 0 auto;",
    inner: [
        {
            class: "card-header",
            inner: "Faucet"
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
                            inner: "Address"
                        },
                        {
                            tag: "code",
                            class: "d-block",
                            id: "account",
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
                            inner: "Balance"
                        },
                        {
                            tag: "code",
                            class: "d-block",
                            id: "balance",
                            inner: ""
                        }
                    ]
                },
                {
                    tag: "button",
                    onclick: "%request%",
                    class: "btn btn-primary",
                    inner: [
                        {
                            "tag": "span",
                            "style": "margin-right: 0.4rem;",
                            "inner": "Request 1 ether"
                        },
                        {
                            "class": "spinner-border spinner-border-sm d-none",
                            "role": "status"
                        }
                    ]
                }
            ]
        }
    ]
};
