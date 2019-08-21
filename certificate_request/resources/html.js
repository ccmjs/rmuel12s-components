/**
 * @component ccm-certificate_request
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = {
    "class":            "toast",
    "role":             "alert",
    "aria-live":        "assertive",
    "aria-atomic":      "true",
    "data-autohide":    "false",
    "inner": [
        {
            "class": "toast-header",
            "inner": [
                {
                    "tag":      "img",
                    "src":      "https://ccmjs.github.io/rmueller-components/certificate_request/resources/logo.png",
                    "class":    "rounded mr-2",
                    "alt":      "logo"
                },
                {
                    "tag":      "strong",
                    "class":    "mr-auto",
                    "inner":    "Certificate request"
                },
                {
                    "tag":          "button",
                    "type":         "button",
                    "class":        "ml-2 mb-1 close",
                    "data-dismiss": "toast",
                    "aria-label":   "Close",
                    "onclick":      "%close%",
                    "inner": {
                        "tag":          "span",
                        "aria-hidden":  "true",
                        "inner":        "&times;"
                    }
                }
            ]
        },
        {
            "class":    "toast-body",
            "inner":    [
                {
                    "class": "form-group",
                    "inner": {
                        "class": "custom-control custom-switch",
                        "inner": [
                            {
                                "tag":      "input",
                                "type":     "checkbox",
                                "class":    "custom-control-input",
                                "id":       "switch",
                                "onchange": "%check%"
                            },
                            {
                                "tag":      "label",
                                "class":    "custom-control-label",
                                "for":      "switch",
                                "inner":    "Do you want to submit your work to the blockchain to request a certificate?"
                            }
                        ]
                    }
                },
                {
                    "tag": "fieldset",
                    "disabled": "disabled",
                    "inner": [
                        {
                            "class": "form-group",
                            "inner": [
                                {
                                    "tag":      "label",
                                    "for":      "certificate",
                                    "inner":    "Choose a course"
                                },
                                {
                                    "tag":      "select",
                                    "class":    "form-control",
                                    "inner":    []
                                }
                            ]
                        },
                        {
                            "class": "form-group text-right",
                            "inner": {
                                "tag":      "button",
                                "type":     "submit",
                                "class":    "btn btn-primary",
                                "onclick":  "%save%",
                                "inner":    "Save"
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
