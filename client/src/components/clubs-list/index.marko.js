// Compiled using marko@4.6.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/client$1.0.0/src/components/clubs-list/index.marko", function() {
      return module.exports;
    }),
    marko_component = require("./component"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  let clubs = component.getClubs();

  out.w("<table><th>Nom</th><th>Coeff</th>");

  marko_forEach(clubs, function(club) {
    out.w("<tr" +
      marko_attr("data-marko", {
        onclick: __component.d("onClubClick", [
            club
          ])
      }, false) +
      "><td>" +
      marko_escapeXml(club.name) +
      "</td><td>" +
      marko_escapeXml(club.totalCoeff) +
      "</td></tr>");
  });

  out.w("</table>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: "th {\r\n\t\ttext-align: left;\r\n\t\tborder: solid 1px;\r\n\t}\r\n\t\r\n\ttd {\r\n\t\tmin-width: 5em;\r\n\t\tborder: solid 1px;\r\n\t}\r\n\t\r\n\ttable {\r\n\t\tborder: solid 1px;\r\n\t}",
          virtualPath: "./index.marko.css",
          path: "./index.marko"
        },
      {
          type: "require",
          path: "./"
        }
    ]
  };
