// Compiled using marko@4.6.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/client$1.0.0/src/components/matches-list/index.marko", function() {
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

  var matches = component.matches;

  out.w("<div class=\"list-matches\">");

  marko_forEach(matches, function(match) {
    if (match.result.diff < (-10)) {
      out.w(" <div class=\"match upset\"" +
        marko_attr("data-marko", {
          onclick: __component.d("onMatchClick", [
              match
            ])
        }, false) +
        "> ~$&nbsp;&nbsp; " +
        marko_escapeXml(match) +
        ";</div> ");
    } else {
      out.w("<div class=\"match\"" +
        marko_attr("data-marko", {
          onclick: __component.d("onMatchClick", [
              match
            ])
        }, false) +
        "> ~$&nbsp;&nbsp; " +
        marko_escapeXml(match) +
        ";</div>");
    }
  });

  out.w("</div>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: ".match {\n\t\tpadding-bottom: 0.3em;\n\t}\n\t.upset {\n\t\tcolor: #f95;\n\t}",
          virtualPath: "./index.marko.css",
          path: "./index.marko"
        },
      {
          type: "require",
          path: "./"
        }
    ]
  };
