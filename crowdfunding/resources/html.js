/**
 * @component ccm-crowdfunding
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = {
    "main": {
        "class": "row",
        "inner": [
            {
                "class" : "col-1 text-center",
                "inner" : {
                    "tag"   : "strong",
                    "inner" : "%name%"
                }
            },
            {
                "class"   : "col-2 text-center",
                "inner" : "%requirements%"
            },
            {
                "class"   : "col-1 text-center",
                "inner" : "%description%"
            },
            {
                "class"   : "col-1 text-center",
                "inner" : {
                    "tag"   : "i",
                    "inner" : "%fund%"
                }
            },
            {
                "class"   : "col-1 text-center",
                "inner" : {
                    "tag"   : "i",
                    "inner" : "%deposit%"
                }
            },
            {
                "class"   : "col-1 text-center",
                "inner" : {
                    "tag"   : "i",
                    "class" : "time-frame",
                    "inner" : "%timeFrame%"
                }
            },
            {
                "class"   : "col-1 text-center",
                "inner" : {
                    "tag"   : "span",
                    "class" : "badge badge-pill badge-%badge_color%",
                    "inner" : "%badge_text%"
                }
            },
            {
                "class" : "col-4 text-center",
                "inner" : [
                    {
                        "tag": "button",
                        "class": "btn btn-outline-warning btn-sm btn-add-fund %btnFund%",
                        "onclick": "%addFund%",
                        "inner": [
                            {
                                "tag": "span",
                                "style": "margin-right: 0.4rem;",
                                "inner": "Add fund"
                            },
                            {
                                "class": "spinner-border spinner-border-sm d-none",
                                "role": "status"
                            }
                        ]
                    },
                    {
                        "tag": "button",
                        "class": "btn btn-outline-primary btn-sm btn-register-developer %btnRegisterDeveloper%",
                        "onclick": "%registerDeveloper%",
                        "inner": [
                            {
                                "tag": "span",
                                "style": "margin-right: 0.4rem;",
                                "inner": "Develop component"
                            },
                            {
                                "class": "spinner-border spinner-border-sm d-none",
                                "role": "status"
                            }
                        ]
                    },
                    {
                        "tag": "button",
                        "class": "btn btn-outline-danger btn-sm btn-dismiss-developer %btnDismissDeveloper%",
                        "onclick": "%dismissDeveloper%",
                        "inner": [
                            {
                                "tag": "span",
                                "style": "margin-right: 0.4rem;",
                                "inner": "Dismiss developer"
                            },
                            {
                                "class": "spinner-border spinner-border-sm d-none",
                                "role": "status"
                            }
                        ]
                    },
                    {
                        "tag": "button",
                        "class": "btn btn-outline-info btn-sm btn-submit-component %btnSubmitComponent%",
                        "onclick": "%submitComponent%",
                        "inner": [
                            {
                                "tag": "span",
                                "style": "margin-right: 0.4rem;",
                                "inner": "Submit component"
                            },
                            {
                                "class": "spinner-border spinner-border-sm d-none",
                                "role": "status"
                            }
                        ]
                    },
                    {
                        "tag": "button",
                        "class": "btn btn-outline-success btn-sm btn-approve-component %btnApproveComponent%",
                        "onclick": "%approveComponent%",
                        "inner": [
                            {
                                "tag": "span",
                                "style": "margin-right: 0.4rem;",
                                "inner": "Approve component"
                            },
                            {
                                "class": "spinner-border spinner-border-sm d-none",
                                "role": "status"
                            }
                        ]
                    },
                    {
                        "tag": "span",
                        "style": "position: absolute; width: 0; height: 0;",
                        "id": "modal-area"
                    }
                ]
            }
        ]
    },

    "btnRequirement": {
        "tag":      "button",
        "class":    "btn btn-outline-info btn-sm",
        "onclick":  "%click%",
        "inner":    "Requirements [%size%]"
    },

    "btnDescription": {
        "tag":      "button",
        "class":    "btn btn-outline-info btn-sm",
        "onclick":  "%click%",
        "inner":    "Description"
    }
};
