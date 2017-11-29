// Compiled using marko@4.6.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/client$1.0.0/src/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    click_count_template = marko_loadTemplate(require.resolve("./components/click-count")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    click_count_tag = marko_loadTag(click_count_template),
    site_layout_template = marko_loadTemplate(require.resolve("./components/site-layout")),
    site_layout_tag = marko_loadTag(site_layout_template);

function render(input, out, __component, component, state) {
  var data = input;

  site_layout_tag({
      title: {
          renderBody: function renderBody(out) {
            out.w("Marko Starter");
          }
        },
      content: {
          renderBody: function renderBody(out) {
            out.w("<section><h2>Hello!</h2><p>We're glad you've decided to try out Marko. You're looking at the result of <code>~/src/index.marko</code>. Try editing that file and this page will reload. &#9889;</p></section><section><h2>Components</h2><p>Here's a counter component. You click, it counts! It lives in <code>~/src/components/click-count/</code>. Try making it count by 5.</p>");

            click_count_tag({}, out, __component, "11");

            out.w("<h3>Resolving Components</h3><p>If you look at the code for this page, you'll notice we use the <code>&lt;click-count/></code> component, but don't import it from anywhere. That's because when resolving custom tags, Marko <a href=\"http://markojs.com/docs/custom-tags/#discovering-tags\">looks up the directory tree</a> for a <code>components/</code> directory and finds the counter for us!</p></section>");
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
      "./components/click-count",
      "./components/site-layout"
    ]
  };
