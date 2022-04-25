const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const alias = require('@rollup/plugin-alias');

module.exports = {
  input: 'assets/js/all.js',
  output: [{
    file: 'dist/js/all.js',
    name: 'GOVUKFrontend',
    format: 'umd',
  }],
  plugins: [
    // When the ESM stuff in govuk-frontend is released I'll do a PR against
    // hmrc-frontend to fix this:
    alias({
      entries: [{
        // Dedupe NodeList.forEach() included in both hmrc-frontend and
        // govuk-frontend
        find: /.*common$/,
        replacement: 'govuk-frontend/govuk-esm/common.mjs',
      }, {
        // HMRC are importing already bundled GOVUK polyfills, map to originals
        // so they can be treeshaken
        find: /govuk-frontend\/govuk\/vendor\/polyfills/,
        replacement: 'govuk-frontend/govuk-esm/vendor/polyfills',
      }],
    }),
    nodeResolve({}),
    terser({ ie8: true }),
  ],
};
