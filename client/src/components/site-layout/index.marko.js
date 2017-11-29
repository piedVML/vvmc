// Compiled using marko@4.6.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/client$1.0.0/src/components/site-layout/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    lasso_head_tag = marko_loadTag(require("lasso/taglib/head-tag")),
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    asset_var_tag = marko_loadTag(require("marko-magic/components/asset-var/renderer")),
    marko_attr = marko_helpers.a,
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    browser_refresh_tag = marko_loadTag(require("browser-refresh-taglib/refresh-tag")),
    lasso_body_tag = marko_loadTag(require("lasso/taglib/body-tag")),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html lang=\"en-US\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width\"><title>VVMC</title>");

  lasso_head_tag({}, out, __component, "5");

  out.w("</head><body>");

  component_globals_tag({}, out);

  out.w("<header>");

  asset_var_tag({
      values: [
          require.resolve("./logo.png")
        ],
      renderBody: function renderBody(out, __src) {
        out.w("<img" +
          marko_attr("src", __src.url) +
          " alt=\"marko logo\" class=\"logo\">");
      }
    }, out, __component, "20");

  out.w("<h1>");

  include_tag({
      _target: input.title
    }, out, __component, "10");

  out.w("</h1><nav class=\"menu\"><a href=\"/\">home</a><a href=\"/clubs\">clubs</a><a href=\"/matches\">matches</a></nav></header><div class=\"content\">");

  include_tag({
      _target: input.content
    }, out, __component, "16");

  out.w("</div>");

  browser_refresh_tag({}, out, __component, "17");

  lasso_body_tag({}, out, __component, "18");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "19");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    tags: [
      "lasso/taglib/head-tag",
      "marko/src/components/taglib/component-globals-tag",
      "marko-magic/components/asset-var/renderer",
      "marko/src/taglibs/core/include-tag",
      "browser-refresh-taglib/refresh-tag",
      "lasso/taglib/body-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
