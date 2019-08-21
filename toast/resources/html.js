/**
 * @component ccm-toast
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

ccm.files['html.js'] = {
    "class":            "toast %position%",
    "role":             "alert",
    "aria-live":        "assertive",
    "aria-atomic":      "true",
    "data-autohide":    "%autohide%",
    "data-delay":       "%delay%",
    "inner": [
        {
            "class": "toast-header",
            "inner": [
                {
                    "tag":      "strong",
                    "class":    "mr-auto",
                    "inner":    "%title%"
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
            "inner":    "%body%"
        }
    ]
};
