// popup.js

const thumbnailsToggle = document.getElementById("thumbnailsToggle");
const blackBtn = document.getElementById("blackBtn");
const blurBtn = document.getElementById("blurBtn");
const previewsToggle = document.getElementById("previewsToggle");
const recommendationsToggle = document.getElementById("recommendationsToggle");
const commentsToggle = document.getElementById("commentsToggle");

window.onload = function() {
  chrome.storage.local.get(["customThumbnails"]).then((result) => {
    let customThumbnails = result["customThumbnails"];
    let thumbnailTogglerContainer = document.getElementsByClassName("thumbnails-hide-options-toggle");

    if (customThumbnails) {
      thumbnailsToggle.checked = true;
      blurBtn.checked = true;

      Array.from(thumbnailTogglerContainer).forEach(element => {
        element.style.display = "flex";
      });
    } 
  });

  chrome.storage.local.get(["customThumbnailsOption"]).then((result) => {
    let customThumbnailsOption = result["customThumbnailsOption"];

    if (customThumbnailsOption == "BLUR") {
      blurBtn.checked = true;
      blackBtn.checked = false;
    } else if (customThumbnailsOption == "HIDE") {
      blurBtn.checked = false;
      blackBtn.checked = true;
    }
  });

  chrome.storage.local.get(["customPreviews"]).then((result) => {
    if (result["customPreviews"]) {
      previewsToggle.checked = true;
    }
  })

  chrome.storage.local.get(["customRecommendations"]).then((result) => {
    if (result["customRecommendations"]) {
      recommendationsToggle.checked = true;
    }
  });

  chrome.storage.local.get(["customComments"]).then((result) => {
    if (result["customComments"]) {
      commentsToggle.checked = true;
    }
  });
}

function sendMessage(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}

// Function to send a message to the content script
function sendMessageToContentScript(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
    sendMessage(activeTab.id, { action });
    });
}

function handleClick(event) {
  if (event.target.id == "thumbnailsToggle") {
    if (thumbnailsToggle.checked == true) {
      chrome.storage.local.set({"customThumbnails": true});
    } else {
      chrome.storage.local.set({"customThumbnails": false});
    }
    toggleThumbnails()
    return;
    // sendMessageToContentScript()
  } else if (event.target.id == "blurBtn") {
    chrome.storage.local.set({"customThumbnailsOption": "BLUR"});
    // sendMessageToContentScript("BLUR");
    blurBtn.checked = true;
    blackBtn.checked = false;
    return;
  } else if (event.target.id == "blackBtn") {
    chrome.storage.local.set({"customThumbnailsOption": "HIDE"});
    // sendMessageToContentScript("HIDE");
    blurBtn.checked = false;
    blackBtn.checked = true;
    return;
  } else if (event.target.id == "previewsToggle") {
    if (previewsToggle.checked == true) {
        chrome.storage.local.set({ "customPreviews": true });
    } else {
        chrome.storage.local.set({ "customPreviews": false });
    }
    return;
  } else if (event.target.id == "recommendationsToggle") {
    if (recommendationsToggle.checked == true) {
      chrome.storage.local.set({ "customRecommendations": true });
    } else {
      chrome.storage.local.set({ "customRecommendations": false });
    }    return;
  } else if (event.target.id == "commentsToggle") {
    if (commentsToggle.checked == true) {
      chrome.storage.local.set({ "customComments": true });
    } else {
      chrome.storage.local.set({ "customComments": false });
    }
    return;
  }
}

function toggleThumbnails() {
    let customThumbnails;
    chrome.storage.local.get(["customThumbnails"]).then((result) => {
      customThumbnails = result["customThumbnails"];
      let thumbnailTogglerContainer = document.getElementsByClassName(
        "thumbnails-hide-options-toggle"
      );

      if (customThumbnails) {
        Array.from(thumbnailTogglerContainer).forEach((element) => {
          element.style.display = "flex";
        });
      } else {
        Array.from(thumbnailTogglerContainer).forEach((element) => {
          element.style.display = "none";
        });
      }
    });
}


document.addEventListener("click", handleClick);