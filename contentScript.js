if (typeof browser === "undefined") {
  browser = typeof chrome !== "undefined" ? chrome : null;
}

// Function to handle messages received from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "URL_CHANGE") {
    // Disabling thumbnails
    chrome.storage.local.get(["customThumbnailsOption"]).then((result) => {
      chrome.storage.local.get(["customThumbnails"]).then((customThumbnails) => {
        if (customThumbnails["customThumbnails"]) {
          if (result["customThumbnailsOption"] == "BLUR") {
            blurThumbnails();
          } else if (result["customThumbnailsOption"] == "HIDE") {
            hideThumbnails();
          }
        }
      });
    });

    // Disabling previews
    chrome.storage.local.get(["customPreviews"]).then((result) => {
      if (result["customPreviews"]) {
        disableVideoPreview();
      }
    })

    // Disabling recommendations when watching a video
    chrome.storage.local.get(["customRecommendations"]).then((result) => {
      console.log(result)
      // TODO implement functions
    })

    // Disabling comments when watching a video
    chrome.storage.local.get(["customComments"]).then((result) => {
      console.log(result)
      // TODO implement functions
    })
  }
});

// Function to change the opacity of thumbnails
function blurThumbnails() {
  const style = document.createElement("style");
  style.textContent = `
    yt-image {
      opacity: 0.4 !important;
      filter: blur(12px) !important;
    }
  `;
  // TODO blur channel images as well
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
  // TODO blur channel images as well
  document.head.appendChild(style);
}

function disableVideoPreview() {
  // TODO disable previews on creators channels.

  const style = document.createElement("style");
  style.textContent = `
    ytd-video-preview {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}
