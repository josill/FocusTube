if (typeof browser === "undefined") {
  browser = typeof chrome !== "undefined" ? chrome : null;
}

let showThumbnails = true;
let customThumbnails = true;
let customThumbnailsOption = "OPACITY";

// Function to handle messages received from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "URL_CHANGE") {
    console.log(customThumbnailsOption)
    if (customThumbnailsOption === "OPACITY") {
      blurThumbnails();
    } else if (customThumbnailsOption === "HIDE") {
      hideThumbnails();
    }
  }
  if (message.action == "OPACITY" && customThumbnails == true) {
    // Handle the message action here
    customThumbnailsOption = "OPACITY";
  }
  if (message.action == "HIDE" && customThumbnails == true) {
    // Handle the message action here
    customThumbnailsOption = "HIDE";
  }
});

// TODO disable preview of videos

// Function to change the opacity of thumbnails
function blurThumbnails() {
  const style = document.createElement("style");
  style.textContent = `
    yt-image {
      opacity: 0.4 !important;
      filter: blur(12px) !important;
    }
  `;
  document.head.appendChild(style);
}

// Function to black out the thumbnails
function hideThumbnails() {
  const style = document.createElement("style");
  style.textContent = `
    yt-image {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}
