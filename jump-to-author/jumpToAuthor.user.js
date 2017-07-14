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

    // When content is managed in an app list the URL prefixes and the corresponding app names here.
    var apps = {
      "/tours":"tours",
      "/john":"guitar",
      "/ringo":"drums",
    };

    // Remove selectors and extension from the path.
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

    // Get first segment of path.
    var pathSegments = path.split("/");
    console.log("Splitted segments: " + pathSegments);

    var firstSegment = "/" + pathSegments[1];
    console.log("First segment: " + firstSegment);

    var shiftedSegments = pathSegments.shift();
    console.log("Shifted segments: " + shiftedSegments);


    // Check if first path segment is a known app prefix.
    if (firstSegment in apps) {
      console.log("yes, it's in there");
      console.log("App name: " + apps[firstPathSegment]);

      console.log("App URL: " + defaultBaseURL + "/.magnolia/admincentral#app:" + apps[firstSegment] + ":detail;" + path + ":edit");
    } else {
      console.log("Page URL: " + defaultBaseURL + "/.magnolia/admincentral#app:pages:detail;" + path + ":edit");
    }
    /* Object.keys(apps).forEach(function(key) {
      if (apps[key] == firstPathSegment) {
        console.log("This content is managed in an app!");
        console.log("App URL: " + defaultBaseURL + "/.magnolia/admincentral#app:" + apps.key + ":detail;" + path + ":edit");
      } else {
        // Append handlePrefix
        path = handlePrefix + path;
        console.log("Page URL: " + defaultBaseURL + "/.magnolia/admincentral#app:pages:detail;" + path + ":edit");
      }
    }); */




    /* window.open(defaultBaseURL +
      "/.magnolia/admincentral#app:pages:detail;" +
      handlePrefix +
      pathname.replace("." + defaultExtension, "") +
      ":edit"); */
})();
