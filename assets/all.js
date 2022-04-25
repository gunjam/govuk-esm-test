import { nodeListForEach } from 'govuk-frontend/govuk-esm/common';
import { Button } from 'govuk-frontend';
import TimeoutDialog from 'hmrc-frontend/hmrc/components/timeout-dialog/timeout-dialog.js';
import CookieBanner from './cookie-banner.js';

/**
 * @param opts
 */
function initAll(opts) {
  // Set the options to an empty object by default if no options are passed.
  var options = typeof opts !== 'undefined' ? opts : {};

  // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document;

  var $buttons = scope.querySelectorAll('[data-module="govuk-button"]');
  nodeListForEach($buttons, function ($button) {
    new Button($button).init();
  });

  // HMRC Session Timeout Dialog
  var $TimeoutDialog = scope.querySelector('meta[name="hmrc-timeout-dialog"]');
  if ($TimeoutDialog) {
    new TimeoutDialog($TimeoutDialog).init();
  }

  // GDPR cookie consent banner
  var $CookieBanner = scope.querySelector('[data-module="pc-cookie-banner"]');
  if ($CookieBanner) {
    new CookieBanner($CookieBanner).init();
  }
}

export {
  initAll,
  Button,
  TimeoutDialog,
  CookieBanner,
};
