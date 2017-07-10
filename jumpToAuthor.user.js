// ==UserScript==
// @name          Jump to Magnolia author
// @namespace     https://github.com/ahietala/magnolia
// @version       0.1
// @description	  Magnolia typically comes with two instances: author and public. This script allows you to move quickly from the public website to the corresponding content item on the author instance, for example to fix a typo.
// @author        Antti Hietala
// @match         https://demopublic.magnolia-cms.com/*
// @grant         none
// ==/UserScript==

(function() {
    'use strict';
    var defaultBaseURL = "http://demoauthor.magnolia-cms.com";
    var defaultExtension = "html";
    var handlePrefix = "/travel";
    var pathname = window.location.pathname;


    window.open(defaultBaseURL +
      "/.magnolia/admincentral#app:pages:detail;" +
      handlePrefix +
      pathname.replace("." + defaultExtension, "") +
      ":edit");
})();
