if (typeof browser === "undefined") {
  browser = typeof chrome !== "undefined" ? chrome : null;
}

function handleLoad() {
  // console.log(window.location.href);
  chrome.storage.local.get().then((settings) => {
    // Disabling thumbnails
    if (settings["customThumbnailsOption"] == "BLUR") {
      blurThumbnails();
    } else if (settings["customThumbnailsOption"] == "HIDE") {
      hideThumbnails();
    }

    // Disabling previews
    if (settings["customPreviews"]) {
      disableVideoPreview();
    }

    if (settings["customRecommendations"]) {
      disableRecommendations();
    }

    // Disabling comments when watching a video
    if (settings["customComments"]) {
      disableComments();
    }

    // Disabling the sidebar when on the home page
    if (settings["customSidebar"]) {
      disableSidebar();
    }

    observeElements();
  });
}

document.addEventListener("DOMContentLoaded", handleLoad);
// implement url change
window.addEventListener("popstate", handleLoad);
document.addEventListener("popstate", function () {
  console.log("location changed!");
});

// function handleMutation(mutationsList, observer) {
//   // still appears when first come to yt and click on a vid
//   for (let mutation of mutationsList) {
//     if (mutation.type == "childList" && mutation.addedNodes.length > 0) {
//       let element = document.getElementById("secondary");
//       if (element) {
//         chrome.storage.local.get(["customRecommendations"]).then((setting) => {
//           if (setting["customRecommendations"]) {
//             disableRecommendations();
//           }
//         });
//         observer.disconnect();
//         break;
//       }
//     }
//   }
// }

function observeElements() {
  const observer = new MutationObserver(function (mutationsList) {
    mutationsList.forEach(function (mutation) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function (node) {
          console.log(node);
          // Perform specific actions on the added node if needed
        });
        disableVideoPreview();
        observer.disconnect();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Function to change the opacity of thumbnails
function blurThumbnails() {
  const style = document.createElement("style");
  style.textContent = `
    yt-image {
      opacity: 0.4 !important;
      filter: blur(12px) !important;
    }

    ytd-thumbnail {
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
  const videoPreviews = document.getElementsByTagName("ytd-compact-video-renderer");
  console.log(videoPreviews)
  Array.from(videoPreviews).forEach((p) => {
    console.log(p.classList.get('hovered'))
    console.log(p.classList)
    p.classList.remove('hovered');
  })
  style.textContent = `
    ytd-video-preview {
      display: none !important;
    }

    .mouseover-overlay {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

function disableRecommendations() {

  const style = document.createElement("style");
  // TODO video end is fucked

  style.textContent = `
    #secondary {
      display: none !important;
    }

    #related {
      display: none !important;
    }

    .html5-video-container {
      width: 100% !important;
      height: 100% !important;
    }

    video {
      width: 100% !important;
      height: 100% !important;
    }

    .ytp-chrome-bottom {
      width: 98% !important;
    }

    .ytp-progress-bar-container {
      width: 100% !important;
    }

    .ytp-chrome-controls {
      width: 100% !important;
    }
    
    .ytp-progress-list {
      width: 100% !important;
    }

    .ytp-chapter-hover-container {
      width: 100% !important;
    }

    .ytp-progress-bar-padding {
      display: none !important;
    }

    .ytp-heat-map-container {
      width: 100% !important;
    }

    .ytp-clip-end-exclude {
      left: 150% !important;
    }
  `;
  document.head.appendChild(style);
}

function disableComments() {
  const style = document.createElement("style");
  style.textContent = `
    ytd-comments {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

function disableSidebar() {
  const style = document.createElement("style");
  style.textContent = `
    ytd-guide-section-renderer {
      display: none !important;  
    }

    ytd-guide-renderer {
      display: none !important;
    }

    ytd-mini-guide-renderer {
      display: none !important;
    }

    yt-icon-button {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}
