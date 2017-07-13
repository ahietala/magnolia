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
    // Author instance and site configuration
    var defaultBaseURL = "http://demoauthor.magnolia-cms.com";
    var defaultExtension = "html";
    var handlePrefix = "/travel";

    // Get path before selectors and extension.
    var path = window.location.pathname;
    console.log("full path: " + path);

    if (path.includes("~")) {
      path = path.replace(/~.*/, "");
      console.log("path without selectors: " + path);
    }
    else {
      path = path.replace(/\.[^/.]+$/, "");
      console.log("path without extension: " + path);
    }



    /* window.open(defaultBaseURL +
      "/.magnolia/admincentral#app:pages:detail;" +
      handlePrefix +
      pathname.replace("." + defaultExtension, "") +
      ":edit"); */
})();
