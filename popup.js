// popup.js

const contentDiv = document.getElementsByClassName("options-container");
const thumbnailsToggle = document.getElementById("thumbnailsToggle");
const blackBtn = document.getElementById("blackBtn");
const blurBtn = document.getElementById("blurBtn");
const previewsToggle = document.getElementById("previewsToggle");
const recommendationsToggle = document.getElementById("recommendationsToggle");
const commentsToggle = document.getElementById("commentsToggle");
const modeTogglers = document.getElementsByClassName("mode-toggle")
const lightModeToggle = document.getElementById("light-mode-toggle")
const focusModeToggle = document.getElementById("focus-mode-toggle")
const customModeToggle = document.getElementById("custom-mode-toggle")

window.onload = function() {
  chrome.storage.local.get().then((settings) => {
    let customThumbnails = settings["customThumbnails"];
    let thumbnailTogglerContainer = document.getElementsByClassName(
      "thumbnails-hide-options-toggle"
    );

    if (customThumbnails) {
      thumbnailsToggle.checked = true;
      blurBtn.checked = true;

      Array.from(thumbnailTogglerContainer).forEach((element) => {
        element.style.display = "flex";
      });
    }
    let customThumbnailsOption = settings["customThumbnailsOption"];

    if (customThumbnailsOption == "BLUR") {
      blurBtn.checked = true;
      blackBtn.checked = false;
    } else if (customThumbnailsOption == "HIDE") {
      blurBtn.checked = false;
      blackBtn.checked = true;
    }

    if (settings["customPreviews"]) {
      previewsToggle.checked = true;
    }

    if (settings["customRecommendations"]) {
      recommendationsToggle.checked = true;
    }

    if (settings["customComments"]) {
      commentsToggle.checked = true;
    }

    if (settings["customSidebar"]) {
      sidebarToggle.checked = true;
    }
  });
}

// function sendMessage(tabId, message) {
//   chrome.tabs.sendMessage(tabId, message);
// }

// // Function to send a message to the content script
// function sendMessageToContentScript(action) {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const activeTab = tabs[0];
//     sendMessage(activeTab.id, { action });
//     });
// }

function handleClick(event) {
  if (event.target.id == "thumbnailsToggle") {
    if (thumbnailsToggle.checked == true) {
      chrome.storage.local.set({ customThumbnails: true });
    } else {
      chrome.storage.local.set({ customThumbnails: false });
    }
    toggleThumbnails();
    return;
    // sendMessageToContentScript()
  } else if (event.target.id == "blurBtn") {
    chrome.storage.local.set({ customThumbnailsOption: "BLUR" });
    // sendMessageToContentScript("BLUR");
    blurBtn.checked = true;
    blackBtn.checked = false;
    return;
  } else if (event.target.id == "blackBtn") {
    chrome.storage.local.set({ customThumbnailsOption: "HIDE" });
    // sendMessageToContentScript("HIDE");
    blurBtn.checked = false;
    blackBtn.checked = true;
    return;
  } else if (event.target.id == "previewsToggle") {
    if (previewsToggle.checked == true) {
      chrome.storage.local.set({ customPreviews: true });
    } else {
      chrome.storage.local.set({ customPreviews: false });
    }
    return;
  } else if (event.target.id == "recommendationsToggle") {
    if (recommendationsToggle.checked == true) {
      chrome.storage.local.set({ customRecommendations: true });
    } else {
      chrome.storage.local.set({ customRecommendations: false });
    }
    return;
  } else if (event.target.id == "commentsToggle") {
    if (commentsToggle.checked == true) {
      chrome.storage.local.set({ customComments: true });
    } else {
      chrome.storage.local.set({ customComments: false });
    }
    return;
  } else if (event.target.id == "sidebarToggle") {
    console.log(sidebarToggle.checked);
    if (sidebarToggle.checked == true) {
      chrome.storage.local.set({ customSidebar: true });
    } else {
      chrome.storage.local.set({ customSidebar: false });
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
        if (blackBtn.checked == false && blurBtn.checked == false) {
          blurBtn.checked = true;
        }
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

function handleModeToggle(event) {
  var selectedMode = event.target.id;

  Array.from(modeTogglers).forEach(function (button) {
    button.classList.remove("active");
  });
  event.target.classList.add("active");

  console.log(selectedMode);
  console.log(contentDiv);

  // Update the content based on the selected mode
  if (selectedMode === "light-mode-toggle") {
    contentDiv.innerHTML = `
        <h1>Welcome to Light Mode!</h1>
        <p>This is the content for Light Mode.</p>
      `;
  } else if (selectedMode === "dark-mode-toggle") {
    contentDiv.innerHTML = `
        <h1>Welcome to Dark Mode!</h1>
        <p>This is the content for Dark Mode.</p>
      `;
  } else if (selectedMode === "custom-mode-toggle") {
    contentDiv.innerHTML = `
        <h1>Welcome to Custom Mode!</h1>
        <p>This is the content for Custom Mode.</p>
      `;
  }
}

// Toggle between modes
document.addEventListener("DOMContentLoaded", function () {
  var activeButton = document.getElementById("light-mode-toggle");
  activeButton.classList.add("active");

  document.addEventListener("click", handleClick);

  Array.from(modeTogglers).forEach(function (button) {
    button.addEventListener("click", handleModeToggle);
  });
});