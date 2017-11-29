// Compiled using marko@4.6.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/client$1.0.0/src/routes/layouts/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    site_layout_template = marko_loadTemplate(require.resolve("../../components/site-layout")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    site_layout_tag = marko_loadTag(site_layout_template);

function render(input, out, __component, component, state) {
  var data = input;

  site_layout_tag({
      title: {
          renderBody: function renderBody(out) {
            out.w("Layouts");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<section><h2>Layouts</h2><p>If you hadn't noticed, this site has the same header on every page. This is provided by the <code>&lt;site-layout></code> component which lives in <code>~/src/components/site-layout</code>. This component makes use of Marko's ability to <a href=\"http://markojs.com/docs/core-tags/#layouts-with-nested-attributes\">pass content using nested attributes</a>.</p><p></p></section><section><h2>Styles</h2><p>As you can see, this site looks quite nice. That's because Marko <a href=\"http://markojs.com/docs/components/#supporting-files\">pulls in stylesheets</a> next to a Marko template. Try editing the contents of <code>~/src/components/site-layout/style.css</code>. &#128132;</p></section><section><h2>Images</h2><p>We also have the Marko logo in the header. The image file lives at <code>site-layout/logo.png</code>, right next to <code>site-layout/index.marko</code> which references it using a relative path: <code>&lt;img src=\"./logo.png\"/></code>.</p><p>And this works for all resources, not just images, which allows you to keep your resources next to the templates which use them. &#128077;</p></section>");
          }
        },
      [hasRenderBodyKey]: true
    }, out, __component, "0");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    tags: [
      "../../components/site-layout"
    ]
  };
