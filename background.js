console.log('🏄‍♂️ — Custon WSL Extension is running!');

// browser.runtime.onInstalled.addListener(() => {
//     console.log('WSL Extension installed or updated.');
// });

browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.executeScript(tab.id, {
        code: `
            (function() {
                console.log("Looking for iframe...");
                
                // Select the iframe (change selector if needed)
                let iframe = document.querySelector(".video-content iframe");

                if (!iframe) {
                    console.log("No iframe found on this page.");
                    return;
                } else {
                    console.log("Found iframe:", iframe);
                }

                let iframeDocument;
                try {
                    iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                } catch (e) {
                    console.error("Cannot access iframe: Possible cross-origin restriction.");
                    return;
                }

                // Modify element inside the iframe
                let player = iframeDocument.getElementById("player");
                if (player) {
                    let beforeExists = window.getComputedStyle(player, "::before").content !== "none";
                    let afterExists = window.getComputedStyle(player, "::after").content !== "none";

                    if (beforeExists || afterExists) {
                        let style = iframeDocument.createElement("style");
                        let cssRules = "";

                        if (beforeExists) {
                            cssRules += ".video-js.video-overlay::before { display: none !important; } ";
                            console.log("Hiding ::before");
                        }
                        if (afterExists) {
                            cssRules += ".video-js.video-overlay::after { display: none !important; } ";
                            console.log("Hiding ::after");
                        }

                        style.textContent = cssRules;
                        iframeDocument.head.appendChild(style);
                    } else {
                        console.log("No ::before or ::after found, doing nothing.");
                    }

                } else {
                    console.log("No element with ID 'player' found inside iframe");
                }
            })();
        `
    }).catch(error => console.error("Error injecting script:", error));
});


