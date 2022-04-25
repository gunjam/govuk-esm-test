import setCookie from './set-cookie';
import 'govuk-frontend/govuk-esm/vendor/polyfills/Event.js';
import 'govuk-frontend/govuk-esm/vendor/polyfills/Function/prototype/bind.js';

var ONE_YEAR = 365;

/**
 * @param $module
 */
function CookieBanner($module) {
  this.$module = $module;

  if ($module) {
    this.$chooseBanner = $module.querySelector('.pc-cookie-banner--main');
    this.$acceptBanner = $module.querySelector('.pc-cookie-banner--accept');
    this.$rejectBanner = $module.querySelector('.pc-cookie-banner--reject');
    this.$acceptButton = $module.querySelector('.pc-cookie-banner--accept__button');
    this.$rejectButton = $module.querySelector('.pc-cookie-banner--reject__button');
    this.$hideAcceptButton = this.$acceptBanner.querySelector('.pc-cookie-banner--hide');
    this.$hideRejectButton = this.$rejectBanner.querySelector('.pc-cookie-banner--hide');
  }
}

/**
 * Initialise CookieBanner.
 *
 * Check for the presence of the cookie message, if it is missing return early.
 */
CookieBanner.prototype.init = function () {
  if (!this.$module) {
    return;
  }

  this.$acceptButton.addEventListener('click', this.handleAcceptClick.bind(this));
  this.$rejectButton.addEventListener('click', this.handleRejectClick.bind(this));
  this.$hideAcceptButton.addEventListener('click', this.handleHideClick.bind(this));
  this.$hideRejectButton.addEventListener('click', this.handleHideClick.bind(this));
};

/**
 * Handle accept button click.
 *
 * When the accept button is clicked, fire the Google Tag Manger code and set
 * consent cookie to 'accept' and show the cookies accepted banner.
 *
 * @param event
 */
CookieBanner.prototype.handleAcceptClick = function (event) {
  var googleTagManagerID = this.$module.getAttribute('data-gtm-id');
  this.initGoogleTagManager(googleTagManagerID);
  this.showBanner(this.$acceptBanner);
  this.enactConsent('accept');
  event.preventDefault();
};

/**
 * Handle reject button click.
 *
 * Set the consent cookie to 'reject' and show the cookies rejected banner.
 *
 * @param event
 */
CookieBanner.prototype.handleRejectClick = function (event) {
  this.showBanner(this.$rejectBanner);
  this.enactConsent('reject');
  event.preventDefault();
};

/**
 * Handle hide link click.
 *
 * When a hide link is clicked, hide the banner.
 *
 * @param event
 */
CookieBanner.prototype.handleHideClick = function (event) {
  this.$module.setAttribute('hidden', 'hidden');
  event.preventDefault();
};

/**
 * Enact the users cookie consent choice.
 *
 * Hide the main banner, show the associated reject / accept message and set
 * the consent cookie for a year.
 *
 * @param consent
 */
CookieBanner.prototype.enactConsent = function (consent) {
  var consentCookieName = this.$module.getAttribute('data-consent-cookie-name');
  setCookie(consentCookieName, consent, ONE_YEAR);
};

/**
 * Show the accept or reject banner after button click.
 *
 * @param $banner
 */
CookieBanner.prototype.showBanner = function ($banner) {
  this.$chooseBanner.setAttribute('hidden', 'hidden');
  $banner.removeAttribute('hidden');
  $banner.setAttribute('tabindex', '-1');
  $banner.focus();
  $banner.addEventListener('blur', function () {
    $banner.removeAttribute('tabindex');
  });
};

/**
 * Set up Google Tag Manager.
 *
 * Executes the Google Tag Manager snippet.
 *
 * @param googleTagManagerID
 */
CookieBanner.prototype.initGoogleTagManager = function (googleTagManagerID) {
  /* eslint-disable */
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer', googleTagManagerID);
};

export default CookieBanner;
