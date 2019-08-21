/**
 * @component ccm-certificate_student
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

ccm.files ['html.js'] = {
    "main": {
        "class": "card",
        "style": "width: 32rem; margin: 0 auto;",
        "inner": [
            {
                "class": "card-header text-center",
                "inner": "Enroll student"
            },
            {
                "tag": "ul",
                "class": "list-group list-group-flush",
                "inner": [
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "Student address"
                                }
                            },
                            {
                                "tag": "input",
                                "name": "student-address",
                                "class": "form-control",
                                "placeholder": "0x...",
                                "onkeyup": "%keyup%"
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "id": "slot",
                        "class": "list-group-item",
                        "inner": {}
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "University address"
                                }
                            },
                            {
                                "tag": "input",
                                "name": "university-address",
                                "class": "form-control",
                                "readonly": "readonly"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "enroll": {
      "tag": "span",
      "inner": [
          {
              "tag": "label",
              "inner": {
                  "tag": "strong",
                  "inner": "Student number"
              }
          },
          {
              "tag": "input",
              "type": "number",
              "name": "student-number",
              "min": "1000",
              "max": "9999",
              "class": "form-control",
              "placeholder": "x >= 1000, x <= 9999"
          },
          { "tag": "br" },
          {
              "tag": "label",
              "inner": {
                  "tag": "strong",
                  "inner": "Student name"
              }
          },
          {
              "tag": "input",
              "name": "student-name",
              "class": "form-control",
              "placeholder": "Jon Doe"
          },
          { "tag": "br" },
          {
              "tag": "button",
              "class": "btn btn-primary",
              "onclick": "%enroll%",
              "inner": [
                  {
                      "tag": "span",
                      "style": "margin-right: 0.4rem;",
                      "inner": "Enroll student"
                  },
                  {
                      "class": "spinner-border spinner-border-sm d-none",
                      "role": "status"
                  }
              ]
          }
      ]
    },
    "student": [
        {
            "tag": "label",
            "inner": {
                "tag": "strong",
                "inner": "Student number"
            }
        },
        {
            "tag": "code",
            "class": "d-block",
            "inner": "%studentNumber%"
        },
        { "tag": "br" },
        {
            "tag": "label",
            "inner": {
                "tag": "strong",
                "inner": "Student name"
            }
        },
        {
            "tag": "code",
            "class": "d-block",
            "inner": "%studentName%"
        }
    ]
};
