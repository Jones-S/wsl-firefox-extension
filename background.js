console.log('🏄‍♂️ — Custon WSL Extension is running!');

// browser.runtime.onInstalled.addListener(() => {
//     console.log('WSL Extension installed or updated.');
// });

browser.browserAction.onClicked.addListener((tab) => {
    console.log("Toolbar button clicked!");

    browser.tabs.executeScript(tab.id, {
        code: `
            (function() {
                let player = document.getElementById("player");
                let main = document.getElementById("bd");
                let body = document.getElementsByTagName("body")[0];
                const wrapper = document.getElementsByClassName("content")[0];

                console.log('body: ', body, player)
                console.log('main: ', main)
                console.log('wrapper: ', wrapper)
                if (player) {
                    player.style.border = "5px solid red"; // Example: Add a red border
                    console.log("CSS modified for #player");
                } else {
                    console.log("No element with ID 'player' found");
                }
            })();
        `
    }).catch(error => console.error("Error injecting script:", error));
});

