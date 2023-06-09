// background.js

// Function to handle URL changes and refresh
function handleURLChange(tabId, changeInfo, tab) {
  // Check if the URL of the tab matches the desired pattern
  if (tab.url && tab.url.startsWith("https://www.youtube.com/")) {
    // Send a message to the content script to trigger the desired action
    chrome.tabs.sendMessage(tabId, { action: "URL_CHANGE" });
  }
}

// Add listener for tab updates
chrome.tabs.onUpdated.addListener(handleURLChange);

// // Function to send a message to the content script
// function sendMessageToContentScript(action) {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, { action });
//   });
// }

// // Function to handle messages received from the popup script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "OPACITY") {
//     localStorage.setItem("buttonState", "OPACITY");
//   } else if (message.action === "HIDE") {
//     localStorage.setItem("buttonState", "HIDE");
//   }
// });

// // Get the Opacity button element
// const opacityBtn = document.getElementById("opacityBtn");
// // Add click event listener
// opacityBtn.addEventListener("click", () => {
//   sendMessageToContentScript("OPACITY");
//   // Save the button state to local storage
//   localStorage.setItem("buttonState", "OPACITY");
// });

// // Get the Black button element
// const blackBtn = document.getElementById("blackBtn");
// // Add click event listener
// blackBtn.addEventListener("click", () => {
//   sendMessageToContentScript("HIDE");
//   // Save the button state to local storage
//   localStorage.setItem("buttonState", "HIDE");
// });
