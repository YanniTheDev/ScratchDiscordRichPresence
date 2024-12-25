let extensionID = "agnaejlkbiiggajjmnpmeheigkflbnoo"; //Chrome

if (typeof browser !== 'undefined' && typeof chrome !== "undefined"){
  extensionID = "{57081fef-67b4-482f-bcb0-69296e63ec4f}"; //Firefox
}

let clientID = "1319571957867352165";

chrome.runtime.sendMessage(extensionID, {mode: 'passive'}, function(response) {
    console.log('Presence registred', response);
});

chrome.runtime.onMessage.addListener(function(info, sender, sendResponse) {
    console.log('Presence requested', info);
    sendResponse(generatePresence());
});

//Setting the date here so that it does not get reset when presence is re-requested
let time = Date.now();

let windowName = "";

// Get the tab's name once everything is loaded so it isn't the default (Scratch - Imagine, Program, Share)
window.onload = () => {
  windowName = document.title;
}

// The project name without the " on Scratch" (11 characters)
let projectName = windowName.substring(0, windowName.length - 11);

function generatePresence() {

  //Check if the windowName is not the default Scratch tab name
  if (windowName === "Scratch - Imagine, Program, Share") {
    return (
      {
        clientId: clientID,
        presence: {
          details: "Working on a Scratch project!",
          largeImageText: "Scratch",
          startTimestamp: time,
          instance: true,
        }
      }
    );
  }
  else {
    return (
      {
        clientId: clientID,
        presence: {
          details: `Working on ${projectName}!`,
          largeImageText: "Scratch",
          startTimestamp: time,
          instance: true,
        }
      }
    );
  }

}