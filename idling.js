let extensionID = "agnaejlkbiiggajjmnpmeheigkflbnoo"; //Chrome

if (typeof browser !== 'undefined' && typeof chrome !== "undefined"){
  extensionID = "{57081fef-67b4-482f-bcb0-69296e63ec4f}"; //Firefox
}

let clientID = "1319571957867352165";

chrome.runtime.sendMessage(extensionID, {mode: 'passive'}, function(response) {
    console.log('Presence registred', response);
});

let time = Date.now();

chrome.runtime.onMessage.addListener(function(info, sender, sendResponse) {
    console.log('Presence requested', info);
    sendResponse({
        clientId: clientID,
        presence: {
          details: "Idling on Scratch...",
          startTimestamp: time,
          largeImageText: "Scratch",
          instance: true
        }
    });
});