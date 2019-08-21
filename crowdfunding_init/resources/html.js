/**
 * @component ccm-crowdfunding_init
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = {
    "main": {
        "class": "card text-center",
        "style": "width: 32rem; margin: 0 auto;",
        "inner": [
            {
                "class": "card-header",
                "inner": "Component request"
            },
            {
                "tag": "ul",
                "class": "list-group list-group-flush text-left",
                "inner": [
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "Name"
                                }
                            },
                            {
                                "tag": "input",
                                "name": "name",
                                "class": "form-control",
                                "placeholder": "Component name",
                                "autofocus": "autofocus",
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "Requirements"
                                }
                            },
                            {
                                "tag": "p",
                                "class": "text-secondary",
                                "inner": "Define all requirements this component should have. <a href='https://www.sophist.de/fileadmin/user_upload/Bilder_zu_Seiten/Publikationen/Wissen_for_free/MASTeR_-Kern_RE-Plakat2.pdf' target='_blank'>Here</a> you can find a template for writing good requirements."
                            },
                            {
                                "tag": "span",
                                "id": "requirements",
                                "inner": {
                                    "class": "form-group",
                                    "inner": {
                                        "tag": "input",
                                        "class": "form-control",
                                        "placeholder": "This component should..."
                                    }
                                }
                            },
                            {
                                "tag": "button",
                                "type": "button",
                                "class": "btn btn-secondary",
                                "onclick": "%more%",
                                "inner": "add requirement &#10010;"
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "Description"
                                }
                            },
                            {
                                "tag": "textarea",
                                "class": "form-control",
                                "rows": "3",
                                "placeholder": "What else do you want to tell the developer about the component that you are about to request..."
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": {
                            "tag": "button",
                            "class": "btn btn-secondary",
                            "type": "button",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            "onclick": "%settings%",
                            "inner": "more settings &#9660;"
                        }
                    },
                    {
                        "tag": "span",
                        "class": "collapse",
                        "inner": [
                            {
                                "tag": "li",
                                "class": "list-group-item",
                                "inner": [
                                    {
                                        "tag": "label",
                                        "inner": {
                                            "tag": "strong",
                                            "inner": "Fund"
                                        }
                                    },
                                    {
                                        "class": "input-group",
                                        "inner": [
                                            {
                                                "class": "input-group-prepend",
                                                "inner": {
                                                    "class": "input-group-text",
                                                    "inner": "&#208;"
                                                }
                                            },
                                            {
                                                "tag": "input",
                                                "type": "number",
                                                "name": "fund",
                                                "value": "0",
                                                "class": "form-control",
                                                "placeholder": "Initial fund for this component."
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                "tag": "li",
                                "class": "list-group-item border-0",
                                "inner": [
                                    {
                                        "tag": "label",
                                        "inner": {
                                            "tag": "strong",
                                            "inner": "Deposit"
                                        }
                                    },
                                    {
                                        "class": "input-group",
                                        "inner": [
                                            {
                                                "class": "input-group-prepend",
                                                "inner": {
                                                    "class": "input-group-text",
                                                    "inner": "&#208;"
                                                }
                                            },
                                            {
                                                "tag": "input",
                                                "type": "number",
                                                "name": "deposit",
                                                "value": "1",
                                                "class": "form-control",
                                                "placeholder": "Deposit to be sent by the developer."
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                "tag": "li",
                                "class": "list-group-item border-0",
                                "inner": [
                                    {
                                        "tag": "label",
                                        "inner": {
                                            "tag": "strong",
                                            "inner": "Time frame"
                                        }
                                    },
                                    {
                                        "class": "input-group",
                                        "inner": [
                                            {
                                                "class": "input-group-prepend",
                                                "inner": {
                                                    "class": "input-group-text",
                                                    "inner": "&#128346;"
                                                }
                                            },
                                            {
                                                "tag": "input",
                                                "type": "number",
                                                "name": "time-frame",
                                                "value": "7",
                                                "class": "form-control",
                                                "placeholder": "Days until the work has to be done."
                                            }
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "Initiator"
                                }
                            },
                            {
                                "tag": "input",
                                "name": "initiator",
                                "class": "form-control",
                                "readonly": "readonly"
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item border-0",
                        "inner": [
                            {
                                "tag": "button",
                                "class": "btn btn-primary float-right",
                                "onclick": "%send%",
                                "inner": [
                                    {
                                        "tag": "span",
                                        "style": "margin-right: 0.4rem;",
                                        "inner": "Send request"
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
            }
        ]
    },

    "requirement": {
        "class": "form-group",
        "inner": {
            "tag": "input",
            "class": "form-control",
            "placeholder": "This component should..."
        }
    },

    "done": [
        {
            "tag": "li",
            "class": "list-group-item",
            "inner": {
                "tag": "h5",
                "class": "card-title text-center",
                "inner": "Component <code>%component%</code> successfully requested."
            }
        },
        {
            "tag": "li",
            "class": "list-group-item",
            "inner": {
                "tag": "button",
                "class": "btn btn-primary d-block text-center",
                "style": "margin: 0 auto;",
                "onclick": "javascript:window.location.reload()",
                "inner": "Request another component"
            }
        }
    ]
};
