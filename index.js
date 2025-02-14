console.log('🏄‍♂️ — Custon WSL Extension is running!');


browser.runtime.onInstalled.addListener(() => {
    console.log('WSL Extension installed or updated.');
});

browser.browserAction.onClicked.addListener(() => {
    console.log("WSL Toolbar button clicked2 !");
});

browser.action.onClicked.addListener(() => {
    console.log("WSL Toolbar button clicked!");

    // browser.scripting.executeScript({
    //     target: { tabId: tab.id },
    //     func: () => {
    //         alert("Hello from your extension!");
    //     }
    // });
});
