browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getSelectedText") {
    const selection = window.getSelection()?.toString();
    sendResponse(selection);
  }
});
