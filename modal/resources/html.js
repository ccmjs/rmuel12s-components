/**
 * @component ccm-modal
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = {
    "modal": {
        "id"            : "%id%",
        "class"         : "modal fade",
        "tabindex"      : "-1",
        "role"          : "dialog",
        "aria-hidden"   : "true",

        "inner" : {
            "class" : "modal-dialog",
            "role"  : "document",
            "inner": {

                "class" : "modal-content",
                "inner" : [
                    {
                        "class" : "modal-header",
                        "inner" : [
                            {
                                "tag"   : "h5",
                                "class" : "modal-title",
                                "inner" : "%title%"
                            },
                            {
                                "tag"           : "button",
                                "type"          : "button",
                                "class"         : "close",
                                "data-dismiss"  : "modal",
                                "aria-label"    : "Close",

                                "inner": {
                                    "tag"           : "span",
                                    "aria-hidden"   : "true",
                                    "inner"         : "&times;"
                                }
                            }
                        ]
                    },
                    {
                        "class" : "modal-body",
                        "inner" : [
                            "%body%"
                        ]
                    },
                    {
                        "class": "modal-footer",
                        "inner": [
                            "%footer%"
                        ]
                    }
                ]
            }
        }
    }
};
