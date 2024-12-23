let extensionID = "hajiadpcnhglegbllpnfipmimjjmhlfb";
let clientID = "1319571957867352165";

chrome.runtime.sendMessage(extensionID, {mode: 'passive'}, function(response) {
    console.log('Presence registred', response);
});

chrome.runtime.onMessage.addListener(function(info, sender, sendResponse) {
    console.log('Presence requested', info);
    console.log(sender, sendResponse);
    sendResponse({
      clientId: clientID,
      presence: {
        details: "Working on a Scratch project!",
        largeImageText: "Scratch",
        startTimestamp: Date.now(),
        instance: true,
      }
    });

    alert("wow");
});