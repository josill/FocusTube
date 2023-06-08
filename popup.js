// popup.js

// Function to send a message to the content script
function sendMessageToContentScript(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      console.log(activeTab.url);
    sendMessage(activeTab.id, { action });
    });
}

function sendMessage(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}

// Add click event listener for the Opacity button
const opacityBtn = document.getElementById("opacityBtn");
opacityBtn.addEventListener("click", () => {
  console.log("opacitybtn")
    sendMessageToContentScript("OPACITY");
});

// Add click event listener for the Black button
const blackBtn = document.getElementById("blackBtn");
blackBtn.addEventListener("click", () => {
    console.log("blackbtn");
    sendMessageToContentScript("HIDE");
});
