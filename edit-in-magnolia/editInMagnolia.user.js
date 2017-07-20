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

  // URL prefixes that suggest the content is managed in an app
  // "<URL prefix>":"appName"
  var apps = {
    "/tours":"tours",
    "/john":"guitar",
    "/ringo":"drums",
  };
  console.log(apps);
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

  // Check if first path segment is a known app prefix.

  var segments = path.split("/");
  console.log(segments);

  var firstSegment = "/" + segments[1];
  console.log(firstSegment);

  if (firstSegment in apps) {
    var appName = apps[firstSegment];
    segments.splice(1,1);
    var pathInApp = segments.join("/");
    console.log("This content is managed in the " + appName + " app.");
    console.log("App URL: " + defaultBaseURL + "/.magnolia/admincentral#app:" + appName + ":detail;" + pathInApp + ":edit");
  } else {
    console.log("This content is managed in the Pages app.");
    console.log("Page URL: " + defaultBaseURL + "/.magnolia/admincentral#app:pages:detail;" + handlePrefix + path + ":edit");
  }
}

// Create a parent item and two children.
var menu = chrome.contextMenus.create({title: "Edit in Magnolia", onclick: editInMagnolia});
