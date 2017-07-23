// ==UserScript==
// @name          Edit in Magnolia
// @namespace     https://github.com/ahietala/magnolia
// @version       0.1
// @description	  Go from a public Magnolia instance to edit the content on the author instance.
// @author        Antti Hietala
// @match         https://demopublic.magnolia-cms.com/*
// @grant         none
// ==/UserScript==


function editInMagnolia() {
  'use strict';

  // Author instance and site configuration
  var defaultBaseURL = "http://demoauthor.magnolia-cms.com";
  var defaultExtension = "html";
  var handlePrefix = "/travel";
  var path = "";

  // URL prefixes that map to content apps
  var apps = {
    "/tours":"tours",
  };

  // Get the current URL
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    var url = new URL(tabs[0].url);
    path = url.pathname;

    // Remove selectors and extension from the path.
    if (path.includes("~")) {
      path = path.replace(/~.*/, "");
    }
    else {
      path = path.replace(/\.[^/.]+$/, "");
    }

    // Check if first path segment is a known app prefix.
    var segments = path.split("/");
    var firstSegment = "/" + segments[1];

    if (firstSegment in apps) {
      // Current content is managed in a content app
      var appName = apps[firstSegment];
      segments.splice(1,1);
      var pathInApp = segments.join("/");
      var newURL = defaultBaseURL + "/.magnolia/admincentral#app:" + appName + ":detail;" + pathInApp + ":edit";
      chrome.tabs.create({url: newURL});
    } else {
      // Current content is managed in the Pages app
      var newURL = defaultBaseURL + "/.magnolia/admincentral#app:pages:detail;" + handlePrefix + path + ":edit";
      chrome.tabs.create({url: newURL});
    }

  });


}

// Create a parent item and two children.
var menu = chrome.contextMenus.create({title: "Edit in Magnolia", onclick: editInMagnolia});
