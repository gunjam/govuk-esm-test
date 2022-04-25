# govuk-frontend ESM test

Run `npm run build:js` to build JS with Rollup, this will fail with errors due to unresolvable modules. You can fix it by deleting the exports property from the govuk-frontend package.json file.

Run `npm run build:scss` to build the css file.

You can test the output by viewing `test.html` in your browser.
