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

//  var path = "";


  // Author instance and site configuration
  var site = new Object();
  site.defaultBaseURL = "http://demoauthor.magnolia-cms.com";
  site.handlePrefix = "/travel";


  // URL prefixes that map to content apps
  site.apps = {
    "/tours":"tours",
  };

  // Get the current URL
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    var url = new URL(tabs[0].url);
    var path = url.pathname;

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

    if (firstSegment in site.apps) {
      // Current content is managed in a content app
      var appName = site.apps[firstSegment];
      segments.splice(1,1);
      var pathInApp = segments.join("/");
      var newURL = site.defaultBaseURL + "/.magnolia/admincentral#app:" + appName + ":detail;" + pathInApp + ":edit";
      chrome.tabs.create({url: newURL});
    } else {
      // Current content is managed in the Pages app
      var newURL = site.defaultBaseURL + "/.magnolia/admincentral#app:pages:detail;" + site.handlePrefix + path + ":edit";
      chrome.tabs.create({url: newURL});
    }

  });


}

// Create a parent item and two children.
var menu = chrome.contextMenus.create({title: "Edit in Magnolia", onclick: editInMagnolia, contexts: ["all"]});
