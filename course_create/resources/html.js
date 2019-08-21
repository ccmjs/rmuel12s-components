/**
 * @component ccm-course_create
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = {
    "class": "card text-center",
    "style": "width: 32rem; margin: 0 auto;",
    "inner": [
        {
            "class": "card-header",
            "inner": "Create course"
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
                                "inner": "Course name"
                            }
                        },
                        {
                            "tag": "input",
                            "name": "course-name",
                            "class": "form-control",
                            "placeholder": "Course name...",
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
                                "inner": "University"
                            }
                        },
                        {
                            "tag": "input",
                            "name": "university",
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
                            "onclick": "%click%",
                            "inner": [
                                {
                                    "tag": "span",
                                    "style": "margin-right: 0.4rem;",
                                    "inner": "Create course"
                                },
                                {
                                    "tag": "span",
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
};
